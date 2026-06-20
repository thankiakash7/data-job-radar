import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRequest, createResponse } from 'node-mocks-http';
import handler from '../pages/api/jobs';

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  process.env.ADZUNA_APP_ID = 'test-id';
  process.env.ADZUNA_APP_KEY = 'test-key';
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.restoreAllMocks();
});

function run(query = {}, method = 'GET') {
  const req = createRequest({ method, query });
  const res = createResponse();
  return { req, res };
}

describe('/api/jobs', () => {
  it('rejects non-GET requests', async () => {
    const { req, res } = run({}, 'POST');
    await handler(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('returns 500 if Adzuna credentials are missing', async () => {
    delete process.env.ADZUNA_APP_ID;
    delete process.env.ADZUNA_APP_KEY;

    const { req, res } = run({});
    await handler(req, res);

    expect(res.statusCode).toBe(500);
    const data = res._getJSONData();
    expect(data.error).toMatch(/credentials/i);
  });

  it('returns normalized jobs on success and combines role + keywords', async () => {
    global.fetch = vi.fn().mockImplementation((url) => {
      expect(url).toContain('what=data+analyst+power+bi');
      expect(url).toContain('where=Brighton');
      return Promise.resolve({
        ok: true,
        json: async () => ({
          count: 1,
          results: [
            {
              id: 7,
              title: 'Junior Data Analyst',
              company: { display_name: 'Acme' },
              location: { display_name: 'Brighton' },
              redirect_url: 'https://example.com/7',
            },
          ],
        }),
      });
    });

    const { req, res } = run({ role: 'data-analyst', location: 'brighton', keywords: 'power bi' });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.count).toBe(1);
    expect(data.results[0].title).toBe('Junior Data Analyst');
  });

  it('returns 502 if the Adzuna API call fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: async () => 'Forbidden',
    });

    const { req, res } = run({});
    await handler(req, res);

    expect(res.statusCode).toBe(502);
    const data = res._getJSONData();
    expect(data.error).toMatch(/Adzuna API error 403/);
  });

  it('falls back to defaults for unknown role/location ids', async () => {
    global.fetch = vi.fn().mockImplementation((url) => {
      // defaults: data-analyst + all-uk (no "where")
      expect(url).toContain('what=data+analyst');
      expect(url).not.toContain('where=');
      return Promise.resolve({
        ok: true,
        json: async () => ({ count: 0, results: [] }),
      });
    });

    const { req, res } = run({ role: 'not-a-role', location: 'not-a-place' });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
  });

  it('merges results from Adzuna and Reed when REED_API_KEY is set', async () => {
    process.env.REED_API_KEY = 'reed-test-key';

    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('reed.co.uk')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            totalResults: 1,
            results: [
              {
                jobId: 99,
                jobTitle: 'Junior Data Scientist',
                employerName: 'Beta Ltd',
                locationName: 'London',
                jobUrl: 'https://www.reed.co.uk/jobs/99',
              },
            ],
          }),
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({
          count: 1,
          results: [
            {
              id: 1,
              title: 'Data Analyst',
              company: { display_name: 'Acme' },
              location: { display_name: 'London' },
              redirect_url: 'https://example.com/1',
            },
          ],
        }),
      });
    });

    const { req, res } = run({});
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.count).toBe(2);
    expect(data.results).toHaveLength(2);
    expect(data.results.map((job) => job.source)).toEqual(
      expect.arrayContaining(['Adzuna', 'Reed'])
    );
  });

  it('returns Adzuna-only results if the Reed request fails', async () => {
    process.env.REED_API_KEY = 'reed-test-key';

    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('reed.co.uk')) {
        return Promise.resolve({ ok: false, status: 401, text: async () => 'Invalid key' });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({
          count: 1,
          results: [
            {
              id: 1,
              title: 'Data Analyst',
              company: { display_name: 'Acme' },
              location: { display_name: 'London' },
              redirect_url: 'https://example.com/1',
            },
          ],
        }),
      });
    });

    const { req, res } = run({});
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data.count).toBe(1);
    expect(data.results).toHaveLength(1);
    expect(data.results[0].source).toBe('Adzuna');
  });
});

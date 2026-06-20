import { describe, it, expect, vi, afterEach } from 'vitest';
import { buildAdzunaUrl, normalizeJob, fetchAdzunaJobs } from '../lib/adzuna';

describe('buildAdzunaUrl', () => {
  const base = { appId: 'id123', appKey: 'key456' };

  it('builds a URL with the required credentials and defaults', () => {
    const url = buildAdzunaUrl(base);
    expect(url).toContain('https://api.adzuna.com/v1/api/jobs/gb/search/1');
    expect(url).toContain('app_id=id123');
    expect(url).toContain('app_key=key456');
    expect(url).toContain('results_per_page=20');
    expect(url).toContain('sort_by=date');
    expect(url).toContain('max_days_old=21');
  });

  it('includes "what" and "where" when provided', () => {
    const url = buildAdzunaUrl({ ...base, what: 'data analyst', where: 'Brighton' });
    expect(url).toContain('what=data+analyst');
    expect(url).toContain('where=Brighton');
  });

  it('omits "what" and "where" when not provided', () => {
    const url = buildAdzunaUrl(base);
    expect(url).not.toContain('what=');
    expect(url).not.toContain('where=');
  });

  it('uses the requested page number', () => {
    const url = buildAdzunaUrl({ ...base, page: 3 });
    expect(url).toContain('/search/3');
  });

  it('falls back to page 1 for invalid page numbers', () => {
    expect(buildAdzunaUrl({ ...base, page: 0 })).toContain('/search/1');
    expect(buildAdzunaUrl({ ...base, page: -5 })).toContain('/search/1');
    expect(buildAdzunaUrl({ ...base, page: 'not-a-number' })).toContain('/search/1');
  });

  it('throws if credentials are missing', () => {
    expect(() => buildAdzunaUrl({})).toThrow(/app ID and app key/);
  });
});

describe('normalizeJob', () => {
  it('maps a typical Adzuna record to the UI shape', () => {
    const raw = {
      id: 123,
      title: '<strong>Data</strong> Analyst',
      company: { display_name: 'Acme Co' },
      location: { display_name: 'London' },
      redirect_url: 'https://example.com/job/123',
      description: '<p>Great   role  with   spacing</p>',
      salary_min: 28000,
      salary_max: 34000,
      contract_time: 'full_time',
      created: '2026-06-10T08:00:00Z',
    };

    expect(normalizeJob(raw)).toEqual({
      id: '123',
      title: 'Data Analyst',
      company: 'Acme Co',
      location: 'London',
      url: 'https://example.com/job/123',
      description: 'Great role with spacing',
      salaryMin: 28000,
      salaryMax: 34000,
      contractType: 'full_time',
      created: '2026-06-10T08:00:00Z',
      source: 'Adzuna',
    });
  });

  it('fills in sensible fallbacks for missing fields', () => {
    const result = normalizeJob({});
    expect(result.title).toBe('Untitled role');
    expect(result.company).toBe('Unknown company');
    expect(result.location).toBe('Location not specified');
    expect(result.url).toBe('#');
    expect(result.description).toBe('');
    expect(result.salaryMin).toBeNull();
    expect(result.salaryMax).toBeNull();
    expect(result.contractType).toBeNull();
    expect(result.created).toBeNull();
  });
});

describe('fetchAdzunaJobs', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns normalized results and count on success', async () => {
    const mockResponse = {
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
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchAdzunaJobs({ appId: 'a', appKey: 'b' });

    expect(data.count).toBe(1);
    expect(data.results).toHaveLength(1);
    expect(data.results[0].title).toBe('Data Analyst');
  });

  it('throws a descriptive error when the API responds with an error status', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'Invalid app ID or key',
    });

    await expect(fetchAdzunaJobs({ appId: 'a', appKey: 'b' })).rejects.toThrow(
      /Adzuna API error 401/
    );
  });
});

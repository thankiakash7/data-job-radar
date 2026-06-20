import { describe, it, expect, vi, afterEach } from 'vitest';
import { buildReedUrl, normalizeReedJob, fetchReedJobs } from '../lib/reed';

describe('buildReedUrl', () => {
  const base = { apiKey: 'key123' };

  it('builds a URL with the required base and default pagination', () => {
    const url = buildReedUrl(base);
    expect(url).toContain('https://www.reed.co.uk/api/1.0/search');
    expect(url).toContain('resultsToTake=10');
    expect(url).toContain('resultsToSkip=0');
  });

  it('includes "keywords" and "locationName" when provided', () => {
    const url = buildReedUrl({ ...base, what: 'data analyst', where: 'Brighton' });
    expect(url).toContain('keywords=data+analyst');
    expect(url).toContain('locationName=Brighton');
  });

  it('omits "keywords" and "locationName" when not provided', () => {
    const url = buildReedUrl(base);
    expect(url).not.toContain('keywords=');
    expect(url).not.toContain('locationName=');
  });

  it('skips results based on the requested page number', () => {
    const url = buildReedUrl({ ...base, page: 3, resultsPerPage: 10 });
    expect(url).toContain('resultsToSkip=20');
  });

  it('falls back to page 1 for invalid page numbers', () => {
    expect(buildReedUrl({ ...base, page: 0 })).toContain('resultsToSkip=0');
    expect(buildReedUrl({ ...base, page: -5 })).toContain('resultsToSkip=0');
    expect(buildReedUrl({ ...base, page: 'not-a-number' })).toContain('resultsToSkip=0');
  });

  it('throws if the API key is missing', () => {
    expect(() => buildReedUrl({})).toThrow(/Reed API key/);
  });
});

describe('normalizeReedJob', () => {
  it('maps a typical Reed record to the UI shape', () => {
    const raw = {
      jobId: 456,
      jobTitle: 'Data Analyst',
      employerName: 'Acme Co',
      locationName: 'London',
      jobUrl: 'https://www.reed.co.uk/jobs/456',
      jobDescription: 'Great role',
      minimumSalary: 28000,
      maximumSalary: 34000,
      fullTime: true,
      partTime: false,
      date: '10/06/2026',
    };

    expect(normalizeReedJob(raw)).toEqual({
      id: 'reed-456',
      title: 'Data Analyst',
      company: 'Acme Co',
      location: 'London',
      url: 'https://www.reed.co.uk/jobs/456',
      description: 'Great role',
      salaryMin: 28000,
      salaryMax: 34000,
      contractType: 'full_time',
      created: '2026-06-10',
      source: 'Reed',
    });
  });

  it('marks part-time roles correctly', () => {
    const result = normalizeReedJob({ fullTime: false, partTime: true });
    expect(result.contractType).toBe('part_time');
  });

  it('fills in sensible fallbacks for missing fields', () => {
    const result = normalizeReedJob({});
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

describe('fetchReedJobs', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns normalized results and count on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        totalResults: 1,
        results: [
          {
            jobId: 1,
            jobTitle: 'Data Analyst',
            employerName: 'Acme',
            locationName: 'London',
            jobUrl: 'https://www.reed.co.uk/jobs/1',
          },
        ],
      }),
    });

    const data = await fetchReedJobs({ apiKey: 'key' });

    expect(data.count).toBe(1);
    expect(data.results).toHaveLength(1);
    expect(data.results[0].title).toBe('Data Analyst');
    expect(data.results[0].source).toBe('Reed');
  });

  it('throws a descriptive error when the API responds with an error status', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'Invalid app key',
    });

    await expect(fetchReedJobs({ apiKey: 'key' })).rejects.toThrow(/Reed API error 401/);
  });
});

// Thin client for the Reed Jobseeker API (UK).
// Docs: https://www.reed.co.uk/developers/jobseeker

const BASE_URL = 'https://www.reed.co.uk/api/1.0/search';

// Reed returns dates as "DD/MM/YYYY"; convert to ISO "YYYY-MM-DD".
function parseReedDate(dateString) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(dateString || '');
  if (!match) return null;
  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

/**
 * Build the Reed search URL for a given page of results.
 * @param {object} options
 * @param {string} options.apiKey
 * @param {string} [options.what] - keywords, e.g. "data analyst"
 * @param {string} [options.where] - location, e.g. "London"
 * @param {number} [options.page=1]
 * @param {number} [options.resultsPerPage=10]
 * @returns {string}
 */
export function buildReedUrl({ apiKey, what, where, page = 1, resultsPerPage = 10 }) {
  if (!apiKey) {
    throw new Error('Reed API key is required');
  }

  const safePage = Math.max(1, Number(page) || 1);

  const params = new URLSearchParams({
    resultsToTake: String(resultsPerPage),
    resultsToSkip: String((safePage - 1) * resultsPerPage),
  });

  if (what) params.set('keywords', what);
  if (where) params.set('locationName', where);

  return `${BASE_URL}?${params.toString()}`;
}

/**
 * Convert a raw Reed job record into the shape used by the UI.
 * @param {object} raw
 */
export function normalizeReedJob(raw) {
  return {
    id: `reed-${raw.jobId ?? ''}`,
    title: raw.jobTitle || 'Untitled role',
    company: raw.employerName || 'Unknown company',
    location: raw.locationName || 'Location not specified',
    url: raw.jobUrl || '#',
    description: raw.jobDescription || '',
    salaryMin: typeof raw.minimumSalary === 'number' ? raw.minimumSalary : null,
    salaryMax: typeof raw.maximumSalary === 'number' ? raw.maximumSalary : null,
    contractType: raw.fullTime ? 'full_time' : raw.partTime ? 'part_time' : null,
    created: parseReedDate(raw.date),
    source: 'Reed',
  };
}

/**
 * Fetch and normalize a page of jobs from Reed.
 * Reed uses HTTP Basic Auth with the API key as the username and an empty password.
 * @param {object} options - same shape as buildReedUrl
 * @returns {Promise<{count: number, results: object[]}>}
 */
export async function fetchReedJobs(options) {
  const url = buildReedUrl(options);
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${options.apiKey}:`).toString('base64')}`,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Reed API error ${response.status}: ${body}`);
  }

  const data = await response.json();

  return {
    count: data.totalResults ?? 0,
    results: Array.isArray(data.results) ? data.results.map(normalizeReedJob) : [],
  };
}

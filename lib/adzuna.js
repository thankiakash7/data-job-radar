// Thin client for the Adzuna job search API (UK).
// Docs: https://developer.adzuna.com/overview

const BASE_URL = 'https://api.adzuna.com/v1/api/jobs/gb/search';

function stripHtml(value) {
  if (!value) return '';
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Build the Adzuna search URL for a given page of results.
 * @param {object} options
 * @param {string} options.appId
 * @param {string} options.appKey
 * @param {string} [options.what] - keywords, e.g. "data analyst"
 * @param {string} [options.where] - location, e.g. "London"
 * @param {number} [options.page=1]
 * @param {number} [options.resultsPerPage=20]
 * @param {number} [options.maxDaysOld=21]
 * @param {string} [options.sortBy='date']
 * @returns {string}
 */
export function buildAdzunaUrl({
  appId,
  appKey,
  what,
  where,
  page = 1,
  resultsPerPage = 20,
  maxDaysOld = 21,
  sortBy = 'date',
}) {
  if (!appId || !appKey) {
    throw new Error('Adzuna app ID and app key are required');
  }

  const safePage = Math.max(1, Number(page) || 1);

  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: String(resultsPerPage),
    'content-type': 'application/json',
    sort_by: sortBy,
    max_days_old: String(maxDaysOld),
  });

  if (what) params.set('what', what);
  if (where) params.set('where', where);

  return `${BASE_URL}/${safePage}?${params.toString()}`;
}

/**
 * Convert a raw Adzuna job record into the shape used by the UI.
 * @param {object} raw
 */
export function normalizeJob(raw) {
  return {
    id: String(raw.id ?? ''),
    title: stripHtml(raw.title) || 'Untitled role',
    company: raw.company?.display_name ?? 'Unknown company',
    location: raw.location?.display_name ?? 'Location not specified',
    url: raw.redirect_url ?? '#',
    description: stripHtml(raw.description),
    salaryMin: typeof raw.salary_min === 'number' ? raw.salary_min : null,
    salaryMax: typeof raw.salary_max === 'number' ? raw.salary_max : null,
    contractType: raw.contract_time ?? null,
    created: raw.created ?? null,
    source: 'Adzuna',
  };
}

/**
 * Fetch and normalize a page of jobs from Adzuna.
 * @param {object} options - same shape as buildAdzunaUrl
 * @returns {Promise<{count: number, results: object[]}>}
 */
export async function fetchAdzunaJobs(options) {
  const url = buildAdzunaUrl(options);
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Adzuna API error ${response.status}: ${body}`);
  }

  const data = await response.json();

  return {
    count: data.count ?? 0,
    results: Array.isArray(data.results) ? data.results.map(normalizeJob) : [],
  };
}

import { fetchAdzunaJobs } from '../../lib/adzuna';
import { fetchReedJobs } from '../../lib/reed';
import {
  findRolePreset,
  findLocationPreset,
  DEFAULT_ROLE_ID,
  DEFAULT_LOCATION_ID,
} from '../../lib/searchPresets';

// Each source contributes up to this many results per page, so a page of
// results is at most RESULTS_PER_SOURCE * number_of_sources.
const RESULTS_PER_SOURCE = 10;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  const reedApiKey = process.env.REED_API_KEY;

  if (!appId || !appKey) {
    return res.status(500).json({
      error:
        'Missing Adzuna API credentials. Set ADZUNA_APP_ID and ADZUNA_APP_KEY as environment variables.',
    });
  }

  const {
    role = DEFAULT_ROLE_ID,
    location = DEFAULT_LOCATION_ID,
    keywords = '',
    page = '1',
  } = req.query;

  const rolePreset = findRolePreset(role);
  const locationPreset = findLocationPreset(location);

  const trimmedKeywords = String(keywords).trim();
  const what = trimmedKeywords ? `${rolePreset.what} ${trimmedKeywords}` : rolePreset.what;

  try {
    const adzuna = await fetchAdzunaJobs({
      appId,
      appKey,
      what,
      where: locationPreset.where,
      page,
      resultsPerPage: RESULTS_PER_SOURCE,
      maxDaysOld: 21,
      sortBy: 'date',
    });

    // Reed is an optional second source: only query it if a key is configured,
    // and don't let a Reed-side problem take down the whole search.
    const reed = reedApiKey
      ? await fetchReedJobs({
          apiKey: reedApiKey,
          what,
          where: locationPreset.where,
          page,
          resultsPerPage: RESULTS_PER_SOURCE,
        }).catch(() => ({ count: 0, results: [] }))
      : { count: 0, results: [] };

    const data = {
      count: adzuna.count + reed.count,
      results: [...adzuna.results, ...reed.results],
    };

    // Cache for 10 minutes at the edge to stay well inside the free quotas.
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({ error: error.message });
  }
}

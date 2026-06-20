import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Filters from '../components/Filters';
import JobCard from '../components/JobCard';
import { DEFAULT_ROLE_ID, DEFAULT_LOCATION_ID } from '../lib/searchPresets';

const RESULTS_PER_PAGE = 20;

export default function Home() {
  const [role, setRole] = useState(DEFAULT_ROLE_ID);
  const [location, setLocation] = useState(DEFAULT_LOCATION_ID);
  const [keywords, setKeywords] = useState('');
  const [page, setPage] = useState(1);

  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function runSearch(searchPage = 1) {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      role,
      location,
      keywords,
      page: String(searchPage),
    });

    try {
      const response = await fetch(`/api/jobs?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong while fetching jobs.');
      }

      setJobs(data.results);
      setCount(data.count);
      setPage(searchPage);
    } catch (err) {
      setError(err.message);
      setJobs([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }

  // Run an initial search on first load.
  useEffect(() => {
    runSearch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.max(1, Math.ceil(count / RESULTS_PER_PAGE));

  return (
    <>
      <Head>
        <title>Data Job Radar — UK data roles for students</title>
      </Head>

      <Header />

      <main className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-200 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
              Live UK data job index
            </p>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
              Entry-level data analyst and data science roles, internships and graduate schemes
              across London, Brighton &amp; Hove and remote UK.
            </p>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          <Filters
            role={role}
            location={location}
            keywords={keywords}
            loading={loading}
            onChange={(changes) => {
              if ('role' in changes) setRole(changes.role);
              if ('location' in changes) setLocation(changes.location);
              if ('keywords' in changes) setKeywords(changes.keywords);
            }}
            onSubmit={() => runSearch(1)}
          />

          <div className="mt-6 font-mono text-xs uppercase tracking-wide text-gray-400">
            {loading
              ? 'Scanning…'
              : error
                ? 'Scan failed'
                : `${count.toLocaleString('en-GB')} role${count === 1 ? '' : 's'} found`}
          </div>

          {error && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id || job.url} job={job} />
            ))}
          </div>

          {!loading && !error && jobs.length === 0 && (
            <p className="mt-8 text-center text-sm text-gray-500">
              No roles matched that search. Try a different location or fewer extra keywords.
            </p>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-4 font-mono text-sm">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => runSearch(page - 1)}
                className="rounded border border-gray-200 px-3 py-1 text-gray-600 transition hover:border-gray-400 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => runSearch(page + 1)}
                className="rounded border border-gray-200 px-3 py-1 text-gray-600 transition hover:border-gray-400 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </section>

        <footer className="border-t border-gray-200 px-4 py-6 text-center font-mono text-xs text-gray-400 sm:px-8">
          Job data via{' '}
          <a
            href="https://www.adzuna.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline hover:text-gray-900"
          >
            Adzuna
          </a>{' '}
          and{' '}
          <a
            href="https://www.reed.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline hover:text-gray-900"
          >
            Reed
          </a>{' '}
          UK job indexes. Listings refresh every 10 minutes.
        </footer>
      </main>
    </>
  );
}

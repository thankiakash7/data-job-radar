function formatSalary(min, max) {
  if (!min && !max) return null;
  const fmt = (n) => `£${Math.round(n).toLocaleString('en-GB')}`;
  if (min && max && min !== max) return `${fmt(min)} – ${fmt(max)}`;
  return fmt(min || max);
}

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatContract(contractType) {
  if (contractType === 'full_time') return 'Full-time';
  if (contractType === 'part_time') return 'Part-time';
  return null;
}

export default function JobCard({ job }) {
  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const posted = formatDate(job.created);
  const contract = formatContract(job.contractType);

  return (
    <article className="rounded-lg border border-gray-200 p-5 transition hover:border-gray-400">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
        {posted && (
          <span className="font-mono text-xs uppercase tracking-wide text-gray-400">{posted}</span>
        )}
      </div>

      <p className="mt-1 text-sm text-gray-500">
        {job.company} &middot; {job.location}
      </p>

      {(salary || contract || job.source) && (
        <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
          {salary && (
            <span className="rounded border border-gray-300 px-2 py-1 text-gray-700">{salary}</span>
          )}
          {contract && (
            <span className="rounded border border-gray-200 px-2 py-1 text-gray-500">{contract}</span>
          )}
          {job.source && (
            <span className="rounded border border-gray-200 px-2 py-1 text-gray-400">{job.source}</span>
          )}
        </div>
      )}

      {job.description && (
        <p className="mt-3 line-clamp-3 text-sm text-gray-600">{job.description}</p>
      )}

      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
      >
        View &amp; apply
        <span aria-hidden="true">&rarr;</span>
      </a>
    </article>
  );
}

import { ROLE_PRESETS, LOCATION_PRESETS } from '../lib/searchPresets';

export default function Filters({ role, location, keywords, onChange, onSubmit, loading }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row sm:items-end sm:gap-3"
    >
      <label className="flex flex-1 flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wide text-gray-400">Role</span>
        <select
          value={role}
          onChange={(event) => onChange({ role: event.target.value })}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-gray-900 focus:outline-none"
        >
          {ROLE_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wide text-gray-400">Location</span>
        <select
          value={location}
          onChange={(event) => onChange({ location: event.target.value })}
          className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-gray-900 focus:outline-none"
        >
          {LOCATION_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-wide text-gray-400">
          Extra keywords (optional)
        </span>
        <input
          type="text"
          value={keywords}
          onChange={(event) => onChange({ keywords: event.target.value })}
          placeholder="e.g. SQL, Python, visa sponsorship"
          className="rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-gray-900 px-5 py-2 font-mono text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Scanning…' : 'Scan'}
      </button>
    </form>
  );
}

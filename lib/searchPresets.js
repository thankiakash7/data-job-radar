// Preset search terms. Edit these arrays to change what shows up in the
// dropdowns on the homepage and what gets sent to the Adzuna API.

export const ROLE_PRESETS = [
  {
    id: 'data-analyst',
    label: 'Data Analyst',
    what: 'data analyst',
  },
  {
    id: 'data-scientist',
    label: 'Data Scientist',
    what: 'data scientist',
  },
  {
    id: 'graduate-data',
    label: 'Graduate Scheme (Data)',
    what: 'graduate data',
  },
  {
    id: 'data-intern',
    label: 'Data Internship / Placement',
    what: 'data internship',
  },
  {
    id: 'entry-level-data',
    label: 'Entry Level Data Role',
    what: 'entry level data',
  },
];

export const LOCATION_PRESETS = [
  {
    id: 'london',
    label: 'London',
    where: 'London',
  },
  {
    id: 'brighton',
    label: 'Brighton & Hove',
    where: 'Brighton',
  },
  {
    id: 'remote',
    label: 'Remote (UK)',
    where: 'Remote',
  },
  {
    id: 'all-uk',
    label: 'All of UK',
    where: '',
  },
];

export const DEFAULT_ROLE_ID = ROLE_PRESETS[0].id;
export const DEFAULT_LOCATION_ID = LOCATION_PRESETS[3].id;

export function findRolePreset(id) {
  return ROLE_PRESETS.find((preset) => preset.id === id) ?? ROLE_PRESETS[0];
}

export function findLocationPreset(id) {
  return LOCATION_PRESETS.find((preset) => preset.id === id) ?? LOCATION_PRESETS[3];
}

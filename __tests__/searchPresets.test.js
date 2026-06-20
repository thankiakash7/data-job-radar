import { describe, it, expect } from 'vitest';
import {
  ROLE_PRESETS,
  LOCATION_PRESETS,
  findRolePreset,
  findLocationPreset,
  DEFAULT_ROLE_ID,
  DEFAULT_LOCATION_ID,
} from '../lib/searchPresets';

describe('searchPresets', () => {
  it('has at least one role and location preset', () => {
    expect(ROLE_PRESETS.length).toBeGreaterThan(0);
    expect(LOCATION_PRESETS.length).toBeGreaterThan(0);
  });

  it('default ids point to real presets', () => {
    expect(ROLE_PRESETS.some((p) => p.id === DEFAULT_ROLE_ID)).toBe(true);
    expect(LOCATION_PRESETS.some((p) => p.id === DEFAULT_LOCATION_ID)).toBe(true);
  });

  it('findRolePreset returns a matching preset', () => {
    const preset = findRolePreset('graduate-data');
    expect(preset.what).toBe('graduate data');
  });

  it('findRolePreset falls back to the first preset for unknown ids', () => {
    expect(findRolePreset('does-not-exist')).toEqual(ROLE_PRESETS[0]);
  });

  it('findLocationPreset returns a matching preset', () => {
    const preset = findLocationPreset('brighton');
    expect(preset.where).toBe('Brighton');
  });

  it('findLocationPreset falls back to "All of UK" for unknown ids', () => {
    expect(findLocationPreset('nowhere')).toEqual(LOCATION_PRESETS[3]);
  });

  it('"All of UK" preset has an empty "where" so it does not filter location', () => {
    const allUk = findLocationPreset('all-uk');
    expect(allUk.where).toBe('');
  });
});

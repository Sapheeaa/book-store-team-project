import { describe, expect, it } from 'vitest';
import { parseHash } from '@/app/routes';

describe('parseHash', () => {
  it('returns the root when the hash is empty', () => {
    expect(parseHash('')).toBe('/');
  });

  it('returns catalog when the hash="#/catalog"', () => {
    expect(parseHash('#/catalog')).toBe('/catalog');
  });

  it('returns the root when hash is unknown', () => {
    expect(parseHash('#/unknown')).toBe('/');
  });
});

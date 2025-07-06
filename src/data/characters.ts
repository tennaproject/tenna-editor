import type { BaseProperties } from '../types';

export const CHARACTERS = {
  EMPTY: 0,
  KRIS: 1,
  SUSIE: 2,
  RALSEI: 3,
  NOELLE: 4,
} as const;

export type CharacterIndex = (typeof CHARACTERS)[keyof typeof CHARACTERS];
export type CharacterName = keyof typeof CHARACTERS;

export const CHARACTERS_META: Record<CharacterIndex, BaseProperties> = {
  [CHARACTERS.EMPTY]: {
    displayName: 'Empty',
  },
  [CHARACTERS.KRIS]: {
    displayName: 'Kris',
  },
  [CHARACTERS.SUSIE]: {
    displayName: 'Susie',
  },
  [CHARACTERS.RALSEI]: {
    displayName: 'Ralsei',
  },
  [CHARACTERS.NOELLE]: {
    displayName: 'Noelle',
  },
};

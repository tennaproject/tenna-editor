import type { BaseProperties } from '../types';
import { CHARACTERS, type CharacterIndex } from './characters';

export const SPELLS = {
  EMPTY: 0,
  RUDE_SWORD: 1,
  HEAL_PRAYER: 2,
  PACIFY: 3,
  RUDE_BUSTER: 4,
  RED_BUSTER: 5,
  DUAL_HEAL: 6,
  ACT: 7,
  SLEEPMIST: 8,
  ICESHOCK: 9,
  SNOWGRAVE: 10,
  SUSIE_HEAL: 11, // this one has different name every chapter
} as const;

export type SpellIndex = (typeof SPELLS)[keyof typeof SPELLS];
export type SpellName = keyof typeof SPELLS;

interface SpellProperties extends BaseProperties {
  usableBy: Set<CharacterIndex>;
}

export const SPELLS_META: Record<SpellIndex, SpellProperties> = {
  [SPELLS.EMPTY]: {
    displayName: 'Empty',
    usableBy: new Set<CharacterIndex>([
      CHARACTERS.KRIS,
      CHARACTERS.SUSIE,
      CHARACTERS.RALSEI,
      CHARACTERS.NOELLE,
    ]),
  },
  [SPELLS.RUDE_SWORD]: {
    displayName: 'Rude Sword',
    usableBy: new Set<CharacterIndex>(),
    unused: true,
  },
  [SPELLS.HEAL_PRAYER]: {
    displayName: 'Heal Prayer',
    usableBy: new Set<CharacterIndex>([CHARACTERS.RALSEI, CHARACTERS.NOELLE]),
  },
  [SPELLS.PACIFY]: {
    displayName: 'Pacify',
    usableBy: new Set<CharacterIndex>([CHARACTERS.RALSEI]),
  },
  [SPELLS.RUDE_BUSTER]: {
    displayName: 'Rude Buster',
    usableBy: new Set<CharacterIndex>([CHARACTERS.SUSIE]),
  },
  [SPELLS.RED_BUSTER]: {
    displayName: 'Red Buster',
    usableBy: new Set<CharacterIndex>([CHARACTERS.SUSIE]),
  },
  [SPELLS.DUAL_HEAL]: {
    displayName: 'Dual Heal',
    usableBy: new Set<CharacterIndex>([CHARACTERS.RALSEI]),
  },
  [SPELLS.ACT]: {
    displayName: 'ACT',
    usableBy: new Set<CharacterIndex>(),
  },
  [SPELLS.SLEEPMIST]: {
    displayName: 'Sleep Mist',
    usableBy: new Set<CharacterIndex>([CHARACTERS.NOELLE]),
  },
  [SPELLS.ICESHOCK]: {
    displayName: 'IceShock',
    usableBy: new Set<CharacterIndex>([CHARACTERS.NOELLE]),
  },
  [SPELLS.SNOWGRAVE]: {
    displayName: 'SnowGrave',
    usableBy: new Set<CharacterIndex>([CHARACTERS.NOELLE]),
  },
  [SPELLS.SUSIE_HEAL]: {
    displayName: 'Ultimate Heal', // name overrides needed here
    usableBy: new Set<CharacterIndex>([CHARACTERS.SUSIE]),
  },
};

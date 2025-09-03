import type { BaseProperties } from '@types';

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

type SpellProperties = BaseProperties;

export const SPELLS_META: Record<SpellIndex, SpellProperties> = {
  [SPELLS.EMPTY]: {
    displayName: 'Empty',
  },
  [SPELLS.RUDE_SWORD]: {
    displayName: 'Rude Sword',
    unused: true,
  },
  [SPELLS.HEAL_PRAYER]: {
    displayName: 'Heal Prayer',
  },
  [SPELLS.PACIFY]: {
    displayName: 'Pacify',
  },
  [SPELLS.RUDE_BUSTER]: {
    displayName: 'Rude Buster',
  },
  [SPELLS.RED_BUSTER]: {
    displayName: 'Red Buster',
  },
  [SPELLS.DUAL_HEAL]: {
    displayName: 'Dual Heal',
  },
  [SPELLS.ACT]: {
    displayName: 'ACT',
  },
  [SPELLS.SLEEPMIST]: {
    displayName: 'Sleep Mist',
  },
  [SPELLS.ICESHOCK]: {
    displayName: 'IceShock',
  },
  [SPELLS.SNOWGRAVE]: {
    displayName: 'SnowGrave',
  },
  [SPELLS.SUSIE_HEAL]: {
    displayName: 'Ultimate Heal', // name overrides needed here
  },
};

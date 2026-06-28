import type { BaseProperties, WithOverrides } from '@types';
import { FLAGS } from './flags';
import type { ChapterIndex } from './chapters';

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
  SUSIE_HEAL: 11,
  REVIVE_SONG: 12,
  SCYTHEMARE: 13,
} as const;

export type SpellIndex = (typeof SPELLS)[keyof typeof SPELLS];
export type SpellName = keyof typeof SPELLS;

interface SpellOverrideInputs {
  chapter: ChapterIndex;
  plot: number;
  flags: readonly unknown[];
}

interface SpellProperties
  extends BaseProperties,
    WithOverrides<SpellProperties, SpellOverrideInputs> {}

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
    displayName: 'UltimatHeal',
    getOverrides: ({ chapter, plot, flags }) => {
      if (
        chapter >= 4 &&
        (Number(flags[FLAGS.SUSIE_LEARNED_BETTER_HEAL]) ||
          Number(flags[FLAGS.DEFEATED_HAMMER_OF_JUSTICE]))
      ) {
        return { displayName: 'BetterHeal' };
      }

      if (
        chapter === 4 &&
        plot >= 110 &&
        Number(flags[FLAGS.JACKENSTEIN_CUTSCENE_PROGRESS]) < 6
      ) {
        return { displayName: 'Heal' };
      }

      if (chapter >= 4) {
        return { displayName: 'OKHeal' };
      }

      if (chapter >= 3) {
        return { displayName: 'UltraHeal' };
      }

      return {};
    },
  },
  [SPELLS.REVIVE_SONG]: {
    displayName: 'ReviveSong',
  },
  [SPELLS.SCYTHEMARE]: {
    displayName: 'Scythemare',
  },
};

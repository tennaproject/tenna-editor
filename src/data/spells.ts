import type { BaseProperties, WithOverrides } from '@types';
import { FLAGS } from './flags';
import type { ChapterIndex } from './chapters';
import { ARMORS, type ArmorIndex } from './armors';
import { WEAPONS, type WeaponIndex } from './weapons';

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
  weapon: WeaponIndex;
  armors: readonly ArmorIndex[]; // Both armor slots
}

interface SpellProperties
  extends BaseProperties, WithOverrides<SpellProperties, SpellOverrideInputs> {
  tpCost?: number;
}

const susieHealPractice = (flags: readonly unknown[]) =>
  Math.min(
    Math.max(Number(flags[FLAGS.SUSIE_HEAL_PRACTICE_COUNT]) || 0, 0),
    15,
  );

const ULTRA_HEAL_TP_COSTS = [
  90, 89, 88, 86, 86, 85, 84, 82, 82, 81, 80, 78, 78, 77, 76, 74,
] as const;

export const SPELLS_META: Record<SpellIndex, SpellProperties> = {
  [SPELLS.EMPTY]: {
    displayName: 'Empty',
  },
  [SPELLS.RUDE_SWORD]: {
    displayName: 'Rude Sword',
    description:
      'Deals moderate Rude-elemental damage to\none foe. Depends on Attack & Magic.',
    tpCost: 50,
    unused: true,
  },
  [SPELLS.HEAL_PRAYER]: {
    displayName: 'Heal Prayer',
    description:
      'Heavenly light restores a little HP to\none party member. Depends on Magic.',
    tpCost: 32,
  },
  [SPELLS.PACIFY]: {
    displayName: 'Pacify',
    description: 'SPARE a tired enemy by putting them to sleep.',
    tpCost: 16,
    getOverrides: ({ weapon }) => {
      if (weapon === WEAPONS.BLUE_SHOES) {
        return { tpCost: 0 };
      }

      return {};
    },
  },
  [SPELLS.RUDE_BUSTER]: {
    displayName: 'Rude Buster',
    description:
      'Deals moderate Rude-elemental damage to\none foe. Depends on Attack & Magic.',
    tpCost: 50,
    getOverrides: ({ weapon }) => {
      if (weapon === WEAPONS.DEVILSKNIFE) {
        return { tpCost: 40 };
      }

      return {};
    },
  },
  [SPELLS.RED_BUSTER]: {
    displayName: 'RedBuster',
    description: 'Red Damage',
    tpCost: 60,
  },
  [SPELLS.DUAL_HEAL]: {
    displayName: 'DualHeal',
    description: 'Heals everyone',
    tpCost: 50,
    getOverrides: ({ chapter }) => {
      if (chapter >= 4) {
        return {
          description: 'Heal party',
          tpCost: 16,
        };
      }

      return {};
    },
  },
  [SPELLS.ACT]: {
    displayName: 'ACT',
    description: "Do all sorts of things.\nIt isn't magic.",
    tpCost: 0,
    getOverrides: ({ chapter }) => {
      if (chapter === 2) {
        return {
          description: "You can do many things.\nDon't confuse it with magic.",
        };
      } else if (chapter === 3) {
        return {
          description:
            'Many different skills.\nIt has nothing to do with magic.',
        };
      } else if (chapter === 4) {
        return {
          description:
            "Execute various behaviors.\nIt can't be considered magic.",
        };
      } else if (chapter === 5) {
        return {
          description: "It's not magic, is it?\nNo, not something like this.",
        };
      }

      return {};
    },
  },
  [SPELLS.SLEEPMIST]: {
    displayName: 'Sleep Mist',
    description: 'A cold mist sweeps through,\nsparing all TIRED enemies.',
    tpCost: 32,
  },
  [SPELLS.ICESHOCK]: {
    displayName: 'IceShock',
    description: 'Deals magical ICE damage to\none enemy.',
    tpCost: 16,
    getOverrides: ({ weapon }) => {
      if (weapon === WEAPONS.THORN_RING) {
        return { tpCost: 8 };
      }

      return {};
    },
  },
  [SPELLS.SNOWGRAVE]: {
    displayName: 'SnowGrave',
    description: 'Deals the fatal damage to\nall of the enemies.',
    tpCost: 200,
    getOverrides: ({ weapon }) => {
      if (weapon === WEAPONS.THORN_RING) {
        return { tpCost: 100 };
      }

      return {};
    },
  },
  [SPELLS.SUSIE_HEAL]: {
    displayName: 'UltimatHeal',
    description: "Heals 1 party member to the\nbest of Susie's ability.",
    tpCost: 100,
    getOverrides: ({ chapter, plot, flags }) => {
      const practice = susieHealPractice(flags);

      if (
        chapter >= 4 &&
        (Number(flags[FLAGS.SUSIE_LEARNED_BETTER_HEAL]) ||
          Number(flags[FLAGS.DEFEATED_HAMMER_OF_JUSTICE]))
      ) {
        return {
          displayName: 'BetterHeal',
          description:
            'A healing spell that has grown\nwith practice and confidence.',
          tpCost: 80 - Math.ceil(practice / 3),
        };
      }

      if (
        chapter === 4 &&
        plot >= 110 &&
        Number(flags[FLAGS.JACKENSTEIN_CUTSCENE_PROGRESS]) < 6
      ) {
        return {
          displayName: 'Heal',
          description: "It seems the user doesn't\nwant to use this spell.",
          tpCost: 102,
        };
      }

      if (chapter >= 4) {
        return {
          displayName: 'OKHeal',
          description:
            "It's not the best healing spell, but\nit may have its uses.",
          tpCost: 85 - Math.ceil(practice / 3),
        };
      }

      if (chapter >= 3) {
        return {
          displayName: 'UltraHeal',
          description: 'An awesome healing spell.\n... right?',
          tpCost: ULTRA_HEAL_TP_COSTS[practice],
        };
      }

      return {};
    },
  },
  [SPELLS.REVIVE_SONG]: {
    displayName: 'ReviveSong',
    description:
      'Revives a DOWNed ally and heals them.\nOtherwise, heals a lot of HP.',
    tpCost: 84,
  },
  [SPELLS.SCYTHEMARE]: {
    displayName: 'Scythemare',
    description:
      'Inflicts all enemies with bad dreams.\nAll TIRED enemies will be SPAREd.',
    tpCost: 40,
    getOverrides: ({ armors }) => {
      if (armors.includes(ARMORS.O_GLOVE)) {
        return { tpCost: 20 };
      }

      return {};
    },
  },
};

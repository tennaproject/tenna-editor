import type { BaseProperties } from '@types';
import type { WithOverrides } from '@types';
import type { ChapterIndex } from './chapters';
import { FLAGS, type FlagIndex } from './flags';

export const ENEMIES = {
  DEBUG: 1,
  LANCER_1: 2,
  DUMMY: 3,
  RALSEI_TUTORIAL: 4,
  RUDINN: 5,
  HATHY: 6,
  CLOVER_1: 7,
  C_ROUND: 9,
  K_ROUND_1: 10,
  PONMAN: 11,
  LANCER_2: 12,
  RABBICK: 13,
  BLOXER: 14,
  JIGSAWRY: 15,
  CLOVER_2: 16,
  DOOMTANK: 17,
  LANCER_3: 18,
  SUSIE_AND_LANCER: 19,
  JEVIL: 20,
  K_ROUND_2: 21,
  RUDINN_RANGER: 22,
  HEAD_HATHY: 23,
  KING: 25,
  AMBYU_LANCE: 30,
  POPPUP: 31,
  TASQUE: 32,
  WEREWIRE: 33,
  MAUS: 34,
  VIROVIROKUN: 35,
  SWATCHLING: 36,
  CAPN: 37,
  K_K: 38,
  SWEET: 39,
  WEREWEREWIRE: 40,
  GRAZETEST: 41,
  TASQUE_MANAGER: 42,
  BERDLY_1: 43,
  MAUSWHEEL: 44,
  ROUXLS_1: 45,
  BERDLY_2: 46,
  CLOVER_DOJO: 47,
  QUEEN: 48,
  SPAMTON: 49,
  SPAMTON_NEO: 50,
  GIGA_QUEEN: 51,
  JIGSAW_JOE_DOJO: 52,
  PIPIS: 53,
  SHADOWGUY: 54,
  SHUTTAH: 55,
  ZAPPER: 56,
  RIBBICK: 57,
  WATERCOOLER: 58,
  PIPPINS: 59,
  ELNINA: 60,
  LANINO: 61,
  GUEI: 62,
  BALTHIZARD: 63,
  BIBLIOX: 64,
  MIZZLE: 65,
  WICABEL: 66,
  WINGLADE: 67,
  ORGANIKK: 68,
  MISS_MIZZLE: 69,

  BOSS_1: 101,
  BOSS_2: 102,
  BOSS_3: 103,
  BOSS_4: 104,
  BOSS_5: 105,
  BOSS_6: 106,
  BOSS_7: 107,
  BOSS_8: 108,
  BOSS_9: 109,
  BOSS_10: 110,
  BOSS_11: 111,
};

export type EnemyIndex = (typeof ENEMIES)[keyof typeof ENEMIES];
export type EnemyName = keyof typeof ENEMIES;

interface EnemyProperties
  extends BaseProperties,
    WithOverrides<EnemyProperties, { chapter: ChapterIndex }> {
  recruitable: boolean;
  recruitCount?: number;
  recruitFlag?: FlagIndex;
}

export const ENEMIES_META: Record<EnemyIndex, EnemyProperties> = {
  [ENEMIES.DEBUG]: {
    displayName: 'Debug Enemy',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_DEBUG,
  },
  [ENEMIES.LANCER_1]: {
    displayName: 'Lancer 1',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_LANCER_1,
  },
  [ENEMIES.DUMMY]: {
    displayName: 'Dummy',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_LANCER_2,
  },
  [ENEMIES.RALSEI_TUTORIAL]: {
    displayName: 'Ralsei (tutorial)',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_RALSEI_TUTORIAL,
  },
  [ENEMIES.RUDINN]: {
    displayName: 'Rudinn',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_RUDINN,
    recruitCount: 1,
  },
  [ENEMIES.HATHY]: {
    displayName: 'Hathy',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_HATHY,
    recruitCount: 1,
  },
  [ENEMIES.CLOVER_1]: {
    displayName: 'Clover 1',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_CLOVER_1,
  },
  [ENEMIES.C_ROUND]: {
    displayName: 'C. Round',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_C_ROUND,
  },
  [ENEMIES.K_ROUND_1]: {
    displayName: 'K. Round 1',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_K_ROUND_1,
  },
  [ENEMIES.PONMAN]: {
    displayName: 'Ponman',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_PONMAN,
    recruitCount: 1,
  },
  [ENEMIES.LANCER_2]: {
    displayName: 'Lancer 2',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_LANCER_2,
  },
  [ENEMIES.RABBICK]: {
    displayName: 'Rabbick',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_RABBICK,
    recruitCount: 1,
  },
  [ENEMIES.BLOXER]: {
    displayName: 'Bloxer',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_BLOXER,
    recruitCount: 1,
  },
  [ENEMIES.JIGSAWRY]: {
    displayName: 'Jigsawry',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_JIGSAWRY,
    recruitCount: 1,
  },
  [ENEMIES.CLOVER_2]: {
    displayName: 'Clover 2',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_CLOVER_2,
  },
  [ENEMIES.DOOMTANK]: {
    displayName: 'DoomTank',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_DOOMTANK,
  },
  [ENEMIES.LANCER_3]: {
    displayName: 'Lancer 3',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_LANCER_3,
  },
  [ENEMIES.SUSIE_AND_LANCER]: {
    displayName: 'Susie&Lancer',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_SUSIE_AND_LANCER,
  },
  [ENEMIES.JEVIL]: {
    displayName: 'JEVIL',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_JEVIL,
  },
  [ENEMIES.K_ROUND_2]: {
    displayName: 'K. Round 2',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_K_ROUND_2,
  },
  [ENEMIES.RUDINN_RANGER]: {
    displayName: 'Rudinn Ranger',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_RUDINN_RANGER,
    recruitCount: 1,
  },
  [ENEMIES.HEAD_HATHY]: {
    displayName: 'Head Hathy',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_HEAD_HATHY,
    recruitCount: 1,
  },
  [ENEMIES.KING]: {
    displayName: 'King',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_KING,
  },
  [ENEMIES.AMBYU_LANCE]: {
    displayName: 'Ambyu-Lance',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_AMBYU_LANCE,
    recruitCount: 4,
  },
  [ENEMIES.POPPUP]: {
    displayName: 'Poppup',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_POPPUP,
    recruitCount: 3,
  },
  [ENEMIES.TASQUE]: {
    displayName: 'Tasque',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_TASQUE,
    recruitCount: 5,
  },
  [ENEMIES.WEREWIRE]: {
    displayName: 'Werewire',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_WEREWIRE,
    recruitCount: 6,
  },
  [ENEMIES.MAUS]: {
    displayName: 'Maus',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_MAUS,
    recruitCount: 3,
  },
  [ENEMIES.VIROVIROKUN]: {
    displayName: 'Virovirokun',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_VIROVIROKUN,
    recruitCount: 4,
  },
  [ENEMIES.SWATCHLING]: {
    displayName: 'Swatchling',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_SWATCHLING,
    recruitCount: 5,
  },
  [ENEMIES.CAPN]: {
    displayName: "Cap'n",
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_CAPN,
  },
  [ENEMIES.K_K]: {
    displayName: 'K_K',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_K_K,
  },
  [ENEMIES.SWEET]: {
    displayName: 'Sweet',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_SWEET,
  },
  [ENEMIES.WEREWEREWIRE]: {
    displayName: 'Werewerewire',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_WEREWEREWIRE,
    recruitCount: 1,
  },
  [ENEMIES.GRAZETEST]: {
    displayName: 'GrazeTest',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_GRAZETEST,
  },
  [ENEMIES.TASQUE_MANAGER]: {
    displayName: 'Tasque Manager',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_TASQUE_MANAGER,
    recruitCount: 1,
  },
  [ENEMIES.BERDLY_1]: {
    displayName: 'Berdly 1',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_BERDLY_1,
  },
  [ENEMIES.MAUSWHEEL]: {
    displayName: 'Mauswheel',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_MAUSWHEEL,
    recruitCount: 1,
  },
  [ENEMIES.ROUXLS_1]: {
    displayName: 'Rouxls 1',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_ROUXLS_1,
  },
  [ENEMIES.BERDLY_2]: {
    displayName: 'Berdly 2',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_BERDLY_2,
  },
  [ENEMIES.CLOVER_DOJO]: {
    displayName: 'Clover (dojo)',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_CLOVER_DOJO,
  },
  [ENEMIES.QUEEN]: {
    displayName: 'Queen',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_QUEEN,
  },
  [ENEMIES.SPAMTON]: {
    displayName: 'Spamton',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_SPAMTON,
  },
  [ENEMIES.SPAMTON_NEO]: {
    displayName: 'Spamton NEO',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_SPAMTON,
  },
  [ENEMIES.GIGA_QUEEN]: {
    displayName: 'GIGA Queen',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_GIGA_QUEEN,
  },
  [ENEMIES.JIGSAW_JOE_DOJO]: {
    displayName: 'Jigsaw Joe (dojo)',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_JIGSAW_JOE_DOJO,
  },
  [ENEMIES.PIPIS]: {
    displayName: 'Pipis',
    recruitable: false,
    recruitFlag: FLAGS.RECRUIT_PIPIS,
  },
  [ENEMIES.SHADOWGUY]: {
    displayName: 'Shadowguy',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_SHADOWGUY,
    recruitCount: 25,
  },
  [ENEMIES.SHUTTAH]: {
    displayName: 'Shuttah',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_SHUTTAH,
    recruitCount: 2,
  },
  [ENEMIES.ZAPPER]: {
    displayName: 'Zapper',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_ZAPPER,
    recruitCount: 2,
  },
  [ENEMIES.RIBBICK]: {
    displayName: 'Ribbick',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_RIBBICK,
    recruitCount: 3,
  },
  [ENEMIES.WATERCOOLER]: {
    displayName: 'Watercooler',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_WATERCOOLER,
    recruitCount: 1,
  },
  [ENEMIES.PIPPINS]: {
    displayName: 'Pippins',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_PIPPINS,
    recruitCount: 5,
  },
  [ENEMIES.ELNINA]: {
    displayName: 'Elnina',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_ELNINA,
    recruitCount: 1,
  },
  [ENEMIES.LANINO]: {
    displayName: 'Lanino',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_LANINO,
    recruitCount: 1,
  },
  [ENEMIES.GUEI]: {
    displayName: 'Guei',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_GUEI,
    recruitCount: 3,
  },
  [ENEMIES.BALTHIZARD]: {
    displayName: 'Balthizard',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_BALTHIZARD,
    recruitCount: 5,
  },
  [ENEMIES.BIBLIOX]: {
    displayName: 'Bibliox',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_BIBLIOX,
    recruitCount: 3,
  },
  [ENEMIES.MIZZLE]: {
    displayName: 'Mizzle',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_MIZZLE,
    recruitCount: 2,
  },
  [ENEMIES.WICABEL]: {
    displayName: 'Wicabel',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_WICABEL,
    recruitCount: 2,
  },
  [ENEMIES.WINGLADE]: {
    displayName: 'Winglade',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_WINGLADE,
    recruitCount: 2,
  },
  [ENEMIES.ORGANIKK]: {
    displayName: 'Organikk',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_ORGANIKK,
    recruitCount: 3,
  },
  [ENEMIES.MISS_MIZZLE]: {
    displayName: 'Miss Mizzle',
    recruitable: true,
    recruitFlag: FLAGS.RECRUIT_MISS_MIZZLE,
    recruitCount: 1,
  },

  // Special category for bosses/non-recruits (inconsistent between chapters 3 and 4)
  [ENEMIES.BOSS_1]: { displayName: 'Boss 1', recruitable: false },
  [ENEMIES.BOSS_2]: { displayName: 'Rouxls 2', recruitable: false },
  [ENEMIES.BOSS_3]: { displayName: 'Tenna 1', recruitable: false },
  [ENEMIES.BOSS_4]: { displayName: 'Knight', recruitable: false },
  [ENEMIES.BOSS_5]: {
    displayName: 'Tenna 2',
    recruitable: false,
    getOverrides: ({ chapter }) => {
      if (chapter === 4) {
        return {
          displayName: 'Hammer of Justice',
          description: 'Known as "Hammer of Justice" in Chapter 4.',
        };
      }
      return {};
    },
  },
  [ENEMIES.BOSS_6]: {
    displayName: 'Elnina (dojo)',
    recruitable: false,
    getOverrides: ({ chapter }) => {
      if (chapter === 4) {
        return {
          displayName: 'Sound of Justice',
        };
      }
      return {};
    },
  },
  [ENEMIES.BOSS_7]: {
    displayName: 'Lanino (dojo)',
    recruitable: false,
    getOverrides: ({ chapter }) => {
      if (chapter === 4) {
        return {
          displayName: 'Jackenstein',
        };
      }
      return {};
    },
  },
  [ENEMIES.BOSS_8]: { displayName: 'Titan', recruitable: false },
  [ENEMIES.BOSS_9]: { displayName: 'Titan Spawn', recruitable: false },
  [ENEMIES.BOSS_10]: { displayName: 'Elnina 2 (dojo)', recruitable: false },
  [ENEMIES.BOSS_11]: { displayName: 'Lanino 2 (dojo)', recruitable: false },
};

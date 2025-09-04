import type { BaseProperties } from '@types';

export const FLAGS = {
  SIMPLIFY_VFX: 8,
  STORAGE_SIZE: 64,
  GOT_MOSS_CH1: 106,
  INSPECTED_BEDS_CH1: 252,
  RALSEI_PHOTO_STATUS: 325,
  INSPECTED_BED_KRIS: 409,
  INSPECTED_BED_SUSIE: 410,
  INSPECTED_BED_LANCER: 411,
  INSPECTED_BED_CLOVER: 412,
  INSPECTED_BED_NOELLE: 413,
  INSPECTED_BEDS_CH2: 414,

  // Recruits
  RECRUIT_DEBUG: 601,
  RECRUIT_LANCER_1: 602,
  RECRUIT_DUMMY: 603,
  RECRUIT_RALSEI_TUTORIAL: 604,
  RECRUIT_RUDINN: 605,
  RECRUIT_HATHY: 606,
  RECRUIT_CLOVER_1: 607,
  RECRUIT_C_ROUND: 609,
  RECRUIT_K_ROUND_1: 610,
  RECRUIT_PONMAN: 611,
  RECRUIT_LANCER_2: 612,
  RECRUIT_RABBICK: 613,
  RECRUIT_BLOXER: 614,
  RECRUIT_JIGSAWRY: 615,
  RECRUIT_CLOVER_2: 616,
  RECRUIT_DOOMTANK: 617,
  RECRUIT_LANCER_3: 618,
  RECRUIT_SUSIE_AND_LANCER: 619,
  RECRUIT_JEVIL: 620,
  RECRUIT_K_ROUND_2: 621,
  RECRUIT_RUDINN_RANGER: 622,
  RECRUIT_HEAD_HATHY: 623,
  RECRUIT_KING: 625,
  RECRUIT_AMBYU_LANCE: 630,
  RECRUIT_POPPUP: 631,
  RECRUIT_TASQUE: 632,
  RECRUIT_WEREWIRE: 633,
  RECRUIT_MAUS: 634,
  RECRUIT_VIROVIROKUN: 635,
  RECRUIT_SWATCHLING: 636,
  RECRUIT_CAPN: 637,
  RECRUIT_K_K: 638,
  RECRUIT_SWEET: 639,
  RECRUIT_WEREWEREWIRE: 640,
  RECRUIT_GRAZETEST: 641,
  RECRUIT_TASQUE_MANAGER: 642,
  RECRUIT_BERDLY_1: 643,
  RECRUIT_MAUSWHEEL: 644,
  RECRUIT_ROUXLS_1: 645,
  RECRUIT_BERDLY_2: 646,
  RECRUIT_CLOVER_DOJO: 647,
  RECRUIT_QUEEN: 648,
  RECRUIT_SPAMTON: 649,
  RECRUIT_SPAMTON_NEO: 650,
  RECRUIT_GIGA_QUEEN: 651,
  RECRUIT_JIGSAW_JOE_DOJO: 652,
  RECRUIT_PIPIS: 653,
  RECRUIT_SHADOWGUY: 654,
  RECRUIT_SHUTTAH: 655,
  RECRUIT_ZAPPER: 656,
  RECRUIT_RIBBICK: 657,
  RECRUIT_WATERCOOLER: 658,
  RECRUIT_PIPPINS: 659,
  RECRUIT_ELNINA: 660,
  RECRUIT_LANINO: 661,
  RECRUIT_GUEI: 662,
  RECRUIT_BALTHIZARD: 663,
  RECRUIT_BIBLIOX: 664,
  RECRUIT_MIZZLE: 665,
  RECRUIT_WICABEL: 666,
  RECRUIT_WINGLADE: 667,
  RECRUIT_ORGANIKK: 668,
  RECRUIT_MISS_MIZZLE: 669,

  AXE_OF_JUSTICE_PROGRESS: 852,
  SINCE_CHAPTER: 914,
  WEIRDROUTE_PROGRESS_CH2: 915,
  WEIRDROUTE_FAILED: 916,
  GOT_MOSS_CH2: 920,
  GOT_MOSS_WITH_NOELLE: 921,
  GOT_MOSS_WITH_SUSIE: 922,
  NOELLE_ICE_SHOCK_COUNT: 925,
  GAMESHOW_LETTER_FIRST: 1012,
  GAMESHOW_LETTER_SECOND: 1013,
  GAMESHOW_LETTER_THIRD: 1014,
  CH3_POINTS: 1044,
  SWORD_PROGRESS: 1055,
  GOT_MOSS_CH3: 1078,
  RALSEI_HORSE: 1152,
  GOT_MOSS_CH4: 1592,
} as const;

export type FlagIndex = (typeof FLAGS)[keyof typeof FLAGS];
export type FlagName = keyof typeof FLAGS;

export type FlagValueType = 'boolean' | 'number' | 'map';

export interface FlagProperties extends BaseProperties {
  valueType?: FlagValueType;
  valueRules?: {
    min?: number;
    max?: number;
    allowedValues?: number[];
    map?: Record<number, string>;
  };
}

// temp
const letterMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
  8: 'I',
  9: 'J',
  10: 'K',
  11: 'L',
  12: 'M',
  13: 'N',
  14: 'O',
  15: 'P',
  16: 'Q',
  17: 'R',
  18: 'S',
  19: 'T',
  20: 'U',
  21: 'V',
  22: 'W',
  23: 'X',
  24: 'Y',
  25: 'Z',
};

export const FLAGS_META: Record<FlagIndex, FlagProperties> = {
  [FLAGS.SIMPLIFY_VFX]: {
    valueType: 'boolean',
    displayName: 'Simplify VFX',
    description: `
     As the name suggests it turning this on simplifies some of the VFX in game.`,
  },
  [FLAGS.STORAGE_SIZE]: {
    displayName: 'Storage size',
    description: `
    The number of slots in the storage.
    `,
  },
  [FLAGS.GOT_MOSS_CH1]: {
    displayName: 'Got Moss in Chapter 1',
  },
  [FLAGS.RALSEI_PHOTO_STATUS]: {
    displayName:
      'Action taken when taking photo with Ralsei at end of Acid Tunnel',
  },
  [FLAGS.INSPECTED_BEDS_CH1]: {
    valueType: 'boolean',
    displayName: 'Inspected beds in Chapter 1',
  },
  [FLAGS.INSPECTED_BED_KRIS]: {
    displayName: `Inspected Kris's bed in Chapter 2`,
  },
  [FLAGS.INSPECTED_BED_SUSIE]: {
    displayName: `Inspected Susie's bed in Chapter 2`,
  },
  [FLAGS.INSPECTED_BED_LANCER]: {
    displayName: `Inspected Lancer's bed in Chapter 2`,
  },
  [FLAGS.INSPECTED_BED_CLOVER]: {
    displayName: `Inspected Clover's bed in Chapter 2`,
  },
  [FLAGS.INSPECTED_BED_NOELLE]: {
    displayName: `Inspected Noelle's bed in Chapter 2`,
  },
  [FLAGS.INSPECTED_BEDS_CH2]: {
    displayName: 'Inspected beds in Chapter 2',
  },

  // Recruits
  [FLAGS.RECRUIT_DEBUG]: { displayName: 'RECRUIT_DEBUG' },
  [FLAGS.RECRUIT_LANCER_1]: { displayName: 'RECRUIT_LANCER_1' },
  [FLAGS.RECRUIT_DUMMY]: { displayName: 'RECRUIT_DUMMY' },
  [FLAGS.RECRUIT_RALSEI_TUTORIAL]: { displayName: 'RECRUIT_RALSEI_TUTORIAL' },
  [FLAGS.RECRUIT_RUDINN]: { displayName: 'RECRUIT_RUDINN' },
  [FLAGS.RECRUIT_HATHY]: { displayName: 'RECRUIT_HATHY' },
  [FLAGS.RECRUIT_CLOVER_1]: { displayName: 'RECRUIT_CLOVER_1' },
  [FLAGS.RECRUIT_C_ROUND]: { displayName: 'RECRUIT_C_ROUND' },
  [FLAGS.RECRUIT_K_ROUND_1]: { displayName: 'RECRUIT_K_ROUND_1' },
  [FLAGS.RECRUIT_PONMAN]: { displayName: 'RECRUIT_PONMAN' },
  [FLAGS.RECRUIT_LANCER_2]: { displayName: 'RECRUIT_LANCER_2' },
  [FLAGS.RECRUIT_RABBICK]: { displayName: 'RECRUIT_RABBICK' },
  [FLAGS.RECRUIT_BLOXER]: { displayName: 'RECRUIT_BLOXER' },
  [FLAGS.RECRUIT_JIGSAWRY]: { displayName: 'RECRUIT_JIGSAWRY' },
  [FLAGS.RECRUIT_CLOVER_2]: { displayName: 'RECRUIT_CLOVER_2' },
  [FLAGS.RECRUIT_DOOMTANK]: { displayName: 'RECRUIT_DOOMTANK' },
  [FLAGS.RECRUIT_LANCER_3]: { displayName: 'RECRUIT_LANCER_3' },
  [FLAGS.RECRUIT_SUSIE_AND_LANCER]: { displayName: 'RECRUIT_SUSIE_AND_LANCER' },
  [FLAGS.RECRUIT_JEVIL]: { displayName: 'RECRUIT_JEVIL' },
  [FLAGS.RECRUIT_K_ROUND_2]: { displayName: 'RECRUIT_K_ROUND_2' },
  [FLAGS.RECRUIT_RUDINN_RANGER]: { displayName: 'RECRUIT_RUDINN_RANGER' },
  [FLAGS.RECRUIT_HEAD_HATHY]: { displayName: 'RECRUIT_HEAD_HATHY' },
  [FLAGS.RECRUIT_KING]: { displayName: 'RECRUIT_KING' },
  [FLAGS.RECRUIT_AMBYU_LANCE]: { displayName: 'RECRUIT_AMBYU_LANCE' },
  [FLAGS.RECRUIT_POPPUP]: { displayName: 'RECRUIT_POPPUP' },
  [FLAGS.RECRUIT_TASQUE]: { displayName: 'RECRUIT_TASQUE' },
  [FLAGS.RECRUIT_WEREWIRE]: { displayName: 'RECRUIT_WEREWIRE' },
  [FLAGS.RECRUIT_MAUS]: { displayName: 'RECRUIT_MAUS' },
  [FLAGS.RECRUIT_VIROVIROKUN]: { displayName: 'RECRUIT_VIROVIROKUN' },
  [FLAGS.RECRUIT_SWATCHLING]: { displayName: 'RECRUIT_SWATCHLING' },
  [FLAGS.RECRUIT_CAPN]: { displayName: 'RECRUIT_CAPN' },
  [FLAGS.RECRUIT_K_K]: { displayName: 'RECRUIT_K_K' },
  [FLAGS.RECRUIT_SWEET]: { displayName: 'RECRUIT_SWEET' },
  [FLAGS.RECRUIT_WEREWEREWIRE]: { displayName: 'RECRUIT_WEREWEREWIRE' },
  [FLAGS.RECRUIT_GRAZETEST]: { displayName: 'RECRUIT_GRAZETEST' },
  [FLAGS.RECRUIT_TASQUE_MANAGER]: { displayName: 'RECRUIT_TASQUE_MANAGER' },
  [FLAGS.RECRUIT_BERDLY_1]: { displayName: 'RECRUIT_BERDLY_1' },
  [FLAGS.RECRUIT_MAUSWHEEL]: { displayName: 'RECRUIT_MAUSWHEEL' },
  [FLAGS.RECRUIT_ROUXLS_1]: { displayName: 'RECRUIT_ROUXLS_1' },
  [FLAGS.RECRUIT_BERDLY_2]: { displayName: 'RECRUIT_BERDLY_2' },
  [FLAGS.RECRUIT_CLOVER_DOJO]: { displayName: 'RECRUIT_CLOVER_2_DOJO' },
  [FLAGS.RECRUIT_QUEEN]: { displayName: 'RECRUIT_QUEEN' },
  [FLAGS.RECRUIT_SPAMTON]: { displayName: 'RECRUIT_SPAMTON' },
  [FLAGS.RECRUIT_SPAMTON_NEO]: { displayName: 'RECRUIT_SPAMTON_NEO' },
  [FLAGS.RECRUIT_GIGA_QUEEN]: { displayName: 'RECRUIT_GIGA_QUEEN' },
  [FLAGS.RECRUIT_JIGSAW_JOE_DOJO]: { displayName: 'RECRUIT_JIGSAW_JOE_DOJO' },
  [FLAGS.RECRUIT_PIPIS]: { displayName: 'RECRUIT_PIPIS' },
  [FLAGS.RECRUIT_SHADOWGUY]: { displayName: 'RECRUIT_SHADOWGUY' },
  [FLAGS.RECRUIT_SHUTTAH]: { displayName: 'RECRUIT_SHUTTAH' },
  [FLAGS.RECRUIT_ZAPPER]: { displayName: 'RECRUIT_ZAPPER' },
  [FLAGS.RECRUIT_RIBBICK]: { displayName: 'RECRUIT_RIBBICK' },
  [FLAGS.RECRUIT_WATERCOOLER]: { displayName: 'RECRUIT_WATERCOOLER' },
  [FLAGS.RECRUIT_PIPPINS]: { displayName: 'RECRUIT_PIPPINS' },
  [FLAGS.RECRUIT_ELNINA]: { displayName: 'RECRUIT_ELNINA' },
  [FLAGS.RECRUIT_LANINO]: { displayName: 'RECRUIT_LANINO' },
  [FLAGS.RECRUIT_GUEI]: { displayName: 'RECRUIT_GUEI' },
  [FLAGS.RECRUIT_BALTHIZARD]: { displayName: 'RECRUIT_BALTHIZARD' },
  [FLAGS.RECRUIT_BIBLIOX]: { displayName: 'RECRUIT_BIBLIOX' },
  [FLAGS.RECRUIT_MIZZLE]: { displayName: 'RECRUIT_MIZZLE' },
  [FLAGS.RECRUIT_WICABEL]: { displayName: 'RECRUIT_WICABEL' },
  [FLAGS.RECRUIT_WINGLADE]: { displayName: 'RECRUIT_WINGLADE' },
  [FLAGS.RECRUIT_ORGANIKK]: { displayName: 'RECRUIT_ORGANIKK' },
  [FLAGS.RECRUIT_MISS_MIZZLE]: { displayName: 'RECRUIT_MISS_MIZZLE' },

  [FLAGS.AXE_OF_JUSTICE_PROGRESS]: {
    displayName: 'Axe of Justice progress',
  },
  [FLAGS.SINCE_CHAPTER]: {
    displayName: 'Starting Chapter',
    description: 'Number of chapter that you started this save file from.',
    valueType: 'map',
    valueRules: {
      map: {
        1: 'Chapter 1',
        2: 'Chapter 2',
        3: 'Chapter 3',
        4: 'Chapter 4',
      },
    },
  },
  [FLAGS.WEIRDROUTE_PROGRESS_CH2]: {
    displayName: 'Weird route progression in Chapter 2',
  },
  [FLAGS.WEIRDROUTE_FAILED]: {
    displayName: 'True if weird route was abandoned at some point',
  },
  [FLAGS.GOT_MOSS_CH2]: {
    displayName: 'Got Moss in Chapter 2',
  },
  [FLAGS.GOT_MOSS_WITH_NOELLE]: {
    displayName: 'Eat moss with Noelle in party in Chapter 2',
  },
  [FLAGS.GOT_MOSS_WITH_SUSIE]: {
    displayName: 'Eat moss with Susie in party in Chapter 2',
  },
  [FLAGS.NOELLE_ICE_SHOCK_COUNT]: {
    displayName: 'Tracks how many times Noelle uses Ice Shock spell',
  },
  [FLAGS.GAMESHOW_LETTER_FIRST]: {
    valueType: 'map',
    valueRules: {
      map: letterMap,
    },
    displayName: "First letter of Kris's name at Tenna's game show",
  },
  [FLAGS.GAMESHOW_LETTER_SECOND]: {
    valueType: 'map',
    valueRules: {
      map: letterMap,
    },
    displayName: "Second letter of Kris's name at Tenna's game show",
  },
  [FLAGS.GAMESHOW_LETTER_THIRD]: {
    valueType: 'map',
    valueRules: {
      map: letterMap,
    },
    displayName: "Third letter of Kris's name at Tenna's game show",
  },
  [FLAGS.CH3_POINTS]: {
    displayName: 'Points (PTs)',
    description: 'Currency used in Chapter 3',
    valueType: 'number',
    valueRules: {
      min: 0,
      max: 99999,
    },
  },
  [FLAGS.SWORD_PROGRESS]: {
    displayName: 'Sword game progress',
  },
  [FLAGS.GOT_MOSS_CH3]: {
    displayName: 'Got Moss in Chapter 3',
  },
  [FLAGS.RALSEI_HORSE]: {
    displayName: 'Tracks Ralsei being horse',
  },
  [FLAGS.GOT_MOSS_CH4]: {
    displayName: 'Got Moss in Chapter 4',
  },
};

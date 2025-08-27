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
  AXE_OF_JUSTICE_PROGRESS: 852,
  WEIRDROUTE_PROGRESS_CH2: 915,
  WEIRDROUTE_FAILED: 916,
  GOT_MOSS_CH2: 920,
  GOT_MOSS_WITH_NOELLE: 921,
  GOT_MOSS_WITH_SUSIE: 922,
  NOELLE_ICE_SHOCK_COUNT: 925,
  GAMESHOW_LETTER_FIRST: 1012,
  GAMESHOW_LETTER_SECOND: 1013,
  GAMESHOW_LETTER_THIRD: 1014,
  SWORD_PROGRESS: 1055,
  GOT_MOSS_CH3: 1078,
  RALSEI_HORSE: 1152,
  GOT_MOSS_CH4: 1592,
} as const;

export type FlagIndex = (typeof FLAGS)[keyof typeof FLAGS];
export type FlagName = keyof typeof FLAGS;

export type ValueType = 'boolean' | 'number' | 'mapped';

export interface FlagProperties extends BaseProperties {
  valueType?: ValueType;
  valueMap?: Record<number, string>;

  constraints?: {
    min?: number;
    max?: number;
    allowedValues?: number[];
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
  [FLAGS.AXE_OF_JUSTICE_PROGRESS]: {
    displayName: 'Axe of Justice progress',
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
    valueType: 'mapped',
    valueMap: letterMap,
    displayName: "First letter of Kris's name at Tenna's game show",
  },
  [FLAGS.GAMESHOW_LETTER_SECOND]: {
    valueType: 'mapped',
    valueMap: letterMap,
    displayName: "Second letter of Kris's name at Tenna's game show",
  },
  [FLAGS.GAMESHOW_LETTER_THIRD]: {
    valueType: 'mapped',
    valueMap: letterMap,
    displayName: "Third letter of Kris's name at Tenna's game show",
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

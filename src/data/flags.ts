import type { FlagProperties } from '@types';

export const FLAGS = {
  SIMPLIFY_VFX: 8,
  GAMESHOW_LETTER_FIRST: 1012,
  GAMESHOW_LETTER_SECOND: 1013,
  GAMESHOW_LETTER_THIRD: 1014,
} as const;

export type FlagIndex = (typeof FLAGS)[keyof typeof FLAGS];
export type FlagName = keyof typeof FLAGS;

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
};

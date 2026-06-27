import type { BaseProperties } from '@types';
import {
  FLAGS,
  type FlagIndex,
  type FlagProperties,
  type FlagValueType,
} from './flags';

export interface FlagBitfieldProperties extends BaseProperties {
  parent: FlagIndex;
  index: number;
  width?: number;
  valueType?: FlagValueType;
  valueRules?: FlagProperties['valueRules'];
}

export const FLAG_BITFIELDS = {
  SCISSORS_PUZZLE_SHAPED_BUSH_CUT: 'SCISSORS_PUZZLE_SHAPED_BUSH_CUT',
  SCISSORS_PUZZLE_FLOWERY_FACE_PATH_CUT: 'SCISSORS_PUZZLE_FLOWERY_FACE_PATH_CUT',
  RALSEI_HOLD_Z_HINT: 'RALSEI_HOLD_Z_HINT',
  HOPSCHEF_PROGRESS: 'HOPSCHEF_PROGRESS',
} as const;

export type FlagBitfieldName = keyof typeof FLAG_BITFIELDS;
export type FlagBitfieldId = (typeof FLAG_BITFIELDS)[FlagBitfieldName];

export const FLAG_BITFIELDS_META: Record<
  FlagBitfieldId,
  FlagBitfieldProperties
> = {
  [FLAG_BITFIELDS.SCISSORS_PUZZLE_SHAPED_BUSH_CUT]: {
    parent: FLAGS.SCISSORS_PUZZLE_FLAGS,
    index: 8,
    displayName: 'Cut the shaped bush',
    description: 'Whether the scissors puzzle shaped bush was cut.',
    valueType: 'boolean',
  },
  [FLAG_BITFIELDS.SCISSORS_PUZZLE_FLOWERY_FACE_PATH_CUT]: {
    parent: FLAGS.SCISSORS_PUZZLE_FLAGS,
    index: 10,
    displayName: 'Cut the Flowery-face path bush',
    description:
      'Whether the scissors puzzle bush leading to the Flowery face room was cut.',
    valueType: 'boolean',
  },
  [FLAG_BITFIELDS.RALSEI_HOLD_Z_HINT]: {
    parent: FLAGS.SCISSORS_PUZZLE_FLAGS,
    index: 11,
    displayName: 'Ralsei hold-Z hint',
    description: 'Whether Ralsei told Kris that they can hold Z.',
    valueType: 'boolean',
  },
  [FLAG_BITFIELDS.HOPSCHEF_PROGRESS]: {
    parent: FLAGS.HOPSCHEF_PROGRESS_FLAG,
    index: 0,
    width: 2,
    displayName: 'Hop Chef progress',
    description: 'Progress state for the Hop Chef challenge.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Default state',
        1: 'Destroyed BREAD',
        2: 'Completed challenge',
      },
    },
  },
};

export type SaveFlagRef =
  | { kind: 'flag'; flag: FlagIndex }
  | { kind: 'bitfield'; bitfield: FlagBitfieldId };

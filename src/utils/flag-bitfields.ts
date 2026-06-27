import type { FlagBitfieldProperties } from '@data';

export function getFlagBitfieldWidth(bitfield: FlagBitfieldProperties) {
  return bitfield.width ?? 1;
}

export function getFlagBitfieldMaxValue(bitfield: FlagBitfieldProperties) {
  return 2 ** getFlagBitfieldWidth(bitfield) - 1;
}

export function readFlagBitfield(
  parentValue: number,
  bitfield: FlagBitfieldProperties,
) {
  const width = getFlagBitfieldWidth(bitfield);
  const maxValue = getFlagBitfieldMaxValue(bitfield);
  return (parentValue >> (bitfield.index * width)) & maxValue;
}

export function writeFlagBitfield(
  parentValue: number,
  bitfield: FlagBitfieldProperties,
  value: number,
) {
  const width = getFlagBitfieldWidth(bitfield);
  const maxValue = getFlagBitfieldMaxValue(bitfield);
  const offset = bitfield.index * width;
  const nextValue = Math.min(Math.max(Math.floor(value), 0), maxValue);
  const clearedParentValue = parentValue & ~(maxValue << offset);
  return clearedParentValue | ((nextValue & maxValue) << offset);
}

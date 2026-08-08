import type { FlagBitfieldProperties } from '@data';
import { compactBigInt, type IntegerValue, toBigInt } from './big-integer';

export function getFlagBitfieldWidth(bitfield: FlagBitfieldProperties) {
  return bitfield.width ?? 1;
}

export function getFlagBitfieldMaxValue(bitfield: FlagBitfieldProperties) {
  return 2 ** getFlagBitfieldWidth(bitfield) - 1;
}

export function readFlagBitfield(
  parentValue: IntegerValue,
  bitfield: FlagBitfieldProperties,
) {
  const width = getFlagBitfieldWidth(bitfield);
  const maxValue = BigInt(getFlagBitfieldMaxValue(bitfield));
  return Number(
    (toBigInt(parentValue) >> BigInt(bitfield.index * width)) & maxValue,
  );
}

export function writeFlagBitfield(
  parentValue: number,
  bitfield: FlagBitfieldProperties,
  value: number,
): number;
export function writeFlagBitfield(
  parentValue: IntegerValue,
  bitfield: FlagBitfieldProperties,
  value: IntegerValue,
): IntegerValue;
export function writeFlagBitfield(
  parentValue: IntegerValue,
  bitfield: FlagBitfieldProperties,
  value: IntegerValue,
) {
  const width = getFlagBitfieldWidth(bitfield);
  const maxValue = BigInt(getFlagBitfieldMaxValue(bitfield));
  const offset = BigInt(bitfield.index * width);
  const nextValue = toBigInt(value);
  const clampedValue =
    nextValue < 0n ? 0n : nextValue > maxValue ? maxValue : nextValue;
  const parent = toBigInt(parentValue);
  const clearedParentValue = parent & ~(maxValue << offset);
  return compactBigInt(
    clearedParentValue | ((clampedValue & maxValue) << offset),
  );
}

import {
  FLAGS,
  FLAG_BITFIELDS,
  FLAG_BITFIELDS_META,
  type FlagBitfieldId,
  type FlagBitfieldProperties,
  type FlagIndex,
} from '@data';
import { flagHelpers } from './data-helpers';

export const FLAG_NAMES = Object.fromEntries(
  Object.entries(FLAGS).map(([name, index]) => [index, name]),
) as Record<FlagIndex, string>;

export interface KnownBitfield {
  id: FlagBitfieldId;
  bitfield: FlagBitfieldProperties;
}

export function getKnownBitfields(parent: FlagIndex): KnownBitfield[] {
  return Object.values(FLAG_BITFIELDS).flatMap((id) => {
    const bitfield = FLAG_BITFIELDS_META[id];
    return bitfield.parent === parent ? [{ id, bitfield }] : [];
  });
}

export interface PreparedFlag {
  name: string;
  index: FlagIndex;
  description: string;
  knownValues?: Record<number, string>;
  knownValueEntries?: readonly [string, string][];
  searchText: string;
}

export function parseFiniteNumberInput(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function prepareFlagData(index: FlagIndex): PreparedFlag {
  const name = FLAG_NAMES[index] || `Flag #${index}`;
  const meta = flagHelpers.getById(index);
  const description = meta?.description?.trim() ?? '';
  return {
    name,
    index,
    description,
    knownValues: meta?.valueRules?.map,
    knownValueEntries: meta?.valueRules?.map
      ? Object.entries(meta.valueRules.map).sort(
          ([a], [b]) => Number(a) - Number(b),
        )
      : undefined,
    searchText:
      `${name} ${index} ${meta?.displayName ?? ''} ${description}`.toLowerCase(),
  };
}

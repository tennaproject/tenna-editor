import type { SelectItem } from '@components';
import type { FlagIndex } from '@data';
import { flagHelpers } from './data-helpers';

const flagSelectOptionsCache = new Map<FlagIndex, SelectItem[]>();

function sortSelectItems(items: SelectItem[]) {
  return items.sort(
    (itemA, itemB) =>
      parseFloat(String(itemA.id)) - parseFloat(String(itemB.id)),
  );
}

export function getFlagMapOptions(flagIndex: FlagIndex): SelectItem[] | null {
  const cached = flagSelectOptionsCache.get(flagIndex);
  if (cached) return cached;

  const map = flagHelpers.getById(flagIndex)?.valueRules?.map;
  if (!map) return null;

  const items = sortSelectItems(
    Object.entries(map).map(([value, label]) => ({
      id: `${value}`,
      label,
      value,
    })),
  );

  flagSelectOptionsCache.set(flagIndex, items);
  return items;
}

export function getFlagSelectOptions(
  flagIndex: FlagIndex,
): SelectItem[] | null {
  const mapped = getFlagMapOptions(flagIndex);
  if (mapped) return mapped;

  const meta = flagHelpers.getById(flagIndex);
  if (meta?.valueType !== 'number') return null;

  const min = meta.valueRules?.min ?? 0;
  const max = meta.valueRules?.max;
  if (max === undefined || max - min > 20) return null;

  return sortSelectItems(
    Array.from({ length: max - min + 1 }, (_, index) => {
      const value = min + index;
      return {
        id: `${value}`,
        label: `${value}`,
        value,
      };
    }),
  );
}

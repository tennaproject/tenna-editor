import type { FlagIndex } from '@data';
import { useSave } from '@store';

export function useSaveFlag(flag: FlagIndex | undefined) {
  const data = useSave((s) =>
    flag === undefined ? undefined : s.save?.flags[flag],
  ) as number | undefined;
  if (flag === undefined || data === undefined || data === null) {
    return 0;
  }

  return data;
}

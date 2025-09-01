import type { FlagIndex } from '@data';
import { useSave } from '@store';

export function useSaveFlag(flag: FlagIndex) {
  const data = useSave((s) => s.save?.flags[flag]);
  return data;
}

import type { FlagIndex } from '@data';
import { useSave } from '@store';

export function useSaveFlag(flag: FlagIndex) {
  const data = useSave((s) => s.saveFile?.flags[flag]);
  return data;
}

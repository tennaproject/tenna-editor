import type { Save } from '@types';

const SIDE_B_PROGRESS_FLAG = 915;
const SIDE_B_FAIL_FLAG = 916;

export type SideBPhase = 0 | 1 | 2 | 3 | 4;

export function getSideBPhase(save: Save): SideBPhase {
  if (save.meta.chapter < 2) return 0;
  if (Number(save.flags[SIDE_B_FAIL_FLAG]) !== 0) return 0;

  const progress = Number(save.flags[SIDE_B_PROGRESS_FLAG]) || 0;
  if (progress >= 20) return 4;
  if (progress >= 7) return 3;
  if (progress >= 4) return 2;
  if (progress > 0) return 1;
  return 0;
}

export function isSideBActive(save: Save): boolean {
  return getSideBPhase(save) >= 3;
}

export function resolveSideBRoute(target: {
  save: Save;
  chapter: number;
  isCompletionSave: boolean;
}): boolean {
  if (target.chapter !== 5 || !target.isCompletionSave) return false;
  return target.save.meta.isSideB ?? isSideBActive(target.save);
}

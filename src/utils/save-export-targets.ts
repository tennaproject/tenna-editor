import type { ChapterIndex } from '@data';
import type { Save, SaveSlot } from '@types';

export type RawSaveSlot = 0 | 1 | 2 | 3 | 4 | 5;

export interface SaveExportTarget {
  save: Save;
  chapter: ChapterIndex;
  slot: SaveSlot;
  isCompletionSave: boolean;
  isSideB?: boolean;
}

export interface SaveExportCell {
  chapter: ChapterIndex;
  rawSlot: RawSaveSlot;
  save: Save | null;
  isSideB?: boolean;
}

export function getRawSaveSlot(target: {
  slot: SaveSlot;
  isCompletionSave: boolean;
}): number {
  return target.isCompletionSave ? target.slot + 3 : target.slot;
}

export function getPcSaveFileName(target: {
  chapter: ChapterIndex;
  slot?: SaveSlot;
  isCompletionSave?: boolean;
  rawSlot?: RawSaveSlot;
  isSideB?: boolean;
}): string {
  const rawSlot =
    target.rawSlot ??
    getRawSaveSlot(target as { slot: SaveSlot; isCompletionSave: boolean });
  const suffix = isSideBFileName({ ...target, rawSlot }) ? '_b' : '';
  return `filech${target.chapter}_${rawSlot}${suffix}`;
}

/** The `_b` suffix only exists for chapter 5 completion slots, as scr_complete_save_file_b writes it. */
export function isSideBFileName(target: {
  chapter: ChapterIndex;
  rawSlot: number;
  isSideB?: boolean;
}): boolean {
  return target.isSideB === true && target.chapter === 5 && target.rawSlot >= 3;
}

export function getIniSectionName(target: {
  chapter: ChapterIndex;
  slot?: SaveSlot;
  isCompletionSave?: boolean;
  rawSlot?: RawSaveSlot;
}): string {
  const rawSlot =
    target.rawSlot ??
    getRawSaveSlot(target as { slot: SaveSlot; isCompletionSave: boolean });
  return target.chapter === 1
    ? `G${rawSlot}`
    : `G_${target.chapter}_${rawSlot}`;
}

export function getTargetKey(target: {
  chapter: ChapterIndex;
  slot?: SaveSlot;
  isCompletionSave?: boolean;
  rawSlot?: RawSaveSlot;
  isSideB?: boolean;
}): string {
  return getPcSaveFileName(target).toLowerCase();
}

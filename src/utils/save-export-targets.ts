import type { ChapterIndex } from '@data';
import type { Save, SaveSlot } from '@types';

export type RawSaveSlot = 0 | 1 | 2 | 3 | 4 | 5;

export const VANILLA_SLOT_COUNT = 3;
export const MAX_SAVE_SLOT = 2999;

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
  batch?: number;
  save: Save | null;
  isSideB?: boolean;
}

interface SlotLocation {
  chapter: ChapterIndex;
  slot?: SaveSlot;
  isCompletionSave?: boolean;
  rawSlot?: RawSaveSlot;
  batch?: number;
}

export function isBetterSavesSlot(slot: SaveSlot): boolean {
  return slot >= VANILLA_SLOT_COUNT;
}

export function getRawSaveSlot(target: {
  slot: SaveSlot;
  isCompletionSave: boolean;
}): number {
  const slot = target.slot % VANILLA_SLOT_COUNT;
  return target.isCompletionSave ? slot + 3 : slot;
}

export function getSaveBatch(target: {
  slot?: SaveSlot;
  batch?: number;
}): number {
  return target.batch ?? Math.floor((target.slot ?? 0) / VANILLA_SLOT_COUNT);
}

export function getSlotFromFile(rawSlot: number, batch: number): SaveSlot {
  return batch * VANILLA_SLOT_COUNT + (rawSlot % 3);
}

function resolveRawSlot(target: SlotLocation): number {
  return (
    target.rawSlot ??
    getRawSaveSlot(target as { slot: SaveSlot; isCompletionSave: boolean })
  );
}

// BetterSaves appends _<batch> to every per-slot name past the first three slots
function getBatchSuffix(target: SlotLocation): string {
  const batch = getSaveBatch(target);
  return batch > 0 ? `_${batch}` : '';
}

export function getPcSaveFileName(
  target: SlotLocation & { isSideB?: boolean },
): string {
  const rawSlot = resolveRawSlot(target);
  const suffix = isSideBFileName({ ...target, rawSlot }) ? '_b' : '';
  return `filech${target.chapter}_${rawSlot}${getBatchSuffix(target)}${suffix}`;
}

/** The `_b` suffix only exists for chapter 5 completion slots, as scr_complete_save_file_b writes it. */
export function isSideBFileName(target: {
  chapter: ChapterIndex;
  rawSlot: number;
  isSideB?: boolean;
}): boolean {
  return target.isSideB === true && target.chapter === 5 && target.rawSlot >= 3;
}

export function getIniSectionName(target: SlotLocation): string {
  const rawSlot = resolveRawSlot(target);
  const base =
    target.chapter === 1 ? `G${rawSlot}` : `G_${target.chapter}_${rawSlot}`;
  return `${base}${getBatchSuffix(target)}`;
}

export function getUraKey(target: SlotLocation): string {
  const rawSlot = resolveRawSlot(target);
  return `${target.chapter}_${rawSlot % 3}${getBatchSuffix(target)}`;
}

export function getTargetKey(
  target: SlotLocation & { isSideB?: boolean },
): string {
  return getPcSaveFileName(target).toLowerCase();
}

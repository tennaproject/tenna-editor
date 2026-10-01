import type { Save } from '@types';
import { strToU8, zipSync } from 'fflate';
import { generateDrIni, getAllDrIniCells } from './dr-ini';
import { serializeSave } from './save-serializer';
import {
  getPcSaveFileName,
  getTargetKey,
  getRawSaveSlot,
  type RawSaveSlot,
  type SaveExportCell,
  type SaveExportTarget,
} from './save-export-targets';
import { pcSaveTextToSwitchEntry } from './switch-save-container';

export function cloneSaveForTarget(target: SaveExportTarget): Save {
  return {
    ...target.save,
    meta: {
      ...target.save.meta,
      chapter: target.chapter,
      slot: target.slot,
      isCompletionSave: target.isCompletionSave,
      isSideB: target.isSideB,
    },
  } as Save;
}

export function findDuplicateExportTargets(
  targets: SaveExportTarget[],
): string[] {
  const counts = new Map<string, number>();
  for (const target of targets) {
    const key = getTargetKey(target);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([key]) => key);
}

export function buildCellsFromTargets(
  targets: SaveExportTarget[],
): SaveExportCell[] {
  const cells = getAllDrIniCells();
  for (const target of targets) {
    const rawSlot = getRawSaveSlot(target) as RawSaveSlot;
    const cell = cells.find(
      (c) => c.chapter === target.chapter && c.rawSlot === rawSlot,
    );
    // filech5_N and filech5_N_b share one dr.ini section; keep the _b save there
    if (!cell || (cell.isSideB && !target.isSideB)) continue;
    cell.save = target.save;
    cell.isSideB = target.isSideB;
  }
  return cells;
}

export function buildPcExportFromTargets(
  targets: SaveExportTarget[],
  baseDrIni = '',
  history?: Record<string, number>,
): Uint8Array {
  const files: Record<string, Uint8Array> = {};
  for (const target of targets) {
    files[getPcSaveFileName(target)] = strToU8(
      serializeSave(cloneSaveForTarget(target)),
    );
  }
  const cells = buildCellsFromTargets(targets);
  files['dr.ini'] = strToU8(
    generateDrIni(cells, baseDrIni, undefined, history),
  );

  return zipSync(files);
}

export function buildSwitchExportSet(
  targets: SaveExportTarget[],
  baseContainer?: Record<string, string>,
  history?: Record<string, number>,
): string {
  const container: Record<string, string> = baseContainer
    ? { ...baseContainer }
    : {};

  const cells = buildCellsFromTargets(targets);
  const generatedDrIni = generateDrIni(
    cells,
    container['dr.ini'] ?? '',
    undefined,
    history,
  );
  container['dr.ini'] = generatedDrIni
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n/g, '\r\n');

  for (const target of targets) {
    const key = getTargetKey(target);
    container[key] = pcSaveTextToSwitchEntry(
      key,
      serializeSave(cloneSaveForTarget(target)),
    );
  }

  return `${JSON.stringify(container, null, 0)}\0`;
}

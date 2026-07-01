import { saveStorage, toast } from '@services';
import { SAVE_VERSION, UI_VERSION, useSave, useUi, type Ui } from '@store';
import { type Save } from '@types';
import { translate } from '../i18n';

export const APPDATA_VERSION = 1;

interface AppData {
  ui: Ui;
  activeSaveId: string | null;
  saves: Save[];
  createdAt: Date;
  appVersion: string;
  appdataVersion: number;
  uiVersion: number;
  saveVersion: number;
}

export async function exportAppdata(): Promise<AppData> {
  const { ui } = useUi.getState();
  const { activeSaveId } = useSave.getState();
  const saves = await saveStorage.getAll();

  const data: AppData = {
    ui,
    activeSaveId,
    saves,
    createdAt: new Date(),
    appVersion: __VERSION__,
    appdataVersion: APPDATA_VERSION,
    uiVersion: UI_VERSION,
    saveVersion: SAVE_VERSION,
  };

  return data;
}

export function serializeAppdata(data: AppData): string {
  return JSON.stringify(data, null, 2);
}

export async function downloadAppdata(filename?: string) {
  const data = await exportAppdata();
  const json = serializeAppdata(data);
  const blob = new Blob([json], { type: 'application/json' });
  const timestamp = data.createdAt.toISOString().replace(/[:.]/g, '-');
  const name = filename ?? `tenna-editor-appdata-${timestamp}.json`;

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  const href = a.href;
  a.remove();
  // Apparently some browsers start the download asynchronously so we have to defer it
  setTimeout(() => URL.revokeObjectURL(href), 10_000);
}

export async function exportAllSaves(): Promise<void> {
  const saves = await saveStorage.getAll();
  if (saves.length === 0) {
    toast(translate('ui.backup.noSavesToExport', 'No saves to export'), 'warning');
    return;
  }

  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    editor: 'tenna-editor',
    saves,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `tenna-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Apparently some browsers start the download asynchronously so we have to defer it
  setTimeout(() => URL.revokeObjectURL(url), 10_000);

  toast(
    translate('ui.backup.exportedSaves', 'Exported {count} save(s)').replace(
      '{count}',
      String(saves.length),
    ),
    'success',
  );
}

export interface ImportResult {
  imported: number;
  skipped: number;
}

export async function importAllSaves(file: File): Promise<ImportResult> {
  const text = await file.text();
  let data: { version?: number; saves?: Save[] };
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      translate('ui.backup.invalidBackupNotJson', 'Invalid backup file: not valid JSON'),
    );
  }

  if (!data.saves || !Array.isArray(data.saves)) {
    throw new Error(
      translate('ui.backup.invalidBackupNoSaves', 'Invalid backup file: no saves found'),
    );
  }

  let imported = 0;
  let skipped = 0;
  for (const save of data.saves) {
    if (!save?.meta?.id) {
      skipped++;
      continue;
    }
    await saveStorage.set(save.meta.id, save);
    imported++;
  }

  return { imported, skipped };
}

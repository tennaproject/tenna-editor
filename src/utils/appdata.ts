import { saveStorage } from '@services';
import { SAVE_VERSION, UI_VERSION, useSave, useUi, type Ui } from '@store';
import { type Save } from '@types';

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
  URL.revokeObjectURL(a.href);
  a.remove();
}

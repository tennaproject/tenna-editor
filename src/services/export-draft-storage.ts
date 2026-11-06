import type { SaveSlot } from '@types';
import { browserDatabase, EXPORT_DRAFTS_STORE } from './browser-database';

export const EXPORT_DRAFT_VERSION = 2;

export type ExportMode = 'pc' | 'console';
export type ExportScope = 'single' | 'set';
export type ExportFileNameKey = `${ExportMode}-${ExportScope}`;
export type ExportFileNames = Partial<Record<ExportFileNameKey, string>>;

export interface ExportDraftSelection {
  selected: boolean;
  slotOverride?: SaveSlot;
  completionOverride?: boolean;
}

export interface ExportDraft {
  version: typeof EXPORT_DRAFT_VERSION;
  mode: ExportMode;
  scope: ExportScope;
  saveId?: string;
  selectedSlot: SaveSlot;
  isCompletionSave: boolean;
  fileNames: ExportFileNames;
  selections: Record<string, ExportDraftSelection>;
  baseDrIni?: {
    name: string;
    content: string;
  };
  baseContainer?: {
    name: string;
    files: Record<string, string>;
  };
}

const DRAFT_KEY = 'default';

function renameSwitchMode(draft: ExportDraft): ExportDraft {
  if ((draft.mode as string) === 'switch') draft.mode = 'console';
  draft.fileNames = Object.fromEntries(
    Object.entries(draft.fileNames).map(([key, name]) => [
      key.replace(/^switch-/, 'console-'),
      name,
    ]),
  );
  return draft;
}

async function get(): Promise<ExportDraft | null> {
  try {
    const db = await browserDatabase;
    const stored = (await db.get(EXPORT_DRAFTS_STORE, DRAFT_KEY)) as
      | ExportDraft
      | (Omit<ExportDraft, 'version' | 'saveId'> & { version: 1 })
      | undefined;
    if (!stored) return null;
    // v1 drafts have no saveId, so their single-save slot is taken from the save
    const draft: ExportDraft | null =
      stored.version === 1
        ? { ...stored, version: EXPORT_DRAFT_VERSION }
        : stored.version === EXPORT_DRAFT_VERSION
          ? stored
          : null;
    return draft ? renameSwitchMode(draft) : null;
  } catch (error) {
    console.error('export-draft-storage: get failed', error);
    return null;
  }
}

async function set(draft: ExportDraft): Promise<void> {
  try {
    const db = await browserDatabase;
    await db.put(EXPORT_DRAFTS_STORE, draft, DRAFT_KEY);
  } catch (error) {
    console.error('export-draft-storage: set failed', error);
  }
}

export const exportDraftStorage = { get, set };

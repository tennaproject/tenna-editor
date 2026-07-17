import type { SaveSlot } from '@types';
import { browserDatabase, EXPORT_DRAFTS_STORE } from './browser-database';

export const EXPORT_DRAFT_VERSION = 1;

export type ExportMode = 'pc' | 'switch';
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

async function get(): Promise<ExportDraft | null> {
  try {
    const db = await browserDatabase;
    const draft = (await db.get(EXPORT_DRAFTS_STORE, DRAFT_KEY)) as
      ExportDraft | undefined;
    return draft?.version === EXPORT_DRAFT_VERSION ? draft : null;
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

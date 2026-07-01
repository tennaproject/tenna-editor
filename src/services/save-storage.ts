import { openDB } from 'idb';
import type { Save } from '@types';
import type { UUID } from 'crypto';
import { toast } from './toast';
import { translate } from '../i18n';

const STORE_NAME = 'saves';
const DATABASE_NAME = 'tenna';
const DATABASE_VERSION = 2;

const DATABASE = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1 && !db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

async function get(id: string): Promise<Save | null> {
  try {
    const db = await DATABASE;
    if (!db) return null;
    const tx = db.transaction(STORE_NAME);
    if (!tx) return null;
    const value = (await tx.objectStore(STORE_NAME).get(id)) as
      | Save
      | undefined;
    return value ?? null;
  } catch (error) {
    console.error('save-storage: get failed', error);
    toast(
      translate('ui.storage.loadFailed', 'Failed to load save data'),
      'error',
    );
    return null;
  }
}

async function set(id: string, save: Save): Promise<void> {
  try {
    const db = await DATABASE;
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    if (!tx) return;
    await tx.objectStore(STORE_NAME).put(save, id);
    await tx.done;
  } catch (error) {
    console.error('save-storage: set failed', error);
    toast(translate('ui.storage.saveFailed', 'Failed to save data'), 'error');
  }
}

async function remove(id: string): Promise<void> {
  try {
    const db = await DATABASE;
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    if (!tx) return;
    await tx.objectStore(STORE_NAME).delete(id);
    await tx.done;
  } catch (error) {
    console.error('save-storage: remove failed', error);
    toast(
      translate('ui.storage.removeFailed', 'Failed to remove save data'),
      'error',
    );
  }
}

async function getKeys() {
  try {
    const db = await DATABASE;
    if (!db) return [];
    const tx = db.transaction(STORE_NAME);
    if (!tx) return [];
    return (await tx.objectStore(STORE_NAME).getAllKeys()) as UUID[];
  } catch (error) {
    console.error('save-storage: getKeys failed', error);
    toast(
      translate('ui.storage.loadFailed', 'Failed to load save data'),
      'error',
    );
    return [];
  }
}

async function getAll(): Promise<Save[]> {
  try {
    const db = await DATABASE;
    if (!db) return [];
    const tx = db.transaction(STORE_NAME);
    if (!tx) return [];
    return (await tx.objectStore(STORE_NAME).getAll()) as Save[];
  } catch (error) {
    console.error('save-storage: getAll failed', error);
    toast(
      translate('ui.storage.loadAllFailed', 'Failed to load saves'),
      'error',
    );
    return [];
  }
}

async function migrate(saves: Save[]) {
  try {
    const db = await DATABASE;
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    if (!tx) return;

    const batch: Promise<IDBValidKey>[] = [];
    saves.forEach((save) => {
      batch.push(tx.objectStore(STORE_NAME).put(save, save.meta.id));
    });

    await Promise.all(batch);
    await tx.done;
  } catch (error) {
    console.error('save-storage: migrate failed', error);
    toast(
      translate('ui.storage.migrateFailed', 'Failed to migrate save data'),
      'error',
    );
  }
}

export const saveStorage = {
  get,
  set,
  remove,
  getKeys,
  getAll,
  migrate,
};

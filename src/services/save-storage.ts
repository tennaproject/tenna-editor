import type { Save } from '@types';
import type { UUID } from 'crypto';
import { toast } from './toast';
import { translate } from '../i18n';
import { browserDatabase, SAVES_STORE } from './browser-database';

async function get(id: string): Promise<Save | null> {
  try {
    const db = await browserDatabase;
    if (!db) return null;
    const tx = db.transaction(SAVES_STORE);
    if (!tx) return null;
    const value = (await tx.objectStore(SAVES_STORE).get(id)) as
      Save | undefined;
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
    const db = await browserDatabase;
    if (!db) return;
    const tx = db.transaction(SAVES_STORE, 'readwrite');
    if (!tx) return;
    await tx.objectStore(SAVES_STORE).put(save, id);
    await tx.done;
  } catch (error) {
    console.error('save-storage: set failed', error);
    toast(translate('ui.storage.saveFailed', 'Failed to save data'), 'error');
  }
}

async function setMany(saves: Save[]): Promise<boolean> {
  try {
    const db = await browserDatabase;
    if (!db) return false;
    const tx = db.transaction(SAVES_STORE, 'readwrite');
    if (!tx) return false;
    const store = tx.objectStore(SAVES_STORE);

    try {
      for (const save of saves) {
        await store.put(save, save.meta.id);
      }
      await tx.done;
      return true;
    } catch (error) {
      try {
        tx.abort();
      } catch {
        // It's theoretically possible for that transaction is already aborted
      }
      await tx.done.catch(() => undefined);
      throw error;
    }
  } catch (error) {
    console.error('save-storage: setMany failed', error);
    toast(translate('ui.storage.saveFailed', 'Failed to save data'), 'error');
    return false;
  }
}

async function remove(id: string): Promise<void> {
  try {
    const db = await browserDatabase;
    if (!db) return;
    const tx = db.transaction(SAVES_STORE, 'readwrite');
    if (!tx) return;
    await tx.objectStore(SAVES_STORE).delete(id);
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
    const db = await browserDatabase;
    if (!db) return [];
    const tx = db.transaction(SAVES_STORE);
    if (!tx) return [];
    return (await tx.objectStore(SAVES_STORE).getAllKeys()) as UUID[];
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
    const db = await browserDatabase;
    if (!db) return [];
    const tx = db.transaction(SAVES_STORE);
    if (!tx) return [];
    return (await tx.objectStore(SAVES_STORE).getAll()) as Save[];
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
    const db = await browserDatabase;
    if (!db) return;
    const tx = db.transaction(SAVES_STORE, 'readwrite');
    if (!tx) return;

    const batch: Promise<IDBValidKey>[] = [];
    saves.forEach((save) => {
      batch.push(tx.objectStore(SAVES_STORE).put(save, save.meta.id));
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
  setMany,
  remove,
  getKeys,
  getAll,
  migrate,
};

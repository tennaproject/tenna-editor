import { openDB } from 'idb';
import type { Save } from '@types';
import type { UUID } from 'crypto';

const STORE_NAME = 'saves';
const DATABASE_NAME = 'tenna';

const DATABASE = openDB(DATABASE_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

async function get(id: string): Promise<Save | null> {
  const db = await DATABASE;
  if (db) {
    const tx = db.transaction(STORE_NAME);
    if (tx) {
      const value = (await tx.objectStore(STORE_NAME).get(id)) as
        | Save
        | undefined;
      return value ?? null;
    }
  }

  return null;
}

async function set(id: string, save: Save): Promise<void> {
  const db = await DATABASE;
  if (db) {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    if (tx) {
      await tx.objectStore(STORE_NAME).put(save, id);
      await tx.done;
    }
  }
}

async function remove(id: string): Promise<void> {
  const db = await DATABASE;
  if (db) {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    if (tx) {
      await tx.objectStore(STORE_NAME).delete(id);
      await tx.done;
    }
  }
}

async function getKeys() {
  const db = await DATABASE;
  if (db) {
    const tx = db.transaction(STORE_NAME);
    if (tx) {
      return (await tx.objectStore(STORE_NAME).getAllKeys()) as UUID[];
    }
  }

  return [];
}

async function getAll(): Promise<Save[]> {
  const db = await DATABASE;
  const tx = db.transaction(STORE_NAME);
  return (await tx.objectStore(STORE_NAME).getAll()) as Save[];
}

async function migrate(saves: Save[]) {
  const db = await DATABASE;
  const tx = db.transaction(STORE_NAME, 'readwrite');

  const batch: Promise<IDBValidKey>[] = [];
  saves.forEach((save) => {
    batch.push(tx.objectStore(STORE_NAME).put(save, save.meta.id));
  });

  await Promise.all(batch);
  await tx.done;
}

export const saveStorage = {
  get,
  set,
  remove,
  getKeys,
  getAll,
  migrate,
};

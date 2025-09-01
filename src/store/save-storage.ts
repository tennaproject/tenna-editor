import { STORE_NAMESPACE, STORE_VERSION } from './schema';
import { openDB } from 'idb';
import type { DeltaruneSave } from '@types';
import type { UUID } from 'crypto';

const STORE_NAME = 'saves';

const DATABASE = openDB(STORE_NAMESPACE, STORE_VERSION, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

async function getSave(id: string): Promise<DeltaruneSave | null> {
  const database = await DATABASE;
  if (database) {
    const store = database.transaction(STORE_NAME).objectStore(STORE_NAME);
    if (store) {
      const value = await store.get(id);
      return value;
    }
  }

  return null;
}

async function setSave(id: string, save: DeltaruneSave): Promise<void> {
  const adapter = await DATABASE;
  if (adapter) {
    const store = adapter
      .transaction(STORE_NAME, 'readwrite')
      .objectStore(STORE_NAME);
    if (store && store.put) {
      store.put(save, id);
    }
  }
}

async function removeSave(id: string): Promise<void> {
  const adapter = await DATABASE;
  if (adapter) {
    const store = adapter
      .transaction(STORE_NAME, 'readwrite')
      .objectStore(STORE_NAME);
    if (store) {
      store.delete(id);
    }
  }
}

async function getKeys() {
  const database = await DATABASE;
  if (database) {
    const store = database.transaction(STORE_NAME).objectStore(STORE_NAME);
    if (store) {
      return (await store.getAllKeys()) as UUID[];
    }
  }

  return [];
}

export function useSaveStorage() {
  return {
    getStorageSave: getSave,
    setStorageSave: setSave,
    removeStorageSave: removeSave,
    getStorageKeys: getKeys,
  };
}

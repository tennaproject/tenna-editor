import type { DeltaruneSave } from '@types';

export const STORAGE_NAMESPACE = 'tenna:v1:';

export const STORAGE_SCHEMA = {
  sidebarRetracted: false,
  saveFile: null as DeltaruneSave | null,
  originalSaveFile: null as DeltaruneSave | null,
};

export type StorageKey = keyof typeof STORAGE_SCHEMA;

export const getStorage = <T extends StorageKey>(
  key: T,
): (typeof STORAGE_SCHEMA)[T] => {
  const value = localStorage.getItem(`${STORAGE_NAMESPACE}${key}`);
  if (!value) {
    setStorage(key, STORAGE_SCHEMA[key]);
    return STORAGE_SCHEMA[key];
  }

  return JSON.parse(value);
};

export const setStorage = <T extends StorageKey>(
  key: T,
  value: (typeof STORAGE_SCHEMA)[T],
): void => {
  localStorage.setItem(`${STORAGE_NAMESPACE}${key}`, JSON.stringify(value));
};

export const exportStorage = () => {
  const storage: Record<string, unknown> = {};
  Object.keys(STORAGE_SCHEMA).forEach((key) => {
    storage[key] = getStorage(key as StorageKey);
  });
  return JSON.stringify(storage, null, 2);
};

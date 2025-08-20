import { useEffect, useState } from 'react';
import {
  STORAGE_NAMESPACE,
  STORAGE_SCHEMA,
  type StorageKey,
  getStorage,
  setStorage,
} from '@services';

export const useStorageState = <T extends StorageKey>(
  key: T,
): [
  (typeof STORAGE_SCHEMA)[T],
  (
    value:
      | (typeof STORAGE_SCHEMA)[T]
      | ((prev: (typeof STORAGE_SCHEMA)[T]) => (typeof STORAGE_SCHEMA)[T]),
  ) => void,
] => {
  const [state, setState] = useState<(typeof STORAGE_SCHEMA)[T]>(() =>
    getStorage(key),
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `${STORAGE_NAMESPACE}${key}`) {
        setState(getStorage(key));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  const updateStorage = (
    valueOrUpdater:
      | (typeof STORAGE_SCHEMA)[T]
      | ((prev: (typeof STORAGE_SCHEMA)[T]) => (typeof STORAGE_SCHEMA)[T]),
  ) => {
    setState((prev) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? (
              valueOrUpdater as (
                prev: (typeof STORAGE_SCHEMA)[T],
              ) => (typeof STORAGE_SCHEMA)[T]
            )(prev)
          : valueOrUpdater;
      setStorage(key, next);
      return next;
    });
  };

  return [state, updateStorage];
};

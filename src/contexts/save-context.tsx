import { createContext, useCallback, useContext, useMemo } from 'react';
import { useStorageState } from '@hooks';
import type { DeltaruneSave } from '@types';
import { deepEqual } from '@utils';

export interface SaveContextValue {
  saveFile: DeltaruneSave | null;
  setSaveFile: (file: DeltaruneSave | null) => void;
  originalSaveFile: DeltaruneSave | null;
  setOriginalSaveFile: (file: DeltaruneSave | null) => void;

  setSaveFileField: <K extends keyof DeltaruneSave>(
    key: K,
    value: DeltaruneSave[K],
  ) => void;
  patchSave: (partial: Partial<DeltaruneSave>) => void;
  updateSave: (updater: (draft: DeltaruneSave) => void) => void;

  replaceSave: (next: DeltaruneSave | null) => void;
  revertSave: () => void;
  isDirty: boolean;
}

const SaveContext = createContext<SaveContextValue | undefined>(undefined);

export function SaveProvider({ children }: { children: React.ReactNode }) {
  const [saveFile, setSaveFile] = useStorageState('saveFile');
  // Original copy used for changes tracking and revert
  const [originalSaveFile, setOriginalSaveFile] =
    useStorageState('originalSaveFile');

  const isDirty = useMemo(
    () => !deepEqual(saveFile, originalSaveFile),
    [saveFile, originalSaveFile],
  );

  const setSaveFileField: SaveContextValue['setSaveFileField'] = useCallback(
    (key, value) => {
      setSaveFile((prev) => {
        if (!prev) return prev;
        if (!(key in prev)) return prev;
        const nextSave = { ...prev } as DeltaruneSave & Record<string, unknown>;
        (nextSave as Record<string, unknown>)[key as unknown as string] =
          value as unknown;
        return nextSave;
      });
    },
    [setSaveFile],
  );

  const patchSave: SaveContextValue['patchSave'] = useCallback(
    (partial) => {
      setSaveFile((prev) => {
        if (!prev) return prev;
        return { ...prev, ...partial } as DeltaruneSave;
      });
    },
    [setSaveFile],
  );

  const updateSave: SaveContextValue['updateSave'] = useCallback(
    (updater) => {
      setSaveFile((prev) => {
        if (!prev) return prev;
        const draft: DeltaruneSave =
          typeof structuredClone === 'function'
            ? structuredClone(prev)
            : JSON.parse(JSON.stringify(prev));
        updater(draft);
        if (deepEqual(prev, draft)) return prev;
        return draft;
      });
    },
    [setSaveFile],
  );

  const replaceSave: SaveContextValue['replaceSave'] = useCallback(
    (next) => {
      setSaveFile(next);
      setOriginalSaveFile(
        next
          ? typeof structuredClone === 'function'
            ? structuredClone(next)
            : JSON.parse(JSON.stringify(next))
          : null,
      );
    },
    [setSaveFile, setOriginalSaveFile],
  );

  const revertSave: SaveContextValue['revertSave'] = useCallback(() => {
    setSaveFile((prev) => {
      if (!originalSaveFile) return prev;
      return typeof structuredClone === 'function'
        ? structuredClone(originalSaveFile)
        : JSON.parse(JSON.stringify(originalSaveFile));
    });
  }, [setSaveFile, originalSaveFile]);

  const value = useMemo<SaveContextValue>(
    () => ({
      saveFile,
      setSaveFile,
      originalSaveFile,
      setOriginalSaveFile,

      setSaveFileField,
      patchSave,
      updateSave,

      replaceSave,
      revertSave,
      isDirty,
    }),
    [
      saveFile,
      originalSaveFile,
      setSaveFileField,
      patchSave,
      updateSave,
      replaceSave,
      revertSave,
      isDirty,
    ],
  );

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>;
}

export const useSave = () => {
  const context = useContext(SaveContext);
  if (!context) throw new Error('useSave must be used within a SaveProvider');
  return context;
};

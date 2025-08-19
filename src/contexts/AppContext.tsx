import { useStorageState } from '@hooks';
import type { DeltaruneSave } from '@types';
import { createContext, useContext, useMemo, useState } from 'react';
import { deepEqual } from '@utils';

interface AppContext {
  devmode: boolean;
  setDevmode: (state: boolean) => void;

  isSidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  isSidebarRetracted: boolean;
  setSidebarRetraction: (state: boolean) => void;

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

const Context = createContext<AppContext | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [devmode, setDevmode] = useStorageState('devmode');

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarRetracted, setSidebarRetraction] =
    useStorageState('sidebarRetracted');

  const [saveFile, setSaveFile] = useStorageState('saveFile');
  // Original copy used for changes tracking and revert
  const [originalSaveFile, setOriginalSaveFile] =
    useStorageState('originalSaveFile');

  const isDirty = useMemo(
    () => !deepEqual(saveFile, originalSaveFile),
    [saveFile, originalSaveFile],
  );

  const setSaveFileField: AppContext['setSaveFileField'] = (key, value) => {
    setSaveFile((prev) => {
      if (!prev) return prev;
      // Only update keys that exist on the current variant
      if (!(key in prev)) return prev;
      // Shallow merge for the specific field without TS whining
      const nextSave = { ...prev } as DeltaruneSave & Record<string, unknown>;
      // This doesn't look like how it should be done but works for now
      (nextSave as Record<string, unknown>)[key as unknown as string] =
        value as unknown;
      return nextSave;
    });
  };

  const patchSave: AppContext['patchSave'] = (partial) => {
    setSaveFile((prev) => {
      if (!prev) return prev;
      return { ...prev, ...partial } as DeltaruneSave;
    });
  };

  const updateSave: AppContext['updateSave'] = (updater) => {
    setSaveFile((prev) => {
      if (!prev) return prev;
      // Deep copy then apply recipe
      const draft: DeltaruneSave =
        typeof structuredClone === 'function'
          ? structuredClone(prev)
          : JSON.parse(JSON.stringify(prev));
      updater(draft);
      // If nothing changed, avoid re-render
      if (deepEqual(prev, draft)) return prev;
      return draft;
    });
  };

  const replaceSave: AppContext['replaceSave'] = (next) => {
    setSaveFile(next);
    setOriginalSaveFile(
      next
        ? typeof structuredClone === 'function'
          ? structuredClone(next)
          : JSON.parse(JSON.stringify(next))
        : null,
    );
  };

  const revertSave: AppContext['revertSave'] = () => {
    setSaveFile((prev) => {
      if (!originalSaveFile) return prev;
      return typeof structuredClone === 'function'
        ? structuredClone(originalSaveFile)
        : JSON.parse(JSON.stringify(originalSaveFile));
    });
  };

  const value = useMemo<AppContext>(
    () => ({
      devmode,
      setDevmode,

      isSidebarOpen,
      setSidebarOpen,
      isSidebarRetracted,
      setSidebarRetraction,

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
      devmode,
      isSidebarOpen,
      isSidebarRetracted,
      saveFile,
      originalSaveFile,
      isDirty,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useApp = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

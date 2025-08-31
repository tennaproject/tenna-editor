import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { STORE_NAMESPACE } from './schema';
import type { DeltaruneSave } from '@types';
import { deepEqual } from '@utils';
import { createDebouncedJSONStorage } from 'zustand-debounce';

interface SaveState {
  saveFile: DeltaruneSave | null;
  originalSaveFile: DeltaruneSave | null;

  setSaveFile: (file: DeltaruneSave | null) => void;
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

export const useSave = create<SaveState>()(
  persist(
    immer((set, get) => {
      const computeIsDirty = (
        saveFile: DeltaruneSave | null,
        original: DeltaruneSave | null,
      ) => !deepEqual(saveFile, original);

      return {
        saveFile: null,
        originalSaveFile: null,
        isDirty: false,

        setSaveFile: (file: DeltaruneSave | null) =>
          set((state) => {
            state.saveFile = file;
            state.isDirty = computeIsDirty(
              state.saveFile,
              state.originalSaveFile,
            );
          }),

        setOriginalSaveFile: (file: DeltaruneSave | null) =>
          set((state) => {
            state.originalSaveFile = file
              ? typeof structuredClone === 'function'
                ? (structuredClone(file) as DeltaruneSave)
                : JSON.parse(JSON.stringify(file))
              : null;
            state.isDirty = computeIsDirty(
              state.saveFile,
              state.originalSaveFile,
            );
          }),

        setSaveFileField: (key, value) =>
          set((state) => {
            if (!state.saveFile) return;
            if (!(key in state.saveFile)) return;
            (state.saveFile as DeltaruneSave)[key] = value;
            state.isDirty = computeIsDirty(
              state.saveFile,
              state.originalSaveFile,
            );
          }),

        patchSave: (partial) =>
          set((state) => {
            if (!state.saveFile) return;
            Object.assign(state.saveFile as DeltaruneSave, partial);
            state.isDirty = computeIsDirty(
              state.saveFile,
              state.originalSaveFile,
            );
          }),

        updateSave: (updater) => {
          const prev = get().saveFile;
          if (!prev) return;
          const draft: DeltaruneSave =
            typeof structuredClone === 'function'
              ? (structuredClone(prev) as DeltaruneSave)
              : JSON.parse(JSON.stringify(prev));
          updater(draft);
          if (deepEqual(prev, draft)) return;
          set((state) => {
            state.saveFile = draft;
            state.isDirty = computeIsDirty(
              state.saveFile,
              state.originalSaveFile,
            );
          });
        },

        replaceSave: (next) => {
          set((state) => {
            state.saveFile = next;
            state.originalSaveFile = next
              ? typeof structuredClone === 'function'
                ? (structuredClone(next) as DeltaruneSave)
                : JSON.parse(JSON.stringify(next))
              : null;
            state.isDirty = computeIsDirty(
              state.saveFile,
              state.originalSaveFile,
            );
          });
        },

        revertSave: () =>
          set((state) => {
            if (!state.originalSaveFile) return;
            state.saveFile =
              typeof structuredClone === 'function'
                ? (structuredClone(state.originalSaveFile) as DeltaruneSave)
                : JSON.parse(JSON.stringify(state.originalSaveFile));
            state.isDirty = computeIsDirty(
              state.saveFile,
              state.originalSaveFile,
            );
          }),
      };
    }),
    {
      name: `${STORE_NAMESPACE}-save-v1`,
      storage: createDebouncedJSONStorage('localStorage', {
        debounceTime: 2000,
      }),
      partialize: (state) => ({
        saveFile: state.saveFile,
        originalSaveFile: state.originalSaveFile,
      }),
      version: 1,
    },
  ),
);

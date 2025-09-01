import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { STORE_NAMESPACE, STORE_VERSION } from './schema';
import type { DeltaruneSave } from '@types';
import { deepEqual } from '@utils';
import { createDebouncedJSONStorage } from 'zustand-debounce';

interface SaveState {
  save: DeltaruneSave | null;
  originalSave: DeltaruneSave | null;

  setSave: (save: DeltaruneSave | null) => void;

  setSaveField: <K extends keyof DeltaruneSave>(
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
        save: DeltaruneSave | null,
        original: DeltaruneSave | null,
      ) => !deepEqual(save, original);

      return {
        save: null,
        originalSave: null,
        isDirty: false,

        setSave: (file: DeltaruneSave | null) =>
          set((state) => {
            state.save = file;
            state.originalSave = file;
            state.isDirty = computeIsDirty(state.save, state.originalSave);
          }),

        setSaveField: (key, value) =>
          set((state) => {
            if (!state.save) return;
            if (!(key in state.save)) return;
            (state.save as DeltaruneSave)[key] = value;
            state.isDirty = computeIsDirty(state.save, state.originalSave);
          }),

        patchSave: (partial) =>
          set((state) => {
            if (!state.save) return;
            Object.assign(state.save as DeltaruneSave, partial);
            state.isDirty = computeIsDirty(state.save, state.originalSave);
          }),

        updateSave: (updater) => {
          const prev = get().save;
          if (!prev) return;
          const draft: DeltaruneSave =
            typeof structuredClone === 'function'
              ? (structuredClone(prev) as DeltaruneSave)
              : JSON.parse(JSON.stringify(prev));
          updater(draft);
          if (deepEqual(prev, draft)) return;
          set((state) => {
            state.save = draft;
            state.isDirty = computeIsDirty(state.save, state.originalSave);
          });
        },

        replaceSave: (next) => {
          set((state) => {
            state.save = next;
            state.originalSave = next
              ? typeof structuredClone === 'function'
                ? (structuredClone(next) as DeltaruneSave)
                : JSON.parse(JSON.stringify(next))
              : null;
            state.isDirty = computeIsDirty(state.save, state.originalSave);
          });
        },

        revertSave: () =>
          set((state) => {
            if (!state.originalSave) return;
            state.save =
              typeof structuredClone === 'function'
                ? (structuredClone(state.originalSave) as DeltaruneSave)
                : JSON.parse(JSON.stringify(state.originalSave));
            state.isDirty = computeIsDirty(state.save, state.originalSave);
          }),
      };
    }),
    {
      name: `${STORE_NAMESPACE}-save`,
      storage: createDebouncedJSONStorage('localStorage', {
        debounceTime: 2000,
      }),
      partialize: (state) => ({
        save: state.save,
        originalSave: state.originalSave,
      }),
      version: STORE_VERSION,
    },
  ),
);

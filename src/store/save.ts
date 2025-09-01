import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { STORE_NAMESPACE, STORE_VERSION } from './schema';
import type { DeltaruneSave } from '@types';
import { createDebouncedJSONStorage } from 'zustand-debounce';

interface SaveState {
  save: DeltaruneSave | null;
  setSave: (save: DeltaruneSave | null) => void;

  setSaveField: <K extends keyof DeltaruneSave>(
    key: K,
    value: DeltaruneSave[K],
  ) => void;
  patchSave: (partial: Partial<DeltaruneSave>) => void;
  updateSave: (updater: (draft: DeltaruneSave) => void) => void;
}

export const useSave = create<SaveState>()(
  persist(
    immer((set, get) => {
      return {
        save: null,

        setSave: (file: DeltaruneSave | null) =>
          set((state) => {
            state.save = file;
          }),

        setSaveField: (key, value) =>
          set((state) => {
            if (!state.save) return;
            if (!(key in state.save)) return;

            (state.save as DeltaruneSave)[key] = value;
            state.save.meta.modifiedAt = new Date();
          }),

        patchSave: (partial) =>
          set((state) => {
            if (!state.save) return;
            Object.assign(state.save as DeltaruneSave, partial);
          }),

        updateSave: (updater) => {
          const save = get().save;

          if (!save) return;
          const draft: DeltaruneSave =
            typeof structuredClone === 'function'
              ? (structuredClone(save) as DeltaruneSave)
              : JSON.parse(JSON.stringify(save));
          updater(draft);
          set((state) => {
            state.save = draft;
            state.save.meta.modifiedAt = new Date();
          });
        },
      };
    }),
    {
      name: `${STORE_NAMESPACE}-save`,
      storage: createDebouncedJSONStorage('localStorage', {
        debounceTime: 2000,
      }),
      partialize: (state) => ({
        save: state.save,
      }),
      version: STORE_VERSION,
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { STORE_NAMESPACE } from './schema';
import { SAVE_SCHEMA, type Save } from '@types';
import { createDebouncedJSONStorage } from 'zustand-debounce';
import { saveStorage, toast } from '@services';

const SYNC_DELAY = 300;
let syncTimer: number | null = null;
function sync() {
  if (syncTimer) window.clearTimeout(syncTimer);

  syncTimer = window.setTimeout(() => {
    useSave.getState().saveNow();
  }, SYNC_DELAY);
}

interface SaveState {
  save: Save | null;
  activeSaveId: string | null;
  setSave: (save: Save | null) => void;

  setSaveField: <K extends keyof Save>(key: K, value: Save[K]) => void;
  patchSave: (partial: Partial<Save>) => void;
  updateSave: (updater: (draft: Save) => void) => void;

  saveNow: () => Promise<void>;
  switchSave: (id: string) => Promise<void>;
  initializeSave: () => Promise<void>;
}

export const useSave = create<SaveState>()(
  persist(
    immer((set, get) => {
      return {
        save: null,
        activeSaveId: null,

        setSave: (save: Save | null) =>
          set((state) => {
            state.save = save;
            state.activeSaveId = save?.meta.id ?? null;
          }),

        setSaveField: (key, value) =>
          set((state) => {
            if (!state.save) return;
            if (!(key in state.save)) return;

            (state.save as Save)[key] = value;
            state.save.meta.modifiedAt = new Date();
            sync();
          }),

        patchSave: (partial) =>
          set((state) => {
            if (!state.save) return;
            Object.assign(state.save as Save, partial);
            sync();
          }),

        updateSave: (updater) =>
          set((state) => {
            if (!state.save) return;

            updater(state.save as Save);
            state.save.meta.modifiedAt = new Date();
            sync();
          }),

        saveNow: async () => {
          const { activeSaveId, save } = get();
          if (!activeSaveId || !save) return;
          await saveStorage.set(activeSaveId, save);
        },

        switchSave: async (id: string) => {
          await get().saveNow();
          const newSave = await saveStorage.get(id);
          if (newSave) {
            set((state) => {
              state.save = newSave ?? null;
              state.activeSaveId = id;
            });

            toast(`Switched to save "${newSave.meta.name}"`, 'success');
          } else {
            toast('Error occured while switching to new save', 'error');
          }
        },

        initializeSave: async () => {
          const id = get().activeSaveId;
          if (!id) return;
          const save = await saveStorage.get(id);
          set((state) => {
            state.save = save ?? null;
          });
        },
      };
    }),
    {
      name: `${STORE_NAMESPACE}-save`,
      storage: createDebouncedJSONStorage('localStorage', {
        debounceTime: 300,
      }),
      partialize: (state) => ({
        activeSaveId: state.activeSaveId,
      }),
      onRehydrateStorage: (state) => () => {
        void state.initializeSave();
      },
      version: 2,
      migrate: async (state, version) => {
        if (version < 2) {
          interface SaveSchemaV1 {
            save: {
              meta?: {
                id?: string;
                format?: 'v1' | 'v2' | 1 | 2;
                schema: typeof SAVE_SCHEMA | undefined;
              };
              characterName?: string;
              [key: string]: unknown;
            };
          }

          const saveStoreV1 = state as SaveSchemaV1;

          // Stuff that got changed since schema V1
          const format = saveStoreV1?.save?.meta?.format;
          const characterName = saveStoreV1?.save?.characterName ?? '';

          const id = saveStoreV1?.save?.meta?.id;
          const schema = SAVE_SCHEMA;

          // Return blank when id is set to none or something completely broke
          if (typeof saveStoreV1 !== 'object' || !id || id === '')
            return { activeSaveId: null };

          // Migrate active save
          delete saveStoreV1.save.characterName;
          if (saveStoreV1.save.meta?.format) {
            saveStoreV1.save.meta.format = format === 'v1' ? 1 : 2;
          }

          const migratedSave: Save = saveStoreV1.save as unknown as Save;
          migratedSave.vesselName = characterName;
          migratedSave.meta.schema = schema;

          await saveStorage.set(migratedSave.meta.id, migratedSave);

          // Migrate other saves
          const saves = await saveStorage.getAll();
          saves.forEach((save) => {
            if (!save.meta.schema) {
              save.meta.schema = SAVE_SCHEMA;
              if ((save.meta.format as unknown) === 'v1') {
                (save.meta.format as 1 | 2) = 1;
              } else {
                (save.meta.format as 1 | 2) = 2;
              }
            }
          });
          await saveStorage.migrate(saves);

          return { activeSaveId: id };
        }
        return state;
      },
    },
  ),
);

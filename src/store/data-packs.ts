import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { DataPack } from '@types';
import { upsertDataPack } from '@utils/data-packs';
import { STORE_NAMESPACE } from './schema';

interface DataPackState {
  packs: DataPack[];
  install: (pack: DataPack) => void;
  remove: (id: string) => void;
  importLegacy: (packs: DataPack[]) => void;
}

export const useDataPacks = create<DataPackState>()(
  persist(
    (set) => ({
      packs: [],
      install: (pack) =>
        set((state) => ({ packs: upsertDataPack(state.packs, pack) })),
      remove: (id) =>
        set((state) => ({
          packs: state.packs.filter((pack) => pack.id !== id),
        })),
      importLegacy: (packs) =>
        set((state) => ({
          packs: [
            ...state.packs,
            ...packs.filter(
              (pack) =>
                !state.packs.some((existing) => existing.id === pack.id),
            ),
          ],
        })),
    }),
    {
      name: `${STORE_NAMESPACE}-data-packs`,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ packs: state.packs }),
    },
  ),
);

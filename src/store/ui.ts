import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { STORE_NAMESPACE } from './schema';

interface UiState {
  devmode: boolean;
  isSidebarOpen: boolean;
  isSidebarRetracted: boolean;
  setDevmode: (devmode: boolean) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarRetraction: (isRetracted: boolean) => void;
  allowNonStandardParty: boolean;
  setAllowNonStandardParty: (allowNonStandardParty: boolean) => void;
}

export const useUi = create<UiState>()(
  persist(
    immer((set, _get) => ({
      devmode: false,
      isSidebarOpen: false,
      isSidebarRetracted: false,
      setDevmode: (devmode: boolean) =>
        set((state) => {
          state.devmode = devmode;
        }),
      setSidebarOpen: (isOpen: boolean) =>
        set((state) => {
          state.isSidebarOpen = isOpen;
        }),
      setSidebarRetraction: (isRetracted: boolean) =>
        set((state) => {
          state.isSidebarRetracted = isRetracted;
        }),
      allowNonStandardParty: false,
      setAllowNonStandardParty: (allowNonStandardParty: boolean) =>
        set((state) => {
          state.allowNonStandardParty = allowNonStandardParty;
        }),
    })),
    {
      name: `${STORE_NAMESPACE}-ui-v1`,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        devmode: state.devmode,
        isSidebarRetracted: state.isSidebarRetracted,
        allowNonStandardParty: state.allowNonStandardParty,
      }),
      version: 1,
    },
  ),
);

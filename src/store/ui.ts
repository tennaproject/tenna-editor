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
  allowKrisAllElements: boolean;
  setAllowKrisAllElements: (status: boolean) => void;
  allowSusieAllElements: boolean;
  setAllowSusieAllElements: (status: boolean) => void;
  allowRalseiAllElements: boolean;
  setAllowRalseiAllElements: (status: boolean) => void;
  allowNoelleAllElements: boolean;
  setAllowNoelleAllElements: (status: boolean) => void;
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
      allowKrisAllElements: false,
      setAllowKrisAllElements: (status: boolean) =>
        set((state) => {
          state.allowKrisAllElements = status;
        }),
      allowSusieAllElements: false,
      setAllowSusieAllElements: (status: boolean) =>
        set((state) => {
          state.allowSusieAllElements = status;
        }),
      allowRalseiAllElements: false,
      setAllowRalseiAllElements: (status: boolean) =>
        set((state) => {
          state.allowRalseiAllElements = status;
        }),
      allowNoelleAllElements: false,
      setAllowNoelleAllElements: (status: boolean) =>
        set((state) => {
          state.allowNoelleAllElements = status;
        }),
    })),
    {
      name: `${STORE_NAMESPACE}-ui-v1`,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        devmode: state.devmode,
        isSidebarRetracted: state.isSidebarRetracted,
        allowNonStandardParty: state.allowNonStandardParty,
        allowKrisAllElements: state.allowKrisAllElements,
        allowSusieAllElements: state.allowSusieAllElements,
        allowRalseiAllElements: state.allowRalseiAllElements,
        allowNoelleAllElements: state.allowNoelleAllElements,
      }),
      version: 1,
    },
  ),
);

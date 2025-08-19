import { createContext, useContext, useMemo, useState } from 'react';
import { useStorageState } from '@hooks';

export interface UiContextValue {
  devmode: boolean;
  setDevmode: (state: boolean) => void;

  isSidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  isSidebarRetracted: boolean;
  setSidebarRetraction: (state: boolean) => void;
}

const UiContext = createContext<UiContextValue | undefined>(undefined);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [devmode, setDevmode] = useStorageState('devmode');

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarRetracted, setSidebarRetraction] =
    useStorageState('sidebarRetracted');

  const value = useMemo<UiContextValue>(
    () => ({
      devmode,
      setDevmode,

      isSidebarOpen,
      setSidebarOpen,
      isSidebarRetracted,
      setSidebarRetraction,
    }),
    [devmode, isSidebarOpen, isSidebarRetracted],
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) throw new Error('useUi must be used within an UiProvider');
  return context;
};

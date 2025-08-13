import { useStorageState } from '@/hooks';
import type { DeltaruneSave } from '@/types';
import { createContext, useContext, useMemo, useState } from 'react';

interface AppContext {
  isSidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  isSidebarRetracted: boolean;
  setSidebarRetraction: (state: boolean) => void;
  saveFile: DeltaruneSave | null;
  setSaveFile: (file: DeltaruneSave | null) => void;
}

const Context = createContext<AppContext | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarRetracted, setSidebarRetraction] =
    useStorageState('sidebarRetracted');
  const [saveFile, setSaveFile] = useState<DeltaruneSave | null>(null);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      setSidebarOpen,
      isSidebarRetracted,
      setSidebarRetraction,
      saveFile,
      setSaveFile,
    }),
    [isSidebarOpen, isSidebarRetracted, saveFile],
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

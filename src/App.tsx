import { BrowserRouter } from 'react-router-dom';
import {
  createContext,
  Suspense,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';

import { AppRouter } from './router';
import { Sidebar, Header, ToastContainer } from '@components';
import {
  useUi,
  useSave,
  type UiContextValue,
  type SaveContextValue,
  UiProvider,
  SaveProvider,
} from '@contexts';

// temporary legacy context and hook until I sort this out
const LegacyContext = createContext<AppContext | undefined>(undefined);

function LegacyBridge({ children }: PropsWithChildren) {
  const ui = useUi();
  const save = useSave();

  const value = useMemo<AppContext>(
    () => ({
      ...ui,
      ...save,
    }),
    [ui, save],
  );

  return (
    <LegacyContext.Provider value={value}>{children}</LegacyContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(LegacyContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export type AppContext = UiContextValue & SaveContextValue;

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <UiProvider>
      <SaveProvider>
        <LegacyBridge>{children}</LegacyBridge>
      </SaveProvider>
    </UiProvider>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastContainer />
        <div className="h-full bg-surface-1">
          <main className="h-full flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 flex min-h-0 relative">
              <Sidebar>
                <Sidebar.Menu />
              </Sidebar>

              <div className="flex-1 min-h-0 min-w-0 bg-surface-2">
                <Suspense fallback={<div>Loading…</div>}>
                  <AppRouter />
                </Suspense>
              </div>

              <Sidebar.Overlay />
            </div>
          </main>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

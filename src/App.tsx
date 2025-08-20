import { BrowserRouter } from 'react-router-dom';
import { Suspense, type PropsWithChildren } from 'react';

import { AppRouter } from './router';
import { Sidebar, Header, ToastContainer } from '@components';
import {
  type UiContextValue,
  type SaveContextValue,
  UiProvider,
  SaveProvider,
} from '@contexts';

export type AppContext = UiContextValue & SaveContextValue;

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <UiProvider>
      <SaveProvider>{children}</SaveProvider>
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

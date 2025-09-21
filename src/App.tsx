import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import { AppRouter } from './router';
import { Sidebar, Header, ToastContainer } from '@components';
import { useSave } from '@store';
import { MotionConfig } from 'framer-motion';

export function App() {
  const hasInitialized = useSave((s) => s.hasInitialized);

  if (!hasInitialized) {
    return;
  }

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
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
      </BrowserRouter>
    </MotionConfig>
  );
}

import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import { AppRouter } from './router';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { Header } from '@components/Header';
import { LastSubtabTracker } from '@components/LastSubtabTracker';
import { Sidebar } from '@components/Sidebar';
import { ToastContainer } from '@components/Toast';
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
        <LastSubtabTracker />
        <ToastContainer />
        <div className="h-full bg-surface-1">
          <main className="h-full flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 flex min-h-0 relative">
              <Sidebar>
                <Sidebar.Menu />
              </Sidebar>

              <div className="flex-1 min-h-0 min-w-0 bg-surface-2">
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading…</div>}>
                    <AppRouter />
                  </Suspense>
                </ErrorBoundary>
              </div>

              <Sidebar.Overlay />
            </div>
          </main>
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

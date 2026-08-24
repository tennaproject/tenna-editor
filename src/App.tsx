import { BrowserRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';

import { AppRouter } from './router';
import {
  ErrorBoundary,
  Header,
  LastSubtabTracker,
  ShareImport,
  Sidebar,
  ToastContainer,
} from '@components';
import { useSave, useUi } from '@store';
import { MotionConfig } from 'framer-motion';
import { translate } from '@i18n';

export function App() {
  const hasInitialized = useSave((s) => s.hasInitialized);
  const locale = useUi((s) => s.ui.locale);

  useEffect(() => {
    document.documentElement.dataset.locale = locale;
    document.documentElement.lang = locale === 'en' ? 'en' : locale;
  }, [locale]);

  if (!hasInitialized) {
    return;
  }

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <LastSubtabTracker />
        <ShareImport />
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
                  <Suspense
                    fallback={
                      <div>
                        {translate('ui.common.loading', 'Loading...', locale)}
                      </div>
                    }
                  >
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

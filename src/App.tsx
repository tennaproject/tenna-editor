import { BrowserRouter } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react';

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
import { getSideBPhase, playSound } from '@utils';
import { MotionConfig } from 'framer-motion';
import { translate } from '@i18n';
import ominousJingle from '@assets/deltarune/sounds/snd_ominous.wav';
import ominousCancel from '@assets/deltarune/sounds/snd_ominous_cancel.wav';

export function App() {
  const hasInitialized = useSave((s) => s.hasInitialized);
  const locale = useUi((s) => s.ui.locale);
  const sideBPhase = useSave((s) => (s.save ? getSideBPhase(s.save) : 0));
  const saveId = useSave((s) => s.save?.meta.id);
  const lastSideBRef = useRef<{ saveId?: string; phase: number } | null>(null);

  useEffect(() => {
    document.documentElement.dataset.locale = locale;
    document.documentElement.lang = locale === 'en' ? 'en' : locale;
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;
    if (sideBPhase === 0) delete root.dataset.sideB;
    else root.dataset.sideB = sideBPhase >= 3 ? 'full' : 'light';
  }, [sideBPhase]);

  useEffect(() => {
    if (!hasInitialized) return;
    const last = lastSideBRef.current;
    lastSideBRef.current = { saveId, phase: sideBPhase };
    if (!last) return;
    if (last.phase === 0 && sideBPhase > 0) {
      playSound(ominousJingle);
    } else if (last.saveId === saveId && last.phase > 0 && sideBPhase === 0) {
      playSound(ominousCancel);
    }
  }, [hasInitialized, saveId, sideBPhase]);

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

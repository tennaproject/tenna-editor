import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  AboutPage,
  HomePage,
  InventoryPage,
  PartyPage,
  RecruitsPage,
  LightWorldPage,
  DarkWorldPage,
  SettingsPage,
} from './pages';
import { toast } from '@services';
import type { ReactElement } from 'react';
import { DevtoolsPage } from '@devtools';
import { useSave, useUi } from '@store';

interface RequireDevmodeProps {
  children: ReactElement;
}

function RequireDevmode({ children }: RequireDevmodeProps) {
  const devmode = useUi((s) => s.devmode);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!devmode && !shownRef.current) {
      toast('Developer mode is not enabled', 'error');
      shownRef.current = true;
    }

    if (devmode) {
      shownRef.current = false;
    }
  }, [devmode]);

  if (!devmode) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

interface RequireSaveProps {
  children: ReactElement;
}

function RequireSave({ children }: RequireSaveProps) {
  const saveFile = useSave((s) => s.saveFile);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!saveFile && !shownRef.current) {
      toast('There is no save loaded', 'error');
      shownRef.current = true;
    }

    if (saveFile) {
      shownRef.current = false;
    }
  }, [saveFile]);

  if (!saveFile) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname.split('/')[1] || 'root'}
      >
        <Route path="/" element={<Navigate to="/home" replace />}></Route>
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<HomePage.Overview />}></Route>
          <Route path="upload" element={<HomePage.Upload />}></Route>
          <Route path="download" element={<HomePage.Download />}></Route>
          <Route path="saves-list" element={<HomePage.SavesList />}></Route>
          <Route path="*" element={<Navigate to="overview" replace />} />
        </Route>
        <Route path="/about" element={<AboutPage />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<AboutPage.Overview />}></Route>
          <Route path="changelog" element={<AboutPage.Changelog />}></Route>
          <Route path="license" element={<AboutPage.License />}></Route>
          <Route
            path="attributions"
            element={<AboutPage.Attributions />}
          ></Route>
        </Route>
        <Route
          path="/inventory"
          element={
            <RequireSave>
              <InventoryPage />
            </RequireSave>
          }
        >
          <Route index element={<Navigate to="consumables" replace />} />
          <Route
            path="consumables"
            element={<InventoryPage.Consumables />}
          ></Route>
          <Route path="key-items" element={<InventoryPage.KeyItems />}></Route>
          <Route path="weapons" element={<InventoryPage.Weapons />}></Route>
          <Route path="armors" element={<InventoryPage.Armors />}></Route>
        </Route>
        <Route
          path="/party"
          element={
            <RequireSave>
              <PartyPage />
            </RequireSave>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<PartyPage.Overview />}></Route>
          <Route path="kris" element={<PartyPage.Kris />}></Route>
          <Route path="susie" element={<PartyPage.Susie />}></Route>
          <Route path="ralsei" element={<PartyPage.Ralsei />}></Route>
          <Route path="noelle" element={<PartyPage.Noelle />}></Route>
        </Route>
        <Route
          path="/recruits"
          element={
            <RequireSave>
              <RecruitsPage />
            </RequireSave>
          }
        ></Route>
        <Route
          path="/light-world"
          element={
            <RequireSave>
              <LightWorldPage />
            </RequireSave>
          }
        ></Route>
        <Route
          path="/dark-world"
          element={
            <RequireSave>
              <DarkWorldPage />
            </RequireSave>
          }
        ></Route>
        <Route
          path="/devtools"
          element={
            <RequireDevmode>
              <DevtoolsPage />
            </RequireDevmode>
          }
        >
          <Route index element={<Navigate to="colors" replace />} />
          <Route path="colors" element={<DevtoolsPage.Colors />} />
        </Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

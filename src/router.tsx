import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RequireChapter, RequireDevmode, RequireSave } from '@guards';
import { Loading } from '@components';

// Home
const HomePage = React.lazy(() =>
  import('./pages/Home').then((module) => ({ default: module.HomePage })),
);
const HomeOverview = React.lazy(() =>
  import('./pages/Home/Overview').then((module) => ({
    default: module.Overview,
  })),
);
const HomeUpload = React.lazy(() =>
  import('./pages/Home/Upload').then((module) => ({ default: module.Upload })),
);
const HomeDownload = React.lazy(() =>
  import('./pages/Home/Download').then((module) => ({
    default: module.Download,
  })),
);
const HomeSavesList = React.lazy(() =>
  import('./pages/Home/SavesList').then((module) => ({
    default: module.SavesList,
  })),
);

// Inventory
const InventoryPage = React.lazy(() =>
  import('./pages/Inventory').then((module) => ({
    default: module.InventoryPage,
  })),
);
const InventoryConsumables = React.lazy(() =>
  import('./pages/Inventory/Consumables').then((module) => ({
    default: module.Consumables,
  })),
);
const InventoryKeyItems = React.lazy(() =>
  import('./pages/Inventory/KeyItems').then((module) => ({
    default: module.KeyItems,
  })),
);
const InventoryWeapons = React.lazy(() =>
  import('./pages/Inventory/Weapons').then((module) => ({
    default: module.Weapons,
  })),
);
const InventoryArmors = React.lazy(() =>
  import('./pages/Inventory/Armors').then((module) => ({
    default: module.Armors,
  })),
);

// Party
const PartyPage = React.lazy(() =>
  import('./pages/Party').then((module) => ({ default: module.PartyPage })),
);
const PartyOverview = React.lazy(() =>
  import('./pages/Party/Overview').then((module) => ({
    default: module.Overview,
  })),
);
const PartyKris = React.lazy(() =>
  import('./pages/Party/Kris').then((module) => ({ default: module.Kris })),
);
const PartySusie = React.lazy(() =>
  import('./pages/Party/Susie').then((module) => ({ default: module.Susie })),
);
const PartyRalsei = React.lazy(() =>
  import('./pages/Party/Ralsei').then((module) => ({ default: module.Ralsei })),
);
const PartyNoelle = React.lazy(() =>
  import('./pages/Party/Noelle').then((module) => ({ default: module.Noelle })),
);

// Light World
const LightWorldPage = React.lazy(() =>
  import('./pages/LightWorld').then((module) => ({
    default: module.LightWorldPage,
  })),
);

// Dark World
const DarkWorldPage = React.lazy(() =>
  import('./pages/DarkWorld').then((module) => ({
    default: module.DarkWorldPage,
  })),
);

// Recruits
const RecruitsPage = React.lazy(() =>
  import('./pages/Recruits').then((module) => ({
    default: module.RecruitsPage,
  })),
);

// Devtools
const DevtoolsPage = React.lazy(() =>
  import('@devtools').then((module) => ({ default: module.DevtoolsPage })),
);

const DevtoolsColors = React.lazy(() =>
  import('@devtools/pages/Colors').then((module) => ({
    default: module.Colors,
  })),
);

// Settings
const SettingsPage = React.lazy(() =>
  import('./pages/Settings').then((module) => ({
    default: module.SettingsPage,
  })),
);

// About
const AboutPage = React.lazy(() =>
  import('./pages/About').then((module) => ({ default: module.AboutPage })),
);
const AboutOverview = React.lazy(() =>
  import('./pages/About/Overview').then((module) => ({
    default: module.Overview,
  })),
);
const AboutChangelog = React.lazy(() =>
  import('./pages/About/Changelog').then((module) => ({
    default: module.Changelog,
  })),
);
const AboutLicense = React.lazy(() =>
  import('./pages/About/License').then((module) => ({
    default: module.License,
  })),
);
const AboutAttributions = React.lazy(() =>
  import('./pages/About/Attributions').then((module) => ({
    default: module.Attributions,
  })),
);

export function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading />}>
        <Routes
          location={location}
          key={location.pathname.split('/')[1] || 'root'}
        >
          <Route path="/" element={<Navigate to="/home" replace />}></Route>
          <Route path="/home" element={<HomePage />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<HomeOverview />}></Route>
            <Route path="upload" element={<HomeUpload />}></Route>
            <Route path="download" element={<HomeDownload />}></Route>
            <Route path="saves-list" element={<HomeSavesList />}></Route>
            <Route path="*" element={<Navigate to="overview" replace />} />
          </Route>
          <Route path="/about" element={<AboutPage />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AboutOverview />}></Route>
            <Route path="changelog" element={<AboutChangelog />}></Route>
            <Route path="license" element={<AboutLicense />}></Route>
            <Route path="attributions" element={<AboutAttributions />}></Route>
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
              element={<InventoryConsumables />}
            ></Route>
            <Route path="key-items" element={<InventoryKeyItems />}></Route>
            <Route path="weapons" element={<InventoryWeapons />}></Route>
            <Route path="armors" element={<InventoryArmors />}></Route>
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
            <Route path="overview" element={<PartyOverview />}></Route>
            <Route path="kris" element={<PartyKris />}></Route>
            <Route path="susie" element={<PartySusie />}></Route>
            <Route path="ralsei" element={<PartyRalsei />}></Route>
            <Route
              path="noelle"
              element={
                <RequireChapter requiredChapter={2}>
                  <PartyNoelle />
                </RequireChapter>
              }
            ></Route>
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
            <Route path="colors" element={<DevtoolsColors />} />
          </Route>
          <Route path="/settings" element={<SettingsPage />}></Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

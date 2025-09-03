import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RequireChapter, RequireDevmode, RequireSave } from '@guards';
import { Loading } from '@components';
import { useSave } from '@store';

// Home
const HomeRoot = React.lazy(() =>
  import('./pages/Home/Root').then((module) => ({
    default: module.HomeRoot,
  })),
);
const HomeOverview = React.lazy(() =>
  import('./pages/Home/Overview').then((module) => ({
    default: module.HomeOverview,
  })),
);
const HomeWelcome = React.lazy(() =>
  import('./pages/Home/Welcome').then((module) => ({
    default: module.HomeWelcome,
  })),
);

// Inventory
const InventoryRoot = React.lazy(() =>
  import('./pages/Inventory/Root').then((module) => ({
    default: module.InventoryRoot,
  })),
);
const InventoryConsumables = React.lazy(() =>
  import('./pages/Inventory/Consumables').then((module) => ({
    default: module.InventoryConsumables,
  })),
);
const InventoryKeyItems = React.lazy(() =>
  import('./pages/Inventory/KeyItems').then((module) => ({
    default: module.InventoryKeyItems,
  })),
);
const InventoryWeapons = React.lazy(() =>
  import('./pages/Inventory/Weapons').then((module) => ({
    default: module.InventoryWeapons,
  })),
);
const InventoryArmors = React.lazy(() =>
  import('./pages/Inventory/Armors').then((module) => ({
    default: module.InventoryArmors,
  })),
);

// Party
const PartyRoot = React.lazy(() =>
  import('./pages/Party/Root').then((module) => ({
    default: module.PartyRoot,
  })),
);
const PartyOverview = React.lazy(() =>
  import('./pages/Party/Overview').then((module) => ({
    default: module.PartyOverview,
  })),
);
const PartyKris = React.lazy(() =>
  import('./pages/Party/Kris').then((module) => ({
    default: module.PartyKris,
  })),
);
const PartySusie = React.lazy(() =>
  import('./pages/Party/Susie').then((module) => ({
    default: module.PartySusie,
  })),
);
const PartyRalsei = React.lazy(() =>
  import('./pages/Party/Ralsei').then((module) => ({
    default: module.PartyRalsei,
  })),
);
const PartyNoelle = React.lazy(() =>
  import('./pages/Party/Noelle').then((module) => ({
    default: module.PartyNoelle,
  })),
);

// Light World
const LightWorldRoot = React.lazy(() =>
  import('./pages/LightWorld/Root').then((module) => ({
    default: module.LightWorldRoot,
  })),
);

// Dark World
const DarkWorldRoot = React.lazy(() =>
  import('./pages/DarkWorld/Root').then((module) => ({
    default: module.DarkWorldRoot,
  })),
);

// Recruits
const RecruitsRoot = React.lazy(() =>
  import('./pages/Recruits/Root').then((module) => ({
    default: module.RecruitsRoot,
  })),
);

// Devtools
const DevtoolsRoot = React.lazy(() =>
  import('@devtools/pages/Root').then((module) => ({
    default: module.DevtoolsRoot,
  })),
);

const DevtoolsColors = React.lazy(() =>
  import('@devtools/pages/Colors').then((module) => ({
    default: module.DevtoolsColors,
  })),
);

// Settings
const SettingsPage = React.lazy(() =>
  import('./pages/Settings/Root').then((module) => ({
    default: module.SettingsRoot,
  })),
);

// About
const AboutPage = React.lazy(() =>
  import('./pages/About/Root').then((module) => ({
    default: module.AboutRoot,
  })),
);
const AboutOverview = React.lazy(() =>
  import('./pages/About/Overview').then((module) => ({
    default: module.AboutOverview,
  })),
);
const AboutChangelog = React.lazy(() =>
  import('./pages/About/Changelog').then((module) => ({
    default: module.AboutChangelog,
  })),
);
const AboutLicense = React.lazy(() =>
  import('./pages/About/License').then((module) => ({
    default: module.AboutLicense,
  })),
);
const AboutAttributions = React.lazy(() =>
  import('./pages/About/Attributions').then((module) => ({
    default: module.AboutAttributions,
  })),
);

export function AppRouter() {
  const location = useLocation();
  const save = useSave.getState().save;

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading />}>
        <Routes
          location={location}
          key={location.pathname.split('/')[1] || 'root'}
        >
          <Route path="/" element={<Navigate to="/home" replace />}></Route>
          <Route path="/home" element={<HomeRoot />}>
            <Route
              index
              element={
                save ? (
                  <Navigate to="overview" replace />
                ) : (
                  <Navigate to="welcome" replace />
                )
              }
            />
            <Route path="overview" element={<HomeOverview />}></Route>
            <Route path="welcome" element={<HomeWelcome />}></Route>
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
                <InventoryRoot />
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
                <PartyRoot />
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
                <RequireChapter requiredChapter={2}>
                  <RecruitsRoot />
                </RequireChapter>
              </RequireSave>
            }
          ></Route>
          <Route
            path="/light-world"
            element={
              <RequireSave>
                <LightWorldRoot />
              </RequireSave>
            }
          ></Route>
          <Route
            path="/dark-world"
            element={
              <RequireSave>
                <DarkWorldRoot />
              </RequireSave>
            }
          ></Route>
          <Route
            path="/devtools"
            element={
              <RequireDevmode>
                <DevtoolsRoot />
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

import { Navigate, Route, Routes } from 'react-router-dom';
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

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />}></Route>
      <Route path="/home" element={<HomePage />}>
        <Route index element={<Navigate to="upload" replace />} />
        <Route path="upload" element={<HomePage.Upload />}></Route>
        <Route path="download" element={<HomePage.Download />}></Route>
        <Route path="saves-list" element={<HomePage.SavesList />}></Route>
        <Route path="*" element={<Navigate to="upload" replace />} />
      </Route>
      <Route path="/about" element={<AboutPage />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AboutPage.Overview />}></Route>
        <Route path="changelog" element={<AboutPage.Changelog />}></Route>
        <Route path="license" element={<AboutPage.License />}></Route>
        <Route path="attributions" element={<AboutPage.Attributions />}></Route>
      </Route>
      <Route path="/inventory" element={<InventoryPage />}>
        <Route index element={<Navigate to="consumables" replace />} />
        <Route
          path="consumables"
          element={<InventoryPage.Consumables />}
        ></Route>
        <Route path="key-items" element={<InventoryPage.KeyItems />}></Route>
        <Route path="weapons" element={<InventoryPage.Weapons />}></Route>
        <Route path="armors" element={<InventoryPage.Armors />}></Route>
      </Route>
      <Route path="/party" element={<PartyPage />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<PartyPage.Overview />}></Route>
        <Route path="kris" element={<PartyPage.Kris />}></Route>
        <Route path="susie" element={<PartyPage.Susie />}></Route>
        <Route path="ralsei" element={<PartyPage.Ralsei />}></Route>
        <Route path="noelle" element={<PartyPage.Noelle />}></Route>
      </Route>
      <Route path="/recruits" element={<RecruitsPage />}></Route>
      <Route path="/light-world" element={<LightWorldPage />}></Route>
      <Route path="/dark-world" element={<DarkWorldPage />}></Route>
      <Route path="/settings" element={<SettingsPage />}></Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

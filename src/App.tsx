import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { AppRouter } from './router';
import { AppProvider } from '@contexts';
import { Sidebar, Header, ToastContainer } from '@components';

import HomeIcon from '@assets/icons/home.svg';
import InventoryIcon from '@assets/icons/briefcase.svg';
import PartyIcon from '@assets/icons/contact.svg';
import LightWorldIcon from '@assets/icons/sun-alt.svg';
import DarkWorldIcon from '@assets/icons/moon-stars.svg';
import RecruitsIcon from '@assets/icons/users.svg';
import SettingsIcon from '@assets/icons/sliders.svg';
import AboutIcon from '@assets/icons/book-open.svg';

export const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="h-full bg-surface-1">
          <main className="h-full flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 flex min-h-0 relative">
              <Sidebar>
                <Sidebar.Group>
                  <Sidebar.Item title="Home" icon={<HomeIcon />} to="/home" />
                  <Sidebar.Item
                    title="Inventory"
                    icon={<InventoryIcon />}
                    to="/inventory"
                  />
                  <Sidebar.Item
                    title="Party"
                    icon={<PartyIcon />}
                    to="/party"
                  />
                  <Sidebar.Item
                    title="Light World"
                    icon={<LightWorldIcon />}
                    to="/light-world"
                  />
                  <Sidebar.Item
                    title="Dark World"
                    icon={<DarkWorldIcon />}
                    to="/dark-world"
                  />
                  <Sidebar.Item
                    title="Recruits"
                    icon={<RecruitsIcon />}
                    to="/recruits"
                  />
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.Item
                    title="Settings"
                    icon={<SettingsIcon />}
                    to="/settings"
                  />
                  <Sidebar.Item
                    title="About"
                    icon={<AboutIcon />}
                    to="/about"
                  />
                </Sidebar.Group>
              </Sidebar>

              <div className="flex-1 min-h-0 min-w-0 bg-surface-2">
                <Suspense fallback={<div>Loading…</div>}>
                  <AppRouter />
                </Suspense>
              </div>

              <Sidebar.Overlay />
            </div>
          </main>
          <ToastContainer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

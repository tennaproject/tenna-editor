import { useState, createContext, useContext, type ReactNode } from 'react';
import { Content, Header, Sidebar } from './components';
import HomeIcon from '@assets/icons/home.svg';
import InventoryIcon from '@assets/icons/briefcase.svg';
import PartyIcon from '@assets/icons/contact.svg';
import LightWorldIcon from '@assets/icons/sun-alt.svg';
import DarkWorldIcon from '@assets/icons/moon-stars.svg';
import RecruitsIcon from '@assets/icons/users.svg';
import SettingsIcon from '@assets/icons/sliders.svg';
import AboutIcon from '@assets/icons/book-open.svg';
import { useLocation } from 'react-router-dom';

export interface Subtab {
  title: string;
  route: string;
  element?: ReactNode;
}
export interface Tab {
  title: string;
  route: string;
  element?: ReactNode;
  icon?: ReactNode;
  subtabs?: Record<string, Subtab>;
  footer?: boolean;
}

export const EDITOR_TABS: Record<string, Tab> = {
  home: {
    title: 'Home',
    route: '/home',
    icon: <HomeIcon />,
    subtabs: {
      overview: {
        title: 'Overview',
        element: <Placeholder />,
      },
    },
  },
  inventory: {
    title: 'Inventory',
    route: '/inventory',
    icon: <InventoryIcon />,
    subtabs: {
      consumables: {
        title: 'Consumables',
        route: '/inventory/consumables',
        element: <Placeholder />,
      },
      keyItems: {
        title: 'Key Items',
        route: '/inventory/key-items',
        element: <Placeholder />,
      },
      weapons: {
        title: 'Weapons',
        route: '/inventory/weapons',
        element: <Placeholder />,
      },
      armors: {
        title: 'Armors',
        route: '/inventory/armors',
        element: <Placeholder />,
      },
    },
  },
  party: {
    title: 'Party',
    route: '/party',
    icon: <PartyIcon />,
    subtabs: {
      overview: {
        title: 'Overview',
        route: '/party/overview',
        element: <Placeholder />,
      },
      kris: {
        title: 'Kris',
        route: '/party/kris',
        element: <Placeholder />,
      },
      susie: {
        title: 'Susie',
        route: '/party/susie',
        element: <Placeholder />,
      },
      ralsei: {
        title: 'Ralsei',
        route: '/party/ralsei',
        element: <Placeholder />,
      },
      noelle: {
        title: 'Noelle',
        route: '/party/noelle',
        element: <Placeholder />,
      },
    },
  },
  recruits: {
    title: 'Recruits',
    route: '/recruits',
    icon: <RecruitsIcon />,
    element: <Placeholder />,
  },
  lightWorld: {
    title: 'Light World',
    route: '/light-world',
    icon: <LightWorldIcon />,
    element: <Placeholder />,
  },
  darkWorld: {
    title: 'Dark World',
    route: '/dark-world',
    icon: <DarkWorldIcon />,
    element: <Placeholder />,
  },
  settings: {
    title: 'Settings',
    route: '/settings',
    icon: <SettingsIcon />,
    footer: true,
    element: <Placeholder />,
  },
  about: {
    title: 'About',
    route: '/about',
    icon: <AboutIcon />,
    subtabs: {
      overview: {
        title: 'Overview',
        route: '/about/overview',
        element: <About.Overview />,
      },
      changelog: {
        title: 'Changelog',
        route: '/about/changelog',
        element: <About.Changelog />,
      },
      license: {
        title: 'License',
        route: '/about/license',
        element: <About.License />,
      },
      attributions: {
        title: 'Attributions',
        route: '/about/attributions',
        element: <About.Attributions />,
      },
    },
    footer: true,
  },
} as const;

export const tabsByRoute = Object.entries(EDITOR_TABS).reduce(
  (acc, [tabId, tab]) => {
    acc[tab.route] = tabId;
    return acc;
  },
  {} as Record<string, string>,
);

interface EditorContextProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  isSidebarRetracted: boolean;
  setSidebarRetraction: (state: boolean) => void;
}
export const EditorContext = createContext<EditorContextProps | undefined>(
  undefined,
);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within a EditorContext.Provider');
  }
  return context;
};

export const Editor = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarRetracted, setSidebarRetraction] = useState(false);

  const chapterEntries = Object.entries(EDITOR_TABS)
    .filter(([_, tab]) => !!tab.chapter)
    .sort((a, b) => Number(a[0].slice(7)) - Number(b[0].slice(7)));

  const contextValues: EditorContextProps = {
    isSidebarOpen,
    setSidebarOpen,
    isSidebarRetracted,
    setSidebarRetraction,
  };

  return (
    <EditorContext.Provider value={contextValues}>
      <div className="h-full flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 flex min-h-0 relative">
          <Sidebar>
            <div>
              <Sidebar.Group>
                {Object.entries(EDITOR_TABS)
                  .filter(([_, tab]) => !tab.footer)
                  .map(([id, tab]) => (
                    <Sidebar.Item
                      key={id}
                      title={tab.title}
                      icon={tab.icon}
                      to={tab.route}
                    />
                  ))}
              </Sidebar.Group>
            </div>
            {Object.values(EDITOR_TABS).some((t) => t.footer) && (
              <Sidebar.Group>
                {Object.entries(EDITOR_TABS)
                  .filter(([_, tab]) => tab.footer)
                  .map(([id, tab]) => (
                    <Sidebar.Item
                      key={id}
                      title={tab.title}
                      icon={tab.icon}
                      to={tab.route}
                    />
                  ))}
              </Sidebar.Group>
            )}
          </Sidebar>

          <div className="flex-1 min-w-0 min-h-0 bg-surface-2">
            <Content />
          </div>

          {isSidebarOpen && (
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 top-14 bg-overlay backdrop-blur-[1px] z-40"
            />
          )}
        </div>
      </div>
    </EditorContext.Provider>
  );
};

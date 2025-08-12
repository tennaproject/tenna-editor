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

export interface Subtab {
  title: string;
  element?: ReactNode;
}
export interface Tab {
  title: string;
  element?: ReactNode;
  icon?: ReactNode;
  subtabs?: Record<string, Subtab>;
  footer?: boolean;
  chapter?: boolean;
}

export const EDITOR_TABS: Record<string, Tab> = {
  home: {
    title: 'Home',
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
    icon: <InventoryIcon />,
    subtabs: {
      consumables: {
        title: 'Consumables',
        element: <Placeholder />,
      },
      keyItems: {
        title: 'Key Items',
        element: <Placeholder />,
      },
      weapons: {
        title: 'Weapons',
        element: <Placeholder />,
      },
      armors: {
        title: 'Armors',
        element: <Placeholder />,
      },
    },
  },
  party: {
    title: 'Party',
    icon: <PartyIcon />,
    subtabs: {
      overview: {
        title: 'Overview',
        element: <Placeholder />,
      },
      kris: {
        title: 'Kris',
        element: <Placeholder />,
      },
      susie: {
        title: 'Susie',
        element: <Placeholder />,
      },
      ralsei: {
        title: 'Ralsei',
        element: <Placeholder />,
      },
      noelle: {
        title: 'Noelle',
        element: <Placeholder />,
      },
    },
  },
  recruits: {
    title: 'Recruits',
    icon: <RecruitsIcon />,
    element: <Placeholder />,
  },
  lightWorld: {
    title: 'Light World',
    icon: <LightWorldIcon />,
    element: <Placeholder />,
  },
  darkWorld: {
    title: 'Dark World',
    icon: <DarkWorldIcon />,
    element: <Placeholder />,
  },
  settings: {
    title: 'Settings',
    icon: <SettingsIcon />,
    footer: true,
    element: <Placeholder />,
  },
  about: {
    title: 'About',
    icon: <AboutIcon />,
    subtabs: {
      overview: {
        title: 'Overview',
        element: <About.Overview />,
      },
      changelog: {
        title: 'Changelog',
        element: <About.Changelog />,
      },
      license: {
        title: 'License',
        element: <About.License />,
      },
      attributions: {
        title: 'Attributions',
        element: <About.Attributions />,
      },
    },
    footer: true,
  },
} as const;

interface EditorContextProps {
  activeTabId: string;
  setActiveTabId: (tab: string) => void;
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
  const [activeTabId, setActiveTabId] = useState('home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarRetracted, setSidebarRetraction] = useState(false);

  const chapterEntries = Object.entries(EDITOR_TABS)
    .filter(([_, tab]) => !!tab.chapter)
    .sort((a, b) => Number(a[0].slice(7)) - Number(b[0].slice(7)));

  const contextValues: EditorContextProps = {
    activeTabId,
    setActiveTabId,
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
                  .filter(([_, tab]) => !tab.footer && !tab.chapter)
                  .map(([id, tab]) => (
                    <Sidebar.Item
                      key={id}
                      id={id}
                      title={tab.title}
                      icon={tab.icon}
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
                      id={id}
                      title={tab.title}
                      icon={tab.icon}
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

import {
  useState,
  createContext,
  useContext,
  type JSX,
  type ReactNode,
} from 'react';
import { Content, Header, Sidebar } from './components';
import HomeIcon from '@assets/icons/home.svg';
import InventoryIcon from '@assets/icons/briefcase.svg';
import PartyIcon from '@assets/icons/contact.svg';
import LightWorldIcon from '@assets/icons/sun-alt.svg';
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
  chapter1: {
    title: 'Chapter 1',
    chapter: true,
    subtabs: {
      vessel: {
        title: 'Vessel',
        element: <Placeholder />,
      },
      trashMachine: {
        title: 'Trash Machine',
        element: <Placeholder />,
      },
      darkWorld: {
        title: 'Dark World',
        element: <Placeholder />,
      },
      lightWorld: {
        title: 'Light World',
        element: <Placeholder />,
      },
    },
  },
  chapter2: {
    title: 'Chapter 2',
    chapter: true,
    element: <Placeholder />,
  },
  chapter3: {
    title: 'Chapter 3',
    chapter: true,
    element: <Placeholder />,
  },
  chapter4: {
    title: 'Chapter 4',
    chapter: true,
    element: <Placeholder />,
  },
  chapter5: {
    title: 'Chapter 5',
    chapter: true,
    element: <Placeholder />,
  },
  chapter6: {
    title: 'Chapter 6',
    chapter: true,
    element: <Placeholder />,
  },
  chapter7: {
    title: 'Chapter 7',
    chapter: true,
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
  const [activeTabId, setActiveTabId] = useState('inventory');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const chapterEntries = Object.entries(EDITOR_TABS)
    .filter(([_, tab]) => !!tab.chapter)
    .sort((a, b) => Number(a[0].slice(7)) - Number(b[0].slice(7)));

  const contextValues: EditorContextProps = {
    activeTabId,
    setActiveTabId,
    isSidebarOpen,
    setSidebarOpen,
  };

  return (
    <EditorContext.Provider value={contextValues}>
      <div className="h-full flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 flex min-h-0">
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

              <Sidebar.Group>
                <button
                  className="w-full px-3 py-2 text-left text-text-2 hover:bg-surface-1-hover flex items-center justify-between"
                  aria-expanded={chaptersOpen}
                  aria-controls="chapters-group"
                  onClick={() => setChaptersOpen((v) => !v)}
                >
                  <span>Chapters</span>
                  <svg
                    className={
                      'h-4 w-4 transition-transform ' +
                      (chaptersOpen ? 'rotate-90' : '')
                    }
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7 5l6 5-6 5V5z" />
                  </svg>
                </button>

                {chaptersOpen && (
                  <div id="chapters-group" className="mt-1 space-y-1 pl-3">
                    {chapterEntries.map(([id, tab]) => (
                      <Sidebar.Item key={id} id={id} title={tab.title} />
                    ))}
                  </div>
                )}
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
        </div>
      </div>
    </EditorContext.Provider>
  );
};

import { useState, createContext, useContext, type JSX } from 'react';
import { Content, Header, Sidebar } from './components';
import { About } from './views';

export interface Group {
  title: string;
}
export const EDITOR_GROUPS: Record<string, Group> = {
  main: {
    title: 'Editor Categories',
  },
  advanced: {
    title: 'Advanced',
  },
} as const;

export interface Subtab {
  title: string;
  element?: JSX.Element;
}
export interface Tab {
  title: string;
  group: string;
  element?: JSX.Element;
  subtabs?: Record<string, Subtab>;
}

export const EDITOR_TABS: Record<string, Tab> = {
  inventory: {
    title: 'Inventory',
    group: 'main',
    element: <h1></h1>,
  },
  party: {
    title: 'Party',
    group: 'main',
    subtabs: {
      default: {
        title: 'default',
        element: <h1>i am glooby</h1>,
      },
      test2: {
        title: 'test2',
        element: (
          <div>
            <h1>test subtab 2</h1>
          </div>
        ),
      },
    },
  },
  settings: {
    title: 'Settings',
    group: 'advanced',
  },
  about: {
    title: 'About',
    group: 'advanced',
    element: <About />,
  },
} as const;

const getTabsIdByGroup = () => {
  return Object.entries(EDITOR_TABS).reduce(
    (groups, [tabId, tab]) => {
      if (!groups[tab.group]) {
        groups[tab.group] = [];
      }
      groups[tab.group].push(tabId);
      return groups;
    },
    {} as Record<string, string[]>,
  );
};

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
  const tabsIdByGroup = getTabsIdByGroup();

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
            {Object.entries(tabsIdByGroup).map(([groupId, groupTabs]) => (
              <Sidebar.Group key={groupId} title={EDITOR_GROUPS[groupId].title}>
                {groupTabs.map((tabId) => (
                  <Sidebar.Item
                    key={tabId}
                    id={tabId}
                    title={EDITOR_TABS[tabId].title}
                  />
                ))}
              </Sidebar.Group>
            ))}
          </Sidebar>

          <div className="flex-1 overflow-y-auto bg-surface">
            <Content />
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  );
};

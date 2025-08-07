import { createContext, useContext, useEffect, useState } from 'react';
import { EDITOR_TABS, useEditor, type Tab } from '../../Editor';
import { ContentNavigation } from './ContentNavigation';
import { ContentNavigationItem } from './ContentNavigationItem';

export interface ContentContextValues {
  activeSubtabId: string | undefined;
  setActiveSubtabId: (subtabId: string) => void;
}
const ContentContext = createContext<ContentContextValues | undefined>(
  undefined,
);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentContext.Provider');
  }
  return context;
};

const getFirstSubtabId = (tab: Tab) => {
  if (tab.subtabs) {
    return Object.keys(tab.subtabs)[0];
  }

  return undefined;
};

export const Content = () => {
  const { activeTabId } = useEditor();
  const activeTab = EDITOR_TABS[activeTabId];
  const [activeSubtabId, setActiveSubtabId] = useState(
    getFirstSubtabId(activeTab),
  );

  useEffect(() => {
    setActiveSubtabId(getFirstSubtabId(EDITOR_TABS[activeTabId]));
  }, [activeTabId]);

  const contextValues: ContentContextValues = {
    activeSubtabId,
    setActiveSubtabId,
  };

  return (
    <ContentContext.Provider value={contextValues}>
      <div className="bg-surface h-full flex flex-col">
        <div className="border-b border-base ">
          <div className="flex items-center gap-3 py-2 px-4 min-h-15">
            <h2 className="text-main text-xl font-bold select-none">
              {activeTab.title}
            </h2>
            {activeTab?.subtabs ? (
              <ContentNavigation>
                {Object.entries(activeTab.subtabs).map(([subtabId, subtab]) => {
                  return (
                    <ContentNavigationItem
                      key={subtabId}
                      id={subtabId}
                      title={subtab.title}
                    />
                  );
                })}
              </ContentNavigation>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="h-full flex flex-col m-4 select-none">
          {activeTab.element ||
            (activeTab.subtabs &&
              activeSubtabId &&
              activeTab.subtabs[activeSubtabId].element)}
        </div>
      </div>
    </ContentContext.Provider>
  );
};

import { EDITOR_TABS, tabsByRoute } from '../../Editor';
import { ContentNavigation } from './ContentNavigation';
import { ContentNavigationItem } from './ContentNavigationItem';
import { Outlet, useLocation } from 'react-router-dom';

export const Content = () => {
  const location = useLocation();
  const currentTabId = tabsByRoute[`/${location.pathname.split('/')[1]}`];
  const currentTab = EDITOR_TABS[currentTabId];

  return (
    <div className="bg-surface-2 h-full flex flex-col min-w-0 min-h-0">
      <div className="border-b border-divider">
        <div className="flex items-center gap-3 py-2 px-6 min-h-13">
          <h2 className="text-text-1 text-xl font-bold select-none">
            {currentTab?.title}
          </h2>
          {currentTab?.subtabs ? (
            <div className="hidden sm:block">
              <ContentNavigation>
                {Object.entries(currentTab.subtabs).map(
                  ([subtabId, subtab]) => {
                    return (
                      <ContentNavigationItem
                        key={subtabId}
                        title={subtab.title}
                        to={subtab.route}
                      />
                    );
                  },
                )}
              </ContentNavigation>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-0 flex flex-col select-none overflow-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

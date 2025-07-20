import { SidebarFooter } from './SidebarFooter';
import { SidebarItem } from './SidebarItem';

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({
  setSidebarOpen,
  activeTab,
  setActiveTab,
}: SidebarProps) => {
  return (
    <aside
      className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-55 bg-base flex flex-col select-none
        `}
    >
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          <div className="px-3 py-2 mt-6">
            <h3 className="text-xs font-bold text-subtle uppercase tracking-wide">
              Save Editor
            </h3>
          </div>

          <SidebarItem
            icon=""
            title="Inventory"
            tabKey="inventory"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
            isTopLevel
          />

          <SidebarItem
            icon=""
            title="Party"
            tabKey="party"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
            isTopLevel
          />

          <SidebarItem
            icon=""
            title="Rooms"
            tabKey="rooms"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
            isTopLevel
          />

          <SidebarItem
            icon=""
            title="Flags"
            tabKey="flags"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
            isTopLevel
          />

          <div className="px-3 py-2 mt-6">
            <h3 className="text-xs font-bold text-subtle uppercase tracking-wide">
              Advanced
            </h3>
          </div>

          <SidebarItem
            icon=""
            title="Settings"
            tabKey="settings"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
            isTopLevel
          />

          <SidebarItem
            icon=""
            title="About"
            tabKey="about"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
            isTopLevel
          />
        </div>
      </nav>
      <SidebarFooter />
    </aside>
  );
};

import { useState } from 'react';
import { SidebarFooter } from './SidebarFooter';
import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';

export interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    inventory: true,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };
  return (
    <aside
      className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-80 bg-gray-800 border-r border-gray-700 flex flex-col
        `}
    >
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          <SidebarSection
            icon="🎷"
            title="Inventory"
            isExpanded={expandedSections.inventory}
            onToggle={() => {
              toggleSection('inventory');
            }}
          >
            <SidebarItem
              title="Consumables"
              tabKey="consumables"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSidebarOpen={setSidebarOpen}
            />
            <SidebarItem
              title="Weapons"
              tabKey="weapons"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSidebarOpen={setSidebarOpen}
            />
            <SidebarItem
              title="Armors"
              tabKey="armors"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSidebarOpen={setSidebarOpen}
            />
          </SidebarSection>
        </div>
      </nav>
      <SidebarFooter />
    </aside>
  );
};

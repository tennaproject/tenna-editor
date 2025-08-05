import React from 'react';
import { SidebarFooter } from './SidebarFooter';
import { SidebarItem } from './SidebarItem';

interface SidebarContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export const SidebarContext = React.createContext<
  SidebarContextProps | undefined
>(undefined);
export interface SidebarProps {
  children?: React.ReactNode;
  onActiveItemChange?: (item: string) => void;
}

export const Sidebar = ({ children, onActiveItemChange }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<string>('inventory');

  const handleActiveItemChange = (item: string) => {
    setActiveItem(item);
    onActiveItemChange?.(item);
  };

  const value = {
    sidebarOpen,
    setSidebarOpen,
    activeItem,
    setActiveItem: handleActiveItemChange,
  };
  return (
    <SidebarContext.Provider value={value}>
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-55 bg-base flex flex-col select-none
        `}
      >
        <nav className="flex-1 overflow-y-auto p-2">{children}</nav>
        <SidebarFooter />
      </aside>
    </SidebarContext.Provider>
  );
};

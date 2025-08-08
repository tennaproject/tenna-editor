import React from 'react';
import { SidebarFooter } from './SidebarFooter';

export interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-55 bg-base flex flex-col select-none overflow-y-auto
       scrollbar-none 
      `}
    >
      <nav className="flex-1 p-2">{children}</nav>
      <SidebarFooter />
    </aside>
  );
};

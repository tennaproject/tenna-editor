import React from 'react';
import { SidebarFooter } from './SidebarFooter';
import { useEditor } from '../..';

export interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const { isSidebarOpen } = useEditor();

  const hiddenClass = isSidebarOpen ? 'flex' : 'hidden';
  return (
    <aside
      className={`
        w-50 bg-surface-1 ${hiddenClass} lg:flex flex-col select-none overflow-y-auto
       scrollbar-none
      `}
    >
      <nav className="flex-1 p-2 flex flex-col justify-between">{children}</nav>
      <SidebarFooter />
    </aside>
  );
};

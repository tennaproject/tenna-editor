import { useApp } from '@contexts';
import React, { type FC } from 'react';

export interface SidebarProps {
  children?: React.ReactNode;
}

export const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { isSidebarOpen, isSidebarRetracted } = useApp();

  const hiddenClass = isSidebarOpen
    ? 'flex fixed lg:static top-14 left-0 bottom-0 z-50'
    : 'hidden lg:flex';

  const retractedClass = isSidebarRetracted ? 'w-50 lg:w-15' : 'w-50';
  return (
    <aside
      className={`
        ${retractedClass} bg-surface-1 ${hiddenClass} flex-col select-none overflow-y-auto
       scrollbar-none
       pb-2
      `}
    >
      <nav className="flex-1 p-2 flex flex-col justify-between">{children}</nav>
    </aside>
  );
};

import { type ReactNode } from 'react';
import { useEditor } from '../../Editor';
import { NavLink } from 'react-router-dom';

export interface SidebarItemProps {
  title: string;
  icon?: ReactNode;
  to: string;
}

export const SidebarItem = ({ title, icon, to }: SidebarItemProps) => {
  const { isSidebarRetracted } = useEditor();

  const baseClasses =
    'w-full flex items-center text-sm gap-2 px-3 py-2 leading-none text-base transition-colors';
  const activeClasses = 'bg-surface-1-active text-text-1';
  const inactiveClasses = 'text-text-2 hover:bg-surface-1-hover';
  const retractedClasses = isSidebarRetracted ? 'lg:hidden' : '';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon && <div className="w-5 h-5">{icon}</div>}
      <div className={`${retractedClasses}`}>{title}</div>
    </NavLink>
  );
};

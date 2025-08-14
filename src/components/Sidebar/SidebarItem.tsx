import { useApp } from '@contexts';
import { type FC, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarItemProps {
  title: string;
  icon?: ReactNode;
  to: string;
}

export const SidebarItem: FC<SidebarItemProps> = ({ title, icon, to }) => {
  const { isSidebarRetracted } = useApp();

  const baseClasses =
    'w-full flex items-center text-sm gap-2 px-3 py-2 leading-none text-base transition-all duration-300 ease-in-out';
  const activeClasses = 'bg-surface-1-active text-text-1';
  const inactiveClasses = 'text-text-2 hover:bg-surface-1-hover';

  const titleClasses = isSidebarRetracted
    ? 'lg:opacity-0 lg:scale-95 lg:pointer-events-none transition-all duration-300 ease-in-out'
    : 'transition-all duration-300 ease-in-out';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
      }
    >
      {icon && <div className="w-5 h-5 flex-shrink-0">{icon}</div>}
      <div className={`${titleClasses} whitespace-nowrap overflow-hidden`}>
        {title}
      </div>
    </NavLink>
  );
};

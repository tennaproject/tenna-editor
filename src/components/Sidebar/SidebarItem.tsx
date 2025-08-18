import { useApp } from '@contexts';
import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarItemProps {
  title: string;
  icon?: ReactNode;
  to: string;
  requireSave?: boolean;
}

export function SidebarItem({
  title,
  icon,
  to,
  requireSave,
}: SidebarItemProps) {
  const { isSidebarRetracted, saveFile } = useApp();

  const baseClasses =
    'w-full flex items-center text-sm px-0 h-12 leading-none transition-all duration-200 ease-in-out';
  const activeClasses = 'bg-surface-1-active text-text-1';
  const inactiveClasses = 'text-text-2 hover:bg-surface-1-hover';
  const disabledClasses = 'opacity-20 pointer-events-none';
  const isDisabled = requireSave && !saveFile;

  const titleClasses = isSidebarRetracted
    ? 'lg:opacity-0 lg:pointer-events-none lg:w-0 lg:max-w-0 lg:m-0 lg:p-0 lg:overflow-hidden transition-all duration-200 ease-in-out'
    : 'transition-all duration-200 ease-in-out';

  return (
    <NavLink
      to={to}
      aria-label={title}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      className={({ isActive }) =>
        `${baseClasses} ${
          isDisabled
            ? disabledClasses
            : isActive
              ? activeClasses
              : inactiveClasses
        }`
      }
    >
      <div className="flex w-full items-center h-full">
        <div className="w-12 h-full flex items-center justify-center">
          {icon && <div className="w-5 h-5">{icon}</div>}
        </div>
        <div
          className={`flex-1 ${titleClasses} whitespace-nowrap overflow-hidden`}
          aria-hidden={isSidebarRetracted}
        >
          {title}
        </div>
      </div>
    </NavLink>
  );
}

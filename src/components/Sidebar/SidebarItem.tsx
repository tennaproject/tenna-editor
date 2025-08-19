import { useUi, useSave } from '@contexts';
import { useMemo, memo, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export interface SidebarItemProps {
  title: string;
  icon?: ReactNode;
  to: string;
  requireSave?: boolean;
  requireDevmode?: boolean;
}

export const SidebarItem = memo(function SidebarItem({
  title,
  icon,
  to,
  requireSave,
  requireDevmode,
}: SidebarItemProps) {
  const { isSidebarRetracted, devmode } = useUi();
  const { saveFile } = useSave();
  const location = useLocation();

  const baseClasses =
    'w-full flex items-center text-sm px-0 h-12 leading-none transition-all duration-200 ease-in-out';
  const activeClasses = 'bg-surface-1-active text-text-1';
  const inactiveClasses = 'text-text-2 hover:bg-surface-1-hover';
  const disabledClasses = 'opacity-20 pointer-events-none';
  const isDisabled = requireSave && !saveFile;

  const isHidden = requireDevmode && !devmode;

  const titleClasses = isSidebarRetracted
    ? 'lg:opacity-0 lg:pointer-events-none lg:w-0 lg:max-w-0 lg:m-0 lg:p-0 lg:overflow-hidden transition-all duration-200 ease-in-out'
    : 'transition-all duration-200 ease-in-out';

  return !isHidden ? (
    <NavLink
      to={to}
      aria-label={title}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          // Prevent navigation if we are in the same space
          const slices = location.pathname.split('/').filter(Boolean);
          const toSlices = to.split('/').filter(Boolean);

          if (slices[0] === toSlices[0]) {
            e.preventDefault();
            e.stopPropagation();
          }
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
  ) : null;
});

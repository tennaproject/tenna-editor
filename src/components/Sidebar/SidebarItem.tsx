import { useSave, useUi } from '@store';
import { type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export interface SidebarItemProps {
  title: string;
  icon?: ReactNode;
  to: string;
  requireSave?: boolean;
  requireDevmode?: boolean;
  requireChapter?: number;
}

export function SidebarItem({
  title,
  icon,
  to,
  requireSave,
  requireDevmode,
  requireChapter,
}: SidebarItemProps) {
  const isSidebarRetracted = useUi((s) => s.isSidebarRetracted);
  const devmode = useUi((s) => s.devmode);

  const isSavePresent = useSave.getState().save;
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const location = useLocation();

  const baseClasses =
    'w-full flex items-center text-sm px-0 h-12 leading-none transition-all duration-200 ease-in-out';
  const activeClasses = 'bg-surface-1-active text-text-1';
  const inactiveClasses = 'text-text-2 hover:bg-surface-1-hover';
  const disabledClasses = 'opacity-20 pointer-events-none';
  const isDisabled =
    (requireSave && !isSavePresent) ||
    (requireChapter && chapter < requireChapter);

  const isHidden = requireDevmode && !devmode;

  const titleClasses = isSidebarRetracted
    ? 'lg:opacity-0 lg:pointer-events-none lg:w-0 lg:max-w-0 lg:m-0 lg:p-0 lg:overflow-hidden transition-all duration-200 ease-in-out'
    : 'transition-all duration-200 ease-in-out';

  const currentRoot = location.pathname.split('/').filter(Boolean)[0] ?? '';
  const targetRoot = to.split('/').filter(Boolean)[0] ?? '';
  const blockNavigation = currentRoot === targetRoot;

  function onClick(e: React.MouseEvent) {
    if (isDisabled || blockNavigation) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return !isHidden ? (
    <NavLink
      to={to}
      aria-label={title}
      onClick={onClick}
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled ? true : false}
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
}

import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { mergeClass } from '@utils/merge-class';

const NAV_ITEM_CLASS =
  'px-3 py-0.5 font-semibold motion-reduce:transition-none transition-colors duration-300 text-sm inline-flex items-center gap-1.5';

function navItemStateClass(isActive: boolean) {
  return isActive
    ? 'bg-surface-1-active text-text-1'
    : 'bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1-hover';
}

export interface PageNavItemProps {
  title: string;
  to?: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export function PageNavItem({
  title,
  to,
  icon,
  active,
  onClick,
  children,
}: PageNavItemProps) {
  const content = (
    <>
      {icon}
      {title}
      {children}
    </>
  );

  if (to != null) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          mergeClass(NAV_ITEM_CLASS, navItemStateClass(isActive))
        }
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={mergeClass(NAV_ITEM_CLASS, navItemStateClass(!!active))}
    >
      {content}
    </button>
  );
}

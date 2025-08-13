import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

export interface PageNavItemProps {
  title: string;
  to: string;
}

export const PageNavItem: FC<PageNavItemProps> = ({ title, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-0.5 font-semibold transition-colors duration-200 text-sm ${
          isActive
            ? 'bg-surface-1-active text-text-1'
            : 'bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1-hover'
        }`
      }
    >
      {title}
    </NavLink>
  );
};

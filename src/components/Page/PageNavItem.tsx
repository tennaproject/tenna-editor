import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { mergeClass } from '@utils/merge-class';

export interface PageNavItemProps {
  title: string;
  to: string;
  icon?: ReactNode;
}

export function PageNavItem({ title, to, icon }: PageNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        mergeClass(
          'px-3 py-0.5 font-semibold motion-reduce:transition-none transition-colors duration-300 text-sm inline-flex items-center gap-1.5',
          isActive
            ? 'bg-surface-1-active text-text-1'
            : 'bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1-hover',
        )
      }
    >
      {icon}
      {title}
    </NavLink>
  );
}

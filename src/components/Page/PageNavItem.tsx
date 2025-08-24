import { NavLink } from 'react-router-dom';

export interface PageNavItemProps {
  title: string;
  to: string;
}

export function PageNavItem({ title, to }: PageNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-0.5 font-semibold transition-colors duration-300 text-sm ${
          isActive
            ? 'bg-surface-1-active text-text-1'
            : 'bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1-hover'
        }`
      }
    >
      {title}
    </NavLink>
  );
}

import { type FC, type ReactNode } from 'react';

export interface PageNavProps {
  children: ReactNode;
}

export const PageNav: FC<PageNavProps> = ({ children }) => {
  return (
    <nav className="flex gap-1 bg-surface-1 border-1 border-border p-1 overflow-auto">
      {children}
    </nav>
  );
};

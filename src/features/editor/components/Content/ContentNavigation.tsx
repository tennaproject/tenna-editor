import { type ReactNode } from 'react';
export interface ContentNavigationProps {
  children: ReactNode;
}

export const ContentNavigation = ({ children }: ContentNavigationProps) => {
  return (
    <div>
      <nav className="flex gap-1 bg-base border border-surface p-1 overflow-auto">
        {children}
      </nav>
    </div>
  );
};

import { type ReactNode } from 'react';

export interface PageNavProps {
  children: ReactNode;
}

export function PageNav({ children }: PageNavProps) {
  return (
    <nav className="flex gap-1 bg-surface-1 border-1 border-border p-1 overflow-auto whitespace-nowrap scrollbar-none select-none">
      {children}
    </nav>
  );
}

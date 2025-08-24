import type { ReactNode } from 'react';

interface PageContentProps {
  children?: ReactNode;
}
export function PageContent({ children }: PageContentProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col select-none overflow-auto">
      {children}
    </div>
  );
}

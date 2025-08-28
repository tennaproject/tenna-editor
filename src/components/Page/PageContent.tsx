import type { ReactNode } from 'react';

interface PageContentProps {
  children?: ReactNode;
}
export function PageContent({ children }: PageContentProps) {
  return (
    <div
      className="flex-1 min-h-0 flex flex-col select-none overflow-y-auto lg:pl-[10px]"
      style={{ scrollbarGutter: 'stable ' }}
    >
      {children}
    </div>
  );
}

import type { FC, ReactNode } from 'react';

interface PageContentProps {
  children?: ReactNode;
}
export const PageContent: FC<PageContentProps> = ({ children }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col select-none overflow-auto">
      {children}
    </div>
  );
};

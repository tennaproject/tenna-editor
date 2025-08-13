import type { FC, ReactNode } from 'react';

interface PageProps {
  children?: ReactNode;
}
export const Page: FC<PageProps> = ({ children }) => {
  return (
    <div className="bg-surface-2 h-full flex flex-col min-w-0 min-h-0">
      {children}
    </div>
  );
};

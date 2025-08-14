import type { FC, ReactNode } from 'react';

interface PageTopBarProps {
  title: string;
  children?: ReactNode;
}

export const PageTopBar: FC<PageTopBarProps> = ({ title, children }) => {
  return (
    <div className="bg-surface-2 border-b border-divider">
      <div className="flex items-center gap-3 py-2 px-6 min-h-13">
        <h1 className="text-text-1 text-xl font-bold select-none">{title}</h1>
        {children}
      </div>
    </div>
  );
};

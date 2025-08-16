import type { FC, ReactNode } from 'react';

interface CardHeaderProps {
  title: string;
  children?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({ title, children }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-text-1 mb-4 flex items-center gap-2">
        {title}
      </h2>
      {children}
    </div>
  );
};

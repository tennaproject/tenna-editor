import type { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface-3 p-6 border border-border ${className}`}>
      {children}
    </div>
  );
};

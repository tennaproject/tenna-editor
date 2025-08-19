import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`p-6 border border-border shadow shadow-surface-1/50 ${className}`}
    >
      {children}
    </div>
  );
}

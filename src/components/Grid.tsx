import type { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function Grid({ children, cols = 2, className = '' }: GridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 lg:grid-cols-3',
    4: 'grid-cols-1 lg:grid-cols-4',
    5: 'grid-cols-1 lg:grid-cols-5',
    6: 'grid-cols-1 lg:grid-cols-6',
  };

  return (
    <div className={`grid ${colsClass[cols]} ${className}`}>{children}</div>
  );
}

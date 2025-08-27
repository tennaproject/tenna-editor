import type { PropsWithChildren } from 'react';
import { mergeClass } from '@utils';

interface ItemGridProps {
  colsLg?: 1 | 2 | 3 | 4;
  className?: string;
}

const colsClasses: Record<1 | 2 | 3 | 4, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export function ItemGrid({
  colsLg = 3,
  className,
  children,
}: PropsWithChildren<ItemGridProps>) {
  const colsClass = colsClasses[colsLg];
  return (
    <div className={mergeClass('w-full grid gap-4 mt-2', colsClass, className)}>
      {children}
    </div>
  );
}

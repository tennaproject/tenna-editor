import { mergeClass } from '@utils';
import type { ReactNode } from 'react';

interface InlineGroupProps {
  children?: ReactNode;
  className?: string;
}

export function InlineGroup({ children, className = '' }: InlineGroupProps) {
  return (
    <div className={mergeClass('flex items-center gap-2 min-h-6', className)}>
      {children}
    </div>
  );
}

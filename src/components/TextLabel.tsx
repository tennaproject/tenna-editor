import { mergeClass } from '@utils';
import type { ReactNode } from 'react';

interface TextLabelProps {
  className?: string;
  children?: ReactNode;
}

export function TextLabel({ children, className }: TextLabelProps) {
  return (
    <span className={mergeClass('leading-none text-sm text-text-2', className)}>
      {children}
    </span>
  );
}

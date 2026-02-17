import { mergeClass } from '@utils';
import type { ReactNode } from 'react';

interface TextLabelProps {
  className?: string;
  children?: ReactNode;
  htmlFor?: string;
}

export function TextLabel({ children, className, htmlFor }: TextLabelProps) {
  const Component = htmlFor ? 'label' : 'span';
  return (
    <Component
      className={mergeClass(
        'leading-none text-sm text-text-2 min-h-6',
        className,
      )}
      htmlFor={htmlFor}
    >
      {children}
    </Component>
  );
}

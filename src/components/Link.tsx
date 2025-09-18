import { mergeClass } from '@utils';
import type React from 'react';
import type { ReactNode } from 'react';

interface LinkProps {
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  className?: string;
  children?: ReactNode;
}

export function Link({
  href,
  target = '_blank',
  className,
  children,
}: LinkProps) {
  return (
    <a
      href={href}
      target={target}
      className={mergeClass(
        'text-red hover:text-red-hover underline',
        className,
      )}
    >
      {children}
    </a>
  );
}

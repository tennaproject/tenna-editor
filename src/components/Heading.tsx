import { mergeClass } from '@utils';
import { type JSX, type ReactNode } from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: ReactNode;
}

export function Heading({ level, className, children }: HeadingProps) {
  const headingClass = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  }[level];

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={mergeClass(
        'font-bold',
        headingClass,
        'leading-none',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

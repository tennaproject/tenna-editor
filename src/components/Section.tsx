import { mergeClass } from '@utils';
import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={mergeClass('w-full', className)}>
      {children}
    </section>
  );
}

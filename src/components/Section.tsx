import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  const customClass = className ? ` ${className}` : '';
  return (
    <section id={id} className={`w-full${customClass}`}>
      {children}
    </section>
  );
}

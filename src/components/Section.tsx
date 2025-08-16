import type { FC, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children?: ReactNode;
}

export const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div>{children}</div>
    </section>
  );
};

import type { ReactNode } from 'react';

interface ContentSectionProps {
  children: ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  return <div className="h-full flex flex-col">{children}</div>;
}

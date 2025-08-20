import type { ReactNode } from 'react';

interface InlineGroupProps {
  children?: ReactNode;
}

export function InlineGroup({ children }: InlineGroupProps) {
  return <div className="flex items-center gap-2">{children}</div>;
}

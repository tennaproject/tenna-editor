import type { ReactNode } from 'react';

interface ContentHeaderProps {
  title: string;
  actions?: ReactNode;
}

export function ContentHeader({ title, actions }: ContentHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3 px-4">
      <h1 className="text-2xl font-bold text-main">{title}</h1>
      {actions && <div>{actions}</div>}
    </div>
  );
}

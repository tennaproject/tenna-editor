import React from 'react';

export interface SidebarGroupProps {
  title: string;
  children?: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  children,
}) => {
  return (
    <div>
      <div className="px-3 py-2 mt-4">
        <h3 className="text-xs font-bold text-subtle uppercase tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

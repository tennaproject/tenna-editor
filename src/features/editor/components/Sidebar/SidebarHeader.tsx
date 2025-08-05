import React from 'react';

export interface SidebarHeaderProps {
  children?: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children }) => {
  return (
    <div className="px-3 py-2 mt-4">
      <h3 className="text-xs font-bold text-subtle uppercase tracking-wide">
        {children}
      </h3>
    </div>
  );
};

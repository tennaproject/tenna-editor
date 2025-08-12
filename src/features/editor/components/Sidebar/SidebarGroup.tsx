import React from 'react';

export interface SidebarGroupProps {
  children?: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

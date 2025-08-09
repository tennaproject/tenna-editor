import React from 'react';

export interface SidebarGroupProps {
  children?: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ children }) => {
  return <div>{children}</div>;
};

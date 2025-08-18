export interface SidebarGroupProps {
  children?: React.ReactNode;
}

export function SidebarGroup({ children }: SidebarGroupProps) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

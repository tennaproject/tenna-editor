import { Sidebar as SidebarParent } from './Sidebar';
import { SidebarItem } from './SidebarItem';
import { SidebarHeader } from './SidebarHeader';

type SidebarComponent = typeof SidebarParent & {
  Item: typeof SidebarItem;
  Header: typeof SidebarHeader;
};

const Sidebar = SidebarParent as SidebarComponent;
Sidebar.Item = SidebarItem;
Sidebar.Header = SidebarHeader;

export { Sidebar };

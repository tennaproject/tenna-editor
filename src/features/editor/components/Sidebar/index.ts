import { Sidebar as SidebarParent } from './Sidebar';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';

type SidebarComponent = typeof SidebarParent & {
  Item: typeof SidebarItem;
  Group: typeof SidebarGroup;
};

const Sidebar = SidebarParent as SidebarComponent;
Sidebar.Item = SidebarItem;
Sidebar.Group = SidebarGroup;

export { Sidebar };

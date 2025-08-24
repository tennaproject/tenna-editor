import { Sidebar as SidebarParent } from './Sidebar';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import { SidebarOverlay } from './SidebarOverlay';
import { SidebarMenu } from './SidebarMenu';

type SidebarComponent = typeof SidebarParent & {
  Item: typeof SidebarItem;
  Group: typeof SidebarGroup;
  Overlay: typeof SidebarOverlay;
  Menu: typeof SidebarMenu;
};

const Sidebar = SidebarParent as SidebarComponent;
Sidebar.Item = SidebarItem;
Sidebar.Group = SidebarGroup;
Sidebar.Overlay = SidebarOverlay;
Sidebar.Menu = SidebarMenu;

export { Sidebar };

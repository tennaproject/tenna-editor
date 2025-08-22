import { Sidebar } from '.';

import HomeIcon from '@assets/icons/home.svg';
import InventoryIcon from '@assets/icons/briefcase.svg';
import PartyIcon from '@assets/icons/contact.svg';
import LightWorldIcon from '@assets/icons/sun-alt.svg';
import DarkWorldIcon from '@assets/icons/moon-stars.svg';
import RecruitsIcon from '@assets/icons/users.svg';
import SettingsIcon from '@assets/icons/sliders.svg';
import AboutIcon from '@assets/icons/book-open.svg';
import DevtoolsIcon from '@assets/icons/code.svg';

export function SidebarMenu() {
  return (
    <>
      <Sidebar.Group>
        <Sidebar.Item title="Home" icon={<HomeIcon />} to="/home" />
        <Sidebar.Item
          title="Inventory"
          icon={<InventoryIcon />}
          to="/inventory"
          requireSave
        />
        <Sidebar.Item
          title="Party"
          icon={<PartyIcon />}
          to="/party"
          requireSave
        />
        <Sidebar.Item
          title="Light World"
          icon={<LightWorldIcon />}
          to="/light-world"
          requireSave
        />
        <Sidebar.Item
          title="Dark World"
          icon={<DarkWorldIcon />}
          to="/dark-world"
          requireSave
        />
        <Sidebar.Item
          title="Recruits"
          icon={<RecruitsIcon />}
          to="/recruits"
          requireSave
        />
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.Item
          title="Devtools"
          icon={<DevtoolsIcon />}
          to="/devtools"
          requireDevmode
        />
        <Sidebar.Item title="Settings" icon={<SettingsIcon />} to="/settings" />
        <Sidebar.Item title="About" icon={<AboutIcon />} to="/about" />
      </Sidebar.Group>
    </>
  );
}

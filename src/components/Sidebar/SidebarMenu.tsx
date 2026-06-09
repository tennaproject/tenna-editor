import HomeIcon from '@assets/icons/home.svg?react';
import InventoryIcon from '@assets/icons/briefcase.svg?react';
import PartyIcon from '@assets/icons/contact.svg?react';
import LightWorldIcon from '@assets/icons/sun-alt.svg?react';
import StoryIcon from '@assets/icons/script-text.svg?react';
import RecruitsIcon from '@assets/icons/user-plus.svg?react';
import FlagsIcon from '@assets/icons/flag.svg?react';
import SettingsIcon from '@assets/icons/sliders.svg?react';
import AboutIcon from '@assets/icons/book-open.svg?react';
import DevtoolsIcon from '@assets/icons/code.svg?react';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';

export function SidebarMenu() {
  return (
    <>
      <SidebarGroup>
        <SidebarItem
          title="Home"
          icon={<HomeIcon />}
          to="/"
          activePaths={['/welcome']}
        />
        <SidebarItem
          title="Inventory"
          icon={<InventoryIcon />}
          to="/inventory"
          requireSave
        />
        <SidebarItem
          title="Party"
          icon={<PartyIcon />}
          to="/party"
          requireSave
        />
        <SidebarItem
          title="Light World"
          icon={<LightWorldIcon />}
          to="/light-world"
          requireSave
        />
        <SidebarItem
          title="Story"
          icon={<StoryIcon />}
          to="/story"
          requireSave
        />
        <SidebarItem
          title="Recruits"
          icon={<RecruitsIcon />}
          to="/recruits"
          requireSave
          requireChapter={2}
        />
        <SidebarItem
          title="Flags"
          icon={<FlagsIcon />}
          to="/flags"
          requireSave
        />
      </SidebarGroup>

      <SidebarGroup>
        {import.meta.env.VITE_DEVTOOLS_TAB === 'true' && (
          <SidebarItem
            title="Devtools"
            icon={<DevtoolsIcon />}
            to="/devtools"
            requireDevmode
          />
        )}
        {import.meta.env.VITE_SETTINGS_TAB === 'true' && (
          <SidebarItem
            title="Settings"
            icon={<SettingsIcon />}
            to="/settings"
          />
        )}
        <SidebarItem title="About" icon={<AboutIcon />} to="/about" />
      </SidebarGroup>
    </>
  );
}

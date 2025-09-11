import { Sidebar } from '.';

import HomeIcon from '@assets/icons/home.svg?react';
import InventoryIcon from '@assets/icons/briefcase.svg?react';
import PartyIcon from '@assets/icons/contact.svg?react';
import LightWorldIcon from '@assets/icons/sun-alt.svg?react';
import StoryIcon from '@assets/icons/script-text.svg?react';
import RecruitsIcon from '@assets/icons/user-plus.svg?react';
import SettingsIcon from '@assets/icons/sliders.svg?react';
import AboutIcon from '@assets/icons/book-open.svg?react';
import DevtoolsIcon from '@assets/icons/code.svg?react';

export function SidebarMenu() {
  return (
    <>
      <Sidebar.Group>
        <Sidebar.Item title="Home" icon={<HomeIcon />} to="/" />
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
          title="Story"
          icon={<StoryIcon />}
          to="/story"
          requireSave
        />
        <Sidebar.Item
          title="Recruits"
          icon={<RecruitsIcon />}
          to="/recruits"
          requireSave
          requireChapter={2}
        />
      </Sidebar.Group>

      <Sidebar.Group>
        {import.meta.env.VITE_DEVTOOLS_TAB === 'true' && (
          <Sidebar.Item
            title="Devtools"
            icon={<DevtoolsIcon />}
            to="/devtools"
            requireDevmode
          />
        )}
        {import.meta.env.VITE_SETTINGS_TAB === 'true' && (
          <Sidebar.Item
            title="Settings"
            icon={<SettingsIcon />}
            to="/settings"
          />
        )}
        <Sidebar.Item title="About" icon={<AboutIcon />} to="/about" />
      </Sidebar.Group>
    </>
  );
}

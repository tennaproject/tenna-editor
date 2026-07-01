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
import { useTranslation } from '../../i18n';

export function SidebarMenu() {
  const { t } = useTranslation();

  return (
    <>
      <SidebarGroup>
        <SidebarItem
          title={t('ui.nav.home', 'Home')}
          icon={<HomeIcon />}
          to="/"
          activePaths={['/welcome']}
        />
        <SidebarItem
          title={t('ui.nav.inventory', 'Inventory')}
          icon={<InventoryIcon />}
          to="/inventory"
          requireSave
        />
        <SidebarItem
          title={t('ui.nav.party', 'Party')}
          icon={<PartyIcon />}
          to="/party"
          requireSave
        />
        <SidebarItem
          title={t('ui.nav.lightWorld', 'Light World')}
          icon={<LightWorldIcon />}
          to="/light-world"
          requireSave
        />
        <SidebarItem
          title={t('ui.nav.story', 'Story')}
          icon={<StoryIcon />}
          to="/story"
          requireSave
        />
        <SidebarItem
          title={t('ui.nav.recruits', 'Recruits')}
          icon={<RecruitsIcon />}
          to="/recruits"
          requireSave
          requireChapter={2}
        />
        <SidebarItem
          title={t('ui.nav.flags', 'Flags')}
          icon={<FlagsIcon />}
          to="/flags"
          requireSave
        />
      </SidebarGroup>

      <SidebarGroup>
        {import.meta.env.VITE_DEVTOOLS_TAB === 'true' && (
          <SidebarItem
            title={t('ui.nav.devtools', 'Devtools')}
            icon={<DevtoolsIcon />}
            to="/devtools"
            requireDevmode
          />
        )}
        <SidebarItem
          title={t('ui.nav.settings', 'Settings')}
          icon={<SettingsIcon />}
          to="/settings"
        />
        <SidebarItem
          title={t('ui.nav.about', 'About')}
          icon={<AboutIcon />}
          to="/about"
        />
      </SidebarGroup>
    </>
  );
}

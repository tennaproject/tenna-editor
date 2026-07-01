import { Page } from '@components';
import { Outlet } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export function InventoryRoot() {
  const { t } = useTranslation();

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.inventory', 'Inventory')}>
        <Page.Nav>
          <Page.NavItem
            title={t('ui.nav.consumables', 'Consumables')}
            to="/inventory/consumables"
          />
          <Page.NavItem
            title={t('ui.nav.keyItems', 'Key Items')}
            to="/inventory/key-items"
          />
          <Page.NavItem
            title={t('ui.nav.weapons', 'Weapons')}
            to="/inventory/weapons"
          />
          <Page.NavItem
            title={t('ui.nav.armors', 'Armors')}
            to="/inventory/armors"
          />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}

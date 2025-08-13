import { Page } from '@components';
import { Outlet } from 'react-router-dom';

export const InventoryPage = () => {
  return (
    <Page>
      <Page.TopBar title="Inventory">
        <Page.Nav>
          <Page.NavItem title="Consumables" to="/inventory/consumables" />
          <Page.NavItem title="Key Items" to="/inventory/key-items" />
          <Page.NavItem title="Weapons" to="/inventory/weapons" />
          <Page.NavItem title="Armors" to="/inventory/armors" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
};

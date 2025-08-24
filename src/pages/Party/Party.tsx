import { Page } from '@components';
import { Outlet } from 'react-router-dom';

export const PartyPage = () => {
  return (
    <Page>
      <Page.TopBar title="Party">
        <Page.Nav>
          <Page.NavItem title="Overview" to="/party/overview" />
          <Page.NavItem title="Kris" to="/party/kris" />
          <Page.NavItem title="Susie" to="/party/susie" />
          <Page.NavItem title="Ralsei" to="/party/ralsei" />
          <Page.NavItem title="Noelle" to="/party/noelle" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
};

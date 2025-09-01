import { Page } from '@components';
import { Outlet } from 'react-router-dom';

export function HomeRoot() {
  return (
    <Page>
      <Page.TopBar title="Home">
        <Page.Nav>
          <Page.NavItem title="Overview" to="/home/overview" />
          <Page.NavItem title="Welcome" to="/home/welcome" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}

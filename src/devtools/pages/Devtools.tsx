import { Page } from '@components';
import { Outlet } from 'react-router-dom';

export const DevtoolsPage = () => {
  return (
    <Page>
      <Page.TopBar title="Devtools">
        <Page.Nav>
          <Page.NavItem title="Colors" to="/devtools/colors" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
};

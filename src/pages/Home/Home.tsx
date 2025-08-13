import { Page } from '@components';
import { Outlet } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Page>
      <Page.TopBar title="Home">
        <Page.Nav>
          <Page.NavItem title="Upload" to="/home/upload" />
          <Page.NavItem title="Download" to="/home/download" />
          <Page.NavItem title="Saves List" to="/home/saves-list" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
};

import { Page } from '@/components/Page';
import { Outlet } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <Page>
      <Page.TopBar title="About">
        <Page.Nav>
          <Page.NavItem title="Overview" to="/about/overview" />
          <Page.NavItem title="Changelog" to="/about/changelog" />
          <Page.NavItem title="License" to="/about/license" />
          <Page.NavItem title="Attributions" to="/about/attributions" />
        </Page.Nav>
      </Page.TopBar>
      <Outlet />
    </Page>
  );
};

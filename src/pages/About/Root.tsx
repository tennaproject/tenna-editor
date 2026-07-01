import { Page } from '@components';
import { Outlet } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export function AboutRoot() {
  const { t } = useTranslation();

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.about', 'About')}>
        <Page.Nav>
          <Page.NavItem title={t('ui.nav.overview', 'Overview')} to="/about/overview" />
          <Page.NavItem title={t('ui.nav.changelog', 'Changelog')} to="/about/changelog" />
          <Page.NavItem title={t('ui.nav.license', 'License')} to="/about/license" />
          <Page.NavItem
            title={t('ui.nav.attributions', 'Attributions')}
            to="/about/attributions"
          />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}

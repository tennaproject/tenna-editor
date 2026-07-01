import { Page } from '@components';
import { useSave } from '@store';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export function HomeRoot() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const save = useSave.getState().save;
  useEffect(() => {
    const firstVisit = Boolean(sessionStorage.getItem('tenna-welcome'));
    if (!save && !firstVisit) {
      navigate('/welcome');
      sessionStorage.setItem('tenna-welcome', 'true');
    }
  }, [save, navigate]);

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.home', 'Home')}>
        <Page.Nav>
          <Page.NavItem title={t('ui.nav.overview', 'Overview')} to="" />
          <Page.NavItem title={t('ui.nav.welcome', 'Welcome')} to="welcome" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}

import { Page } from '@components';
import { type ChapterIndex } from '@data';
import { useSave } from '@store';
import { Outlet } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export function PartyRoot() {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) || (1 as ChapterIndex);

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.party', 'Party')}>
        <Page.Nav>
          <Page.NavItem title={t('ui.nav.overview', 'Overview')} to="/party/overview" />
          <Page.NavItem title={t('ui.nav.kris', 'Kris')} to="/party/kris" />
          <Page.NavItem title={t('ui.nav.susie', 'Susie')} to="/party/susie" />
          <Page.NavItem title={t('ui.nav.ralsei', 'Ralsei')} to="/party/ralsei" />
          {chapter > 1 && (
            <Page.NavItem title={t('ui.nav.noelle', 'Noelle')} to="/party/noelle" />
          )}
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}

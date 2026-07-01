import { Page } from '@components';
import type { ChapterIndex } from '@data';
import { useSave } from '@store';
import { Outlet } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export function StoryRoot() {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) || (1 as ChapterIndex);

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.story', 'Story')}>
        <Page.Nav>
          <Page.NavItem title={t('ui.nav.chapter1', 'Chapter 1')} to="/story/chapter1" />
          {chapter > 1 && (
            <Page.NavItem title={t('ui.nav.chapter2', 'Chapter 2')} to="/story/chapter2" />
          )}
          {chapter > 2 && (
            <Page.NavItem title={t('ui.nav.chapter3', 'Chapter 3')} to="/story/chapter3" />
          )}
          {chapter > 3 && (
            <Page.NavItem title={t('ui.nav.chapter4', 'Chapter 4')} to="/story/chapter4" />
          )}
          {chapter > 4 && (
            <Page.NavItem title={t('ui.nav.chapter5', 'Chapter 5')} to="/story/chapter5" />
          )}
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}

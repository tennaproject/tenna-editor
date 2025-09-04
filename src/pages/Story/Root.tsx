import { Page } from '@components';
import type { ChapterIndex } from '@data';
import { useSave } from '@store';
import { Outlet } from 'react-router-dom';

export function StoryRoot() {
  const chapter = useSave((s) => s.save?.meta.chapter) || (1 as ChapterIndex);

  return (
    <Page>
      <Page.TopBar title="Story">
        <Page.Nav>
          <Page.NavItem title="Chapter 1" to="/story/chapter1" />
          {chapter > 1 && (
            <Page.NavItem title="Chapter 2" to="/story/chapter2" />
          )}
          {chapter > 2 && (
            <Page.NavItem title="Chapter 3" to="/story/chapter3" />
          )}
          {chapter > 3 && (
            <Page.NavItem title="Chapter 4" to="/story/chapter4" />
          )}
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>
        <Outlet />
      </Page.Content>
    </Page>
  );
}

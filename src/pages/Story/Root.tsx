import { Page } from '@components';

export function StoryRoot() {
  return (
    <Page>
      <Page.TopBar title="Story">
        <Page.Nav>
          <Page.NavItem title="Chapter 1" to="/home/overview" />
          <Page.NavItem title="Chapter 2" to="/home/welcome" />
          <Page.NavItem title="Chapter 3" to="/home/welcome" />
          <Page.NavItem title="Chapter 4" to="/home/welcome" />
        </Page.Nav>
      </Page.TopBar>
      <Page.Content>story</Page.Content>
    </Page>
  );
}

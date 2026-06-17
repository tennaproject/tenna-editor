import { Page } from './Page';
import { PageContentSpinner } from './PageContentSpinner';

export function Loading() {
  return (
    <Page>
      <Page.TopBar title="" />
      <Page.Content>
        <PageContentSpinner />
      </Page.Content>
    </Page>
  );
}
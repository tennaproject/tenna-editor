import { Page } from '@components';
import { Placeholder } from '../Placeholder';

export function DarkWorldRoot() {
  return (
    <Page>
      <Page.TopBar title="Dark World" />
      <Page.Content>
        <Placeholder />
      </Page.Content>
    </Page>
  );
}

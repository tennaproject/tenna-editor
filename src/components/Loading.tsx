import { Heading } from './Heading';
import { Page } from './Page';

export function Loading() {
  return (
    <Page>
      <Page.TopBar title="" />
      <Page.Content>
        <div className="flex h-[88%] flex-col justify-center items-center">
          <Heading level={2}>MIKE, the BOARD, please!</Heading>
          <p className="text-text-2">Editor is loading...</p>
          <div className="animate-spin rounded-full h-20 w-20 border-12 border-surface-2 border-t-surface-4 mt-6"></div>
        </div>
      </Page.Content>
    </Page>
  );
}

import { useUi } from '@contexts';
import { Checkbox, Page } from '@components';

export const SettingsPage = () => {
  const { devmode, setDevmode } = useUi();
  return (
    <Page>
      <Page.TopBar title="Settings" />
      <Page.Content>
        <div className="page">
          <Checkbox
            label="Enable developer mode"
            checked={devmode}
            onChange={setDevmode}
          />
        </div>
      </Page.Content>
    </Page>
  );
};

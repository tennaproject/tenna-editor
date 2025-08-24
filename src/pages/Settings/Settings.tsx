import { useUi } from '@store';
import { Checkbox, Page } from '@components';

export const SettingsPage = () => {
  const devmode = useUi((s) => s.devmode);
  const setDevmode = useUi((s) => s.setDevmode);

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

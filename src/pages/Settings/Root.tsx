import { useUi } from '@store';
import { Checkbox, Page } from '@components';

export function SettingsRoot() {
  const devmode = useUi((s) => s.ui.devmode);
  const updateUi = useUi((s) => s.updateUi);

  return (
    <Page>
      <Page.TopBar title="Settings" />
      <Page.Content>
        <div className="page">
          <Checkbox
            label="Enable developer mode"
            checked={devmode}
            onChange={(state) => updateUi((ui) => (ui.devmode = state))}
          />
        </div>
      </Page.Content>
    </Page>
  );
}

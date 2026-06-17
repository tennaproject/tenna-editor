import { useUi } from '@store';
import { Checkbox, Page, Section, Card, Heading, Button } from '@components';
import { exportAllSaves, importAllSaves } from '@utils';
import { toast } from '@services';
import { useRef } from 'react';

export function SettingsRoot() {
  const devmode = useUi((s) => s.ui.devmode);
  const updateUi = useUi((s) => s.updateUi);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await importAllSaves(file);
      toast(
        `Successfully imported ${result.imported} save(s) (skipped ${result.skipped})`,
        'success',
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Failed to import backup file';
      toast(message, 'error');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <Page>
      <Page.TopBar title="Settings" />
      <Page.Content>
        <div className="page">
          {import.meta.env.VITE_DEVTOOLS_TAB === 'true' && (
            <Section id="general">
              <Card className="flex flex-col gap-3 p-6">
                <Heading level={3}>General</Heading>
                <Checkbox
                  label="Enable developer mode"
                  checked={devmode}
                  onChange={(state) => updateUi((ui) => (ui.devmode = state))}
                />
              </Card>
            </Section>
          )}

          <Section id="backup">
            <Card className="flex flex-col gap-3 p-6">
              <Heading level={3}>Backup & Restore</Heading>
              <p className="text-text-2 text-sm">
                Export all your save data into a JSON file, or import it back from a backup.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Button
                  variant="primary"
                  onClick={async () => {
                    try {
                      await exportAllSaves();
                    } catch (e) {
                      console.error(e);
                      toast('Failed to export saves', 'error');
                    }
                  }}
                >
                  Export All Saves
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Import Saves
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  className="hidden"
                  onChange={handleImport}
                />
              </div>
            </Card>
          </Section>
        </div>
      </Page.Content>
    </Page>
  );
}

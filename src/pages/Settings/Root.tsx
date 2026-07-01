import { useUi } from '@store';
import {
  Checkbox,
  Page,
  Section,
  Card,
  Heading,
  Button,
  Select,
  type SelectItem,
} from '@components';
import { exportAllSaves, importAllSaves } from '@utils';
import { toast } from '@services';
import { useRef } from 'react';
import FlagJp from '@assets/flags/flag-jp.png';
import FlagKr from '@assets/flags/flag-kr.png';
import FlagUs from '@assets/flags/flag-us.png';
import {
  SUPPORTED_LOCALES,
  getLocaleTranslationStats,
  isSupportedLocale,
  useTranslation,
  type Locale,
} from '../../i18n';

const LANGUAGE_OPTIONS: SelectItem[] = Object.entries(SUPPORTED_LOCALES).map(
  ([id, locale]) => ({
    id,
    icon: <LocaleFlag country={locale.flag} />,
    label: `${locale.displayName} (${getLocaleTranslationStats(id as Locale).percentage}%)`,
  }),
);

const FLAG_ASSETS = {
  us: FlagUs,
  jp: FlagJp,
  kr: FlagKr,
};

function LocaleFlag({ country }: { country: 'us' | 'jp' | 'kr' }) {
  return (
    <img
      src={FLAG_ASSETS[country]}
      alt=""
      className="block h-[26px] w-[38px] object-contain"
    />
  );
}

export function SettingsRoot() {
  const { locale, t } = useTranslation();
  const devmode = useUi((s) => s.ui.devmode);
  const updateUi = useUi((s) => s.updateUi);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedLanguage =
    LANGUAGE_OPTIONS.find((item) => item.id === locale) ?? LANGUAGE_OPTIONS[0];

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await importAllSaves(file);
      toast(
        t(
          'ui.settings.importSuccess',
          'Successfully imported {imported} save(s) (skipped {skipped})',
        )
          .replace('{imported}', String(result.imported))
          .replace('{skipped}', String(result.skipped)),
        'success',
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : t('ui.settings.importFailedGeneric', 'Failed to import backup file');
      toast(message, 'error');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <Page>
      <Page.TopBar title={t('ui.settings.title', 'Settings')} />
      <Page.Content>
        <div className="page">
          <Section id="language">
            <Card className="flex flex-col gap-3 p-6">
              <Heading level={3}>{t('ui.settings.language', 'Language')}</Heading>
              <p className="text-text-2 text-sm">
                {t(
                  'ui.settings.languageDescription',
                  'Choose which language the editor uses. Missing translations fall back to English.',
                )}
              </p>
              <Select
                items={LANGUAGE_OPTIONS}
                placeholder={t(
                  'ui.settings.languagePlaceholder',
                  'Select language...',
                )}
                selectedItem={selectedLanguage}
                defaultSelectedItem={selectedLanguage}
                onSelectionChange={(item) => {
                  if (!item || !isSupportedLocale(item.id)) return;
                  updateUi((ui) => (ui.locale = item.id as Locale));
                }}
              />
            </Card>
          </Section>

          {import.meta.env.VITE_DEVTOOLS_TAB === 'true' && (
            <Section id="general">
              <Card className="flex flex-col gap-3 p-6">
                <Heading level={3}>{t('ui.settings.general', 'General')}</Heading>
                <Checkbox
                  label={t(
                    'ui.settings.enableDeveloperMode',
                    'Enable developer mode',
                  )}
                  checked={devmode}
                  onChange={(state) => updateUi((ui) => (ui.devmode = state))}
                />
              </Card>
            </Section>
          )}

          <Section id="backup">
            <Card className="flex flex-col gap-3 p-6">
              <Heading level={3}>
                {t('ui.settings.backupRestore', 'Backup & Restore')}
              </Heading>
              <p className="text-text-2 text-sm">
                {t(
                  'ui.settings.backupRestoreDescription',
                  'Export all your save data into a JSON file, or import it back from a backup.',
                )}
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Button
                  variant="primary"
                  onClick={async () => {
                    try {
                      await exportAllSaves();
                    } catch (e) {
                      console.error(e);
                      toast(
                        t('ui.settings.exportFailed', 'Failed to export saves'),
                        'error',
                      );
                    }
                  }}
                >
                  {t('ui.settings.exportAllSaves', 'Export All Saves')}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t('ui.settings.importSaves', 'Import Saves')}
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

import { Card, Heading, Section } from '@components';
import { lazy, Suspense, useState } from 'react';
import { formatTranslation, useTranslation } from '../../i18n';

const Upload = lazy(() =>
  import('../../components/Upload').then((module) => ({
    default: module.Upload,
  })),
);

export function HomeWelcome() {
  const { t } = useTranslation();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <Section className="page select-text">
      <Card className="p-6 flex flex-col gap-4">
        <Section id="heading" className="flex flex-col gap-3">
          <Heading level={3}>{t('ui.home.welcomeTitle', 'Welcome')}</Heading>
          <div className="ui-prose-muted flex flex-col gap-2">
            <p>
              {t(
                'ui.home.welcomeDescription',
                'Tenna Editor is a powerful tool for editing DELTARUNE save files.',
              )}
            </p>
            <p>
              {t(
                'ui.home.welcomeGettingStarted',
                'To get started, click the area below or click the upload button in the top-right corner.',
              )}
            </p>
            <p className="ui-danger font-bold">
              {t(
                'ui.home.backupReminder',
                'Remember to always back up your saves before editing them!',
              )}
            </p>
          </div>
        </Section>

        <Section id="upload">
          <button
            className="h-45 w-full border-border bg-surface-3 hover:bg-surface-3-hover motion-reduce:transition-none transition-colors duration-200"
            onClick={() => setIsUploadOpen(true)}
          >
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-lg md:text-xl">
                {t('ui.home.uploadSaveCta', 'Click here to upload save')}
              </h1>
              <p className="ui-prose-muted">
                {t(
                  'ui.home.uploadSaveCtaSubtext',
                  'or click upload button in the top-right corner',
                )}
              </p>
            </div>
          </button>
          {isUploadOpen && (
            <Suspense fallback={null}>
              <Upload isOpen={isUploadOpen} setOpen={setIsUploadOpen} />
            </Suspense>
          )}
        </Section>
        <Section id="filelocation" className="flex flex-col gap-1">
          <Heading level={4}>
            {t('ui.home.whereToFindSaves', 'Where to find saves?')}
          </Heading>
          <div className="ui-prose-muted">
            <p>
              {t(
                'ui.home.saveLocationsIntro',
                'Your DELTARUNE save files are typically located in the following directories:',
              )}
            </p>
            <ul className="list-disc pl-5 wrap-break-word">
              <li>
                Windows:{' '}
                <span className="font-mono">%LOCALAPPDATA%\DELTARUNE</span>
              </li>
              <li>
                Mac:{' '}
                <span className="font-mono">
                  ~/Library/Application Support/com.tobyfox.deltarune/
                </span>
              </li>
              <li>
                Linux:{' '}
                <span className="font-mono">
                  ~/.steam/steam/steamapps/compatdata/1671210/pfx/drive_c/users/steamuser/AppData/Local/DELTARUNE/
                </span>
                <br />
                {t('ui.home.deltaportNote', "If you're using")}{' '}
                <a
                  href="https://github.com/pugdev3/deltaport"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline"
                >
                  deltaport
                </a>{' '}
                (
                {t(
                  'ui.home.deltaportUnofficial',
                  'an unofficial native Linux port',
                )}
                ),{' '}
                {t('ui.home.deltaportNoteSuffix', 'your saves are located at')}{' '}
                <span className="font-mono">~/.config/DELTARUNE/</span>
              </li>
            </ul>
          </div>
        </Section>
        <Section id="compatibility" className="flex flex-col gap-1">
          <Heading level={4}>
            {t('ui.home.compatibility', 'Compatibility')}
          </Heading>
          <div className="ui-prose-muted">
            <p>
              {t(
                'ui.home.compatibilityDescription',
                'Tenna Editor is compatible with DELTARUNE Chapter 1-5 save files from PC platforms and already-exported Switch save containers. Chapter 5 support includes editor data for recruits, rooms, items, weapons, and armors. Dedicated flags and plot points are not mapped yet.',
              )}
            </p>
            <ul className="list-disc pl-5">
              <li>{t('ui.home.platformPcWindows', 'PC (Windows)')}</li>
              <li>{t('ui.home.platformMac', 'Mac')}</li>
              <li>
                {t(
                  'ui.home.platformLinuxProton',
                  'Linux (through Steam Proton)',
                )}
              </li>
            </ul>
            <p>
              {formatTranslation(
                t(
                  'ui.home.switchCompatibilityDescription',
                  'Switch save containers are experimental and require an already-exported {fileName}. Tenna Editor cannot extract or restore saves on hardware.',
                ),
                { fileName: 'deltarune.sav' },
              )}
            </p>
          </div>
        </Section>
      </Card>
    </Section>
  );
}

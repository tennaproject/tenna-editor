import { useState } from 'react';
import { useDebouncedValue } from '@hooks';
import { toast } from '@services';
import { useSave } from '@store';
import type { Save } from '@types';
import {
  chapterHelpers,
  createDeltasaverImportUrl,
  createShareUrl,
  formatTime,
  getPlotPointLabel,
  mergeClass,
  FINGERPRINT_ASPECT,
  roomHelpers,
} from '@utils';
import {
  getChapterTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { Button } from './Button';
import { ModalFooter, ModalLayout } from './ModalLayout';
import { SaveFingerprint } from './SaveFingerprint';
import { QrCode } from './QrCode';
import { TextInput } from './TextInput';
import { TextLabel } from './TextLabel';

const URL_BUDGET = 2000;

interface ShareProps {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

function Detail({
  label,
  children,
  wrap,
}: {
  label: string;
  children: React.ReactNode;
  wrap?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <TextLabel>{label}</TextLabel>
      <div
        className={
          wrap
            ? 'line-clamp-2 leading-snug break-words'
            : 'truncate leading-none'
        }
      >
        {children}
      </div>
    </div>
  );
}

function Fingerprint({ save, className }: { save: Save; className?: string }) {
  const { t } = useTranslation();

  return (
    <figure className={mergeClass('shrink-0', className)}>
      <div
        className={mergeClass(
          'w-full border border-border bg-surface-1',
          FINGERPRINT_ASPECT,
        )}
      >
        <SaveFingerprint save={save} />
      </div>
      <figcaption className="mt-2 text-center text-sm leading-snug text-text-2">
        {t('ui.home.saveFingerprint', 'Unique fingerprint')}
      </figcaption>
    </figure>
  );
}

export function Share({ isOpen, setOpen }: ShareProps) {
  const { t } = useTranslation();
  const save = useSave((state) => state.save);

  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const debouncedAuthor = useDebouncedValue(author, 250);
  const debouncedDescription = useDebouncedValue(description, 250);

  let url: string | null = null;
  let deltasaverUrl: string | null = null;
  if (save && isOpen) {
    try {
      url = createShareUrl(save, {
        author: debouncedAuthor,
        description: debouncedDescription,
      });
    } catch {
      url = null;
    }

    try {
      deltasaverUrl = createDeltasaverImportUrl(save, {
        author: debouncedAuthor,
      });
    } catch {
      deltasaverUrl = null;
    }
  }

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      toast(t('ui.share.copied', 'Share link copied'), 'success');
      setOpen(false);
    } catch {
      toast(t('ui.share.copyFailed', 'Could not copy the link'), 'error');
    }
  };

  const sendToDeltasaver = () => {
    if (!deltasaverUrl) return;

    // this is a finicky way to detect if the link was opened
    const clearHandlerCheck = () => {
      window.clearTimeout(timer);
      window.removeEventListener('blur', clearHandlerCheck);
      document.removeEventListener('visibilitychange', clearHandlerCheck);
    };
    const timer = window.setTimeout(() => {
      clearHandlerCheck();
      toast(
        t('ui.share.deltasaverFailed', 'Could not open DELTASAVER'),
        'error',
      );
    }, 1500);
    window.addEventListener('blur', clearHandlerCheck);
    document.addEventListener('visibilitychange', clearHandlerCheck);

    try {
      location.href = deltasaverUrl;
      setOpen(false);
    } catch {
      clearHandlerCheck();
      toast(
        t('ui.share.deltasaverFailed', 'Could not open DELTASAVER'),
        'error',
      );
    }
  };

  if (!save) return null;

  const isLong = url !== null && url.length > URL_BUDGET;

  const chapterName = translateMeta(
    getChapterTranslationKeyPrefix(save.meta.chapter),
    chapterHelpers.getById(save.meta.chapter),
    t,
  ).displayName;
  const roomMeta = roomHelpers.getById(save.room);
  const plotLabel = getPlotPointLabel(save.meta.chapter, save.plot);
  const title = save.meta.name || t('ui.share.untitled', 'Untitled save');

  return (
    <ModalLayout
      isOpen={isOpen}
      setOpen={setOpen}
      variant="workspace"
      panelClassName="h-[min(92vh,40rem)] w-[min(100%,62rem)] max-w-[min(100%,62rem)]"
      title={t('ui.share.title', 'Share Save')}
      bodyClassName="pb-0"
      footer={
        <ModalFooter>
          <Button variant="secondary" size="lg" onClick={() => setOpen(false)}>
            {t('ui.common.cancel', 'Cancel')}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:min-w-52"
            disabled={!deltasaverUrl}
            onClick={sendToDeltasaver}
          >
            {t('ui.share.sendToDeltasaver', 'Send to DELTASAVER')}
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:min-w-52"
            disabled={!url}
            onClick={() => void copy()}
          >
            {t('ui.share.copyLink', 'Copy link')}
          </Button>
        </ModalFooter>
      }
    >
      <div className="flex min-h-0 min-w-0 flex-1 gap-4 pb-6 sm:gap-6">
        <Fingerprint
          save={save}
          className="hidden self-start sm:block sm:w-56"
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
            <div className="grid min-w-0 shrink-0 grid-cols-2 content-start gap-x-4 gap-y-4">
              <Fingerprint save={save} className="row-span-4 sm:hidden" />

              <Detail label={t('ui.share.name', 'Name')} wrap>
                {title}
              </Detail>
              <Detail label={t('ui.home.chapter', 'Chapter')}>
                <span className="inline-flex items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center bg-surface-3 font-bold">
                    {save.meta.chapter}
                  </span>
                  <span className="truncate text-text-2">{chapterName}</span>
                </span>
              </Detail>

              <Detail label={t('ui.share.slot', 'Slot')}>
                {save.meta.slot + 1}
              </Detail>
              <Detail label={t('ui.share.completionLabel', 'Completion')}>
                {save.meta.isCompletionSave
                  ? t('ui.share.yes', 'Yes')
                  : t('ui.share.no', 'No')}
              </Detail>

              <Detail label={t('ui.share.playerName', 'Player name')}>
                {save.playerName || '—'}
              </Detail>
              <Detail label={t('ui.share.playtime', 'Playtime')}>
                {formatTime(save.time)}
              </Detail>

              <Detail label={t('ui.share.room', 'Room')} wrap>
                {roomMeta?.displayName || save.room}
              </Detail>
              <Detail label={t('ui.share.plot', 'Plot')} wrap>
                {plotLabel || save.plot}
              </Detail>
            </div>

            <div className="flex shrink-0 flex-col gap-2">
              <TextLabel htmlFor="share-author">
                {t('ui.share.authorLabel', 'Author')}
              </TextLabel>
              <TextInput
                id="share-author"
                fullWidth
                value={author}
                onChange={setAuthor}
                placeholder={t('ui.share.authorPlaceholder', 'Optional')}
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <TextLabel htmlFor="share-description">
                {t('ui.share.descriptionLabel', 'Description')}
              </TextLabel>
              <textarea
                id="share-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={t('ui.share.descriptionPlaceholder', 'Optional')}
                spellCheck={false}
                className="ui-field min-h-16 w-full flex-1 resize-none appearance-none leading-snug focus:outline-none focus:ring-1 focus:ring-text-3"
              />
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:w-80">
            <div className="mx-auto aspect-square w-full max-w-80 border border-border sm:max-w-none">
              <QrCode value={url ?? ''} className="h-full w-full" />
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <p className="text-sm leading-snug text-text-2">
                {t(
                  'ui.share.explanation',
                  'The whole save is written into the link, and the QR code holds that same link. The save data stays on your device as it is never sent to a server. Share the link or the QR code to load a copy of the save on another device.',
                )}
              </p>
              <p className="ui-danger text-sm font-bold">
                {t(
                  'ui.share.revokeWarning',
                  'Once you share this save, you cannot revoke it later.',
                )}
              </p>

              {isLong && (
                <p className="text-sm text-yellow">
                  {t(
                    'ui.share.tooLong',
                    'This link is long enough that some chat apps may cut it short.',
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}

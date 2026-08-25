import { useState } from 'react';
import HomeIcon from '@assets/icons/home.svg?react';
import CancelIcon from '@assets/icons/close.svg?react';
import AddSaveIcon from '@assets/icons/save.svg?react';
import { saveStorage, toast } from '@services';
import { useSave } from '@store';
import type { Save } from '@types';
import {
  chapterHelpers,
  detectChapter,
  extractGamePayload,
  formatLocalDateTime,
  formatTime,
  getPlotPointLabel,
  mergeClass,
  parseSave,
  parseShareUrl,
  FINGERPRINT_ASPECT,
  roomHelpers,
  type ShareMeta,
} from '@utils';
import {
  getChapterTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { Button } from './Button';
import { ModalFooter, ModalLayout } from './ModalLayout';
import { SaveFingerprint } from './SaveFingerprint';
import { TextLabel } from './TextLabel';

const CAPTURED_HASH =
  window.location.pathname.replace(/\/$/, '') === '/share'
    ? window.location.hash
    : null;

if (CAPTURED_HASH) {
  window.history.replaceState(
    window.history.state,
    '',
    `${window.location.pathname}${window.location.search}`,
  );
}

type Decoded = { ok: true; save: Save; meta?: ShareMeta } | { ok: false };

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

export function ShareImport() {
  const { t } = useTranslation();
  const setSave = useSave((state) => state.setSave);

  const [isOpen, setIsOpen] = useState(CAPTURED_HASH !== null);
  const [isAdding, setIsAdding] = useState(false);

  const decoded = ((): Decoded | null => {
    if (CAPTURED_HASH === null) return null;
    try {
      const { saveText, meta } = parseShareUrl(CAPTURED_HASH);
      const save = parseSave(saveText);

      if (meta) {
        save.meta.chapter = meta.chapter;
        save.meta.slot = meta.slot;
        save.meta.isCompletionSave = meta.isCompletionSave;
      } else {
        save.meta.chapter = detectChapter(save).chapter ?? save.meta.chapter;
      }

      return { ok: true, save, meta };
    } catch {
      return { ok: false };
    }
  })();

  if (decoded === null) return null;

  function close() {
    setIsOpen(false);
  }

  async function addSave() {
    if (!decoded?.ok || isAdding) return;
    setIsAdding(true);

    const { save, meta } = decoded;

    save.meta.name =
      meta?.name?.trim() || t('ui.share.defaultName', 'Shared save');
    save.meta.source = { platform: 'pc' };
    save.meta.baseline = {
      capturedAt: new Date(),
      source: 'upload',
      payload: extractGamePayload(save),
    };

    await saveStorage.set(save.meta.id, save);
    setSave(save);

    toast(t('ui.share.added', 'Shared save added'), 'success');
    close();
  }

  if (!decoded.ok) {
    return (
      <ModalLayout
        isOpen={isOpen}
        setOpen={setIsOpen}
        onClose={close}
        variant="compact"
        title={t('ui.share.invalidTitle', 'Cannot Read This Link')}
        footer={
          <ModalFooter>
            <Button
              variant="primary"
              size="lg"
              icon={<HomeIcon />}
              onClick={close}
            >
              {t('ui.share.goHome', 'Go to editor')}
            </Button>
          </ModalFooter>
        }
      >
        <p className="text-sm text-text-2">
          {t(
            'ui.share.invalidLink',
            'This share link is invalid or incomplete.',
          )}
        </p>
      </ModalLayout>
    );
  }

  const { save, meta } = decoded;
  const title =
    meta?.name?.trim() ||
    save.meta.name ||
    t('ui.share.untitled', 'Untitled save');

  const chapterName = translateMeta(
    getChapterTranslationKeyPrefix(save.meta.chapter),
    chapterHelpers.getById(save.meta.chapter),
    t,
  ).displayName;
  const roomMeta = roomHelpers.getById(save.room);
  const plotLabel = getPlotPointLabel(save.meta.chapter, save.plot);

  return (
    <ModalLayout
      isOpen={isOpen}
      setOpen={setIsOpen}
      onClose={close}
      variant="workspace"
      panelClassName="h-[min(92vh,40rem)] w-[min(100%,42rem)] max-w-[min(100%,42rem)]"
      title={t('ui.share.importTitle', 'Add Shared Save')}
      bodyClassName="pb-0"
      footer={
        <ModalFooter>
          <Button
            variant="secondary"
            size="lg"
            icon={<CancelIcon />}
            onClick={close}
          >
            {t('ui.common.cancel', 'Cancel')}
          </Button>
          <Button
            variant="primary"
            size="lg"
            icon={<AddSaveIcon />}
            className="w-full shrink-0 sm:w-auto sm:min-w-52"
            disabled={isAdding}
            onClick={() => void addSave()}
          >
            {t('ui.share.addSave', 'Add save')}
          </Button>
        </ModalFooter>
      }
    >
      <div className="flex min-h-0 min-w-0 flex-1 gap-4 pb-6 sm:gap-6">
        <Fingerprint
          save={save}
          className="hidden self-start sm:block sm:w-56"
        />

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

          <div className="grid min-w-0 shrink-0 grid-cols-2 gap-x-4 gap-y-4">
            <Detail label={t('ui.share.authorLabel', 'Author')} wrap>
              {meta?.author?.trim() || '—'}
            </Detail>
            <Detail label={t('ui.share.sharedAt', 'Shared')}>
              {meta?.sharedAt ? formatLocalDateTime(meta.sharedAt) : '—'}
            </Detail>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2">
            <TextLabel>
              {t('ui.share.descriptionLabel', 'Description')}
            </TextLabel>
            <p className="min-h-16 flex-1 overflow-y-auto leading-snug break-words text-pretty">
              {meta?.description?.trim() || '—'}
            </p>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}

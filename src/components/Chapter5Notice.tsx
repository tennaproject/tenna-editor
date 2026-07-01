import WarningIcon from '@assets/icons/warning-box.svg?react';
import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { ModalFooter, ModalLayout } from './ModalLayout';
import { useTranslation } from '../i18n';

export function Chapter5Notice() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="h-10 shrink-0 inline-flex items-center gap-1 sm:gap-2 border border-yellow/40 bg-yellow-soft px-1.5 sm:px-2.5 text-sm font-bold text-text-1 hover:bg-yellow-soft/80 motion-reduce:transition-none transition-colors ui-focus-ring"
        aria-label={t('ui.chapter5.infoAria', 'Chapter 5 information')}
      >
        <span className="h-5 w-5 text-yellow" aria-hidden="true">
          <WarningIcon />
        </span>
        <span className="hidden sm:inline text-nowrap">
          {t('ui.chapter5.infoButton', 'Chapter 5 info')}
        </span>
        <Badge tone="green" className="animate-pulse">
          {t('ui.chapter5.new', 'NEW')}
        </Badge>
      </button>

      <ModalLayout
        isOpen={isOpen}
        setOpen={setIsOpen}
        title={t('ui.chapter5.infoTitle', 'Chapter 5 Info')}
        size="content"
        footer={
          <ModalFooter>
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-32"
              onClick={() => setIsOpen(false)}
            >
              {t('ui.common.gotIt', 'Got it')}
            </Button>
          </ModalFooter>
        }
      >
        <div className="flex flex-col gap-3 text-text-2">
          <p>
            {t(
              'ui.chapter5.supportAvailable',
              'Chapter 5 support is available in Tenna Editor.',
            )}
          </p>
          <p className="flex items-start gap-1">
            <Badge tone="green">{t('ui.chapter5.new', 'NEW')}</Badge>
            <span>
              {t(
                'ui.chapter5.basicFeatures',
                'Basic features like recruits, rooms, items, weapons, and armors are in place.',
              )}
            </span>
          </p>
          <p>
            {t(
              'ui.chapter5.flagsLater',
              'Flags and plot points will come later.',
            )}
          </p>
        </div>
      </ModalLayout>
    </>
  );
}

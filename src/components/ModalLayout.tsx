import type { ReactNode } from 'react';
import { mergeClass } from '@utils/merge-class';
import { Heading } from './Heading';
import { Modal } from './Modal';

export type ModalVariant = 'standard' | 'compact' | 'workspace';

const MODAL_MIN_WIDTH_CLASS = 'min-w-[min(100%,24rem)]';

const MODAL_PANEL_BY_VARIANT: Record<ModalVariant, string> = {
  standard: `${MODAL_MIN_WIDTH_CLASS} w-[min(100%,48rem)] h-[min(90vh,30rem)] flex flex-col overflow-hidden p-0`,
  compact: `${MODAL_MIN_WIDTH_CLASS} w-[min(100%,36rem)] sm:w-auto sm:max-w-[min(100%,36rem)] max-h-[min(90vh,28rem)] h-auto flex flex-col overflow-hidden p-0`,
  workspace: `${MODAL_MIN_WIDTH_CLASS} w-[min(100%,56rem)] h-[min(90vh,38rem)] flex flex-col overflow-hidden p-0`,
};

interface ModalLayoutProps {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  onClose?: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: ModalVariant;
  panelClassName?: string;
  bodyClassName?: string;
}

export function ModalLayout({
  isOpen,
  setOpen,
  onClose,
  title,
  children,
  footer,
  variant = 'standard',
  panelClassName,
  bodyClassName,
}: ModalLayoutProps) {
  const isCompact = variant === 'compact';

  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={onClose}
      panelClassName={mergeClass(
        MODAL_PANEL_BY_VARIANT[variant],
        panelClassName,
      )}
    >
      <div
        className={mergeClass(
          'flex flex-col select-none',
          isCompact ? 'max-h-[min(90vh,28rem)]' : 'min-h-0 h-full',
        )}
      >
        <div className="shrink-0 px-6 pt-6 pb-4 pr-12">
          {typeof title === 'string' ? (
            <Heading level={3}>{title}</Heading>
          ) : (
            title
          )}
        </div>

        <div
          className={mergeClass(
            'flex flex-col px-6',
            isCompact ? 'overflow-y-auto' : 'min-h-0 flex-1 overflow-y-auto',
            footer ? 'pb-5' : 'pb-6',
            bodyClassName,
          )}
        >
          {children}
        </div>

        {footer}
      </div>
    </Modal>
  );
}

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <footer
      className={mergeClass(
        'shrink-0 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end border-t border-border bg-surface-3 px-6 py-4',
        className,
      )}
    >
      {children}
    </footer>
  );
}

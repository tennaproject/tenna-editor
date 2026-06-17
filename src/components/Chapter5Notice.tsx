import WarningIcon from '@assets/icons/warning-box.svg?react';
import { useState } from 'react';
import { Button } from './Button';
import { ModalFooter, ModalLayout } from './ModalLayout';

export function Chapter5Notice() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 shrink-0 inline-flex items-center gap-1 sm:gap-2 border border-yellow/40 bg-yellow-soft px-1.5 sm:px-2 text-sm font-bold text-text-1 hover:bg-yellow-soft/80 motion-reduce:transition-none transition-colors ui-focus-ring"
        aria-label="Chapter 5 information"
      >
        <span className="h-5 w-5 text-yellow" aria-hidden="true">
          <WarningIcon />
        </span>
        <span className="hidden sm:inline text-nowrap">Chapter 5 info</span>
      </button>

      <ModalLayout
        isOpen={isOpen}
        setOpen={setOpen}
        title="Chapter 5 Info"
        size="content"
        footer={
          <ModalFooter>
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-32"
              onClick={() => setOpen(false)}
            >
              Got it
            </Button>
          </ModalFooter>
        }
      >
        <div className="flex flex-col gap-3 text-text-2">
          <p>Pre-release Chapter 5 support is available in Tenna Editor.</p>
          <p>
            It currently supports opening and editing saves with existing
            Chapter 1-4 data only.
          </p>
          <p>
            New Chapter 5 weapons, armors, items, and rooms will be added
            shortly after release.
          </p>
          <p>Flags and plot points will come later.</p>
        </div>
      </ModalLayout>
    </>
  );
}

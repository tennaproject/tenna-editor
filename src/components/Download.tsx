import { useSave } from '@store';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  TextLabel,
  Checkbox,
  Button,
  type SelectItem,
  Select,
  InlineGroup,
  DownloadChanges,
  ModalLayout,
  ModalFooter,
} from '@components';
import { toast } from '@services';
import { getBaselineRevision } from '@utils/save-diff';
import { serializeSave } from '@utils/save-serializer';
import type { SaveSlot } from '@types';

const SLOT_OPTIONS: SelectItem[] = [
  { id: '1', label: 'Slot 1' },
  { id: '2', label: 'Slot 2' },
  { id: '3', label: 'Slot 3' },
] as const;

interface DownloadProps {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

export function Download({ isOpen, setOpen }: DownloadProps) {
  const reducedMotion = useReducedMotion();

  const save = useSave((s) => s.save);
  const captureBaseline = useSave((s) => s.captureBaseline);
  const baselineRevision = useSave((s) =>
    getBaselineRevision(s.save?.meta.baseline),
  );
  const [selectedSlot, setSelectedSlot] = useState<SaveSlot>(
    (save?.meta.slot ?? 0) as SaveSlot,
  );
  const [isCompletionSave, setIsCompletionSave] = useState(
    save?.meta.isCompletionSave ?? false,
  );

  const fileName = save
    ? `filech${save.meta.chapter}_${isCompletionSave ? selectedSlot + 3 : selectedSlot}`
    : '';

  function onSlotSelection(item: SelectItem | null) {
    if (item) {
      setSelectedSlot((parseInt(item.id, 10) - 1) as SaveSlot);
    }
  }

  async function downloadSave() {
    if (!save) return;

    const serializedSave = serializeSave(save);
    const blob = new Blob([serializedSave], {
      type: 'application/octet-stream',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Apparently some browsers start the download asynchronously so we have to defer it
    setTimeout(() => URL.revokeObjectURL(url), 10_000);

    await captureBaseline('download');
  }

  useEffect(() => {
    if (isOpen && !save) {
      setOpen(false);
      toast('There is no save loaded currently', 'error');
    }
  }, [isOpen, save, setOpen]);

  return (
    <ModalLayout
      isOpen={isOpen}
      setOpen={setOpen}
      title="Download Save"
      bodyClassName="overflow-hidden gap-5 flex-1"
      footer={
        <ModalFooter
          className="flex-col gap-3 sm:flex-row sm:justify-between"
          aria-live="polite"
        >
          <InlineGroup className="min-w-0 gap-2 sm:flex-1 sm:mr-4 order-last sm:order-first">
            <span className="text-sm text-text-2 whitespace-nowrap shrink-0">
              Saves as
            </span>
            <span className="ui-field-mono truncate" title={fileName}>
              {fileName}
            </span>
          </InlineGroup>
          <Button
            onClick={() => void downloadSave()}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:min-w-52"
          >
            Download save file
          </Button>
        </ModalFooter>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="flex flex-col min-h-0 flex-1 gap-5"
        >
          <div className="shrink-0 flex flex-col gap-3">
            <div className="w-36 max-w-full">
              <TextLabel>In-game slot</TextLabel>
              <Select
                items={SLOT_OPTIONS}
                placeholder="Select slot"
                className="w-full"
                selectedItem={SLOT_OPTIONS[selectedSlot]}
                defaultSelectedItem={SLOT_OPTIONS[selectedSlot]}
                onSelectionChange={onSlotSelection}
              />
            </div>
            <Checkbox
              label="Completion save"
              checked={isCompletionSave}
              onChange={setIsCompletionSave}
            />
          </div>

          {save && (
            <div className="flex flex-col gap-2 min-h-0 flex-1 overflow-hidden">
              <TextLabel>Changes since last upload or download</TextLabel>
              <DownloadChanges
                key={baselineRevision}
                className="min-h-0 flex-1"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </ModalLayout>
  );
}

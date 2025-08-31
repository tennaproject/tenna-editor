import { useSave } from '@store';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TextInput,
  TextLabel,
  Checkbox,
  Button,
  type SelectItem,
  Select,
  Heading,
  Modal,
  InlineGroup,
} from '@components';
import { toast } from '@services';
import { serializeSaveFile } from '@utils';
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
  const save = useSave((s) => s.saveFile);
  const [selectedSlot, setSelectedSlot] = useState<SaveSlot>(1);
  const [isCompletionSave, setIsCompletionSave] = useState(false);
  const [fileName, setFileName] = useState('');

  if (!save) {
    toast('There is no save file loaded currently', 'error');
    return;
  }

  function onSlotSelection(item: SelectItem | null) {
    if (item) {
      setSelectedSlot((parseInt(item.id, 10) - 1) as SaveSlot);
    }
  }

  function downloadSave() {
    if (!save) return;

    const serializedSaveFile = serializeSaveFile(save);
    const blob = new Blob([serializedSaveFile], {
      type: 'application/octet-stream',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (save) {
      setSelectedSlot(save.slot);
      setIsCompletionSave(save.isCompletionSave);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!save) return;

    setFileName(
      `filech${save.chapter}_${isCompletionSave ? selectedSlot + 3 : selectedSlot}`,
    );
  }, [selectedSlot, isCompletionSave]);

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="h-96 lg:h-64 flex flex-col select-none relative lg:p-4 p-2">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col flex-1 gap-4"
          >
            <Heading level={3}>Download Save</Heading>
            <div className="flex flex-col gap-3">
              <div>
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
              <div>
                <Checkbox
                  label="Completion save"
                  checked={isCompletionSave}
                  onChange={setIsCompletionSave}
                />
              </div>
              <InlineGroup>
                <p className="text-text-2">Save will be saved as: </p>
                <div className="px-2 bg-surface-3 flex justify-center items-center font-mono">
                  {fileName}
                </div>
              </InlineGroup>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex gap-2 justify-end">
          <Button onClick={() => downloadSave()} variant="primary">
            Download
          </Button>
        </div>
      </div>
    </Modal>
  );
}

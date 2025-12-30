import { useSave, useUi } from '@store';
import { detectChapter, parseSave } from '@utils';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Save, SaveSlot } from '@types';
import { saveStorage } from '@services';
import {
  TextInput,
  TextLabel,
  Checkbox,
  Button,
  type SelectItem,
  Select,
  Heading,
  FileInput,
  Modal,
} from '@components';
import type { ChapterIndex } from '@data';

const CHAPTER_OPTIONS: SelectItem[] = [
  { id: '2', label: `Chapter 2 (A Cyber's World)`, value: 2 },
  { id: '3', label: 'Chapter 3 (Late Night)', value: 3 },
  { id: '4', label: 'Chapter 4 (Prophecy)', value: 4 },
];

const SLOT_OPTIONS: SelectItem[] = [
  { id: '1', label: 'Slot 1', value: 0 },
  { id: '2', label: 'Slot 2', value: 1 },
  { id: '3', label: 'Slot 3', value: 2 },
];

interface UploadProps {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

type UploadStage = 'idle' | 'success' | 'error' | 'chapter' | 'settings';

export function Upload({ isOpen, setOpen }: UploadProps) {
  const reducedMotion = useReducedMotion();

  const switchSave = useSave((s) => s.switchSave);
  const uploadedSaves = useUi((s) => s.ui.uploadedSaves);
  const updateUi = useUi((s) => s.updateUi);

  const [uploadStage, setUploadStage] = useState<UploadStage>('idle');
  const [previousUploadStage, setPreviousUploadStage] =
    useState<UploadStage>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [selectedChapter, setSelectedChapter] = useState<ChapterIndex>(1);
  const [parsedSave, setParsedSave] = useState<Save | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SaveSlot>(0);
  const [isCompletionSave, setIsCompletionSave] = useState(false);
  const [saveName, setSaveName] = useState<string>('');

  // I know these +3/-1 are ugly but hey it works
  function onChapterSelection(item: SelectItem | null) {
    if (item) {
      setSelectedChapter(item.value as ChapterIndex);
    }
  }

  function onSlotSelection(item: SelectItem | null) {
    if (item) {
      setSelectedSlot(item.value as SaveSlot);
    }
  }

  function onFileSelect(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (!content) {
        setUploadError(
          'Failed to read file content. The file may be empty or corrupted.',
        );
        changeStage('error');
        return;
      }

      let save;
      try {
        save = parseSave(content);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setUploadError(message);
        changeStage('error');
        return;
      }

      const detection = detectChapter(save);
      if (!detection.supported) {
        setUploadError(
          `Unsupported chapter detected. Please upload a save file from Chapter 1-4.`,
        );
        changeStage('error');
        return;
      }

      const filename = file.name;
      const slotMatch = filename.match(/filech\d+_(\d+)/);
      let slot: SaveSlot = 1;
      let isCompletionSave = false;
      if (slotMatch) {
        const detectedSlot = parseInt(slotMatch[1]);
        if (detectedSlot === 0 || detectedSlot === 1 || detectedSlot === 2) {
          slot = detectedSlot;
        }

        // Map correct slots for completion saves
        if (detectedSlot === 3 || detectedSlot === 4 || detectedSlot === 5) {
          slot = (detectedSlot - 3) as SaveSlot;
          isCompletionSave = true;
        }
      }

      setParsedSave(save);
      setSelectedChapter(detection.chapter ?? 1);
      setSelectedSlot(slot);
      setIsCompletionSave(isCompletionSave);
      updateUi((ui) => (ui.uploadedSaves += 1));

      if (!slotMatch) {
        setSaveName(file.name);
      } else {
        setSaveName(`Save${uploadedSaves}`);
      }

      if (detection.chapter === 1) {
        changeStage('settings');
      } else {
        changeStage('chapter');
      }
    };
    reader.readAsText(file);
  }

  async function changeStage(stage: UploadStage) {
    const currentStage = uploadStage;

    switch (stage) {
      case 'idle':
        setParsedSave(null);
        setSelectedChapter(1);
        setSelectedSlot(0);
        setIsCompletionSave(false);
        setSaveName('');
        break;
      case 'success':
        if (!parsedSave) break;
        parsedSave.meta.chapter = selectedChapter;
        parsedSave.meta.slot = selectedSlot;
        parsedSave.meta.isCompletionSave = isCompletionSave;
        parsedSave.meta.name = saveName;

        await saveStorage.set(parsedSave.meta.id, parsedSave);
        switchSave(parsedSave.meta.id);

        setParsedSave(null);
        setSelectedSlot(0);
        setIsCompletionSave(false);

        setOpen(false);
    }

    setUploadStage(stage);
    setPreviousUploadStage(currentStage);
  }

  useEffect(() => {
    changeStage('idle');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const transition = { duration: reducedMotion ? 0 : 0.2 };
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="h-96 flex-1 flex flex-col justify-between select-none relative lg:p-4 p-2">
        <AnimatePresence mode="wait">
          {uploadStage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-col flex-1 gap-4"
            >
              <Heading level={3}>Upload Save</Heading>
              <div className="flex-1 flex justify-center items-center">
                <FileInput onFileSelect={onFileSelect} />
              </div>
            </motion.div>
          )}

          {uploadStage === 'chapter' && (
            <motion.div
              key="chapter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-col flex-1 gap-4 justify-evenly"
            >
              <Heading level={3}>Confirm Chapter</Heading>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-text-2">Is this the correct chapter?</p>
                <Select
                  items={CHAPTER_OPTIONS}
                  placeholder="Select chapter"
                  className="w-full"
                  selectedItem={CHAPTER_OPTIONS[selectedChapter - 2]}
                  defaultSelectedItem={CHAPTER_OPTIONS[selectedChapter - 2]}
                  onSelectionChange={onChapterSelection}
                />

                <p className="text-text-2">
                  NOTE: This cannot be changed once save is fully uploaded.
                </p>
              </div>
            </motion.div>
          )}

          {uploadStage === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-col flex-1 gap-4"
            >
              <Heading level={3}>Save Settings</Heading>
              <div className="flex-1 flex lg:flex-row flex-col lg:gap-10 gap-4">
                {' '}
                <div>
                  <TextLabel>Save name</TextLabel>
                  <TextInput value={saveName} onChange={setSaveName} />
                </div>
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
                </div>
              </div>
            </motion.div>
          )}

          {uploadStage === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-col h-full  gap-4"
            >
              <Heading level={3}>Upload Failed</Heading>
              <div className="flex-1">
                <p className="text-red">{uploadError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 justify-end">
          {uploadStage === 'idle' && (
            <>
              <Button onClick={() => setOpen(false)} variant="secondary">
                Cancel
              </Button>
            </>
          )}
          {uploadStage === 'chapter' && (
            <>
              <Button onClick={() => changeStage('settings')} variant="primary">
                Next
              </Button>
              <Button onClick={() => changeStage('idle')} variant="secondary">
                Back
              </Button>
            </>
          )}
          {uploadStage === 'settings' && (
            <>
              <Button onClick={() => changeStage('success')} variant="primary">
                Confirm
              </Button>
              <Button
                onClick={() => changeStage(previousUploadStage)}
                variant="secondary"
              >
                Back
              </Button>
            </>
          )}
          {uploadStage === 'error' && (
            <Button
              onClick={() => {
                changeStage('idle');
                setUploadError(null);
              }}
              variant="primary"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

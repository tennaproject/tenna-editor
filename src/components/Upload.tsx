import { useSave, useUi } from '@store';
import { detectChapter } from '@utils/detection';
import { extractGamePayload } from '@utils/save-baseline';
import { parseSave } from '@utils/save-parser';
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
  FileInput,
  ModalLayout,
  ModalFooter,
} from '@components';
import type { ChapterIndex } from '@data';

const CHAPTER_OPTIONS: SelectItem[] = [
  { id: '2', label: `Chapter 2 (A Cyber's World)`, value: 2 },
  { id: '3', label: 'Chapter 3 (Late Night)', value: 3 },
  { id: '4', label: 'Chapter 4 (Prophecy)', value: 4 },
  { id: '5', label: 'Chapter 5 (Experimental)', value: 5 },
];

const SLOT_OPTIONS: SelectItem[] = [
  { id: '1', label: 'Slot 1', value: 0 },
  { id: '2', label: 'Slot 2', value: 1 },
  { id: '3', label: 'Slot 3', value: 2 },
];

const STAGE_TITLES: Record<'idle' | 'chapter' | 'settings' | 'error', string> =
  {
    idle: 'Upload Save',
    chapter: 'Confirm Chapter',
    settings: 'Save Settings',
    error: 'Upload Failed',
  };

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

      const detection = detectChapter(save, file.name);
      if (!detection.supported) {
        setUploadError(
          `Unsupported chapter or save format detected. Please upload a DELTARUNE Chapter 1-5 PC, Mac, or Linux save file.`,
        );
        changeStage('error');
        return;
      }

      const filename = file.name;
      const slotMatch = filename.match(/filech(\d+)_(\d+)/);
      let slot: SaveSlot = 1;
      let isCompletionSave = false;
      if (slotMatch) {
        const detectedSlot = parseInt(slotMatch[2]);
        if (detectedSlot === 0 || detectedSlot === 1 || detectedSlot === 2) {
          slot = detectedSlot;
        }

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

      changeStage('chapter');
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
        parsedSave.meta.baseline = {
          capturedAt: new Date(),
          source: 'upload',
          payload: extractGamePayload(parsedSave),
        };

        await saveStorage.set(parsedSave.meta.id, parsedSave);
        switchSave(parsedSave.meta.id);

        setParsedSave(null);
        setSelectedSlot(0);
        setIsCompletionSave(false);

        setOpen(false);
        break;
    }

    setUploadStage(stage);
    setPreviousUploadStage(currentStage);
  }

  useEffect(() => {
    void changeStage('idle').catch((error: unknown) => {
      console.error('Upload modal reset failed:', error);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const transition = { duration: reducedMotion ? 0 : 0.2 };
  const selectedChapterOption =
    CHAPTER_OPTIONS.find((option) => option.value === selectedChapter) ?? null;

  function renderFooter() {
    switch (uploadStage) {
      case 'idle':
        return (
          <ModalFooter>
            <Button
              onClick={() => setOpen(false)}
              variant="secondary"
              size="lg"
            >
              Cancel
            </Button>
          </ModalFooter>
        );
      case 'chapter':
        return (
          <ModalFooter>
            <Button onClick={() => changeStage('idle')} variant="secondary">
              Back
            </Button>
            <Button
              onClick={() => changeStage('settings')}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-40"
            >
              Next
            </Button>
          </ModalFooter>
        );
      case 'settings':
        return (
          <ModalFooter>
            <Button
              onClick={() => changeStage(previousUploadStage)}
              variant="secondary"
            >
              Back
            </Button>
            <Button
              onClick={() => void changeStage('success')}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-40"
            >
              Confirm upload
            </Button>
          </ModalFooter>
        );
      case 'error':
        return (
          <ModalFooter>
            <Button
              onClick={() => {
                changeStage('idle');
                setUploadError(null);
              }}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-40"
            >
              Try again
            </Button>
          </ModalFooter>
        );
      default:
        return null;
    }
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      setOpen={setOpen}
      title={
        uploadStage === 'success'
          ? STAGE_TITLES.settings
          : STAGE_TITLES[uploadStage]
      }
      footer={renderFooter()}
      size="tall"
      bodyClassName={
        uploadStage === 'error'
          ? 'flex flex-col min-h-0 flex-1 overflow-y-auto'
          : 'flex flex-col min-h-0 flex-1 overflow-hidden'
      }
    >
      <div className="flex flex-col flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {uploadStage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-1 min-h-0 items-stretch"
            >
              <FileInput
                onFileSelect={onFileSelect}
                className="flex-1 min-h-0"
              />
            </motion.div>
          )}

          {uploadStage === 'chapter' && (
            <motion.div
              key="chapter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-col gap-4 max-w-md"
            >
              <p className="ui-prose-muted">Is this the correct chapter?</p>
              <div>
                <TextLabel>Chapter</TextLabel>
                <Select
                  items={CHAPTER_OPTIONS}
                  placeholder="Select chapter"
                  className="w-full"
                  selectedItem={selectedChapterOption}
                  defaultSelectedItem={selectedChapterOption}
                  onSelectionChange={onChapterSelection}
                />
              </div>
              <p className="ui-prose-muted">
                This cannot be changed after the save is uploaded.
              </p>
              {selectedChapter === 5 && (
                <p className="ui-panel-muted border-yellow/40 bg-yellow-soft text-text-1">
                  Chapter 5 support is experimental and currently uses known
                  Chapter 1-4 editor data only.
                </p>
              )}
            </motion.div>
          )}

          {uploadStage === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-col gap-3 max-w-md"
            >
              <div>
                <TextLabel>Save name</TextLabel>
                <TextInput value={saveName} onChange={setSaveName} />
              </div>
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
              <Checkbox
                label="Completion save"
                checked={isCompletionSave}
                onChange={setIsCompletionSave}
              />
            </motion.div>
          )}

          {uploadStage === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="flex flex-col gap-3"
            >
              <p className="ui-danger">{uploadError}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModalLayout>
  );
}

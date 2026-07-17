import { useSave, useUi } from '@store';
import { extractGamePayload } from '@utils/save-baseline';
import {
  discoverImportCandidates,
  getTrimmedSwitchContainer,
  refreshImportCandidateNames,
  type CollectedUploadFile,
  type ImportCandidate,
} from '@utils/save-import';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Save, SaveSlot } from '@types';
import { saveStorage, toast } from '@services';
import {
  TextInput,
  TextLabel,
  Checkbox,
  Badge,
  Button,
  type SelectItem,
  Select,
  FileInput,
  ModalLayout,
  ModalFooter,
  ResponsiveTable,
  ResponsiveTableFields,
  ResponsiveTableMobileLabel,
  ResponsiveTableRow,
  type ResponsiveTableSort,
} from '@components';
import type { ChapterIndex } from '@data';
import {
  formatTranslation,
  getChapterTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { chapterHelpers } from '@utils/data-helpers';
import { mergeClass } from '@utils/merge-class';

const CHAPTER_OPTIONS: SelectItem[] = [
  { id: '2', label: `Chapter 2 (A Cyber's World)`, value: 2 },
  { id: '3', label: 'Chapter 3 (Late Night)', value: 3 },
  { id: '4', label: 'Chapter 4 (Prophecy)', value: 4 },
  { id: '5', label: 'Chapter 5 (Festival Day)', value: 5 },
];

const SLOT_OPTIONS: SelectItem[] = [
  { id: '1', label: 'Slot 1', value: 0 },
  { id: '2', label: 'Slot 2', value: 1 },
  { id: '3', label: 'Slot 3', value: 2 },
];

const STAGE_TITLES: Record<UploadStage, string> = {
  idle: 'Upload Saves',
  processing: 'Reading Saves',
  review: 'Review Saves',
  chapter: 'Confirm Chapter',
  settings: 'Save Settings',
  error: 'Upload Failed',
};

const STAGE_TITLE_KEYS: Record<UploadStage, string> = {
  idle: 'ui.upload.uploadSaves',
  processing: 'ui.upload.readingSaves',
  review: 'ui.upload.reviewSaves',
  chapter: 'ui.upload.confirmChapter',
  settings: 'ui.upload.saveSettings',
  error: 'ui.upload.uploadFailed',
};

interface UploadProps {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

type UploadStage =
  'idle' | 'processing' | 'review' | 'chapter' | 'settings' | 'error';

interface DiscoverySummary {
  sawDrIni: boolean;
  sourceErrors: string[];
}

export function Upload({ isOpen, setOpen }: UploadProps) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();

  const setSave = useSave((state) => state.setSave);
  const saveNow = useSave((state) => state.saveNow);
  const activeSaveName = useSave((state) => state.save?.meta.name);
  const updateUi = useUi((state) => state.updateUi);

  const [uploadStage, setUploadStage] = useState<UploadStage>('idle');
  const [previousUploadStage, setPreviousUploadStage] =
    useState<UploadStage>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const [singleCandidate, setSingleCandidate] =
    useState<ImportCandidate | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterIndex>(1);
  const [selectedSlot, setSelectedSlot] = useState<SaveSlot>(0);
  const [isCompletionSave, setIsCompletionSave] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [singleNameEdited, setSingleNameEdited] = useState(false);
  const [reservedSaveNames, setReservedSaveNames] = useState<string[]>([]);

  const [candidates, setCandidates] = useState<ImportCandidate[]>([]);
  const [reviewSort, setReviewSort] = useState<ResponsiveTableSort | null>(
    null,
  );
  const [discoverySummary, setDiscoverySummary] = useState<DiscoverySummary>({
    sawDrIni: false,
    sourceErrors: [],
  });
  const discoveryRunRef = useRef(0);

  const chapterOptions = CHAPTER_OPTIONS.map((item) => {
    const chapter = item.value as ChapterIndex;
    const meta = translateMeta(
      getChapterTranslationKeyPrefix(chapter),
      chapterHelpers.getById(chapter),
      t,
    );
    return {
      ...item,
      label: `${t('ui.upload.chapter', 'Chapter')} ${chapter} (${meta.displayName})`,
    };
  });
  const chapterOneOption: SelectItem = {
    id: '1',
    label: `${t('ui.upload.chapter', 'Chapter')} 1`,
    value: 1,
  };
  const slotOptions = SLOT_OPTIONS.map((item, index) => ({
    ...item,
    label: `${t('ui.field.slot', 'Slot')} ${index + 1}`,
  }));

  const selectedCandidates = candidates.filter(
    (candidate) =>
      candidate.selected && candidate.save && candidate.error === null,
  );
  const displayedCandidates = getDisplayedCandidates();

  function getDisplayedCandidates(): ImportCandidate[] {
    if (!reviewSort) return candidates;

    const getValue = (candidate: ImportCandidate): string | number => {
      switch (reviewSort.columnId) {
        case 'name':
          return candidate.name.toLocaleLowerCase();
        case 'chapter':
          return candidate.chapter;
        case 'slot':
          return candidate.slot;
        case 'complete':
          return Number(candidate.isCompletionSave);
        case 'source':
          return `${candidate.platform}:${
            candidate.platform === 'switch'
              ? candidate.displayKey
              : candidate.sourcePath
          }`.toLocaleLowerCase();
        default:
          return 0;
      }
    };
    const direction = reviewSort.direction === 'asc' ? 1 : -1;

    return candidates
      .map((candidate, index) => ({ candidate, index }))
      .sort((left, right) => {
        const leftValue = getValue(left.candidate);
        const rightValue = getValue(right.candidate);
        const comparison =
          typeof leftValue === 'number' && typeof rightValue === 'number'
            ? leftValue - rightValue
            : String(leftValue).localeCompare(String(rightValue));
        return comparison === 0
          ? left.index - right.index
          : comparison * direction;
      })
      .map(({ candidate }) => candidate);
  }

  function resetUpload() {
    discoveryRunRef.current += 1;
    setSingleCandidate(null);
    setSelectedChapter(1);
    setSelectedSlot(0);
    setIsCompletionSave(false);
    setSaveName('');
    setSingleNameEdited(false);
    setReservedSaveNames([]);
    setCandidates([]);
    setReviewSort(null);
    setDiscoverySummary({
      sawDrIni: false,
      sourceErrors: [],
    });
    setUploadError(null);
    setIsImporting(false);
  }

  function changeStage(stage: UploadStage) {
    const currentStage = uploadStage;
    if (stage === 'idle') resetUpload();
    setUploadStage(stage);
    setPreviousUploadStage(currentStage);
  }

  function prepareSingleCandidate(candidate: ImportCandidate) {
    setSingleCandidate(candidate);
    setSelectedChapter(candidate.chapter);
    setSelectedSlot(candidate.slot);
    setIsCompletionSave(candidate.isCompletionSave);
    setSaveName(candidate.name);
    setSingleNameEdited(candidate.nameEdited);
    changeStage(candidate.save?.meta.format === 1 ? 'settings' : 'chapter');
  }

  async function onFilesSelect(files: CollectedUploadFile[]) {
    const run = discoveryRunRef.current + 1;
    discoveryRunRef.current = run;
    changeStage('processing');
    try {
      const storedSaves = await saveStorage.getAll();
      if (run !== discoveryRunRef.current) return;
      const reservedNames = storedSaves.map((save) => save.meta.name);
      if (activeSaveName) reservedNames.push(activeSaveName);
      const result = await discoverImportCandidates(files, reservedNames);
      if (run !== discoveryRunRef.current) return;
      setReservedSaveNames(reservedNames);
      setDiscoverySummary({
        sawDrIni: result.sawDrIni,
        sourceErrors: result.sourceErrors,
      });

      if (result.candidates.length === 0) {
        setUploadError(
          result.sourceErrors.join('\n') ||
            t(
              'ui.upload.noSupportedSaves',
              'No supported DELTARUNE saves were found.',
            ),
        );
        setUploadStage('error');
        return;
      }

      const onlyCandidate = result.candidates[0];
      const isSingleSave = result.candidates.length === 1;

      if (isSingleSave) {
        if (!onlyCandidate.save || onlyCandidate.error) {
          setUploadError(
            onlyCandidate.error ??
              t(
                'ui.upload.unsupportedChapterOrFormat',
                'Unsupported chapter or save format detected.',
              ),
          );
          setUploadStage('error');
          return;
        }
        prepareSingleCandidate(onlyCandidate);
        return;
      }

      setCandidates(result.candidates);
      setUploadStage('review');
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : t(
              'ui.upload.readInputFailed',
              'Could not read the selected files.',
            ),
      );
      setUploadStage('error');
    }
  }

  function closeUpload() {
    resetUpload();
    setOpen(false);
  }

  function updateCandidate(id: string, patch: Partial<ImportCandidate>) {
    setCandidates((current) => {
      const updated = current.map((candidate) =>
        candidate.id === id ? { ...candidate, ...patch } : candidate,
      );
      if (
        patch.chapter === undefined &&
        patch.slot === undefined &&
        patch.isCompletionSave === undefined
      ) {
        return updated;
      }
      return refreshImportCandidateNames(updated, reservedSaveNames);
    });
  }

  function updateSingleTarget(
    chapter: ChapterIndex,
    slot: SaveSlot,
    completion: boolean,
  ) {
    if (!singleCandidate) return;
    const [updated] = refreshImportCandidateNames(
      [
        {
          ...singleCandidate,
          chapter,
          slot,
          isCompletionSave: completion,
          name: saveName,
          nameEdited: singleNameEdited,
        },
      ],
      reservedSaveNames,
    );
    setSingleCandidate(updated);
    if (!singleNameEdited) setSaveName(updated.name);
  }

  function prepareSave(candidate: ImportCandidate): Save {
    const save = candidate.save as Save;
    save.meta.chapter = candidate.chapter;
    save.meta.slot = candidate.slot;
    save.meta.isCompletionSave = candidate.isCompletionSave;
    save.meta.name = candidate.name.trim() || candidate.defaultName;
    save.meta.baseline = {
      capturedAt: new Date(),
      source: 'upload',
      payload: extractGamePayload(save),
    };

    if (candidate.switchSource) {
      save.meta.source = {
        platform: 'switch',
        fileName: candidate.switchSource.fileName,
        key: candidate.switchSource.entryKey,
        container: getTrimmedSwitchContainer(candidate),
      };
    } else {
      save.meta.source = {
        platform: 'pc',
        fileName: candidate.sourcePath,
        drIni: candidate.pcDrIni,
      };
    }
    return save;
  }

  async function importCandidates(toImport: ImportCandidate[]) {
    if (toImport.length === 0 || isImporting) return;
    setIsImporting(true);
    const saves = toImport.map(prepareSave);
    const stored = await saveStorage.setMany(saves);
    if (!stored) {
      setIsImporting(false);
      return;
    }

    updateUi((ui) => (ui.uploadedSaves += saves.length));
    await saveNow();
    setSave(saves[0]);
    toast(
      formatTranslation(
        t('ui.upload.importedSaves', 'Imported {count} save(s).'),
        { count: saves.length },
      ),
      'success',
    );
    closeUpload();
  }

  async function importSingleCandidate() {
    if (!singleCandidate?.save) return;
    await importCandidates([
      {
        ...singleCandidate,
        chapter: selectedChapter,
        slot: selectedSlot,
        isCompletionSave,
        name: saveName,
      },
    ]);
  }

  const transition = { duration: reducedMotion ? 0 : 0.2 };
  const selectedChapterOption =
    chapterOptions.find((option) => option.value === selectedChapter) ??
    chapterOneOption;

  function renderFooter() {
    switch (uploadStage) {
      case 'idle':
        return (
          <ModalFooter>
            <Button onClick={closeUpload} variant="secondary" size="lg">
              {t('ui.common.cancel', 'Cancel')}
            </Button>
          </ModalFooter>
        );
      case 'processing':
        return (
          <ModalFooter aria-hidden="true">
            <Button
              variant="secondary"
              size="lg"
              className="invisible"
              disabled
            >
              {t('ui.common.cancel', 'Cancel')}
            </Button>
          </ModalFooter>
        );
      case 'review':
        return (
          <ModalFooter>
            <Button onClick={() => changeStage('idle')} variant="secondary">
              {t('ui.common.back', 'Back')}
            </Button>
            <Button
              onClick={() => void importCandidates(selectedCandidates)}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-48"
              disabled={selectedCandidates.length === 0 || isImporting}
            >
              {isImporting
                ? t('ui.upload.importingSaves', 'Importing saves…')
                : formatTranslation(
                    t(
                      'ui.upload.importSelectedSaves',
                      'Import {count} save(s)',
                    ),
                    { count: selectedCandidates.length },
                  )}
            </Button>
          </ModalFooter>
        );
      case 'chapter':
        return (
          <ModalFooter>
            <Button onClick={() => changeStage('idle')} variant="secondary">
              {t('ui.common.back', 'Back')}
            </Button>
            <Button
              onClick={() => changeStage('settings')}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-40"
            >
              {t('ui.common.next', 'Next')}
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
              {t('ui.common.back', 'Back')}
            </Button>
            <Button
              onClick={() => void importSingleCandidate()}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-40"
              disabled={isImporting}
            >
              {isImporting
                ? t('ui.upload.importingSaves', 'Importing saves…')
                : t('ui.upload.confirmUpload', 'Confirm upload')}
            </Button>
          </ModalFooter>
        );
      case 'error':
        return (
          <ModalFooter>
            <Button
              onClick={() => changeStage('idle')}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto sm:min-w-40"
            >
              {t('ui.common.tryAgain', 'Try again')}
            </Button>
          </ModalFooter>
        );
      default:
        return null;
    }
  }

  function renderReviewCandidate(candidate: ImportCandidate) {
    const isChapterLocked = candidate.save?.meta.format === 1;
    const selectedChapterItem =
      chapterOptions.find((item) => item.value === candidate.chapter) ??
      chapterOptions[0];
    const displayedSource =
      candidate.platform === 'switch'
        ? candidate.displayKey
        : candidate.sourcePath;
    const sourceTitle =
      candidate.platform === 'switch'
        ? `${candidate.sourcePath}: ${candidate.displayKey}`
        : candidate.sourcePath;

    return (
      <ResponsiveTableRow
        key={candidate.id}
        className={candidate.error ? 'bg-red-soft' : undefined}
      >
        <div className="flex justify-center">
          <Checkbox
            checked={candidate.selected}
            disabled={!candidate.save || candidate.error !== null}
            onChange={(selected) => updateCandidate(candidate.id, { selected })}
            ariaLabel={formatTranslation(
              t('ui.upload.selectCandidate', 'Select {name}'),
              { name: candidate.displayKey },
            )}
          />
        </div>

        <ResponsiveTableFields>
          <div
            className={mergeClass(
              'flex min-w-0 flex-col gap-1',
              !candidate.selected && !candidate.error && 'opacity-60',
            )}
          >
            <span className="ui-section-label md:hidden">
              {t('ui.field.saveName', 'Save name')}
            </span>
            {candidate.error ? (
              <div className="ui-field-mono truncate">
                {candidate.displayKey}
              </div>
            ) : (
              <TextInput
                value={candidate.name}
                onChange={(name) =>
                  updateCandidate(candidate.id, { name, nameEdited: true })
                }
                fullWidth
                size="small"
                variant="inline"
              />
            )}
            <div
              className="truncate px-2 text-xs text-text-3"
              title={sourceTitle}
            >
              {displayedSource}
            </div>
          </div>

          {candidate.error ? (
            <div className="text-sm text-danger md:col-span-3">
              {candidate.error}
            </div>
          ) : (
            <>
              <div
                className={mergeClass(
                  'flex min-w-0 items-center gap-2',
                  !candidate.selected && 'opacity-60',
                )}
              >
                <ResponsiveTableMobileLabel>
                  {t('ui.upload.chapter', 'Chapter')}
                </ResponsiveTableMobileLabel>
                {isChapterLocked ? (
                  <span className="px-2 text-sm text-text-2">
                    {chapterOneOption.label}
                  </span>
                ) : (
                  <Select
                    items={chapterOptions}
                    selectedItem={selectedChapterItem}
                    defaultSelectedItem={selectedChapterItem}
                    className="h-8 min-h-0 w-full"
                    onSelectionChange={(item) => {
                      if (item) {
                        const chapter = item.value as ChapterIndex;
                        updateCandidate(candidate.id, {
                          chapter,
                        });
                      }
                    }}
                  />
                )}
              </div>

              <div
                className={mergeClass(
                  'flex items-center gap-2',
                  !candidate.selected && 'opacity-60',
                )}
              >
                <ResponsiveTableMobileLabel>
                  {t('ui.field.slot', 'Slot')}
                </ResponsiveTableMobileLabel>
                <Select
                  items={slotOptions}
                  selectedItem={slotOptions[candidate.slot]}
                  defaultSelectedItem={slotOptions[candidate.slot]}
                  className="h-8 min-h-0 w-36 md:w-full"
                  onSelectionChange={(item) => {
                    if (item) {
                      const slot = item.value as SaveSlot;
                      updateCandidate(candidate.id, {
                        slot,
                      });
                    }
                  }}
                />
              </div>

              <div
                className={mergeClass(
                  'flex items-center gap-2 md:justify-center',
                  !candidate.selected && 'opacity-60',
                )}
              >
                <ResponsiveTableMobileLabel>
                  {t('ui.field.completionSave', 'Complete')}
                </ResponsiveTableMobileLabel>
                <Checkbox
                  ariaLabel={`${t(
                    'ui.field.completionSave',
                    'Completion save',
                  )}: ${candidate.name}`}
                  checked={candidate.isCompletionSave}
                  onChange={(completion) =>
                    updateCandidate(candidate.id, {
                      isCompletionSave: completion,
                    })
                  }
                />
              </div>
            </>
          )}

          <div
            className={mergeClass(
              'flex items-center gap-2 md:justify-center',
              !candidate.selected && !candidate.error && 'opacity-60',
            )}
          >
            <ResponsiveTableMobileLabel>
              {t('ui.download.source', 'Source')}
            </ResponsiveTableMobileLabel>
            <Badge
              tone={candidate.platform === 'switch' ? 'red' : 'neutral'}
              size="sm"
            >
              {candidate.platform.toUpperCase()}
            </Badge>
          </div>
        </ResponsiveTableFields>
      </ResponsiveTableRow>
    );
  }

  return (
    <ModalLayout
      isOpen={isOpen}
      setOpen={setOpen}
      onClose={resetUpload}
      title={t(STAGE_TITLE_KEYS[uploadStage], STAGE_TITLES[uploadStage])}
      footer={renderFooter()}
      variant={uploadStage === 'review' ? 'workspace' : 'standard'}
      bodyClassName={
        uploadStage === 'review'
          ? 'flex min-h-0 flex-1 flex-col overflow-hidden'
          : 'flex min-h-0 flex-1 flex-col overflow-y-auto'
      }
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        <AnimatePresence initial={false}>
          {uploadStage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="absolute inset-0 flex min-h-0 items-stretch"
            >
              <FileInput
                onFilesSelect={(files) => void onFilesSelect(files)}
                onInputError={(message) => {
                  setUploadError(message);
                  setUploadStage('error');
                }}
                className="min-h-0 flex-1"
              />
            </motion.div>
          )}

          {uploadStage === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="absolute inset-0 flex items-center justify-center text-lg text-text-2"
              aria-live="polite"
            >
              {t('ui.upload.discoveringSaves', 'Discovering saves…')}
            </motion.div>
          )}

          {uploadStage === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="absolute inset-0 flex min-h-0 flex-col gap-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="ui-prose-muted">
                  {formatTranslation(
                    t(
                      'ui.upload.discoveredSaves',
                      'Found {count} save candidate(s). Review what will be imported.',
                    ),
                    { count: candidates.length },
                  )}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      setCandidates((current) =>
                        current.map((candidate) => ({
                          ...candidate,
                          selected:
                            candidate.save !== null && candidate.error === null,
                        })),
                      )
                    }
                  >
                    {t('ui.upload.selectAllValid', 'Select all valid')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      setCandidates((current) =>
                        current.map((candidate) => ({
                          ...candidate,
                          selected: false,
                        })),
                      )
                    }
                  >
                    {t('ui.upload.clearSelection', 'Clear selection')}
                  </Button>
                </div>
              </div>

              {discoverySummary.sawDrIni && (
                <div className="ui-panel-muted text-sm">
                  <p>
                    {t(
                      'ui.upload.drIniRegenerated',
                      'dr.ini was imported and will be used as the base during multiple-save export.',
                    )}
                  </p>
                </div>
              )}

              {discoverySummary.sourceErrors.length > 0 && (
                <div
                  className="ui-danger max-h-24 overflow-y-auto text-sm"
                  role="status"
                >
                  {Array.from(new Set(discoverySummary.sourceErrors)).map(
                    (error) => (
                      <p key={error}>{error}</p>
                    ),
                  )}
                </div>
              )}

              <ResponsiveTable
                layout="import-review"
                className="flex-1"
                ariaLabel={t('ui.upload.reviewSaves', 'Review saves')}
                sort={reviewSort}
                onSortChange={setReviewSort}
                headers={[
                  { id: 'select' },
                  {
                    id: 'name',
                    content: t('ui.download.name', 'Name'),
                    sortable: true,
                  },
                  {
                    id: 'chapter',
                    content: t('ui.upload.chapter', 'Chapter'),
                    sortable: true,
                  },
                  {
                    id: 'slot',
                    content: t('ui.field.slot', 'Slot'),
                    sortable: true,
                  },
                  {
                    id: 'complete',
                    content: t('ui.field.completionSave', 'Complete'),
                    sortable: true,
                    align: 'center',
                  },
                  {
                    id: 'source',
                    content: t('ui.download.source', 'Source'),
                    sortable: true,
                    align: 'center',
                  },
                ]}
              >
                {displayedCandidates.map(renderReviewCandidate)}
              </ResponsiveTable>
            </motion.div>
          )}

          {uploadStage === 'chapter' && (
            <motion.div
              key="chapter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="absolute inset-0 flex max-w-md flex-col gap-4"
            >
              <p className="ui-prose-muted">
                {t(
                  'ui.upload.correctChapterQuestion',
                  'Is this the correct chapter?',
                )}
              </p>
              <div>
                <TextLabel>{t('ui.upload.chapter', 'Chapter')}</TextLabel>
                <Select
                  items={chapterOptions}
                  placeholder={t('ui.upload.selectChapter', 'Select chapter')}
                  className="w-full"
                  selectedItem={selectedChapterOption}
                  defaultSelectedItem={selectedChapterOption}
                  onSelectionChange={(item) => {
                    if (item) {
                      const chapter = item.value as ChapterIndex;
                      setSelectedChapter(chapter);
                      updateSingleTarget(
                        chapter,
                        selectedSlot,
                        isCompletionSave,
                      );
                    }
                  }}
                />
              </div>
              <p className="ui-prose-muted">
                {t(
                  'ui.upload.chapterCannotChangeAfterUpload',
                  'This cannot be changed after the save is uploaded.',
                )}
              </p>
            </motion.div>
          )}

          {uploadStage === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className="absolute inset-0 flex max-w-md flex-col gap-3"
            >
              <div>
                <TextLabel>{t('ui.field.saveName', 'Save name')}</TextLabel>
                <TextInput
                  value={saveName}
                  fullWidth
                  onChange={(name) => {
                    setSaveName(name);
                    setSingleNameEdited(true);
                    setSingleCandidate((candidate) =>
                      candidate
                        ? { ...candidate, name, nameEdited: true }
                        : candidate,
                    );
                  }}
                />
              </div>
              <div>
                <TextLabel>
                  {t('ui.field.inGameSlot', 'In-game slot')}
                </TextLabel>
                <Select
                  items={slotOptions}
                  placeholder={t('ui.field.selectSlot', 'Select slot')}
                  className="w-full"
                  selectedItem={slotOptions[selectedSlot]}
                  defaultSelectedItem={slotOptions[selectedSlot]}
                  onSelectionChange={(item) => {
                    if (item) {
                      const slot = item.value as SaveSlot;
                      setSelectedSlot(slot);
                      updateSingleTarget(
                        selectedChapter,
                        slot,
                        isCompletionSave,
                      );
                    }
                  }}
                />
              </div>
              <Checkbox
                label={t('ui.field.completionSave', 'Completion save')}
                checked={isCompletionSave}
                onChange={(completion) => {
                  setIsCompletionSave(completion);
                  updateSingleTarget(selectedChapter, selectedSlot, completion);
                }}
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
              className="absolute inset-0 flex flex-col gap-3 whitespace-pre-wrap"
            >
              <p className="ui-danger">{uploadError}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModalLayout>
  );
}

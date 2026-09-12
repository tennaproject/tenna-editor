import { useSave } from '@store';
import ResetIcon from '@assets/icons/reload.svg?react';
import DownloadIcon from '@assets/icons/download.svg?react';
import ClearIcon from '@assets/icons/close.svg?react';
import FileIcon from '@assets/icons/file.svg?react';
import { useEffect, useId, useRef, useState } from 'react';
import {
  TextLabel,
  TextInput,
  Checkbox,
  Button,
  type SelectItem,
  Select,
  InlineGroup,
  DownloadChanges,
  ModalLayout,
  ModalFooter,
  SaveSourceBadge,
  ResponsiveTable,
  ResponsiveTableFields,
  ResponsiveTableMobileLabel,
  ResponsiveTableRow,
  type ResponsiveTableSort,
  ShadowCrystalGrid,
  Page,
} from '@components';
import {
  exportDraftStorage,
  saveStorage,
  toast,
  type ExportDraft,
  type ExportDraftSelection,
  type ExportFileNameKey,
  type ExportFileNames,
  type ExportMode,
  type ExportScope,
  EXPORT_DRAFT_VERSION,
} from '@services';
import { getBaselineRevision } from '@utils/save-diff';
import {
  buildCellsFromTargets,
  buildPcExportFromTargets,
  buildSwitchExportSet,
  cloneSaveForTarget,
  findDuplicateExportTargets,
} from '@utils/save-export';
import { getExportUraHistory } from '@utils/dr-ini';
import { serializeSave } from '@utils/save-serializer';
import type { Save, SaveSlot } from '@types';
import {
  getTargetKey,
  type SaveExportTarget,
} from '@utils/save-export-targets';
import { parseSwitchSaveContainer } from '@utils/switch-save-container';
import { formatTranslation, useTranslation } from '../i18n';
import { mergeClass } from '@utils/merge-class';

const SLOT_OPTIONS: SelectItem[] = [
  { id: '1', label: 'Slot 1' },
  { id: '2', label: 'Slot 2' },
  { id: '3', label: 'Slot 3' },
] as const;

const EXPORT_OPTIONS: SelectItem[] = [
  { id: 'pc', label: 'PC save file', value: 'pc' },
  { id: 'switch', label: 'Switch container', value: 'switch' },
] as const;

interface SaveSelection {
  save: Save;
  selected: boolean;
  slotOverride?: SaveSlot;
  completionOverride?: boolean;
}

interface DownloadProps {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

function sortSaves(saves: Save[]): Save[] {
  return saves.sort(
    (a, b) =>
      new Date(a.meta.createdAt).getTime() -
      new Date(b.meta.createdAt).getTime(),
  );
}

function buildSelections(
  saves: Save[],
  draft: Record<string, ExportDraftSelection> | undefined,
  activeSaveId?: string,
): Map<string, SaveSelection> {
  const hasDraft = draft !== undefined;
  const selections = new Map<string, SaveSelection>();
  for (const save of saves) {
    const existing = draft?.[save.meta.id];
    selections.set(save.meta.id, {
      save,
      selected:
        existing?.selected ?? (!hasDraft && save.meta.id === activeSaveId),
      slotOverride: existing?.slotOverride,
      completionOverride: existing?.completionOverride,
    });
  }
  return selections;
}

function serializeSelections(
  selections: Map<string, SaveSelection>,
): Record<string, ExportDraftSelection> {
  return Object.fromEntries(
    Array.from(selections.entries(), ([saveId, selection]) => [
      saveId,
      {
        selected: selection.selected,
        slotOverride: selection.slotOverride,
        completionOverride: selection.completionOverride,
      },
    ]),
  );
}

function createExportTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function getImportedDrIni(targets: SaveExportTarget[]) {
  for (const target of targets) {
    const source = target.save.meta.source;
    if (source?.platform === 'pc' && source.drIni) return source.drIni;
    if (source?.platform === 'switch') {
      const drIniKey = Object.keys(source.container).find(
        (key) => key.toLowerCase() === 'dr.ini',
      );
      if (drIniKey) {
        return {
          fileName: `${source.fileName} — dr.ini`,
          content: source.container[drIniKey],
        };
      }
    }
  }
  return undefined;
}

function BaseSourceField({
  label,
  hint,
  displayName,
  chooseLabel,
  hasSelection,
  accept,
  onFile,
  onClear,
  canClear,
  clearLabel,
}: {
  label: string;
  hint: string;
  displayName: string;
  chooseLabel: string;
  hasSelection: boolean;
  accept: string;
  onFile: (file: File) => void;
  onClear?: () => void;
  canClear: boolean;
  clearLabel: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-56 max-w-full flex-col">
      <TextLabel>{label}</TextLabel>
      <div className="relative h-10">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-10 w-full items-center gap-2 border border-border bg-surface-3 px-3 pr-9 text-left text-sm hover:bg-surface-3-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-3"
        >
          <FileIcon className="size-4 shrink-0 text-text-2" />
          <span
            className={
              hasSelection
                ? 'ui-field-mono min-w-0 truncate text-text-1'
                : 'min-w-0 truncate text-text-2'
            }
          >
            {hasSelection ? displayName : chooseLabel}
          </span>
        </button>
        {canClear && onClear && (
          <button
            type="button"
            className="absolute right-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-text-2 hover:text-text-1"
            onClick={onClear}
          >
            <ClearIcon className="size-3.5" />
            <span className="sr-only">{clearLabel}</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onFile(file);
            event.target.value = '';
          }}
        />
      </div>
      <p className="ui-prose-muted mt-1 text-xs leading-snug">{hint}</p>
    </div>
  );
}

export function Download({ isOpen, setOpen }: DownloadProps) {
  const { t } = useTranslation();

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
  const [exportMode, setExportMode] = useState<ExportMode>('pc');
  const [exportScope, setExportScope] = useState<ExportScope>('single');
  const [exportTimestamp] = useState(createExportTimestamp);
  const [fileNames, setFileNames] = useState<ExportFileNames>({});
  const [storedSaves, setStoredSaves] = useState<Save[]>([]);
  const [saveTableSort, setSaveTableSort] =
    useState<ResponsiveTableSort | null>(null);
  const [selections, setSelections] = useState<Map<string, SaveSelection>>(
    () => new Map(),
  );

  const [historyOverrides, setHistoryOverrides] = useState<{
    context: string;
    values: Record<string, number>;
  }>({ context: '', values: {} });
  const [baseDrIni, setBaseDrIni] = useState('');
  const [baseDrIniName, setBaseDrIniName] = useState('');

  const [baseContainer, setBaseContainer] = useState<
    Record<string, string> | undefined
  >(undefined);
  const [baseContainerName, setBaseContainerName] = useState('');
  const [hasHydratedExportDraft, setHasHydratedExportDraft] = useState(false);
  const completionSaveId = useId();

  const pcFileName = save
    ? `filech${save.meta.chapter}_${isCompletionSave ? selectedSlot + 3 : selectedSlot}`
    : '';

  const selectedExportTargets: SaveExportTarget[] = Array.from(
    selections.values(),
  )
    .filter((sel) => sel.selected)
    .map((sel) => ({
      save: sel.save,
      chapter: sel.save.meta.chapter,
      slot: sel.slotOverride ?? sel.save.meta.slot,
      isCompletionSave:
        sel.completionOverride ?? sel.save.meta.isCompletionSave,
    }));
  const importedDrIni = getImportedDrIni(selectedExportTargets);

  const historyTargets =
    exportScope === 'set'
      ? selectedExportTargets
      : save
        ? [getSingleExportTarget(save)]
        : [];
  const historyImportedIni = getImportedDrIni(historyTargets)?.content ?? '';
  const historyBaseIni =
    exportScope === 'set'
      ? exportMode === 'switch'
        ? (baseContainer?.['dr.ini'] ?? historyImportedIni)
        : baseDrIni || historyImportedIni
      : historyImportedIni;
  const historyCells = buildCellsFromTargets(historyTargets);
  const historyContext = JSON.stringify([
    isOpen,
    exportScope,
    exportMode,
    save?.meta.id,
    historyBaseIni,
    historyTargets.map((target) => [
      target.save.meta.id,
      target.chapter,
      target.slot,
      target.isCompletionSave,
      getImportedDrIni([target])?.content,
    ]),
  ]);
  const activeHistoryOverrides =
    historyOverrides.context === historyContext ? historyOverrides.values : {};
  const exportHistory = {
    ...getExportUraHistory(historyCells, historyBaseIni),
    ...(exportScope === 'set' ? activeHistoryOverrides : {}),
  };

  const duplicates = findDuplicateExportTargets(selectedExportTargets);
  const hasDuplicateError = duplicates.length > 0;

  const hasExportSetError =
    exportScope === 'set' &&
    (selectedExportTargets.length === 0 || hasDuplicateError);

  const defaultFileName =
    exportScope === 'set'
      ? exportMode === 'switch'
        ? 'deltarune.sav'
        : `tenna-saves-${exportTimestamp}.zip`
      : exportMode === 'switch'
        ? 'deltarune.sav'
        : pcFileName;
  const fileNameKey: ExportFileNameKey = `${exportMode}-${exportScope}`;
  const displayedFileName = Object.hasOwn(fileNames, fileNameKey)
    ? (fileNames[fileNameKey] ?? '')
    : defaultFileName;
  const fileName = displayedFileName.trim() || defaultFileName;

  const slotOptions = SLOT_OPTIONS.map((item, index) => ({
    ...item,
    label: `${t('ui.field.slot', 'Slot')} ${index + 1}`,
  }));

  const displayedStoredSaves = getDisplayedStoredSaves();

  function getDisplayedStoredSaves(): Save[] {
    if (!saveTableSort) return storedSaves;

    const getValue = (storedSave: Save): string | number => {
      const selection = selections.get(storedSave.meta.id);
      const slot = selection?.slotOverride ?? storedSave.meta.slot;
      const completion =
        selection?.completionOverride ?? storedSave.meta.isCompletionSave;

      switch (saveTableSort.columnId) {
        case 'name':
          return storedSave.meta.name.toLocaleLowerCase();
        case 'chapter':
          return storedSave.meta.chapter;
        case 'slot':
          return slot;
        case 'complete':
          return Number(completion);
        case 'target':
          return getTargetKey({
            chapter: storedSave.meta.chapter,
            slot,
            isCompletionSave: completion,
          });
        case 'source':
          return `${storedSave.meta.source?.platform ?? ''}:${storedSave.meta.source?.fileName ?? ''}`.toLocaleLowerCase();
        default:
          return 0;
      }
    };
    const direction = saveTableSort.direction === 'asc' ? 1 : -1;

    return storedSaves
      .map((storedSave, index) => ({ storedSave, index }))
      .sort((left, right) => {
        const leftValue = getValue(left.storedSave);
        const rightValue = getValue(right.storedSave);
        const comparison =
          typeof leftValue === 'number' && typeof rightValue === 'number'
            ? leftValue - rightValue
            : String(leftValue).localeCompare(String(rightValue));
        return comparison === 0
          ? left.index - right.index
          : comparison * direction;
      })
      .map(({ storedSave }) => storedSave);
  }

  function onSlotSelection(item: SelectItem | null) {
    if (item) {
      setSelectedSlot((parseInt(item.id, 10) - 1) as SaveSlot);
    }
  }

  function onExportModeSelection(item: SelectItem | null) {
    if (item?.value === 'pc' || item?.value === 'switch') {
      setExportMode(item.value);
    }
  }

  function getSingleExportTarget(save: Save): SaveExportTarget {
    return {
      save,
      chapter: save.meta.chapter,
      slot: selectedSlot,
      isCompletionSave,
    };
  }

  function updateSelection(
    id: string,
    patch: Partial<Omit<SaveSelection, 'save'>>,
  ) {
    setSelections((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);
      if (existing) {
        next.set(id, { ...existing, ...patch });
      }
      return next;
    });
  }

  function readBaseDrIni(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setBaseDrIni(String(reader.result ?? ''));
      setBaseDrIniName(file.name);
    };
    reader.readAsText(file);
  }

  function readBaseContainer(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result ?? '');
      try {
        const parsed = parseSwitchSaveContainer(content);
        if (parsed) {
          setBaseContainer(parsed.files);
          setBaseContainerName(file.name);
        } else {
          toast(
            t(
              'ui.upload.invalidSwitchContainer',
              'Invalid Switch container file',
            ),
            'error',
          );
        }
      } catch {
        toast(
          t(
            'ui.upload.invalidSwitchContainer',
            'Invalid Switch container file',
          ),
          'error',
        );
      }
    };
    reader.readAsText(file);
  }

  function getDownloadPayload(save: Save): string | Uint8Array {
    if (exportScope === 'set') {
      if (exportMode === 'switch') {
        const importedBase = importedDrIni
          ? { 'dr.ini': importedDrIni.content }
          : undefined;
        return buildSwitchExportSet(
          selectedExportTargets,
          baseContainer ?? importedBase,
          exportHistory,
        );
      }
      return buildPcExportFromTargets(
        selectedExportTargets,
        baseDrIni || importedDrIni?.content,
        exportHistory,
      );
    }

    const target = getSingleExportTarget(save);
    if (exportMode === 'switch') {
      const source = save.meta.source;
      const base =
        source?.platform === 'switch'
          ? source.container
          : source?.drIni
            ? { 'dr.ini': source.drIni.content }
            : undefined;
      return buildSwitchExportSet([target], base, exportHistory);
    }

    return serializeSave(cloneSaveForTarget(target));
  }

  function resetExportSettings() {
    setHistoryOverrides({ context: historyContext, values: {} });
    const activeSave = useSave.getState().save;
    setSelectedSlot((activeSave?.meta.slot ?? 0) as SaveSlot);
    setIsCompletionSave(activeSave?.meta.isCompletionSave ?? false);
    setExportMode(
      activeSave?.meta.source?.platform === 'switch' ? 'switch' : 'pc',
    );
    setExportScope('single');
    setFileNames({});
    setSelections(buildSelections(storedSaves, undefined, activeSave?.meta.id));
    setBaseDrIni('');
    setBaseDrIniName('');
    setBaseContainer(undefined);
    setBaseContainerName('');
  }

  async function downloadSave() {
    if (!save) return;
    if (hasExportSetError) {
      if (selectedExportTargets.length === 0) {
        toast(
          t(
            'ui.download.selectAtLeastOneSave',
            'Select at least one save for export.',
          ),
          'error',
        );
      } else if (hasDuplicateError) {
        toast(
          t(
            'ui.download.resolveConflicts',
            'Resolve conflicting slots before downloading.',
          ),
          'error',
        );
      }
      return;
    }

    try {
      const serializedSave = getDownloadPayload(save);
      const blobPart =
        typeof serializedSave === 'string'
          ? serializedSave
          : new Uint8Array(serializedSave);
      const blob = new Blob([blobPart], {
        type:
          exportScope === 'set' && exportMode === 'pc'
            ? 'application/zip'
            : 'application/octet-stream',
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10_000);

      if (exportScope === 'single') {
        await captureBaseline('download');
      }
    } catch (error) {
      console.error('Save export failed:', error);
      toast(
        formatTranslation(
          t(
            'ui.download.exportFailed',
            'Could not create the export: {message}',
          ),
          {
            message:
              error instanceof Error
                ? error.message
                : t('ui.common.unknown', 'Unknown error'),
          },
        ),
        'error',
      );
    }
  }

  useEffect(() => {
    if (isOpen && !save) {
      setOpen(false);
      toast(
        t(
          'ui.download.noSaveLoadedCurrently',
          'There is no save loaded currently',
        ),
        'error',
      );
    }
  }, [isOpen, save, setOpen, t]);

  useEffect(() => {
    let cancelled = false;
    async function hydrateExportDraft() {
      const [draft, saves] = await Promise.all([
        exportDraftStorage.get(),
        saveStorage.getAll(),
      ]);
      if (cancelled) return;

      const activeSave = useSave.getState().save;
      const sortedSaves = sortSaves(saves);
      setStoredSaves(sortedSaves);

      if (draft) {
        setSelectedSlot(draft.selectedSlot);
        setIsCompletionSave(draft.isCompletionSave);
        setExportMode(draft.mode);
        setExportScope(draft.scope);
        setFileNames(draft.fileNames);
        setSelections(
          buildSelections(sortedSaves, draft.selections, activeSave?.meta.id),
        );
        setBaseDrIni(draft.baseDrIni?.content ?? '');
        setBaseDrIniName(draft.baseDrIni?.name ?? '');
        setBaseContainer(draft.baseContainer?.files);
        setBaseContainerName(draft.baseContainer?.name ?? '');
      } else {
        setSelectedSlot((activeSave?.meta.slot ?? 0) as SaveSlot);
        setIsCompletionSave(activeSave?.meta.isCompletionSave ?? false);
        setExportMode(
          activeSave?.meta.source?.platform === 'switch' ? 'switch' : 'pc',
        );
        setSelections(
          buildSelections(sortedSaves, undefined, activeSave?.meta.id),
        );
      }

      setHasHydratedExportDraft(true);
    }

    void hydrateExportDraft();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasHydratedExportDraft) return;

    const draft: ExportDraft = {
      version: EXPORT_DRAFT_VERSION,
      mode: exportMode,
      scope: exportScope,
      selectedSlot,
      isCompletionSave,
      fileNames,
      selections: serializeSelections(selections),
      baseDrIni: baseDrIniName
        ? { name: baseDrIniName, content: baseDrIni }
        : undefined,
      baseContainer:
        baseContainerName && baseContainer
          ? { name: baseContainerName, files: baseContainer }
          : undefined,
    };
    void exportDraftStorage.set(draft);
  }, [
    baseContainer,
    baseContainerName,
    baseDrIni,
    baseDrIniName,
    exportMode,
    exportScope,
    fileNames,
    hasHydratedExportDraft,
    isCompletionSave,
    selectedSlot,
    selections,
  ]);

  useEffect(() => {
    if (!isOpen || !hasHydratedExportDraft) return;

    let cancelled = false;
    async function loadSaves() {
      const saves = await saveStorage.getAll();
      if (cancelled) return;

      const sortedSaves = sortSaves(saves);
      setStoredSaves(sortedSaves);

      setSelections((previous) => {
        return buildSelections(
          sortedSaves,
          serializeSelections(previous),
          save?.meta.id,
        );
      });
    }

    void loadSaves().catch((error: unknown) => {
      console.error('Stored saves could not be loaded for export:', error);
      if (!cancelled) {
        setStoredSaves([]);
        setSelections(new Map());
        toast(
          t('ui.download.loadSavesFailed', 'Stored saves could not be loaded.'),
          'error',
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [hasHydratedExportDraft, isOpen, save?.meta.id, t]);

  return (
    <ModalLayout
      isOpen={isOpen}
      setOpen={setOpen}
      title={t('ui.download.downloadSave', 'Download')}
      titleExtra={
        <Page.Nav>
          <Page.NavItem
            title={t('ui.download.singleSave', 'Single save')}
            active={exportScope === 'single'}
            onClick={() => setExportScope('single')}
          />
          <Page.NavItem
            title={t('ui.download.multipleSaves', 'Multiple saves')}
            active={exportScope === 'set'}
            onClick={() => setExportScope('set')}
          />
        </Page.Nav>
      }
      variant="workspace"
      panelClassName="min-w-0 max-w-full h-[min(48rem,calc(100dvh-2rem))]"
      bodyClassName="gap-6"
      footer={
        <ModalFooter className="flex-row flex-wrap gap-3" aria-live="polite">
          <InlineGroup className="min-w-0 w-full gap-2 lg:w-auto lg:flex-1">
            <span className="text-sm text-text-2 whitespace-nowrap shrink-0">
              {t('ui.download.savesAs', 'Saves as')}
            </span>
            <TextInput
              size="small"
              className="min-w-0 flex-1"
              value={displayedFileName}
              onChange={(value) =>
                setFileNames((previous) => ({
                  ...previous,
                  [fileNameKey]: value,
                }))
              }
              onBlur={() => {
                const value = fileNames[fileNameKey]?.trim();
                setFileNames((previous) => {
                  if (value) return { ...previous, [fileNameKey]: value };
                  const next = { ...previous };
                  delete next[fileNameKey];
                  return next;
                });
              }}
              aria-label={t('ui.download.fileName', 'Download file name')}
            />
          </InlineGroup>
          <Button
            onClick={resetExportSettings}
            variant="secondary"
            size="md"
            icon={<ResetIcon />}
            className="min-h-11 flex-1 lg:flex-none"
          >
            {t('ui.download.resetSettings', 'Reset settings')}
          </Button>
          <Button
            onClick={() => void downloadSave()}
            variant="primary"
            size="md"
            icon={<DownloadIcon />}
            className="min-h-11 flex-1 lg:flex-none"
            disabled={hasExportSetError}
          >
            {t('ui.download.downloadAction', 'Download')}
          </Button>
        </ModalFooter>
      }
    >
      <div
        className={
          exportScope === 'set'
            ? 'grid w-full grid-cols-[auto_1fr] items-stretch gap-x-4 gap-y-3'
            : 'flex flex-wrap items-start gap-4'
        }
      >
        <div className="w-56 max-w-full">
          <TextLabel>{t('ui.download.exportAs', 'Export as')}</TextLabel>
          <Select
            items={EXPORT_OPTIONS.map((item) => ({
              ...item,
              label:
                item.id === 'pc'
                  ? t('ui.download.pcSaveFile', 'PC save file')
                  : t('ui.download.switchContainer', 'Switch container'),
            }))}
            placeholder={t(
              'ui.download.selectExportType',
              'Select export type',
            )}
            className="w-full"
            selectedItem={
              EXPORT_OPTIONS.find((option) => option.id === exportMode) ??
              EXPORT_OPTIONS[0]
            }
            defaultSelectedItem={
              EXPORT_OPTIONS.find((option) => option.id === exportMode) ??
              EXPORT_OPTIONS[0]
            }
            onSelectionChange={onExportModeSelection}
          />
        </div>
        {exportScope === 'single' && (
          <div className="w-36 max-w-full">
            <TextLabel>{t('ui.download.inGameSlot', 'In-game slot')}</TextLabel>
            <Select
              items={slotOptions}
              placeholder={t('ui.field.selectSlot', 'Select slot')}
              className="w-full"
              selectedItem={slotOptions[selectedSlot]}
              defaultSelectedItem={slotOptions[selectedSlot]}
              onSelectionChange={onSlotSelection}
            />
          </div>
        )}
        {exportScope === 'set' && (
          <ShadowCrystalGrid
            className="row-span-2 h-full justify-self-end"
            history={exportHistory}
            overrides={activeHistoryOverrides}
            onHistoryChange={(chapter, slot, outcome) => {
              const values = { ...activeHistoryOverrides };
              const key = `${chapter}_${slot}`;
              if (outcome === undefined) delete values[key];
              else values[key] = outcome;
              setHistoryOverrides({ context: historyContext, values });
            }}
          />
        )}
        {exportScope === 'single' && (
          <div>
            <TextLabel htmlFor={completionSaveId}>
              {t('ui.field.completionSave', 'Completion save')}
            </TextLabel>
            <div className="flex h-10 items-center">
              <Checkbox
                id={completionSaveId}
                checked={isCompletionSave}
                onChange={setIsCompletionSave}
              />
            </div>
          </div>
        )}
        {exportScope === 'set' && exportMode === 'pc' && (
          <BaseSourceField
            label={t('ui.download.baseDrIni', 'Base dr.ini')}
            hint={
              baseDrIniName
                ? t(
                    'ui.download.baseDrIniHintOverride',
                    'Using this file instead of the imported dr.ini.',
                  )
                : importedDrIni
                  ? t(
                      'ui.download.baseDrIniHintImported',
                      'Using the dr.ini from an imported save. Click the field to replace it.',
                    )
                  : t(
                      'ui.download.baseDrIniHintNone',
                      'Optional. Metadata is generated automatically if you skip this.',
                    )
            }
            displayName={baseDrIniName || importedDrIni?.fileName || ''}
            chooseLabel={t('ui.download.chooseFile', 'Choose file')}
            hasSelection={Boolean(baseDrIniName || importedDrIni)}
            accept=".ini,text/plain"
            onFile={readBaseDrIni}
            canClear={Boolean(baseDrIniName)}
            clearLabel={t('ui.download.clearBase', 'Clear base')}
            onClear={() => {
              setBaseDrIni('');
              setBaseDrIniName('');
            }}
          />
        )}
        {exportScope === 'set' && exportMode === 'switch' && (
          <BaseSourceField
            label={t('ui.download.baseContainer', 'Base container')}
            hint={
              baseContainerName
                ? t(
                    'ui.download.baseContainerHintOverride',
                    'Using this container instead of the imported metadata.',
                  )
                : importedDrIni
                  ? t(
                      'ui.download.baseContainerHintImported',
                      'Using metadata from an imported save. Click the field to replace it.',
                    )
                  : t(
                      'ui.download.baseContainerHintNone',
                      'Optional. Other container entries are omitted if you skip this.',
                    )
            }
            displayName={baseContainerName || importedDrIni?.fileName || ''}
            chooseLabel={t('ui.download.chooseContainer', 'Choose container')}
            hasSelection={Boolean(baseContainerName || importedDrIni)}
            accept=".sav"
            onFile={readBaseContainer}
            canClear={Boolean(baseContainerName)}
            clearLabel={t('ui.download.clearBase', 'Clear base')}
            onClear={() => {
              setBaseContainer(undefined);
              setBaseContainerName('');
            }}
          />
        )}
      </div>

      {exportScope === 'set' ? (
        <div className="flex flex-col gap-2">
          <TextLabel>{t('ui.download.saveSlots', 'Save slots')}</TextLabel>
          {hasDuplicateError && (
            <p
              role="alert"
              className="max-h-10 shrink-0 overflow-y-auto text-sm leading-5 text-red"
            >
              {formatTranslation(
                t(
                  'ui.download.duplicateTargets',
                  'Conflict: multiple saves target {targets}. Each slot can only contain one save.',
                ),
                { targets: duplicates.join(', ') },
              )}
            </p>
          )}
          <ResponsiveTable
            layout="export-selection"
            className="download-save-table w-full overflow-visible shrink-0"
            ariaLabel={t(
              'ui.download.downloadMultipleSaves',
              'Download multiple saves',
            )}
            sort={saveTableSort}
            onSortChange={setSaveTableSort}
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
                align: 'center',
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
                id: 'target',
                content: t('ui.download.target', 'Target'),
                sortable: true,
              },
              {
                id: 'source',
                content: t('ui.download.source', 'Source'),
                sortable: true,
                align: 'center',
              },
            ]}
          >
            {storedSaves.length === 0 ? (
              <p className="p-4 text-sm text-text-2 text-center">
                {t('ui.download.noStoredSaves', 'No stored saves available.')}
              </p>
            ) : (
              displayedStoredSaves.map((storedSave) => {
                const sel = selections.get(storedSave.meta.id);
                const isSelected = sel?.selected ?? false;
                const effectiveSlot = sel?.slotOverride ?? storedSave.meta.slot;
                const effectiveCompletion =
                  sel?.completionOverride ?? storedSave.meta.isCompletionSave;
                const targetKey = getTargetKey({
                  chapter: storedSave.meta.chapter,
                  slot: effectiveSlot,
                  isCompletionSave: effectiveCompletion,
                });
                const isDuplicate =
                  isSelected && duplicates.includes(targetKey);
                return (
                  <ResponsiveTableRow
                    key={storedSave.meta.id}
                    className={mergeClass(
                      'max-md:grid-cols-1 max-md:gap-3',
                      isDuplicate && 'bg-red-soft',
                    )}
                  >
                    <div
                      className={mergeClass(
                        'flex justify-start md:justify-center',
                      )}
                    >
                      <Checkbox
                        ariaLabel={formatTranslation(
                          t('ui.download.selectNamedSave', 'Select {name}'),
                          { name: storedSave.meta.name },
                        )}
                        checked={isSelected}
                        onChange={(checked) =>
                          updateSelection(storedSave.meta.id, {
                            selected: checked,
                          })
                        }
                      />
                    </div>

                    <ResponsiveTableFields>
                      <div
                        className={mergeClass(
                          'break-words text-base font-bold text-text-1 md:truncate md:text-sm md:font-normal',
                        )}
                      >
                        {storedSave.meta.name}
                      </div>

                      <div
                        className={mergeClass(
                          'flex items-center gap-2 md:justify-center',
                        )}
                      >
                        <ResponsiveTableMobileLabel>
                          {t('ui.upload.chapter', 'Chapter')}
                        </ResponsiveTableMobileLabel>
                        <span className="ui-field-mono text-sm text-text-1">
                          {storedSave.meta.chapter}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <ResponsiveTableMobileLabel>
                          {t('ui.field.slot', 'Slot')}
                        </ResponsiveTableMobileLabel>
                        <div className="w-36 md:w-full">
                          <Select
                            items={slotOptions}
                            className="w-full h-8 min-h-0"
                            selectedItem={slotOptions[effectiveSlot]}
                            defaultSelectedItem={slotOptions[effectiveSlot]}
                            onSelectionChange={(item) => {
                              if (item) {
                                updateSelection(storedSave.meta.id, {
                                  slotOverride: (parseInt(item.id, 10) -
                                    1) as SaveSlot,
                                });
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div
                        className={mergeClass(
                          'flex items-center gap-2 md:justify-center',
                        )}
                      >
                        <ResponsiveTableMobileLabel>
                          {t('ui.field.completionSave', 'Complete')}
                        </ResponsiveTableMobileLabel>
                        <Checkbox
                          ariaLabel={`${t(
                            'ui.field.completionSave',
                            'Completion save',
                          )}: ${storedSave.meta.name}`}
                          checked={effectiveCompletion}
                          onChange={(checked) =>
                            updateSelection(storedSave.meta.id, {
                              completionOverride: checked,
                            })
                          }
                        />
                      </div>

                      <div className={mergeClass('flex items-center gap-2')}>
                        <ResponsiveTableMobileLabel>
                          {t('ui.download.target', 'Target')}
                        </ResponsiveTableMobileLabel>
                        <span className="ui-field-mono text-sm text-text-1">
                          {targetKey}
                        </span>
                      </div>

                      <div
                        className={mergeClass(
                          'flex items-center gap-2 md:justify-center',
                        )}
                      >
                        <ResponsiveTableMobileLabel>
                          {t('ui.download.source', 'Source')}
                        </ResponsiveTableMobileLabel>
                        <SaveSourceBadge save={storedSave} />
                      </div>
                    </ResponsiveTableFields>
                  </ResponsiveTableRow>
                );
              })
            )}
          </ResponsiveTable>
        </div>
      ) : save ? (
        <div className="flex flex-col gap-2">
          <TextLabel>
            {t(
              'ui.download.changesSinceBaseline',
              'Changes since last upload or download',
            )}
          </TextLabel>
          <DownloadChanges key={baselineRevision} />
        </div>
      ) : null}
    </ModalLayout>
  );
}

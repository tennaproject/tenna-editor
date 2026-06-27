import { useMemo, useState } from 'react';
import { Button, Page, Select, TextInput, type SelectItem } from '@components';
import type { FlagBitfieldId, FlagBitfieldProperties, FlagIndex } from '@data';
import { useSave } from '@store';
import {
  flagHelpers,
  FLAG_NAMES,
  getFlagBitfieldMaxValue,
  getKnownBitfields,
  mergeClass,
  parseFiniteNumberInput,
  readFlagBitfield,
  writeFlagBitfield,
  type KnownBitfield,
} from '@utils';

type ManualMode = 'value' | 'bitfield';

function parseIntegerInput(value: string) {
  const parsed = parseFiniteNumberInput(value);
  if (parsed === null || !Number.isInteger(parsed)) return null;
  return parsed;
}

interface BitfieldEdit {
  index: number;
  width: number;
  value: number;
}

interface ValidationResult {
  flagId: number | null;
  directValue: number | null;
  bitfield: BitfieldEdit | null;
  error: string | null;
}

interface AppliedState {
  flagId: number;
  previousValue: number;
  nextValue: number;
}

function toBitfieldProps(
  flagId: FlagIndex,
  index: number,
  width: number,
): FlagBitfieldProperties {
  return { parent: flagId, index, width, displayName: '' };
}

function validateManualEdit(
  mode: ManualMode,
  flagInput: string,
  valueInput: string,
  fieldIndexInput: string,
  fieldWidthInput: string,
  flagCount: number,
): ValidationResult {
  if (!flagInput.trim()) {
    return {
      flagId: null,
      directValue: null,
      bitfield: null,
      error: null,
    };
  }

  const flagId = parseIntegerInput(flagInput);
  if (flagId === null || flagId < 0 || flagId >= flagCount) {
    return {
      flagId,
      directValue: null,
      bitfield: null,
      error: `Flag id must be between 0 and ${Math.max(flagCount - 1, 0)}.`,
    };
  }

  if (mode === 'value') {
    const directValue = parseFiniteNumberInput(valueInput);
    return {
      flagId,
      directValue,
      bitfield: null,
      error: directValue === null ? 'Value must be a finite number.' : null,
    };
  }

  const index = parseIntegerInput(fieldIndexInput);
  if (index === null || index < 0) {
    return {
      flagId,
      directValue: null,
      bitfield: null,
      error: 'Field index must be a non-negative integer.',
    };
  }

  const width = parseIntegerInput(fieldWidthInput);
  if (width === null || width < 1) {
    return {
      flagId,
      directValue: null,
      bitfield: null,
      error: 'Width must be a positive integer.',
    };
  }

  const value = parseIntegerInput(valueInput);
  const maxValue = getFlagBitfieldMaxValue(
    toBitfieldProps(flagId as FlagIndex, index, width),
  );
  if (value === null || value < 0) {
    return {
      flagId,
      directValue: null,
      bitfield: null,
      error: 'Value must be a non-negative integer.',
    };
  }

  if (value > maxValue) {
    return {
      flagId,
      directValue: null,
      bitfield: null,
      error: `Value must be between 0 and ${maxValue}.`,
    };
  }

  return {
    flagId,
    directValue: null,
    bitfield: { index, width, value },
    error: null,
  };
}

function buildInputsFromFlag(
  mode: ManualMode,
  flagId: FlagIndex,
  currentValue: number,
  knownBitfields: KnownBitfield[],
  selectedBitfieldId: FlagBitfieldId | null,
  fieldIndexInput: string,
  fieldWidthInput: string,
) {
  if (mode === 'value') {
    return {
      valueInput: String(currentValue),
      fieldIndexInput,
      fieldWidthInput,
      selectedBitfieldId,
    };
  }

  if (knownBitfields.length > 0) {
    const match =
      knownBitfields.find(({ id }) => id === selectedBitfieldId) ??
      knownBitfields[0];
    return {
      selectedBitfieldId: match.id,
      fieldIndexInput: String(match.bitfield.index),
      fieldWidthInput: String(match.bitfield.width ?? 1),
      valueInput: String(readFlagBitfield(currentValue, match.bitfield)),
    };
  }

  const index = parseIntegerInput(fieldIndexInput) ?? 0;
  const width = parseIntegerInput(fieldWidthInput) ?? 1;
  return {
    selectedBitfieldId: null,
    fieldIndexInput: String(index),
    fieldWidthInput: String(width),
    valueInput: String(
      readFlagBitfield(currentValue, toBitfieldProps(flagId, index, width)),
    ),
  };
}

export function ManualFlagEditor() {
  const updateSave = useSave((s) => s.updateSave);
  const flagCount = useSave((s) => s.save?.flags.length ?? 0);
  const saveFlags = useSave((s) => s.save?.flags);

  const [mode, setMode] = useState<ManualMode>('value');
  const [flagInput, setFlagInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [fieldIndexInput, setFieldIndexInput] = useState('0');
  const [fieldWidthInput, setFieldWidthInput] = useState('1');
  const [selectedBitfieldId, setSelectedBitfieldId] =
    useState<FlagBitfieldId | null>(null);
  const [applied, setApplied] = useState<AppliedState | null>(null);

  const syncInputsForFlag = (nextMode: ManualMode, nextFlagInput: string) => {
    const flagId = parseIntegerInput(nextFlagInput);
    if (flagId === null || flagId < 0 || flagId >= flagCount) return;

    const flagIndex = flagId as FlagIndex;
    const currentValue = Number(saveFlags?.[flagId]) || 0;
    const bitfields = getKnownBitfields(flagIndex);
    const next = buildInputsFromFlag(
      nextMode,
      flagIndex,
      currentValue,
      bitfields,
      selectedBitfieldId,
      fieldIndexInput,
      fieldWidthInput,
    );

    setSelectedBitfieldId(next.selectedBitfieldId);
    setFieldIndexInput(next.fieldIndexInput);
    setFieldWidthInput(next.fieldWidthInput);
    setValueInput(next.valueInput);
  };

  const handleModeChange = (nextMode: ManualMode) => {
    setMode(nextMode);
    setApplied(null);
    syncInputsForFlag(nextMode, flagInput);
  };

  const handleFlagInputChange = (value: string) => {
    setFlagInput(value);
    setApplied(null);
    syncInputsForFlag(mode, value);
  };

  const handleValueInputChange = (value: string) => {
    setValueInput(value);
    setApplied(null);
  };

  const handleFieldIndexInputChange = (value: string) => {
    setFieldIndexInput(value);
    setSelectedBitfieldId(null);
    setApplied(null);
  };

  const handleFieldWidthInputChange = (value: string) => {
    setFieldWidthInput(value);
    setSelectedBitfieldId(null);
    setApplied(null);
  };

  const parsedFlagId = parseIntegerInput(flagInput);
  const earlyFlagIndex =
    parsedFlagId !== null && parsedFlagId >= 0 && parsedFlagId < flagCount
      ? (parsedFlagId as FlagIndex)
      : null;
  const knownBitfields = useMemo(
    () =>
      earlyFlagIndex !== null ? getKnownBitfields(earlyFlagIndex) : [],
    [earlyFlagIndex],
  );
  const isBitfieldFlag = knownBitfields.length > 0;

  const validation = useMemo(
    () =>
      validateManualEdit(
        mode,
        flagInput,
        valueInput,
        fieldIndexInput,
        fieldWidthInput,
        flagCount,
      ),
    [fieldIndexInput, fieldWidthInput, flagCount, flagInput, mode, valueInput],
  );

  const currentValue =
    validation.flagId !== null &&
    validation.flagId >= 0 &&
    validation.flagId < flagCount
      ? Number(saveFlags?.[validation.flagId]) || 0
      : null;

  const nextValue =
    currentValue !== null && !validation.error
      ? mode === 'value' && validation.directValue !== null
        ? validation.directValue
        : mode === 'bitfield' &&
            validation.bitfield !== null &&
            validation.flagId !== null
          ? writeFlagBitfield(
              currentValue,
              toBitfieldProps(
                validation.flagId as FlagIndex,
                validation.bitfield.index,
                validation.bitfield.width,
              ),
              validation.bitfield.value,
            )
          : null
      : null;

  const flagIndex =
    validation.flagId !== null &&
    validation.flagId >= 0 &&
    validation.flagId < flagCount
      ? (validation.flagId as FlagIndex)
      : null;
  const meta = flagIndex !== null ? flagHelpers.getById(flagIndex) : undefined;
  const name = flagIndex !== null ? FLAG_NAMES[flagIndex] : undefined;
  const isListed = name !== undefined;
  const knownValueEntries = meta?.valueRules?.map
    ? Object.entries(meta.valueRules.map).sort(
        ([a], [b]) => Number(a) - Number(b),
      )
    : [];

  const bitfieldSelectItems = useMemo<SelectItem[]>(
    () =>
      knownBitfields.map(({ id, bitfield }) => ({
        id,
        label: bitfield.displayName,
        value: id,
      })),
    [knownBitfields],
  );

  const selectedBitfieldItem =
    bitfieldSelectItems.find((item) => item.id === selectedBitfieldId) ?? null;

  const showBitfieldSuggestion = isBitfieldFlag && mode === 'value';

  const handleBitfieldSelection = (item: SelectItem | null) => {
    if (!item || flagIndex === null || currentValue === null) return;

    const match = knownBitfields.find(({ id }) => id === item.id);
    if (!match) return;

    setSelectedBitfieldId(match.id);
    setFieldIndexInput(String(match.bitfield.index));
    setFieldWidthInput(String(match.bitfield.width ?? 1));
    setValueInput(String(readFlagBitfield(currentValue, match.bitfield)));
    setApplied(null);
  };

  const handleApply = () => {
    if (
      validation.error ||
      validation.flagId === null ||
      currentValue === null ||
      nextValue === null
    ) {
      return;
    }

    const flagId = validation.flagId;
    const previousValue = currentValue;
    const appliedValue = nextValue;

    updateSave((save) => {
      save.flags[flagId] = appliedValue;
    });
    setApplied({ flagId, previousValue, nextValue: appliedValue });
  };

  const hasApplied = applied !== null && applied.flagId === validation.flagId;
  const previewBefore = hasApplied ? applied.previousValue : currentValue;
  const previewAfter = hasApplied ? applied.nextValue : nextValue;
  const showValueDiff =
    previewBefore !== null &&
    previewAfter !== null &&
    previewBefore !== previewAfter;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="ui-prose-muted text-xs">
          Target a flag by id and write a direct value or a bitfield value.
        </span>
        <Page.Nav>
          <button
            type="button"
            onClick={() => handleModeChange('value')}
            className={mergeClass(
              'px-3 py-0.5 font-semibold motion-reduce:transition-none transition-colors duration-300 text-sm inline-flex items-center gap-1.5',
              mode === 'value'
                ? 'bg-surface-1-active text-text-1'
                : 'bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1-hover',
            )}
          >
            Direct value
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('bitfield')}
            className={mergeClass(
              'px-3 py-0.5 font-semibold motion-reduce:transition-none transition-colors duration-300 text-sm inline-flex items-center gap-1.5',
              mode === 'bitfield'
                ? 'bg-surface-1-active text-text-1'
                : 'bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1-hover',
            )}
          >
            Bitfield value
          </button>
        </Page.Nav>
      </div>

      {showBitfieldSuggestion && (
        <p className="ui-prose-muted text-xs">
          This flag has known bitfields.{' '}
          <button
            type="button"
            onClick={() => handleModeChange('bitfield')}
            className="text-accent-1 hover:underline"
          >
            Use Bitfield value
          </button>
        </p>
      )}

      <div
        className={mergeClass(
          'grid gap-3 sm:items-end',
          mode === 'bitfield'
            ? 'sm:grid-cols-[5rem_5rem_4rem_minmax(6rem,1fr)_4rem]'
            : 'sm:grid-cols-[5rem_minmax(6rem,1fr)_4rem]',
        )}
      >
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-text-3">Flag id</span>
          <TextInput
            value={flagInput}
            onChange={handleFlagInputChange}
            placeholder="0"
            size="small"
            type="search"
            aria-label="Manual flag id"
            fullWidth
          />
        </label>
        {mode === 'bitfield' && (
          <>
            <label className="flex min-w-0 flex-col gap-1">
              <span className="text-xs text-text-3">Field index</span>
              <TextInput
                value={fieldIndexInput}
                onChange={handleFieldIndexInputChange}
                placeholder="0"
                size="small"
                type="search"
                aria-label="Bitfield index"
                fullWidth
              />
            </label>
            <label className="flex min-w-0 flex-col gap-1">
              <span className="text-xs text-text-3">Width</span>
              <TextInput
                value={fieldWidthInput}
                onChange={handleFieldWidthInputChange}
                placeholder="1"
                size="small"
                type="search"
                aria-label="Bitfield width"
                fullWidth
              />
            </label>
          </>
        )}
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-text-3">Value</span>
          <TextInput
            value={valueInput}
            onChange={handleValueInputChange}
            placeholder="0"
            size="small"
            type="search"
            aria-label="Manual flag value"
            fullWidth
          />
        </label>
        <Button
          size="sm"
          variant="primary"
          onClick={handleApply}
          disabled={!!validation.error || nextValue === null}
          className="h-8 w-full justify-center px-2 whitespace-nowrap sm:w-14 sm:justify-self-end"
        >
          Apply
        </Button>
      </div>

      {mode === 'bitfield' && isBitfieldFlag && (
        <Select
          label="Bitfield"
          items={bitfieldSelectItems}
          selectedItem={selectedBitfieldItem}
          defaultSelectedItem={selectedBitfieldItem}
          onSelectionChange={handleBitfieldSelection}
        />
      )}

      {validation.error ? (
        <div className="ui-panel-muted border-red/40 bg-red-soft text-danger text-xs">
          {validation.error}
        </div>
      ) : flagIndex === null ? (
        <p className="ui-prose-muted text-xs">Enter a flag id to inspect.</p>
      ) : (
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <code className="text-text-1 text-sm select-all">
                {name ?? `Flag #${flagIndex}`}
              </code>
              <span className="text-text-3 font-mono">#{flagIndex}</span>
            </div>
            {meta?.displayName && (
              <span className="text-text-2">{meta.displayName}</span>
            )}
            {meta?.description && (
              <span className="text-text-3">{meta.description}</span>
            )}
            {!isListed && (
              <span className="ui-prose-muted text-xs">
                This flag isn't listed.
              </span>
            )}
          </div>

          {showValueDiff && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 ui-divider-row text-sm">
              <span className="text-text-1 min-w-0">
                {hasApplied ? 'Applied' : 'Pending change'}
              </span>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs shrink-0">
                <span className="text-text-2 line-through decoration-text-2/50">
                  {previewBefore}
                </span>
                <span className="text-text-2">→</span>
                <span className="text-success">{previewAfter}</span>
              </div>
            </div>
          )}

          {knownValueEntries.length > 0 && mode === 'value' && (
            <div className="flex max-h-28 flex-col gap-0.5 overflow-auto border-t border-divider pt-2 text-text-2">
              {knownValueEntries.map(([value, label]) => (
                <span
                  key={value}
                  className={mergeClass(
                    'font-mono',
                    Number(value) === currentValue ? 'text-accent-1' : '',
                  )}
                >
                  {value} - {label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

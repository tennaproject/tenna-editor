import { useState } from 'react';
import { TextInput, Tooltip } from '@components';
import DataPackIcon from '@assets/icons/file-plus.svg?react';
import type { FlagIndex } from '@data';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import { mergeClass } from '@utils';
import { parseFiniteNumberInput } from '@utils';

import ChevronDownIcon from '@assets/icons/chevron-down.svg?react';
import { formatTranslation, useTranslation } from '../../i18n';

interface FlagRowProps {
  flagIndex: FlagIndex;
  name: string;
  packName?: string;
  description: string;
  knownValues?: Record<number, string>;
  knownValueEntries?: readonly [string, string][];
  isExpanded: boolean;
  onToggleExpand: (flagIndex: FlagIndex) => void;
}

export function FlagRow({
  flagIndex,
  name,
  packName,
  description,
  knownValues,
  knownValueEntries,
  isExpanded,
  onToggleExpand,
}: FlagRowProps) {
  const { t } = useTranslation();
  const packSource = packName
    ? formatTranslation(t('ui.common.dataPackSource', 'Data pack: {name}'), {
        name: packName,
      })
    : undefined;
  const updateSave = useSave((s) => s.updateSave);
  const value = Number(useSaveFlag(flagIndex)) || 0;
  const hasDetails = !!knownValues;
  const [error, setError] = useState<string | null>(null);

  const handleFlagChange = (nextValue: string) => {
    const numValue = parseFiniteNumberInput(nextValue);
    if (numValue === null) {
      setError(t('ui.flags.invalidNumber', 'Invalid number.'));
      return;
    }

    setError(null);
    updateSave((save) => {
      save.flags[flagIndex] = numValue;
    });
  };

  const handleToggleExpand = () => {
    onToggleExpand(flagIndex);
  };

  return (
    <div className="hover:bg-surface-2/50">
      <div className="grid grid-cols-[3.5rem_minmax(0,1fr)_7rem_1.25rem] sm:grid-cols-[3.5rem_minmax(9rem,16rem)_minmax(0,1fr)_7rem_1.25rem] items-center gap-4 px-4 py-2.5">
        <span className="text-text-3 ui-mono-xs tabular-nums">
          <span className="select-none">#</span>
          <span className="select-all">{flagIndex}</span>
        </span>
        <div className="flex min-w-0 items-center gap-2">
          <code className="text-text-1 text-sm select-all truncate block">
            {name}
          </code>
          {packSource && (
            <Tooltip
              widthClassName="w-max max-w-3xs"
              content={
                <span className="flex items-center gap-2 text-xs text-green">
                  <span className="h-4 w-4 shrink-0">
                    <DataPackIcon />
                  </span>
                  {packSource}
                </span>
              }
              className="shrink-0"
            >
              <span className="block h-4 w-4 text-green">
                <DataPackIcon />
              </span>
              <span className="sr-only">{packSource}</span>
            </Tooltip>
          )}
        </div>
        <div className="hidden sm:block min-w-0">
          {description && (
            <span className="text-text-2 text-xs">{description}</span>
          )}
        </div>
        <div className="w-28 shrink-0">
          <TextInput
            defaultValue={String(value)}
            onCommit={handleFlagChange}
            placeholder={t('ui.flags.enterValue', 'Enter value...')}
            size="small"
            fullWidth
            name={`flag_${flagIndex}`}
            id={`flag_${flagIndex}`}
            type="search"
            aria-label={`Value for flag ${name}`}
          />
          {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>
        <div className="w-5 shrink-0 flex items-center justify-center">
          {hasDetails && (
            <button
              type="button"
              onClick={handleToggleExpand}
              className="w-5 h-5 flex items-center justify-center text-text-2"
            >
              <ChevronDownIcon />
            </button>
          )}
        </div>
      </div>
      <div
        className={mergeClass(
          'grid transition-[grid-template-rows] duration-200',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          {knownValues && (
            <div className="px-4 pb-3 text-xs">
              <p className="text-text-2 mb-1.5">
                {t('ui.flags.knownValues', 'Known values:')}
              </p>
              <div className="flex flex-col gap-0.5 pl-2">
                {knownValueEntries?.map(([val, label]) => (
                  <span
                    key={val}
                    className={mergeClass(
                      'ui-mono-sm',
                      Number(val) === value ? 'text-accent-1' : 'text-text-2',
                    )}
                  >
                    {val} - {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

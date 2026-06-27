import { memo, useCallback, useState } from 'react';
import { TextInput } from '@components';
import type { FlagIndex } from '@data';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import { mergeClass } from '@utils';
import { parseFiniteNumberInput } from '@utils';

import ChevronDownIcon from '@assets/icons/chevron-down.svg?react';

interface FlagRowProps {
  flagIndex: FlagIndex;
  name: string;
  description: string;
  knownValues?: Record<number, string>;
  knownValueEntries?: readonly [string, string][];
  isExpanded: boolean;
  onToggleExpand: (flagIndex: FlagIndex) => void;
}

function FlagRowComponent({
  flagIndex,
  name,
  description,
  knownValues,
  knownValueEntries,
  isExpanded,
  onToggleExpand,
}: FlagRowProps) {
  const updateSave = useSave((s) => s.updateSave);
  const value = Number(useSaveFlag(flagIndex)) || 0;
  const hasDetails = !!knownValues;
  const [error, setError] = useState<string | null>(null);

  const handleFlagChange = useCallback(
    (nextValue: string) => {
      const numValue = parseFiniteNumberInput(nextValue);
      if (numValue === null) {
        setError('Invalid number.');
        return;
      }

      setError(null);
      updateSave((save) => {
        save.flags[flagIndex] = numValue;
      });
    },
    [flagIndex, updateSave],
  );

  const handleToggleExpand = useCallback(() => {
    onToggleExpand(flagIndex);
  }, [flagIndex, onToggleExpand]);

  return (
    <div className="hover:bg-surface-2/50">
      <div className="grid grid-cols-[3.5rem_minmax(0,1fr)_7rem_1.25rem] sm:grid-cols-[3.5rem_minmax(9rem,16rem)_minmax(0,1fr)_7rem_1.25rem] items-center gap-4 px-4 py-2.5">
        <span className="text-text-3 text-xs font-mono tabular-nums">
          <span className="select-none">#</span>
          <span className="select-all">{flagIndex}</span>
        </span>
        <div className="min-w-0">
          <code className="text-text-1 text-sm select-all truncate block">
            {name}
          </code>
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
            placeholder="Enter value..."
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
              <p className="text-text-2 mb-1.5">Known values:</p>
              <div className="flex flex-col gap-0.5 pl-2">
                {knownValueEntries?.map(([val, label]) => (
                  <span
                    key={val}
                    className={mergeClass(
                      'font-mono',
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

export const FlagRow = memo(FlagRowComponent);

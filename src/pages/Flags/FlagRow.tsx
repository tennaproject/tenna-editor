import { memo, useCallback } from 'react';
import { TextInput } from '@components';
import type { FlagIndex } from '@data';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import { mergeClass } from '@utils';

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

  const handleFlagChange = useCallback(
    (nextValue: string) => {
      const numValue = parseFloat(nextValue);
      if (!isNaN(numValue)) {
        updateSave((save) => {
          save.flags[flagIndex] = numValue;
        });
      }
    },
    [flagIndex, updateSave],
  );

  const handleToggleExpand = useCallback(() => {
    onToggleExpand(flagIndex);
  }, [flagIndex, onToggleExpand]);

  return (
    <div className="hover:bg-surface-2/50">
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <code className="text-text-1 text-sm select-all">{name}</code>
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

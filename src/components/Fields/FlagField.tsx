import type { FlagIndex, FlagProperties } from '@data';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import { chapterHelpers, flagHelpers, getGameColor, mergeClass } from '@utils';
import Markdown from 'react-markdown';
import {
  Checkbox,
  NumberInput,
  type SelectItem,
  Select,
  FieldWrapper,
} from '@components';

interface FlagFieldProps {
  id?: string;
  className?: string;
  flag: FlagIndex;
}

export function FlagField({ flag, id, className }: FlagFieldProps) {
  const updateSave = useSave((s) => s.updateSave);
  const currentValue = useSaveFlag(flag);
  const { valueType, valueRules, displayName, description } =
    flagHelpers.getById(flag) as FlagProperties;

  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const chapterFlags = chapterHelpers.getById(chapter).content.flags;

  if (!chapterFlags.has(flag)) return;

  if (valueType === 'boolean') {
    return (
      <FieldWrapper
        id={id}
        className={className}
        description={description}
        inline
      >
        <Checkbox
          label={<Markdown>{displayName}</Markdown>}
          checked={valueRules?.invertedBoolean ? !currentValue : !!currentValue}
          onChange={(value: boolean) => {
            updateSave((save) => {
              if (valueRules?.invertedBoolean) {
                save.flags[flag] = value ? 0 : 1;
              } else {
                save.flags[flag] = value ? 1 : 0;
              }
            });
          }}
        />
      </FieldWrapper>
    );
  } else if (valueType === 'number') {
    return (
      <FieldWrapper
        id={id}
        className={mergeClass('flex flex-col gap-2', className)}
        description={description}
        title={displayName}
        label
      >
        <NumberInput
          value={(currentValue as number) ?? 0}
          placeholder="Enter number..."
          min={valueRules?.min ?? 0}
          max={valueRules?.max ?? 99999}
          onChange={(value) => {
            updateSave((save) => (save.flags[flag] = value));
          }}
        />
      </FieldWrapper>
    );
  } else if (valueType === 'map') {
    if (valueRules?.map) {
      const selectItems: SelectItem[] = [];

      Object.entries(valueRules.map).forEach(([value, label]) => {
        selectItems.push({
          id: `${value}`,
          label,
          value,
        });
      });

      selectItems.sort(
        (itemA, itemB) =>
          parseInt(String(itemA.value), 10) - parseInt(String(itemB.value), 10),
      );

      const selectedItem = selectItems.find(
        (item) => parseInt(String(item.value), 10) === currentValue,
      );

      return (
        <FieldWrapper
          id={id}
          className={mergeClass('flex flex-col gap-2', className)}
          description={description}
          title={displayName}
          label
        >
          <Select
            items={selectItems}
            placeholder="Select value..."
            label={description}
            defaultSelectedItem={selectedItem}
            selectedItem={selectedItem}
            onSelectionChange={(item) => {
              if (!item || !valueRules?.map) return;
              const value = parseInt(item.id, 10);

              if (valueRules.map[value]) {
                updateSave((save) => (save.flags[flag] = value));
              }
            }}
          />
        </FieldWrapper>
      );
    }
  } else if (valueType === 'color') {
    return (
      <FieldWrapper
        id={id}
        className={mergeClass('flex flex-col gap-3', className)}
        description={description}
        title={displayName}
        label
      >
        <div className="flex flex-wrap">
          {[...Array(32)].map((_, i) => (
            <div
              key={i}
              className={mergeClass(
                'w-8 h-8 cursor-pointer border-2',
                i === currentValue ? 'border-text-1' : 'border-border',
              )}
              style={{ backgroundColor: getGameColor(i) }}
              onClick={() => {
                updateSave((save) => {
                  save.flags[flag] = i;
                });
              }}
            />
          ))}
        </div>
      </FieldWrapper>
    );
  }
  return;
}

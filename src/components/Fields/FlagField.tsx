import type { FlagIndex } from '@data';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import { chapterHelpers, flagHelpers, getGameColor, mergeClass } from '@utils';
import Markdown from 'react-markdown';
import {
  Checkbox,
  HelpTip,
  Section,
  InlineGroup,
  NumberInput,
  TextLabel,
  type SelectItem,
  Select,
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
    flagHelpers.getById(flag);

  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const chapterFlags = chapterHelpers.getById(chapter).content.flags;

  if (!chapterFlags.has(flag)) return;

  if (valueType === 'boolean') {
    return (
      <Section id={id} className={className}>
        <InlineGroup>
          <Checkbox
            label={<Markdown>{displayName}</Markdown>}
            checked={!!currentValue}
            onChange={(value: boolean) => {
              updateSave((save) => {
                save.flags[flag] = value ? 1 : 0;
              });
            }}
            fixedHeight
          />
          {description && (
            <HelpTip title={displayName}>
              <p>{description}</p>
            </HelpTip>
          )}
        </InlineGroup>
      </Section>
    );
  } else if (valueType === 'number') {
    return (
      <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
        <InlineGroup>
          <TextLabel>
            <Markdown>{displayName}</Markdown>
          </TextLabel>
          {description && (
            <HelpTip title={displayName}>
              <p>{description}</p>
            </HelpTip>
          )}
        </InlineGroup>
        <NumberInput
          value={(currentValue as number) ?? 0}
          placeholder="Enter number..."
          min={valueRules?.min ?? 0}
          max={valueRules?.max ?? 99999}
          onChange={(value) => {
            updateSave((save) => (save.flags[flag] = value));
          }}
        />
      </Section>
    );
  } else if (valueType === 'map') {
    if (valueRules?.map) {
      const selectItems: SelectItem[] = [];

      Object.entries(valueRules.map).forEach(([value, label]) => {
        selectItems.push({
          id: `${value}`,
          label,
        });
      });

      const selectedItem = selectItems.find(
        (item) => parseInt(item.id, 10) === currentValue,
      );

      return (
        <Section
          id={id}
          className={mergeClass('flex flex-col gap-2', className)}
        >
          <InlineGroup>
            <TextLabel>
              <Markdown>{displayName}</Markdown>
            </TextLabel>
            {description && (
              <HelpTip title={displayName}>
                <p>{description}</p>
              </HelpTip>
            )}
          </InlineGroup>
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
        </Section>
      );
    }
  } else if (valueType === 'color') {
    return (
      <Section id={id} className={mergeClass('flex flex-col gap-3', className)}>
        <InlineGroup>
          <TextLabel>
            <Markdown>{displayName}</Markdown>
          </TextLabel>
          {description && (
            <HelpTip title={displayName}>
              <p>{description}</p>
            </HelpTip>
          )}
        </InlineGroup>
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
      </Section>
    );
  }

  return;
}

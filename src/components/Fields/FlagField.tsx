import {
  FLAG_BITFIELDS_META,
  type FlagBitfieldId,
  type FlagIndex,
  type FlagProperties,
} from '@data';
import { useChapterFlags } from '@contexts';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import {
  chapterHelpers,
  flagHelpers,
  getGameColor,
  mergeClass,
  readFlagBitfield,
  writeFlagBitfield,
} from '@utils';
import Markdown from 'react-markdown';
import {
  Checkbox,
  NumberInput,
  type SelectItem,
  Select,
  FieldWrapper,
} from '@components';

interface FlagFieldBaseProps {
  id?: string;
  className?: string;
}

type FlagFieldProps = FlagFieldBaseProps &
  (
    | {
        flag: FlagIndex;
        bitfield?: never;
      }
    | {
        flag?: never;
        bitfield: FlagBitfieldId;
      }
  );

interface ResolvedField {
  meta: FlagProperties;
  currentValue: number;
  updateValue: (value: number) => void;
}

export function FlagField(props: FlagFieldProps) {
  const { id, className } = props;
  const updateSave = useSave((s) => s.updateSave);
  const sourceFlag = props.flag ?? FLAG_BITFIELDS_META[props.bitfield]?.parent;
  const currentFlagValue = useSaveFlag(sourceFlag);
  const resolvedField = (() => {
    if (props.flag !== undefined) {
      const meta = flagHelpers.getById(props.flag);
      if (!meta) return null;

      return {
        meta,
        currentValue: currentFlagValue,
        updateValue: (value: number) => {
          updateSave((save) => {
            save.flags[props.flag] = value;
          });
        },
      };
    }

    const bitfield = FLAG_BITFIELDS_META[props.bitfield];
    if (!bitfield) return null;

    return {
      meta: bitfield,
      currentValue: readFlagBitfield(currentFlagValue, bitfield),
      updateValue: (value: number) => {
        updateSave((save) => {
          const parentValue = Number(save.flags[bitfield.parent]) || 0;
          save.flags[bitfield.parent] = writeFlagBitfield(
            parentValue,
            bitfield,
            value,
          );
        });
      },
    };
  })() satisfies ResolvedField | null;

  const chapterFlagsContext = useChapterFlags();
  const saveChapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const chapterFlags =
    chapterFlagsContext ??
    chapterHelpers.getById(saveChapter).content.flags;

  if (sourceFlag === undefined || !chapterFlags.has(sourceFlag)) return;
  if (!resolvedField) return;

  const { meta, currentValue, updateValue } = resolvedField;
  const { valueType, valueRules, displayName, description } = meta;

  if (valueType === 'boolean') {
    const booleanMap = valueRules?.booleanMap;
    const checked = booleanMap
      ? booleanMap.trueValues.includes(currentValue)
      : valueRules?.invertedBoolean
        ? !currentValue
        : !!currentValue;

    return (
      <FieldWrapper
        id={id}
        className={className}
        description={description}
        inline
      >
        <Checkbox
          label={<Markdown>{displayName}</Markdown>}
          checked={checked}
          onChange={(value: boolean) => {
            if (booleanMap) {
              updateValue(value ? booleanMap.writeTrue : booleanMap.writeFalse);
              return;
            }
            updateValue(
              valueRules?.invertedBoolean ? (value ? 0 : 1) : value ? 1 : 0,
            );
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
          max={valueRules?.max ?? 999999999}
          onChange={(value) => {
            updateValue(value);
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
          Number(itemA.value) - Number(itemB.value),
      );

      const selectedItem = selectItems.find(
        (item) => Number(item.value) === currentValue,
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
              const value = Number(item.id);

              if (Number.isFinite(value) && valueRules.map[value]) {
                updateValue(value);
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
          {COLOR_INDICES.map((colorIndex) => (
            <div
              key={colorIndex}
              className={mergeClass(
                'w-8 h-8 cursor-pointer border-2',
                colorIndex === currentValue ? 'border-text-1' : 'border-border',
              )}
              style={{ backgroundColor: getGameColor(colorIndex) }}
              onClick={() => {
                updateValue(colorIndex);
              }}
            />
          ))}
        </div>
      </FieldWrapper>
    );
  }
  return;
}

const COLOR_INDICES = Array.from({ length: 32 }, (_, i) => i);

import {
  type FlagBitfieldId,
  type FlagIndex,
  type FlagProperties,
} from '@data';
import { FLAG_BITFIELDS_META } from '@data/flag-bitfields';
import { useChapterFlags } from '@contexts';
import { useSave } from '@store';
import {
  getFlagBitfieldTranslationKeyPrefix,
  getFlagTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';
import {
  chapterHelpers,
  flagHelpers,
  getGameColor,
  mergeClass,
  readFlagBitfield,
  unusedLast,
  writeFlagBitfield,
} from '@utils';
import {
  compactBigInt,
  type IntegerValue,
  MAX_GAME_INTEGER,
  toBigInt,
} from '@utils/big-integer';
import Markdown from 'react-markdown';
import {
  Checkbox,
  NumberField,
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
  currentValue: IntegerValue;
  updateValue: (value: IntegerValue) => void;
}

export function FlagField(props: FlagFieldProps) {
  const { id, className } = props;
  const { t } = useTranslation();
  const updateSave = useSave((s) => s.updateSave);
  const sourceFlag = props.flag ?? FLAG_BITFIELDS_META[props.bitfield]?.parent;
  const currentFlagValue = useSave((s) =>
    sourceFlag === undefined ? 0 : (s.save?.flags[sourceFlag] ?? 0),
  ) as IntegerValue;
  const resolvedField = (() => {
    if (props.flag !== undefined) {
      const meta = flagHelpers.getById(props.flag);
      if (!meta) return null;

      return {
        meta,
        currentValue: currentFlagValue,
        updateValue: (value: IntegerValue) => {
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
      updateValue: (value: IntegerValue) => {
        updateSave((save) => {
          const parentValue = (save.flags[bitfield.parent] ??
            0) as IntegerValue;
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
    chapterFlagsContext ?? chapterHelpers.getById(saveChapter).content.flags;

  if (sourceFlag === undefined || !chapterFlags.has(sourceFlag)) return;
  if (!resolvedField) return;

  const { currentValue, updateValue } = resolvedField;
  const meta = translateMeta(
    props.flag !== undefined
      ? getFlagTranslationKeyPrefix(props.flag)
      : getFlagBitfieldTranslationKeyPrefix(props.bitfield),
    resolvedField.meta,
    t,
  );
  const { valueType, valueRules, displayName, description } = meta;

  if (valueType === 'boolean') {
    const booleanMap = valueRules?.booleanMap;
    const checked = booleanMap
      ? booleanMap.trueValues.includes(Number(currentValue))
      : valueRules?.invertedBoolean
        ? !currentValue
        : !!currentValue;

    return (
      <FieldWrapper
        id={id}
        className={className}
        title={displayName}
        description={description}
        flag={sourceFlag}
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
      <NumberField
        id={id}
        className={className}
        title={displayName}
        description={description}
        flag={sourceFlag}
        value={toBigInt(currentValue)}
        placeholder={t('ui.flag.numberPlaceholder', 'Enter number...')}
        min={BigInt(valueRules?.min ?? 0)}
        max={
          valueRules?.max === undefined
            ? MAX_GAME_INTEGER
            : BigInt(valueRules.max)
        }
        onChange={(value) => updateValue(compactBigInt(value))}
      />
    );
  } else if (valueType === 'map') {
    if (valueRules?.map) {
      const selectItems: SelectItem[] = [];

      Object.entries(valueRules.map).forEach(([value, label]) => {
        selectItems.push({
          id: `${value}`,
          label,
          value,
          unused: valueRules.unusedValues?.has(Number(value)),
        });
      });

      selectItems.sort(
        (itemA, itemB) => Number(itemA.value) - Number(itemB.value),
      );

      const orderedItems = unusedLast(selectItems);
      const selectedItem = orderedItems.find(
        (item) => Number(item.value) === Number(currentValue),
      );

      return (
        <FieldWrapper
          id={id}
          className={className}
          description={description}
          title={displayName}
          flag={sourceFlag}
          label
        >
          <Select
            items={orderedItems}
            placeholder={t('ui.flag.mapPlaceholder', 'Select value...')}
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
        className={mergeClass('gap-3', className)}
        description={description}
        title={displayName}
        flag={sourceFlag}
        label
      >
        <div className="flex flex-wrap">
          {COLOR_INDICES.map((colorIndex) => (
            <div
              key={colorIndex}
              className={mergeClass(
                'w-8 h-8 cursor-pointer border-2',
                colorIndex === Number(currentValue)
                  ? 'border-text-1'
                  : 'border-border',
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

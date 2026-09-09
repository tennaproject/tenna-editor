import {
  Select,
  type SelectItem,
  type InvalidReason,
  FieldWrapper,
  LightWorldItemTooltipContent,
} from '@components';
import { type LightWorldItemIndex } from '@data';
import type { DataEntry } from '@types';
import { useGameData, useSave } from '@store';
import { getLightWorldLoadoutOptions } from '@utils/chapter-options';
import { chapterHelpers } from '@utils/data-helpers';
import {
  getItemTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';

type LightWorldLoadoutType = 'weapon' | 'armor';

const LOADOUT_TITLES: Record<LightWorldLoadoutType, string> = {
  weapon: 'Weapon',
  armor: 'Armor',
};

interface LightWorldLoadoutFieldProps {
  id?: string;
  type: LightWorldLoadoutType;
}

function isNewPackEntry(entry: DataEntry | undefined) {
  return !!entry?.dataPack && !entry.overridesBuiltIn;
}

export function LightWorldLoadoutField({
  id,
  type,
}: LightWorldLoadoutFieldProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const current = useSave((s) => s.save?.lightWorld[type]) ?? 0;
  const updateSave = useSave((s) => s.updateSave);
  const data = useGameData((state) => state.lightWorldItems);

  const chapterSet = chapterHelpers.getById(chapter).content.lightWorld
    .items as Set<number>;

  const dataEntry = data.byId.get(current as number);
  const isExisting = !!dataEntry;
  const isInChapter =
    chapterSet.has(current as number) || isNewPackEntry(dataEntry);
  const isValid = isExisting && isInChapter;

  const baseItems = getLightWorldLoadoutOptions(chapter, data.entries).map(
    (item) => {
      const entry = data.byId.get(item.value as number);
      return {
        ...item,
        tooltip:
          entry && item.value !== 0 ? (
            <LightWorldItemTooltipContent id={item.value as number} />
          ) : undefined,
        label: entry?.dataPack
          ? entry.displayName
          : translateMeta(
              getItemTranslationKeyPrefix(
                'lightWorldItem',
                item.value as number,
              ),
              { displayName: item.label },
              t,
            ).displayName,
      };
    },
  );

  const invalidReasons: InvalidReason[] = [];
  if (!isExisting) invalidReasons.push('unknown');
  if (!isInChapter) invalidReasons.push('notInChapter');

  let selectItems: SelectItem[] = baseItems;
  if (!isValid || !baseItems.some((item) => item.value === current)) {
    selectItems = [
      ...baseItems,
      {
        id: `${current}`,
        label: dataEntry?.dataPack
          ? dataEntry.displayName
          : dataEntry
            ? translateMeta(
                getItemTranslationKeyPrefix(
                  'lightWorldItem',
                  current as number,
                ),
                { displayName: dataEntry.displayName },
                t,
              ).displayName
            : t('ui.common.unknown', 'Unknown'),
        value: current as number,
        invalidReasons,
        unused: dataEntry?.unused,
        tooltip:
          dataEntry && current !== 0 ? (
            <LightWorldItemTooltipContent id={current} />
          ) : undefined,
        dataPack: dataEntry?.packName,
      },
    ];
  }

  const selectedItem =
    selectItems.find((item) => item.value === (current as number)) ?? null;

  const label = t(
    type === 'weapon' ? 'ui.field.weapon' : 'ui.field.armor',
    LOADOUT_TITLES[type],
  );
  return (
    <FieldWrapper id={id} className="w-full" title={label} label>
      <Select
        placeholder={t(
          type === 'weapon' ? 'ui.field.selectWeapon' : 'ui.field.selectArmor',
          type === 'weapon' ? 'Select a weapon...' : 'Select an armor...',
        )}
        label={label}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            save.lightWorld[type] = item.value as LightWorldItemIndex;
          });
        }}
        items={selectItems}
        className="w-full"
        tooltip={
          dataEntry && current !== 0 ? (
            <LightWorldItemTooltipContent id={current} />
          ) : undefined
        }
      />
    </FieldWrapper>
  );
}

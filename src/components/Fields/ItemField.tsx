import type { ReactNode } from 'react';
import {
  Section,
  TextLabel,
  Select,
  type SelectItem,
  ConsumableTooltipContent,
  EquipmentIcon,
  EquipmentTooltipContent,
  KeyItemTooltipContent,
  LightWorldItemTooltipContent,
} from '@components';
import {
  type ArmorIndex,
  type ConsumableIndex,
  type EquipmentIconIndex,
  type KeyItemIndex,
  type LightWorldItemIndex,
  type PhoneContactIndex,
  type WeaponIndex,
} from '@data';
import type {
  ConsumableEntry,
  DataEntry,
  DataPackType,
  EquipmentEntry,
} from '@types';
import { useSaveItemSlot } from '@hooks';
import { useGameData, useSave } from '@store';
import { getChapterItemOptions } from '@utils/chapter-options';
import {
  getItemTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';
import { chapterHelpers } from '@utils/data-helpers';

export type ItemType =
  | 'consumable'
  | 'keyItem'
  | 'weapon'
  | 'armor'
  | 'storage'
  | 'lightWorldItem'
  | 'phoneContact';

const DATA_TYPES: Record<ItemType, DataPackType> = {
  consumable: 'consumables',
  keyItem: 'keyItems',
  weapon: 'weapons',
  armor: 'armors',
  storage: 'consumables',
  lightWorldItem: 'lightWorldItems',
  phoneContact: 'phoneContacts',
};

interface ItemFieldProps {
  type: ItemType;
  slot: number;
  label?: string;
}

function getTranslatedDisplayName(
  type: ItemType,
  id: number,
  fallback: string,
  t: (key: string, fallback: string) => string,
) {
  return translateMeta(
    getItemTranslationKeyPrefix(type, id),
    { displayName: fallback },
    t,
  ).displayName;
}

function getItemTooltip(
  type: ItemType,
  entry: DataEntry | undefined,
): ReactNode {
  if (!entry || entry.id === 0) return undefined;

  switch (type) {
    case 'weapon':
    case 'armor':
      return (
        <EquipmentTooltipContent type={type} entry={entry as EquipmentEntry} />
      );
    case 'consumable':
    case 'storage':
      return <ConsumableTooltipContent entry={entry as ConsumableEntry} />;
    case 'keyItem':
      return <KeyItemTooltipContent id={entry.id} />;
    case 'lightWorldItem':
      return <LightWorldItemTooltipContent id={entry.id} />;
    case 'phoneContact':
      return entry.description;
  }
}

function getPlaceholder(type: ItemType): string {
  switch (type) {
    case 'consumable':
      return 'Select a consumable...';
    case 'keyItem':
      return 'Select a key item...';
    case 'weapon':
      return 'Select a weapon...';
    case 'armor':
      return 'Select an armor...';
    case 'storage':
      return 'Select a storage item...';
    default:
      return 'Select an item...';
  }
}

function getPlaceholderKey(type: ItemType): string {
  switch (type) {
    case 'consumable':
      return 'ui.field.selectConsumable';
    case 'keyItem':
      return 'ui.field.selectKeyItem';
    case 'weapon':
      return 'ui.field.selectWeapon';
    case 'armor':
      return 'ui.field.selectArmor';
    case 'storage':
      return 'ui.field.selectStorageItem';
    default:
      return 'ui.field.selectItem';
  }
}

function isNewPackEntry(entry: DataEntry | undefined) {
  return !!entry?.dataPack && !entry.overridesBuiltIn;
}

export function ItemField({ type, slot, label }: ItemFieldProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter ?? 1);
  const updateSave = useSave((s) => s.updateSave);
  const currentValue = useSaveItemSlot(type, slot);
  const data = useGameData((state) => state[DATA_TYPES[type]]);

  const selectLabel = label ?? t('ui.field.slot', 'Slot');
  const placeholder = t(getPlaceholderKey(type), getPlaceholder(type));
  const baseItems = getChapterItemOptions(chapter, type, data.entries).map(
    (item) => {
      const entry = data.byId.get(item.value as number);
      const icon = (entry as EquipmentEntry | undefined)?.icon as
        EquipmentIconIndex | undefined;

      return {
        ...item,
        icon:
          icon !== undefined ? (
            <EquipmentIcon icon={icon} unknownArt={item.value !== 0} />
          ) : undefined,
        tooltip: getItemTooltip(type, entry),
        label: entry?.dataPack
          ? entry.displayName
          : getTranslatedDisplayName(type, item.value as number, item.label, t),
      };
    },
  );
  const chapterContent = chapterHelpers.getById(chapter).content;

  let availableSet: Set<number>;
  switch (type) {
    case 'consumable':
    case 'storage':
      availableSet = chapterContent.consumables as Set<number>;
      break;
    case 'keyItem':
      availableSet = chapterContent.keyItems as Set<number>;
      break;
    case 'weapon':
      availableSet = chapterContent.weapons as Set<number>;
      break;
    case 'armor':
      availableSet = chapterContent.armors as Set<number>;
      break;
    case 'lightWorldItem':
      availableSet = chapterContent.lightWorld.items as Set<number>;
      break;
    case 'phoneContact':
      availableSet = chapterContent.lightWorld.phoneContacts as Set<number>;
      break;
  }

  const currentDataEntry = data.byId.get(currentValue);
  const isExisting = !!currentDataEntry;
  const isInChapter =
    availableSet.has(currentValue) || isNewPackEntry(currentDataEntry);
  const isOffered = baseItems.some((item) => item.value === currentValue);

  let selectItems: SelectItem[] = baseItems;
  if (!isOffered) {
    const invalidReasons: SelectItem['invalidReasons'] = [];
    if (!isExisting) invalidReasons.push('unknown');
    if (!isInChapter) invalidReasons.push('notInChapter');

    const currentIcon = (currentDataEntry as EquipmentEntry | undefined)
      ?.icon as EquipmentIconIndex | undefined;
    selectItems = [
      ...selectItems,
      {
        id: `${currentValue}`,
        icon:
          currentIcon !== undefined ? (
            <EquipmentIcon icon={currentIcon} unknownArt={currentValue !== 0} />
          ) : undefined,
        tooltip: getItemTooltip(type, currentDataEntry),
        label: currentDataEntry?.dataPack
          ? currentDataEntry.displayName
          : getTranslatedDisplayName(
              type,
              currentValue,
              currentDataEntry?.displayName ??
                t('ui.common.unknown', 'Unknown'),
              t,
            ),
        value: currentValue,
        invalidReasons: invalidReasons.length ? invalidReasons : undefined,
        unused: currentDataEntry?.unused,
        dataPack: currentDataEntry?.packName,
      },
    ];
  }

  const selectedItem =
    selectItems.find((item) => item.value === currentValue) ?? null;

  return (
    <Section id={`${type}s-slot${slot}`} className="w-full">
      <TextLabel>
        {selectLabel} {slot + 1}
      </TextLabel>
      <Select
        placeholder={placeholder}
        label={selectLabel}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            if (type === 'consumable') {
              save.inventory.consumables[slot] = item.value as ConsumableIndex;
            } else if (type === 'keyItem') {
              save.inventory.keyItems[slot] = item.value as KeyItemIndex;
            } else if (type === 'weapon') {
              save.inventory.weapons[slot] = item.value as WeaponIndex;
            } else if (type === 'armor') {
              save.inventory.armors[slot] = item.value as ArmorIndex;
            } else if (type === 'storage') {
              if ('storage' in save.inventory) {
                (save.inventory as { storage: ConsumableIndex[] }).storage[
                  slot
                ] = item.value as ConsumableIndex;
              }
            } else if (type === 'lightWorldItem') {
              save.lightWorld.items[slot] = item.value as LightWorldItemIndex;
            } else if (type === 'phoneContact') {
              save.lightWorld.phone[slot] = item.value as PhoneContactIndex;
            }
          });
        }}
        items={selectItems}
        className="w-full"
        tooltip={getItemTooltip(type, currentDataEntry)}
      />
    </Section>
  );
}

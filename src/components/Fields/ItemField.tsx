import type { ReactNode } from 'react';
import {
  Section,
  TextLabel,
  Select,
  type SelectItem,
  type InvalidReason,
  ConsumableTooltipContent,
  EquipmentIcon,
  EquipmentTooltipContent,
  KeyItemTooltipContent,
  LightWorldItemTooltipContent,
} from '@components';
import {
  type ArmorIndex,
  type ChapterIndex,
  type ConsumableIndex,
  type EquipmentIconIndex,
  type KeyItemIndex,
  type LightWorldItemIndex,
  type PhoneContactIndex,
  type WeaponIndex,
} from '@data';
import type { SaveSlot } from '@types';
import { useSaveItemSlot } from '@hooks';
import { useSave } from '@store';
import { getChapterItemOptions } from '@utils/chapter-options';
import {
  getItemTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';
import {
  armorHelpers,
  chapterHelpers,
  consumableHelpers,
  formatItemLabel,
  resolveChapterMeta,
  keyItemHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
  weaponHelpers,
} from '@utils/data-helpers';

export type ItemType =
  | 'consumable'
  | 'keyItem'
  | 'weapon'
  | 'armor'
  | 'storage'
  | 'lightWorldItem'
  | 'phoneContact';

interface ItemFieldProps {
  type: ItemType;
  slot: number;
  label?: string;
}

// Chapter-aware, currently just for Dark Candy <-> Darker Candy
function getDisplayName(
  type: ItemType,
  id: number,
  chapter: ChapterIndex,
  saveSlot: SaveSlot,
): string {
  switch (type) {
    case 'consumable':
    case 'storage':
      return formatItemLabel(
        resolveChapterMeta(consumableHelpers.getById(id as ConsumableIndex), {
          chapter,
          saveSlot,
        }),
        'Unknown',
      );
    case 'keyItem':
      return formatItemLabel(
        keyItemHelpers.getById(id as KeyItemIndex),
        'Unknown',
      );
    case 'weapon':
      return formatItemLabel(
        resolveChapterMeta(weaponHelpers.getById(id as WeaponIndex), {
          chapter,
        }),
        'Unknown',
      );
    case 'armor':
      return formatItemLabel(
        resolveChapterMeta(armorHelpers.getById(id as ArmorIndex), {
          chapter,
        }),
        'Unknown',
      );
    case 'lightWorldItem':
      return formatItemLabel(
        lightWorldItemHelpers.getById(id as LightWorldItemIndex),
        'Unknown',
      );
    case 'phoneContact':
      return formatItemLabel(
        phoneContactHelpers.getById(id as PhoneContactIndex),
        'Unknown',
      );
  }
}

function getUnused(type: ItemType, id: number): boolean | undefined {
  switch (type) {
    case 'consumable':
    case 'storage':
      return consumableHelpers.getById(id as ConsumableIndex)?.unused;
    case 'keyItem':
      return keyItemHelpers.getById(id as KeyItemIndex)?.unused;
    case 'weapon':
      return weaponHelpers.getById(id as WeaponIndex)?.unused;
    case 'armor':
      return armorHelpers.getById(id as ArmorIndex)?.unused;
    case 'lightWorldItem':
      return lightWorldItemHelpers.getById(id as LightWorldItemIndex)?.unused;
    case 'phoneContact':
      return phoneContactHelpers.getById(id as PhoneContactIndex)?.unused;
  }
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

function getIcon(type: ItemType, id: number): EquipmentIconIndex | undefined {
  switch (type) {
    case 'weapon':
      return weaponHelpers.getById(id as WeaponIndex)?.icon;
    case 'armor':
      return armorHelpers.getById(id as ArmorIndex)?.icon;
    default:
      return undefined;
  }
}

function getItemTooltip(type: ItemType, id: number): ReactNode {
  if (id === 0) return undefined;
  if (!getDisplayNameOrUndefined(type, id)) return undefined;

  switch (type) {
    case 'weapon':
    case 'armor':
      return <EquipmentTooltipContent type={type} id={id} />;
    case 'consumable':
    case 'storage':
      return <ConsumableTooltipContent id={id as ConsumableIndex} />;
    case 'keyItem':
      return <KeyItemTooltipContent id={id as KeyItemIndex} />;
    case 'lightWorldItem':
      return <LightWorldItemTooltipContent id={id as LightWorldItemIndex} />;
    case 'phoneContact':
      return undefined;
  }
}

function getDisplayNameOrUndefined(type: ItemType, id: number) {
  switch (type) {
    case 'consumable':
    case 'storage':
      return consumableHelpers.getById(id as ConsumableIndex)?.displayName;
    case 'keyItem':
      return keyItemHelpers.getById(id as KeyItemIndex)?.displayName;
    case 'weapon':
      return weaponHelpers.getById(id as WeaponIndex)?.displayName;
    case 'armor':
      return armorHelpers.getById(id as ArmorIndex)?.displayName;
    case 'lightWorldItem':
      return lightWorldItemHelpers.getById(id as LightWorldItemIndex)
        ?.displayName;
    case 'phoneContact':
      return phoneContactHelpers.getById(id as PhoneContactIndex)?.displayName;
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

export function ItemField({ type, slot, label }: ItemFieldProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter ?? 1);
  const saveSlot = useSave((s) => s.save?.meta.slot ?? 0);
  const updateSave = useSave((s) => s.updateSave);
  const currentValue = useSaveItemSlot(type, slot);

  const selectLabel = label ?? t('ui.field.slot', 'Slot');
  const placeholder = t(getPlaceholderKey(type), getPlaceholder(type));
  const baseItems = getChapterItemOptions(chapter, type, saveSlot).map(
    (item) => {
      const icon = getIcon(type, item.value as number);

      return {
        ...item,
        icon:
          icon !== undefined ? (
            <EquipmentIcon icon={icon} unknownArt={item.value !== 0} />
          ) : undefined,
        tooltip: getItemTooltip(type, item.value as number),
        label: getTranslatedDisplayName(
          type,
          item.value as number,
          item.label,
          t,
        ),
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

  const metaDisplay = getTranslatedDisplayName(
    type,
    currentValue,
    getDisplayName(type, currentValue, chapter, saveSlot),
    t,
  );
  const isValid = !!metaDisplay && availableSet.has(currentValue);

  const invalidReasons: InvalidReason[] = [];
  if (!metaDisplay) invalidReasons.push('unknown');
  if (!availableSet.has(currentValue)) invalidReasons.push('notInChapter');

  const currentIcon = getIcon(type, currentValue);

  let selectItems: SelectItem[] = baseItems;
  if (!isValid || !availableSet.has(currentValue)) {
    selectItems = [
      ...baseItems,
      {
        id: `${currentValue}`,
        icon:
          currentIcon !== undefined ? (
            <EquipmentIcon icon={currentIcon} unknownArt={currentValue !== 0} />
          ) : undefined,
        tooltip: getItemTooltip(type, currentValue),
        label: metaDisplay || t('ui.common.unknown', 'Unknown'),
        value: currentValue,
        invalidReasons,
        unused: getUnused(type, currentValue),
      },
    ];
  }

  const selectedItem =
    selectItems.find((item) => item.value === currentValue) ?? null;

  const tooltip = getItemTooltip(type, currentValue);

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
        tooltip={tooltip}
      />
    </Section>
  );
}

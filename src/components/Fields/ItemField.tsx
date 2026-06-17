import { Section, TextLabel, Select, type SelectItem } from '@components';
import {
  type ArmorIndex,
  type ConsumableIndex,
  type KeyItemIndex,
  type LightWorldItemIndex,
  type PhoneContactIndex,
  type WeaponIndex,
} from '@data';
import { useSaveItemSlot } from '@hooks';
import { useSave } from '@store';
import { getChapterItemOptions } from '@utils/chapter-options';
import {
  armorHelpers,
  chapterHelpers,
  consumableHelpers,
  formatItemLabel,
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

function getDisplayName(type: ItemType, id: number): string {
  switch (type) {
    case 'consumable':
    case 'storage':
      return formatItemLabel(
        consumableHelpers.getById(id as ConsumableIndex),
        'Unknown',
      );
    case 'keyItem':
      return formatItemLabel(
        keyItemHelpers.getById(id as KeyItemIndex),
        'Unknown',
      );
    case 'weapon':
      return formatItemLabel(
        weaponHelpers.getById(id as WeaponIndex),
        'Unknown',
      );
    case 'armor':
      return formatItemLabel(armorHelpers.getById(id as ArmorIndex), 'Unknown');
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

export function ItemField({ type, slot, label }: ItemFieldProps) {
  const chapter = useSave((s) => s.save?.meta.chapter ?? 1);
  const updateSave = useSave((s) => s.updateSave);
  const currentValue = useSaveItemSlot(type, slot);

  const selectLabel = label ?? 'Slot';
  const placeholder = getPlaceholder(type);
  const baseItems = getChapterItemOptions(chapter, type);
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

  const metaDisplay = getDisplayName(type, currentValue);
  const isValid = !!metaDisplay && availableSet.has(currentValue);

  let selectItems: SelectItem[] = baseItems;
  if (!isValid || !availableSet.has(currentValue)) {
    selectItems = [
      ...baseItems,
      {
        id: `${currentValue}`,
        label: metaDisplay || 'Unknown',
        value: currentValue,
        invalid: true,
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
      />
    </Section>
  );
}

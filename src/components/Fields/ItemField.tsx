import { Section, TextLabel, Select, type SelectItem } from '@components';
import {
  ARMORS,
  CONSUMABLES,
  KEYITEMS,
  LIGHTWORLDITEMS,
  PHONECONTACTS,
  WEAPONS,
  type ArmorIndex,
  type ConsumableIndex,
  type KeyItemIndex,
  type LightWorldItemIndex,
  type PhoneContactIndex,
  type WeaponIndex,
} from '@data';
import { useSave } from '@store';
import {
  chapterHelpers,
  armorHelpers,
  weaponHelpers,
  consumableHelpers,
  keyItemHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
} from '@utils';

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

export function ItemField({ type, slot, label }: ItemFieldProps) {
  const save = useSave((s) => s.save);
  const chapter = save?.meta.chapter || 1;
  const updateSave = useSave((s) => s.updateSave);

  let currentValue: number = 0;
  const selectLabel = label ?? 'Slot';
  let placeholder = 'Select an item...';

  const chapterContent = chapterHelpers.getById(chapter).content;

  if (type === 'consumable') {
    currentValue =
      save?.inventory.consumables[slot] ??
      (CONSUMABLES.EMPTY as ConsumableIndex);
    placeholder = 'Select a consumable...';
  } else if (type === 'keyItem') {
    currentValue =
      save?.inventory.keyItems[slot] ?? (KEYITEMS.EMPTY as KeyItemIndex);
    placeholder = 'Select a key item...';
  } else if (type === 'weapon') {
    currentValue =
      save?.inventory.weapons[slot] ?? (WEAPONS.EMPTY as WeaponIndex);
    placeholder = 'Select a weapon...';
  } else if (type === 'armor') {
    currentValue = save?.inventory.armors[slot] ?? (ARMORS.EMPTY as ArmorIndex);
    placeholder = 'Select an armor...';
  } else if (type === 'storage') {
    const storage =
      save && 'inventory' in save && 'storage' in save.inventory
        ? (save.inventory as { storage: ConsumableIndex[] }).storage
        : [];
    currentValue = storage?.[slot] ?? (CONSUMABLES.EMPTY as ConsumableIndex);
    placeholder = 'Select a storage item...';
  } else if (type === 'lightWorldItem') {
    currentValue =
      save?.lightWorld.items[slot] ??
      (LIGHTWORLDITEMS.EMPTY as LightWorldItemIndex);
    placeholder = 'Select an item...';
  } else if (type === 'phoneContact') {
    currentValue =
      save?.lightWorld.phone[slot] ??
      (PHONECONTACTS.EMPTY as PhoneContactIndex);
    placeholder = 'Select an item...';
  }

  let availableSet: Set<number> = new Set<number>();
  // This may be considered hacky way to do it
  let getDisplayName: (id: number) => string = () => 'Unknown';

  if (type === 'consumable' || type === 'storage') {
    availableSet = new Set<number>(chapterContent.consumables as Set<number>);
    getDisplayName = (id: number) =>
      consumableHelpers.getById(id as ConsumableIndex)?.displayName ??
      'Unknown';
  } else if (type === 'keyItem') {
    availableSet = new Set<number>(chapterContent.keyItems as Set<number>);
    getDisplayName = (id: number) =>
      keyItemHelpers.getById(id as KeyItemIndex)?.displayName ?? 'Unknown';
  } else if (type === 'weapon') {
    availableSet = new Set<number>(chapterContent.weapons as Set<number>);
    getDisplayName = (id: number) =>
      weaponHelpers.getById(id as WeaponIndex)?.displayName ?? 'Unknown';
  } else if (type === 'armor') {
    availableSet = new Set<number>(chapterContent.armors as Set<number>);
    getDisplayName = (id: number) =>
      armorHelpers.getById(id as ArmorIndex)?.displayName ?? 'Unknown';
  } else if (type === 'lightWorldItem') {
    availableSet = new Set<number>(
      chapterContent.lightWorld.items as Set<number>,
    );
    getDisplayName = (id: number) =>
      lightWorldItemHelpers.getById(id as LightWorldItemIndex)?.displayName ??
      'Unknown';
  } else if (type === 'phoneContact') {
    availableSet = new Set<number>(
      chapterContent.lightWorld.phoneContacts as Set<number>,
    );
    getDisplayName = (id: number) =>
      phoneContactHelpers.getById(id as PhoneContactIndex)?.displayName ??
      'Unknown';
  }

  const metaDisplay = getDisplayName(currentValue);
  const isExisting = !!metaDisplay;
  const isInChapter = availableSet.has(currentValue);
  const isValid = isExisting && isInChapter;

  const selectItems: SelectItem[] = Array.from(availableSet).map((value) => ({
    id: `${value}`,
    label: getDisplayName(value),
    value,
  }));

  if (!isValid || !availableSet.has(currentValue)) {
    selectItems.push({
      id: `${currentValue}`,
      label: metaDisplay || 'Unknown',
      value: currentValue,
      invalid: true,
    });
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

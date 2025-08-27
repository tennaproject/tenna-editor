import { Section, TextLabel, Select, type SelectItem } from '@components';
import {
  ARMORS,
  CONSUMABLES,
  KEYITEMS,
  WEAPONS,
  type ArmorIndex,
  type ConsumableIndex,
  type KeyItemIndex,
  type WeaponIndex,
} from '@data';
import { useSave } from '@store';
import {
  chapterHelpers,
  armorHelpers,
  weaponHelpers,
  consumableHelpers,
  keyItemHelpers,
} from '@utils';

type InventoryItemKind =
  | 'consumable'
  | 'keyItem'
  | 'weapon'
  | 'armor'
  | 'storage';

interface ItemFieldProps {
  kind: InventoryItemKind;
  slot: number;
  label?: string;
}

export function ItemField({ kind, slot, label }: ItemFieldProps) {
  const saveFile = useSave((s) => s.saveFile);
  const chapter = saveFile?.chapter || 1;
  const updateSave = useSave((s) => s.updateSave);

  let currentValue: number = 0;
  const selectLabel = label ?? 'Slot';
  let placeholder = 'Select an item...';

  const chapterContent = chapterHelpers.getById(chapter).content;

  if (kind === 'consumable') {
    currentValue =
      saveFile?.inventory.consumables[slot] ??
      (CONSUMABLES.EMPTY as ConsumableIndex);
    placeholder = 'Select a consumable...';
  } else if (kind === 'keyItem') {
    currentValue =
      saveFile?.inventory.keyItems[slot] ?? (KEYITEMS.EMPTY as KeyItemIndex);
    placeholder = 'Select a key item...';
  } else if (kind === 'weapon') {
    currentValue =
      saveFile?.inventory.weapons[slot] ?? (WEAPONS.EMPTY as WeaponIndex);
    placeholder = 'Select a weapon...';
  } else if (kind === 'armor') {
    currentValue =
      saveFile?.inventory.armors[slot] ?? (ARMORS.EMPTY as ArmorIndex);
    placeholder = 'Select an armor...';
  } else if (kind === 'storage') {
    const storage =
      saveFile && 'inventory' in saveFile && 'storage' in saveFile.inventory
        ? (saveFile.inventory as { storage: ConsumableIndex[] }).storage
        : [];
    currentValue = storage?.[slot] ?? (CONSUMABLES.EMPTY as ConsumableIndex);
    placeholder = 'Select a storage item...';
  }

  let availableSet: Set<number> = new Set<number>();
  // This may be considered hacky way to do it
  let getDisplayName: (id: number) => string = () => 'Unknown';

  if (kind === 'consumable' || kind === 'storage') {
    availableSet = new Set<number>(chapterContent.consumables as Set<number>);
    getDisplayName = (id: number) =>
      consumableHelpers.getById(id as ConsumableIndex)?.displayName ??
      'Unknown';
  } else if (kind === 'keyItem') {
    availableSet = new Set<number>(chapterContent.keyItems as Set<number>);
    getDisplayName = (id: number) =>
      keyItemHelpers.getById(id as KeyItemIndex)?.displayName ?? 'Unknown';
  } else if (kind === 'weapon') {
    availableSet = new Set<number>(chapterContent.weapons as Set<number>);
    getDisplayName = (id: number) =>
      weaponHelpers.getById(id as WeaponIndex)?.displayName ?? 'Unknown';
  } else if (kind === 'armor') {
    availableSet = new Set<number>(chapterContent.armors as Set<number>);
    getDisplayName = (id: number) =>
      armorHelpers.getById(id as ArmorIndex)?.displayName ?? 'Unknown';
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
    <Section id={`${kind}s-slot${slot}`} className="w-full">
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
            if (kind === 'consumable') {
              save.inventory.consumables[slot] = item.value as ConsumableIndex;
            } else if (kind === 'keyItem') {
              save.inventory.keyItems[slot] = item.value as KeyItemIndex;
            } else if (kind === 'weapon') {
              save.inventory.weapons[slot] = item.value as WeaponIndex;
            } else if (kind === 'armor') {
              save.inventory.armors[slot] = item.value as ArmorIndex;
            } else if (kind === 'storage') {
              if ('storage' in save.inventory) {
                (save.inventory as { storage: ConsumableIndex[] }).storage[
                  slot
                ] = item.value as ConsumableIndex;
              }
            }
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </Section>
  );
}

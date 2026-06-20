import {
  ARMORS,
  CONSUMABLES,
  KEYITEMS,
  LIGHTWORLDITEMS,
  PHONECONTACTS,
  WEAPONS,
  type ConsumableIndex,
} from '@data';
import { useSave } from '@store';
import type { ItemType } from '@components/Fields/ItemField';

export function useSaveItemSlot(type: ItemType, slot: number): number {
  return useSave((s) => {
    const save = s.save;
    if (!save) {
      return getDefaultItemValue(type);
    }

    switch (type) {
      case 'consumable':
        return save.inventory.consumables[slot] ?? CONSUMABLES.EMPTY;
      case 'keyItem':
        return save.inventory.keyItems[slot] ?? KEYITEMS.EMPTY;
      case 'weapon':
        return save.inventory.weapons[slot] ?? WEAPONS.EMPTY;
      case 'armor':
        return save.inventory.armors[slot] ?? ARMORS.EMPTY;
      case 'storage':
        if ('storage' in save.inventory) {
          return (
            (save.inventory as { storage: ConsumableIndex[] }).storage[slot] ??
            CONSUMABLES.EMPTY
          );
        }
        return CONSUMABLES.EMPTY;
      case 'lightWorldItem':
        return save.lightWorld.items[slot] ?? LIGHTWORLDITEMS.EMPTY;
      case 'phoneContact':
        return save.lightWorld.phone[slot] ?? PHONECONTACTS.EMPTY;
    }
  });
}

function getDefaultItemValue(type: ItemType): number {
  switch (type) {
    case 'consumable':
    case 'storage':
      return CONSUMABLES.EMPTY;
    case 'keyItem':
      return KEYITEMS.EMPTY;
    case 'weapon':
      return WEAPONS.EMPTY;
    case 'armor':
      return ARMORS.EMPTY;
    case 'lightWorldItem':
      return LIGHTWORLDITEMS.EMPTY;
    case 'phoneContact':
      return PHONECONTACTS.EMPTY;
  }
}

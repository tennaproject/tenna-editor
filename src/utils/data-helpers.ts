import {
  ARMORS,
  ARMORS_META,
  CONSUMABLES,
  CONSUMABLES_META,
  FLAGS,
  FLAGS_META,
  KEYITEMS,
  KEYITEMS_META,
  WEAPONS,
  WEAPONS_META,
  CHARACTERS,
  CHARACTERS_META,
  CHAPTERS,
  CHAPTERS_META,
  ROOMS,
  ROOMS_META,
  SPELLS,
  SPELLS_META,
  LIGHTWORLDITEMS,
  LIGHTWORLDITEMS_META,
  PHONECONTACTS,
  PHONECONTACTS_META,
  ENEMIES,
  ENEMIES_META,
} from '@data';
import type { RoomIndex, RoomProperties } from '../data/rooms';
import type { FlagIndex, FlagProperties } from '../data/flags';

function createDataHelpers<
  TIndex extends number,
  TName extends string,
  TProperties,
>(registry: Record<TName, TIndex>, definitions: Record<TIndex, TProperties>) {
  return {
    getIndex: (name: TName): TIndex => registry[name],
    getById: (id: TIndex): TProperties => definitions[id],
    getByName: (name: TName): TProperties => definitions[registry[name]],
    getName: (id: TIndex): TName => {
      return Object.entries(registry).find(
        ([_, value]) => value === id,
      )?.[0] as TName;
    },
    getAllNames: (): TName[] => Object.keys(registry) as TName[],
    getAll: (): (TProperties & { id: TIndex })[] => {
      return Object.entries(registry).map(([_, id]) => ({
        id: id as TIndex,
        ...definitions[id as TIndex],
      }));
    },
  };
}

// Meta
export const flagHelpers = createDataHelpers(
  FLAGS,
  FLAGS_META as Record<FlagIndex, FlagProperties>,
);
export const chapterHelpers = createDataHelpers(CHAPTERS, CHAPTERS_META);
export const roomHelpers = createDataHelpers(
  ROOMS,
  ROOMS_META as Record<RoomIndex, RoomProperties>,
);

// Characters
export const characterHelpers = createDataHelpers(CHARACTERS, CHARACTERS_META);
export const spellHelpers = createDataHelpers(SPELLS, SPELLS_META);
export const enemyHelpers = createDataHelpers(ENEMIES, ENEMIES_META);

// Inventory
export const consumableHelpers = createDataHelpers(
  CONSUMABLES,
  CONSUMABLES_META,
);
export const keyItemHelpers = createDataHelpers(KEYITEMS, KEYITEMS_META);
export const weaponHelpers = createDataHelpers(WEAPONS, WEAPONS_META);
export const armorHelpers = createDataHelpers(ARMORS, ARMORS_META);

// Light World
export const lightWorldItemHelpers = createDataHelpers(
  LIGHTWORLDITEMS,
  LIGHTWORLDITEMS_META,
);
export const phoneContactHelpers = createDataHelpers(
  PHONECONTACTS,
  PHONECONTACTS_META,
);

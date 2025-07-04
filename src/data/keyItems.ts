import type { BaseProperties } from '../types';

export const KEY_ITEMS = {
  EMPTY: 0,
  CELL_PHONE: 1,
  EGG: 2,
  BROKEN_CAKE: 3,
  BROKEN_KEY_A: 4,
  DOOR_KEY: 5,
  BROKEN_KEY_B: 6,
  BROKEN_KEY_C: 7,
  LANCER: 8,
  ROUXLS_KAARD: 9,
  EMPTY_DISK: 10,
  LOADED_DISK: 11,
  KEYGEN: 12,
  SHADOW_CRYSTAL: 13,
  STARWALKER: 14,
  PURE_CRYSTAL: 15,
  ODD_CONTROLLER: 16,
  BACKSTAGE_PASS: 17,
  TRIP_TICKET: 18,
  LANCER_CON: 19,
  SHEET_MUSIC: 30,
  CLAIMB_CLAWS: 31,
} as const;

export type KeyItemIndex = (typeof KEY_ITEMS)[keyof typeof KEY_ITEMS];
export type KeyItemName = keyof typeof KEY_ITEMS;

export const KEY_ITEMS_META: Record<KeyItemIndex, BaseProperties> = {
  [KEY_ITEMS.EMPTY]: { displayName: 'Empty' },
  [KEY_ITEMS.CELL_PHONE]: { displayName: 'Cell Phone' },
  [KEY_ITEMS.EGG]: { displayName: 'Egg' },
  [KEY_ITEMS.BROKEN_CAKE]: { displayName: 'BrokenCake' },
  [KEY_ITEMS.BROKEN_KEY_A]: { displayName: 'Broken Key A' },
  [KEY_ITEMS.DOOR_KEY]: { displayName: 'Door Key' },
  [KEY_ITEMS.BROKEN_KEY_B]: { displayName: 'Broken Key B' },
  [KEY_ITEMS.BROKEN_KEY_C]: { displayName: 'Broken Key C' },
  [KEY_ITEMS.LANCER]: { displayName: 'Lancer' },
  [KEY_ITEMS.ROUXLS_KAARD]: { displayName: 'Rouxls Kaard' },
  [KEY_ITEMS.EMPTY_DISK]: { displayName: 'EmptyDisk' },
  [KEY_ITEMS.LOADED_DISK]: { displayName: 'LoadedDisk' },
  [KEY_ITEMS.KEYGEN]: { displayName: 'KeyGen' },
  [KEY_ITEMS.SHADOW_CRYSTAL]: { displayName: 'ShadowCrystal' },
  [KEY_ITEMS.STARWALKER]: { displayName: 'Starwalker' },
  [KEY_ITEMS.PURE_CRYSTAL]: { displayName: 'PureCrystal' },
  [KEY_ITEMS.ODD_CONTROLLER]: { displayName: 'OddController' },
  [KEY_ITEMS.BACKSTAGE_PASS]: { displayName: 'BackstagePass' },
  [KEY_ITEMS.TRIP_TICKET]: { displayName: 'TripTicket' },
  [KEY_ITEMS.LANCER_CON]: { displayName: 'LancerCon' },
  [KEY_ITEMS.SHEET_MUSIC]: { displayName: 'SheetMusic' },
  [KEY_ITEMS.CLAIMB_CLAWS]: { displayName: 'ClaimbClaws' },
};

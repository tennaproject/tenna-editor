import type { BaseProperties } from '@types';

export const KEYITEMS = {
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

export type KeyItemIndex = (typeof KEYITEMS)[keyof typeof KEYITEMS];
export type KeyItemName = keyof typeof KEYITEMS;

export const KEYITEMS_META: Record<KeyItemIndex, BaseProperties> = {
  [KEYITEMS.EMPTY]: { displayName: 'Empty' },
  [KEYITEMS.CELL_PHONE]: { displayName: 'Cell Phone' },
  [KEYITEMS.EGG]: { displayName: 'Egg' },
  [KEYITEMS.BROKEN_CAKE]: { displayName: 'BrokenCake' },
  [KEYITEMS.BROKEN_KEY_A]: { displayName: 'Broken Key A' },
  [KEYITEMS.DOOR_KEY]: { displayName: 'Door Key' },
  [KEYITEMS.BROKEN_KEY_B]: { displayName: 'Broken Key B' },
  [KEYITEMS.BROKEN_KEY_C]: { displayName: 'Broken Key C' },
  [KEYITEMS.LANCER]: { displayName: 'Lancer' },
  [KEYITEMS.ROUXLS_KAARD]: { displayName: 'Rouxls Kaard' },
  [KEYITEMS.EMPTY_DISK]: { displayName: 'EmptyDisk' },
  [KEYITEMS.LOADED_DISK]: { displayName: 'LoadedDisk' },
  [KEYITEMS.KEYGEN]: { displayName: 'KeyGen' },
  [KEYITEMS.SHADOW_CRYSTAL]: { displayName: 'ShadowCrystal' },
  [KEYITEMS.STARWALKER]: { displayName: 'Starwalker' },
  [KEYITEMS.PURE_CRYSTAL]: { displayName: 'PureCrystal' },
  [KEYITEMS.ODD_CONTROLLER]: { displayName: 'OddController' },
  [KEYITEMS.BACKSTAGE_PASS]: { displayName: 'BackstagePass' },
  [KEYITEMS.TRIP_TICKET]: { displayName: 'TripTicket' },
  [KEYITEMS.LANCER_CON]: { displayName: 'LancerCon' },
  [KEYITEMS.SHEET_MUSIC]: { displayName: 'SheetMusic' },
  [KEYITEMS.CLAIMB_CLAWS]: { displayName: 'ClaimbClaws' },
};

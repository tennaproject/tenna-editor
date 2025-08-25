import type {
  ArmorIndex,
  ConsumableIndex,
  KeyItemIndex,
  RoomIndex,
  SpellIndex,
  WeaponIndex,
} from '@data';

export type SaveFileFormat = 'v1' | 'v2' | 'unknown';
export type Chapter = 0 | 1 | 2 | 3 | 4;

export interface WeaponStats {
  attack: number;
  defence: number;
  magic: number;
  bolts: number;
  grazeAmount: number;
  grazeSize: number;
  boltSpeed: number;
  special: number;
}

export interface WeaponStatsV2 extends WeaponStats {
  element: number;
  elementAmount: number;
}

export interface Character {
  health: number;
  maxHealth: number;
  attack: number;
  defence: number;
  magic: number;
  guts: number;
  weapon: WeaponIndex;
  primaryArmor: ArmorIndex;
  secondaryArmor: ArmorIndex;
  weaponStyle: number | string;
  weaponStats: WeaponStats[];
  spells: SpellIndex[];
}

export interface CharacterV2 extends Character {
  weaponStats: WeaponStatsV2[];
}

export interface BattleState {
  boltSpeed: number;
  grazeAmount: number;
  grazeSize: number;
  tension: number;
  maxTension: number;
}

export interface Inventory {
  consumables: ConsumableIndex[];
  keyItems: KeyItemIndex[];
  weapons: WeaponIndex[];
  armors: ArmorIndex[];
}

export interface InventoryV2 extends Inventory {
  storage: ConsumableIndex[];
}

export interface LightWorld {
  weapon: number;
  armor: number;
  experience: number;
  level: number;
  money: number;
  health: number;
  maxHealth: number;
  attack: number;
  defence: number;
  weaponStrength: number;
  armorDefence: number;
  items: number[];
  phone: number[];
}

export interface SaveFileBase {
  readonly format: SaveFileFormat;
  chapter: Chapter;
}

export interface V1Save extends SaveFileBase {
  format: 'v1';
  chapter: Chapter;

  playerName: string;
  characterName: string;

  party: [number, number, number];
  money: number;
  xp: number;
  lv: number;
  inv: number;
  invc: number;
  inDarkWorld: boolean;

  characters: Character[];
  battle: BattleState;
  inventory: Inventory;
  lightWorld: LightWorld;

  flags: unknown[];
  plot: number;
  room: RoomIndex;
  time: number;
}

export interface V2Save extends SaveFileBase {
  readonly format: 'v2';
  chapter: Chapter;

  playerName: string;
  characterName: string;

  party: [number, number, number];
  money: number;
  xp: number;
  lv: number;
  inv: number;
  invc: number;
  inDarkWorld: boolean;

  characters: CharacterV2[];
  battle: BattleState;
  inventory: InventoryV2;
  lightWorld: LightWorld;

  flags: unknown[];
  plot: number;
  room: RoomIndex;
  time: number;
}

export type DeltaruneSave = V1Save | V2Save;

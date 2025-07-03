import type { ConsumableIndex } from '../data/consumables';
import type { FlagIndex } from '../data/flags';

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
  weapon: number;
  primaryArmor: number;
  secondaryArmor: number;
  weaponStyle: number;
  weaponStats: WeaponStats[];
  spells: number[];
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
  keyItems: number[];
  weapons: number[];
  armors: number[];
  storage: number[];
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
  meta: {
    readonly format: SaveFileFormat;
    chapter: Chapter;
  };
}

export interface V1Save extends SaveFileBase {
  meta: {
    format: 'v1';
    chapter: Chapter;
  };
}

export interface V2Save extends SaveFileBase {
  meta: {
    format: 'v2';
    chapter: Chapter;
  };

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

  flags: FlagIndex[];
  plot: number;
  room: number;
  time: number;
}

export type DeltaruneSave = V1Save | V2Save;

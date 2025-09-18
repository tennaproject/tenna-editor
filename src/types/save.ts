import type {
  ArmorIndex,
  ChapterIndex,
  CharacterIndex,
  ConsumableIndex,
  KeyItemIndex,
  LightWorldItemIndex,
  PhoneContactIndex,
  RoomIndex,
  SpellIndex,
  WeaponIndex,
} from '@data';
import type { UUID } from 'crypto';

export const SAVE_SCHEMA = 2;
export type SaveFormat = 1 | 2;
export type SaveSlot = 0 | 1 | 2;

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

export interface CharacterV1 {
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

export interface CharacterV2 extends CharacterV1 {
  weaponStats: WeaponStatsV2[];
}

export interface Battle {
  boltSpeed: number;
  grazeAmount: number;
  grazeSize: number;
  tension: number;
  maxTension: number;
}

export interface InventoryV1 {
  consumables: ConsumableIndex[];
  keyItems: KeyItemIndex[];
  weapons: WeaponIndex[];
  armors: ArmorIndex[];
}

export interface InventoryV2 extends InventoryV1 {
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
  items: LightWorldItemIndex[];
  phone: PhoneContactIndex[];
}

export interface SaveData<
  Format extends SaveFormat,
  Chapter extends ChapterIndex,
  Character,
  Inventory,
> {
  meta: {
    readonly id: UUID;
    readonly format: Format;
    readonly createdAt: Date;
    modifiedAt: Date;
    schema: number;
    chapter: Chapter;
    slot: SaveSlot;
    isCompletionSave: boolean;
    name: string;
  };
  playerName: string;
  vesselName: string;

  party: [CharacterIndex, CharacterIndex, CharacterIndex];
  money: number;
  xp: number;
  lv: number;
  inv: number;
  invc: number;
  inDarkWorld: boolean;

  characters: Character[];
  battle: Battle;
  inventory: Inventory;
  lightWorld: LightWorld;
  flags: unknown[];

  plot: number;
  room: RoomIndex;
  time: number;
}

export type SaveV1 = SaveData<1, 1, CharacterV1, InventoryV1>;
export type SaveV2 = SaveData<2, 2 | 3 | 4, CharacterV2, InventoryV2>;

export type Save = SaveV1 | SaveV2;

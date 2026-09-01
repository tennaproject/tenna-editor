import type { CharacterIndex, EquipmentIconIndex, HealAmounts } from '@data';
import type { AbilityValues, EquipmentStats } from './data';

export type DataPackChapter = 1 | 2 | 3 | 4 | 5;

export type DataPackType =
  | 'consumables'
  | 'keyItems'
  | 'weapons'
  | 'armors'
  | 'lightWorldItems'
  | 'phoneContacts'
  | 'spells'
  | 'rooms'
  | 'flags';

export interface DataPackBaseEntry {
  id: number;
  displayName: string;
  description?: string;
  chapters?: DataPackChapter[];
}

export interface DataPackHealAmounts {
  heal?: number;
  healPercent?: number;
  healByCharacter?: Partial<Record<CharacterIndex, number>>;
  healPercentByCharacter?: Partial<Record<CharacterIndex, number>>;
}

export interface DataPackConsumableEntry
  extends DataPackBaseEntry, DataPackHealAmounts {
  tpGain?: number;
  revivePercent?: number;
  healsParty?: boolean;
  overworld?: DataPackHealAmounts;
}

export interface DataPackEquipmentEntry extends DataPackBaseEntry {
  stats?: EquipmentStats;
  ability?: string;
  characters?: CharacterIndex[];
}

export interface DataPackSpellEntry extends DataPackBaseEntry {
  characters?: CharacterIndex[];
}

export type DataPackEntry =
  | DataPackBaseEntry
  | DataPackConsumableEntry
  | DataPackEquipmentEntry
  | DataPackSpellEntry;

export interface DataPackData {
  consumables?: Record<string, DataPackConsumableEntry>;
  keyItems?: Record<string, DataPackBaseEntry>;
  weapons?: Record<string, DataPackEquipmentEntry>;
  armors?: Record<string, DataPackEquipmentEntry>;
  lightWorldItems?: Record<string, DataPackBaseEntry>;
  phoneContacts?: Record<string, DataPackBaseEntry>;
  spells?: Record<string, DataPackSpellEntry>;
  rooms?: Record<string, DataPackBaseEntry>;
  flags?: Record<string, DataPackBaseEntry>;
}

export interface DataPack {
  id: string;
  name: string;
  modVersion?: string;
  data: DataPackData;
}

export interface DataEntry {
  id: number;
  name: string;
  displayName: string;
  description?: string;
  chapters?: DataPackChapter[];
  unused?: boolean;
  dataPack: boolean;
  packId?: string;
  overridesBuiltIn?: boolean;
  descriptionFromPack?: boolean;
  characters?: readonly CharacterIndex[];
}

export interface EquipmentEntry extends DataEntry {
  stats?: EquipmentStats;
  ability?: string;
  abilityIndex?: number;
  abilityValues?: AbilityValues;
  icon?: EquipmentIconIndex;
}

export interface ConsumableEntry extends DataEntry, HealAmounts {
  healsParty?: boolean;
  tpGain?: number;
  revivePercent?: number;
  extraHeal?: {
    host: CharacterIndex;
    character: CharacterIndex;
    amount: number;
  };
  overworld?: HealAmounts;
}

export interface SpellEntry extends DataEntry {
  tpCost?: number;
}

export interface GameDataEntryTypes {
  consumables: ConsumableEntry;
  keyItems: DataEntry;
  weapons: EquipmentEntry;
  armors: EquipmentEntry;
  lightWorldItems: DataEntry;
  phoneContacts: DataEntry;
  spells: SpellEntry;
  rooms: DataEntry;
  flags: DataEntry;
}

export interface GameDataGroup<T extends DataEntry> {
  entries: T[];
  byId: ReadonlyMap<number, T>;
}

export interface GameData {
  chapter: DataPackChapter;
  consumables: GameDataGroup<ConsumableEntry>;
  keyItems: GameDataGroup<DataEntry>;
  weapons: GameDataGroup<EquipmentEntry>;
  armors: GameDataGroup<EquipmentEntry>;
  lightWorldItems: GameDataGroup<DataEntry>;
  phoneContacts: GameDataGroup<DataEntry>;
  spells: GameDataGroup<SpellEntry>;
  rooms: GameDataGroup<DataEntry>;
  flags: GameDataGroup<DataEntry>;
}

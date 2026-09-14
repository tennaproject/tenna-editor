import type {
  CharacterIndex,
  EquipmentIconIndex,
  FlagValueType,
  HealAmounts,
} from '@data';
import type { AbilityValues, EquipmentStats } from './data';
import type { SaveSlot } from './save';

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

interface DataPackBaseEntryFields {
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

interface DataPackConsumableEntryFields
  extends DataPackBaseEntryFields, DataPackHealAmounts {
  tpGain?: number;
  revivePercent?: number;
  healsParty?: boolean;
  overworld?: DataPackHealAmounts;
  extraHeal?: {
    host: CharacterIndex;
    character: CharacterIndex;
    amount: number;
  };
}

interface DataPackEquipmentEntryFields extends DataPackBaseEntryFields {
  stats?: EquipmentStats;
  ability?: string;
  characters?: CharacterIndex[];
  icon?: EquipmentIconIndex;
}

interface DataPackSpellEntryFields extends DataPackBaseEntryFields {
  characters?: CharacterIndex[];
  tpCost?: number;
}

interface DataPackLightWorldItemEntryFields extends DataPackBaseEntryFields {
  weapon?: boolean;
  armor?: boolean;
  attack?: number;
  defence?: number;
  heal?: number;
  darkWorldWeapon?: number;
  darkWorldArmor?: number;
}

type ClearableEntry<T> = {
  [K in keyof T]: K extends 'chapters'
    ? T[K]
    : undefined extends T[K]
      ? T[K] | null
      : T[K];
};

export type DataPackBaseEntry = ClearableEntry<DataPackBaseEntryFields>;
export type DataPackConsumableEntry =
  ClearableEntry<DataPackConsumableEntryFields>;
export type DataPackEquipmentEntry =
  ClearableEntry<DataPackEquipmentEntryFields>;
export type DataPackSpellEntry = ClearableEntry<DataPackSpellEntryFields>;
export type DataPackLightWorldItemEntry =
  ClearableEntry<DataPackLightWorldItemEntryFields>;
export type DataPackFlagEntry = ClearableEntry<DataPackFlagEntryFields>;

export interface DataPackFlagValueRules {
  min?: number;
  max?: number;
  allowedValues?: number[];
  map?: Record<number, string>;
  unusedValues?: number[];
  invertedBoolean?: boolean;
  booleanMap?: {
    trueValues: number[];
    falseValues: number[];
    writeTrue: number;
    writeFalse: number;
  };
}

interface DataPackFlagEntryFields extends DataPackBaseEntryFields {
  volatile?: boolean;
  valueType?: FlagValueType;
  valueRules?: DataPackFlagValueRules;
}

export type DataPackEntry =
  | DataPackBaseEntry
  | DataPackConsumableEntry
  | DataPackEquipmentEntry
  | DataPackSpellEntry
  | DataPackLightWorldItemEntry
  | DataPackFlagEntry;

export interface DataPackData {
  consumables?: Record<string, DataPackConsumableEntry>;
  keyItems?: Record<string, DataPackBaseEntry>;
  weapons?: Record<string, DataPackEquipmentEntry>;
  armors?: Record<string, DataPackEquipmentEntry>;
  lightWorldItems?: Record<string, DataPackLightWorldItemEntry>;
  phoneContacts?: Record<string, DataPackBaseEntry>;
  spells?: Record<string, DataPackSpellEntry>;
  rooms?: Record<string, DataPackBaseEntry>;
  flags?: Record<string, DataPackFlagEntry>;
}

export interface DataPackReference {
  id: string;
  modVersion?: string;
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
  packName?: string;
  overridesBuiltIn?: boolean;
  descriptionFromPack?: boolean;
  charactersFromPack?: boolean;
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

export interface KeyItemEntry extends DataEntry {
  overrides?: DataPackBaseEntry;
  descriptionValues?: Record<string, string | number>;
}

export interface SpellEntry extends DataEntry {
  overrides?: DataPackSpellEntry;
  tpCost?: number;
}

export interface FlagEntry extends DataEntry {
  volatile?: boolean;
  valueType?: FlagValueType;
  valueRules?: Omit<DataPackFlagValueRules, 'unusedValues'> & {
    unusedValues?: ReadonlySet<number>;
  };
}

export interface LightWorldItemEntry extends DataEntry {
  overrides?: DataPackLightWorldItemEntry;
  weapon?: boolean;
  armor?: boolean;
  attack?: number;
  defence?: number;
  heal?: number;
  darkWorldWeapon?: number;
  darkWorldArmor?: number;
}

export interface RoomEntry extends DataEntry {
  hasSavePoint?: boolean;
}

export interface GameDataGroup<T extends DataEntry> {
  entries: T[];
  byId: ReadonlyMap<number, T>;
}

export interface GameData {
  chapter: DataPackChapter;
  saveSlot: SaveSlot;
  consumables: GameDataGroup<ConsumableEntry>;
  keyItems: GameDataGroup<KeyItemEntry>;
  weapons: GameDataGroup<EquipmentEntry>;
  armors: GameDataGroup<EquipmentEntry>;
  lightWorldItems: GameDataGroup<LightWorldItemEntry>;
  phoneContacts: GameDataGroup<DataEntry>;
  spells: GameDataGroup<SpellEntry>;
  rooms: GameDataGroup<RoomEntry>;
  flags: GameDataGroup<FlagEntry>;
}

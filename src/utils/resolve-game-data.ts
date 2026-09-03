import {
  EQUIPMENT_ABILITIES_META,
  type ChapterIndex,
  type ConsumableIndex,
  type EquipmentAbilityIndex,
  type EquipmentIconIndex,
  type FlagIndex,
  type LightWorldItemIndex,
  type SpellIndex,
} from '@data';
import type {
  BaseProperties,
  ConsumableEntry,
  DataEntry,
  DataPack,
  DataPackConsumableEntry,
  DataPackEntry,
  DataPackEquipmentEntry,
  DataPackFlagEntry,
  DataPackLightWorldItemEntry,
  DataPackSpellEntry,
  DataPackType,
  EquipmentEntry,
  FlagEntry,
  GameData,
  GameDataGroup,
  LightWorldItemEntry,
  SaveSlot,
  SpellEntry,
} from '@types';
import {
  armorHelpers,
  consumableHelpers,
  flagHelpers,
  keyItemHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
  resolveChapterMeta,
  roomHelpers,
  spellHelpers,
  weaponHelpers,
} from './data-helpers';

function toGroup<T extends DataEntry>(entries: T[]): GameDataGroup<T> {
  return {
    entries,
    byId: new Map(entries.map((entry) => [entry.id, entry])),
  };
}

function mergeIdentity<T extends DataEntry>(
  existing: T | undefined,
  packEntry: DataPackEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): Pick<
  DataEntry,
  | 'id'
  | 'name'
  | 'displayName'
  | 'description'
  | 'chapters'
  | 'dataPack'
  | 'packId'
  | 'overridesBuiltIn'
  | 'descriptionFromPack'
  | 'characters'
> {
  return {
    id: packEntry.id,
    name,
    displayName: packEntry.displayName,
    description: packEntry.description ?? existing?.description,
    chapters: packEntry.chapters ?? existing?.chapters,
    dataPack: true,
    packId,
    overridesBuiltIn,
    descriptionFromPack: packEntry.description !== undefined,
    characters:
      'characters' in packEntry && packEntry.characters
        ? packEntry.characters
        : existing?.characters,
  };
}

function mergeBaseEntry(
  existing: DataEntry | undefined,
  packEntry: DataPackEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): DataEntry {
  return {
    ...existing,
    ...mergeIdentity(existing, packEntry, name, packId, overridesBuiltIn),
  };
}

function mergeEquipmentEntry(
  existing: EquipmentEntry | undefined,
  packEntry: DataPackEquipmentEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): EquipmentEntry {
  const identity = mergeIdentity(
    existing,
    packEntry,
    name,
    packId,
    overridesBuiltIn,
  );
  return {
    ...existing,
    ...identity,
    stats: packEntry.stats ?? existing?.stats,
    ability:
      packEntry.ability !== undefined ? packEntry.ability : existing?.ability,
    abilityIndex:
      packEntry.ability !== undefined ? undefined : existing?.abilityIndex,
    abilityValues:
      packEntry.ability !== undefined ? undefined : existing?.abilityValues,
    icon: packEntry.icon ?? existing?.icon,
  };
}

function mergeConsumableEntry(
  existing: ConsumableEntry | undefined,
  packEntry: DataPackConsumableEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): ConsumableEntry {
  return {
    ...existing,
    ...mergeIdentity(existing, packEntry, name, packId, overridesBuiltIn),
    heal: packEntry.heal ?? existing?.heal,
    healPercent: packEntry.healPercent ?? existing?.healPercent,
    healByCharacter: packEntry.healByCharacter ?? existing?.healByCharacter,
    healPercentByCharacter:
      packEntry.healPercentByCharacter ?? existing?.healPercentByCharacter,
    tpGain: packEntry.tpGain ?? existing?.tpGain,
    revivePercent: packEntry.revivePercent ?? existing?.revivePercent,
    healsParty: packEntry.healsParty ?? existing?.healsParty,
    overworld: packEntry.overworld ?? existing?.overworld,
  };
}

function mergeSpellEntry(
  existing: SpellEntry | undefined,
  packEntry: DataPackSpellEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): SpellEntry {
  return {
    ...existing,
    ...mergeIdentity(existing, packEntry, name, packId, overridesBuiltIn),
    tpCost: packEntry.tpCost ?? existing?.tpCost,
  };
}

function mergeFlagEntry(
  existing: FlagEntry | undefined,
  packEntry: DataPackFlagEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): FlagEntry {
  const packRules = packEntry.valueRules;
  const changesValueType =
    packEntry.valueType !== undefined &&
    packEntry.valueType !== existing?.valueType;
  const existingRules = changesValueType ? undefined : existing?.valueRules;
  return {
    ...existing,
    ...mergeIdentity(existing, packEntry, name, packId, overridesBuiltIn),
    volatile: packEntry.volatile ?? existing?.volatile,
    valueType: packEntry.valueType ?? existing?.valueType,
    valueRules: packRules
      ? {
          ...existingRules,
          ...packRules,
          unusedValues: packRules.unusedValues
            ? new Set(packRules.unusedValues)
            : existingRules?.unusedValues,
        }
      : existingRules,
  };
}

function mergeLightWorldItemEntry(
  existing: LightWorldItemEntry | undefined,
  packEntry: DataPackLightWorldItemEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): LightWorldItemEntry {
  return {
    ...existing,
    ...mergeIdentity(existing, packEntry, name, packId, overridesBuiltIn),
    weapon: packEntry.weapon ?? existing?.weapon,
    armor: packEntry.armor ?? existing?.armor,
    attack: packEntry.attack ?? existing?.attack,
    defence: packEntry.defence ?? existing?.defence,
    heal: packEntry.heal ?? existing?.heal,
    darkWorldWeapon: packEntry.darkWorldWeapon ?? existing?.darkWorldWeapon,
    darkWorldArmor: packEntry.darkWorldArmor ?? existing?.darkWorldArmor,
  };
}

function overlayPacks<T extends DataEntry>(
  builtIns: T[],
  packs: DataPack[],
  type: DataPackType,
  chapter: ChapterIndex,
  merge: (
    existing: T | undefined,
    packEntry: DataPackEntry,
    name: string,
    packId: string,
    overridesBuiltIn: boolean,
  ) => T,
): T[] {
  const entries = new Map(builtIns.map((entry) => [entry.id, entry]));
  const builtInIds = new Set(builtIns.map((entry) => entry.id));

  for (const pack of packs) {
    for (const [name, entry] of Object.entries(pack.data[type] ?? {})) {
      if (entry.chapters && !entry.chapters.includes(chapter)) continue;
      const overridesBuiltIn = builtInIds.has(entry.id);
      entries.set(
        entry.id,
        merge(entries.get(entry.id), entry, name, pack.id, overridesBuiltIn),
      );
    }
  }

  return [...entries.values()];
}

function normalizeBase(
  name: string,
  id: number,
  meta: BaseProperties | undefined,
): DataEntry {
  return {
    id,
    name,
    displayName: meta?.displayName ?? name,
    description: meta?.description,
    unused: meta?.unused,
    dataPack: false,
  };
}

function normalizeEquipment(
  name: string,
  id: number,
  meta:
    | {
        displayName: string;
        description?: string;
        unused?: boolean;
        stats?: EquipmentEntry['stats'];
        ability?: EquipmentAbilityIndex;
        abilityValues?: EquipmentEntry['abilityValues'];
        icon?: EquipmentIconIndex;
        getOverrides?: (args: { chapter: ChapterIndex }) => Partial<{
          displayName: string;
          description?: string;
          unused?: boolean;
          stats?: EquipmentEntry['stats'];
          ability?: EquipmentAbilityIndex;
          abilityValues?: EquipmentEntry['abilityValues'];
          icon?: EquipmentIconIndex;
        }>;
      }
    | undefined,
  chapter: ChapterIndex,
): EquipmentEntry {
  const resolved = resolveChapterMeta(meta, { chapter });
  const abilityIndex = resolved?.ability;
  const abilityMeta =
    abilityIndex !== undefined
      ? resolveChapterMeta(EQUIPMENT_ABILITIES_META[abilityIndex], { chapter })
      : undefined;

  return {
    id,
    name,
    displayName: resolved?.displayName ?? name,
    description: resolved?.description,
    unused: resolved?.unused,
    dataPack: false,
    stats: resolved?.stats,
    ability: abilityMeta?.displayName,
    abilityIndex,
    abilityValues: resolved?.abilityValues,
    icon: resolved?.icon,
  };
}

function normalizeConsumable(
  name: string,
  id: ConsumableIndex,
  chapter: ChapterIndex,
  saveSlot: SaveSlot,
): ConsumableEntry {
  const resolved = resolveChapterMeta(consumableHelpers.getById(id), {
    chapter,
    saveSlot,
  });

  return {
    id,
    name,
    displayName: resolved?.displayName ?? name,
    description: resolved?.description,
    unused: resolved?.unused,
    dataPack: false,
    heal: resolved?.heal,
    healByCharacter: resolved?.healByCharacter,
    healPercent: resolved?.healPercent,
    healPercentByCharacter: resolved?.healPercentByCharacter,
    healsParty: resolved?.healsParty,
    tpGain: resolved?.tpGain,
    revivePercent: resolved?.revivePercent,
    extraHeal: resolved?.extraHeal,
    overworld: resolved?.overworld,
  };
}

function normalizeSpell(name: string, id: SpellIndex): SpellEntry {
  const meta = spellHelpers.getById(id);
  return {
    ...normalizeBase(name, id, meta),
    tpCost: meta?.tpCost,
  };
}

function normalizeFlag(name: string, id: FlagIndex): FlagEntry {
  const meta = flagHelpers.getById(id);
  return {
    ...normalizeBase(name, id, meta),
    volatile: meta?.volatile,
    valueType: meta?.valueType,
    valueRules: meta?.valueRules,
  };
}

function normalizeLightWorldItem(
  name: string,
  id: LightWorldItemIndex,
): LightWorldItemEntry {
  const meta = lightWorldItemHelpers.getById(id);
  return {
    ...normalizeBase(name, id, meta),
    weapon: meta?.weapon,
    armor: meta?.armor,
    attack: meta?.attack,
    defence: meta?.defence,
    heal: meta?.heal,
    darkWorldWeapon: meta?.darkWorldWeapon,
    darkWorldArmor: meta?.darkWorldArmor,
  };
}

export function buildGameData(
  packs: DataPack[],
  chapter: ChapterIndex,
  saveSlot: SaveSlot,
): GameData {
  const weapons = overlayPacks(
    weaponHelpers
      .getAllNames()
      .map((name) =>
        normalizeEquipment(
          name,
          weaponHelpers.getIndex(name),
          weaponHelpers.getByName(name),
          chapter,
        ),
      ),
    packs,
    'weapons',
    chapter,
    (existing, packEntry, name, packId, overridesBuiltIn) =>
      mergeEquipmentEntry(
        existing,
        packEntry as DataPackEquipmentEntry,
        name,
        packId,
        overridesBuiltIn,
      ),
  );

  const armors = overlayPacks(
    armorHelpers
      .getAllNames()
      .map((name) =>
        normalizeEquipment(
          name,
          armorHelpers.getIndex(name),
          armorHelpers.getByName(name),
          chapter,
        ),
      ),
    packs,
    'armors',
    chapter,
    (existing, packEntry, name, packId, overridesBuiltIn) =>
      mergeEquipmentEntry(
        existing,
        packEntry as DataPackEquipmentEntry,
        name,
        packId,
        overridesBuiltIn,
      ),
  );

  const consumables = overlayPacks(
    consumableHelpers
      .getAllNames()
      .map((name) =>
        normalizeConsumable(
          name,
          consumableHelpers.getIndex(name),
          chapter,
          saveSlot,
        ),
      ),
    packs,
    'consumables',
    chapter,
    (existing, packEntry, name, packId, overridesBuiltIn) =>
      mergeConsumableEntry(
        existing,
        packEntry as DataPackConsumableEntry,
        name,
        packId,
        overridesBuiltIn,
      ),
  );

  const spells = overlayPacks(
    spellHelpers
      .getAllNames()
      .map((name) => normalizeSpell(name, spellHelpers.getIndex(name))),
    packs,
    'spells',
    chapter,
    (existing, packEntry, name, packId, overridesBuiltIn) =>
      mergeSpellEntry(
        existing,
        packEntry as DataPackSpellEntry,
        name,
        packId,
        overridesBuiltIn,
      ),
  );

  const keyItems = overlayPacks(
    keyItemHelpers
      .getAllNames()
      .map((name) =>
        normalizeBase(
          name,
          keyItemHelpers.getIndex(name),
          keyItemHelpers.getByName(name),
        ),
      ),
    packs,
    'keyItems',
    chapter,
    mergeBaseEntry,
  );

  const lightWorldItems = overlayPacks(
    lightWorldItemHelpers
      .getAllNames()
      .map((name) =>
        normalizeLightWorldItem(name, lightWorldItemHelpers.getIndex(name)),
      ),
    packs,
    'lightWorldItems',
    chapter,
    (existing, packEntry, name, packId, overridesBuiltIn) =>
      mergeLightWorldItemEntry(
        existing,
        packEntry as DataPackLightWorldItemEntry,
        name,
        packId,
        overridesBuiltIn,
      ),
  );

  const phoneContacts = overlayPacks(
    phoneContactHelpers
      .getAllNames()
      .map((name) =>
        normalizeBase(
          name,
          phoneContactHelpers.getIndex(name),
          phoneContactHelpers.getByName(name),
        ),
      ),
    packs,
    'phoneContacts',
    chapter,
    mergeBaseEntry,
  );

  const rooms = overlayPacks(
    roomHelpers
      .getAllNames()
      .map((name) =>
        normalizeBase(
          name,
          roomHelpers.getIndex(name),
          roomHelpers.getByName(name),
        ),
      ),
    packs,
    'rooms',
    chapter,
    mergeBaseEntry,
  );

  const flags = overlayPacks(
    flagHelpers
      .getAllNames()
      .map((name) => normalizeFlag(name, flagHelpers.getIndex(name))),
    packs,
    'flags',
    chapter,
    (existing, packEntry, name, packId, overridesBuiltIn) =>
      mergeFlagEntry(
        existing,
        packEntry as DataPackFlagEntry,
        name,
        packId,
        overridesBuiltIn,
      ),
  );

  return {
    chapter,
    saveSlot,
    weapons: toGroup(weapons),
    armors: toGroup(armors),
    consumables: toGroup(consumables),
    keyItems: toGroup(keyItems),
    lightWorldItems: toGroup(lightWorldItems),
    phoneContacts: toGroup(phoneContacts),
    spells: toGroup(spells),
    rooms: toGroup(rooms),
    flags: toGroup(flags),
  };
}

export function getChapterDataEntries<T extends DataEntry>(
  entries: T[],
  builtInIds: ReadonlySet<number>,
): T[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return [
    ...[...builtInIds].flatMap((id) => {
      const entry = byId.get(id);
      return entry ? [entry] : [];
    }),
    ...entries.filter((entry) => entry.dataPack && !entry.overridesBuiltIn),
  ];
}

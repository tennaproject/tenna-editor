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

function mergeBaseEntry<T extends DataEntry>(
  existing: T | undefined,
  packEntry: DataPackEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): T {
  return {
    ...existing,
    ...Object.fromEntries(
      Object.entries(packEntry)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, value === null ? undefined : value]),
    ),
    name,
    dataPack: true,
    packId,
    overridesBuiltIn,
    descriptionFromPack: packEntry.description !== undefined,
  } as T;
}

function mergeEquipmentEntry(
  existing: EquipmentEntry | undefined,
  packEntry: DataPackEquipmentEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): EquipmentEntry {
  const entry = mergeBaseEntry(
    existing,
    packEntry,
    name,
    packId,
    overridesBuiltIn,
  );
  if (packEntry.ability !== undefined) {
    entry.abilityIndex = undefined;
    entry.abilityValues = undefined;
  }
  return entry;
}

function mergeConsumableEntry(
  existing: ConsumableEntry | undefined,
  packEntry: DataPackConsumableEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): ConsumableEntry {
  return mergeBaseEntry(existing, packEntry, name, packId, overridesBuiltIn);
}

function mergeSpellEntry(
  existing: SpellEntry | undefined,
  packEntry: DataPackSpellEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): SpellEntry {
  return {
    ...mergeBaseEntry(existing, packEntry, name, packId, overridesBuiltIn),
    overrides: packEntry,
  };
}

function mergeFlagEntry(
  existing: FlagEntry | undefined,
  packEntry: DataPackFlagEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): FlagEntry {
  const entry = mergeBaseEntry(
    existing,
    packEntry,
    name,
    packId,
    overridesBuiltIn,
  );
  if (packEntry.valueRules !== undefined) {
    entry.valueRules =
      packEntry.valueRules === null
        ? undefined
        : {
            ...packEntry.valueRules,
            unusedValues:
              packEntry.valueRules.unusedValues === undefined
                ? undefined
                : new Set(packEntry.valueRules.unusedValues),
          };
  } else if (
    packEntry.valueType !== undefined &&
    packEntry.valueType !== existing?.valueType
  ) {
    entry.valueRules = undefined;
  }
  return entry;
}

function mergeLightWorldItemEntry(
  existing: LightWorldItemEntry | undefined,
  packEntry: DataPackLightWorldItemEntry,
  name: string,
  packId: string,
  overridesBuiltIn: boolean,
): LightWorldItemEntry {
  return {
    ...mergeBaseEntry(existing, packEntry, name, packId, overridesBuiltIn),
    overrides: packEntry,
  };
}

export function resolveSpellEntry(
  entry: SpellEntry,
  context: Parameters<
    NonNullable<
      NonNullable<ReturnType<typeof spellHelpers.getById>>['getOverrides']
    >
  >[0],
): SpellEntry {
  const meta =
    entry.overridesBuiltIn || !entry.dataPack
      ? resolveChapterMeta(
          spellHelpers.getById(entry.id as SpellIndex),
          context,
        )
      : undefined;
  const resolved = { ...entry, ...meta };
  return entry.overrides
    ? mergeSpellEntry(
        resolved,
        entry.overrides,
        entry.name,
        entry.packId!,
        !!entry.overridesBuiltIn,
      )
    : resolved;
}

export function resolveLightWorldItemEntry(
  entry: LightWorldItemEntry,
  context: { chapter: ChapterIndex; items: ConsumableIndex[] },
): LightWorldItemEntry {
  const meta =
    entry.overridesBuiltIn || !entry.dataPack
      ? resolveChapterMeta(
          lightWorldItemHelpers.getById(entry.id as LightWorldItemIndex),
          context,
        )
      : undefined;
  const resolved = { ...entry, ...meta };
  return entry.overrides
    ? mergeLightWorldItemEntry(
        resolved,
        entry.overrides,
        entry.name,
        entry.packId!,
        !!entry.overridesBuiltIn,
      )
    : resolved;
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
      entries.set(entry.id, {
        ...merge(entries.get(entry.id), entry, name, pack.id, overridesBuiltIn),
        packName: pack.name,
      });
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

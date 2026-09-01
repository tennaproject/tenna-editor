import { CHARACTERS, type CharacterIndex, type CharacterName } from '@data';
import type {
  DataPack,
  DataPackBaseEntry,
  DataPackChapter,
  DataPackConsumableEntry,
  DataPackData,
  DataPackEntry,
  DataPackEquipmentEntry,
  DataPackHealAmounts,
  DataPackSpellEntry,
  DataPackType,
  EquipmentStats,
} from '@types';
import { formatTranslation, translate } from '../i18n';

export const DATA_PACK_VERSION = 1;
export const DATA_PACK_MAX_FILE_BYTES = 1024 * 1024;
export const DATA_PACK_MAX_ENTRIES = 5000;
export const DATA_PACK_MAX_DISPLAY_NAME = 200;
export const DATA_PACK_MAX_DESCRIPTION = 2000;
export const DATA_PACK_MAX_ABILITY = 100;
export const DATA_PACK_ENTRY_KEY = /^[A-Za-z0-9_]{1,64}$/;
export const DATA_PACK_TYPES: DataPackType[] = [
  'consumables',
  'keyItems',
  'weapons',
  'armors',
  'lightWorldItems',
  'phoneContacts',
  'spells',
  'rooms',
  'flags',
];

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const STAT_MIN = -999;
const STAT_MAX = 999;
const HEAL_MAX = 999;
const PERCENT_MAX = 100;

export class DataPackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataPackError';
  }
}

function dataPackError(
  key: string,
  fallback: string,
  values: Record<string, string | number> = {},
) {
  return new DataPackError(formatTranslation(translate(key, fallback), values));
}

function isDangerousKey(name: string) {
  return DANGEROUS_KEYS.has(name);
}

function requireEntryKey(name: string) {
  if (isDangerousKey(name) || !DATA_PACK_ENTRY_KEY.test(name)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorEntryKey',
      '{entry} is not a valid data-pack key. Use 1 to 64 letters, numbers, or underscores.',
      { entry: name },
    );
  }
}

function requireText(
  value: unknown,
  key: string,
  fallback: string,
  values: Record<string, string | number> = {},
): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw dataPackError(key, fallback, values);
  }
  return value.trim();
}

function parseOptionalInteger(
  value: unknown,
  entryName: string,
  field: string,
  min: number,
  max: number,
): number | undefined {
  if (value === undefined) return undefined;
  if (
    !Number.isSafeInteger(value) ||
    (value as number) < min ||
    (value as number) > max
  ) {
    throw dataPackError(
      min === 0 && max === PERCENT_MAX
        ? 'ui.settings.dataPacks.errorPercent'
        : min === 0
          ? 'ui.settings.dataPacks.errorHeal'
          : 'ui.settings.dataPacks.errorStatValue',
      '{entry} {field} must be a whole number from {min} to {max}.',
      { entry: entryName, field, min, max },
    );
  }
  return value as number;
}

function parseChapters(
  value: unknown,
  entryName: string,
): DataPackChapter[] | undefined {
  if (value === undefined) return undefined;
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    !value.every(
      (chapter) => Number.isInteger(chapter) && chapter >= 1 && chapter <= 5,
    )
  ) {
    throw dataPackError(
      'ui.settings.dataPacks.errorChapters',
      '{entry} chapters must be a non-empty list containing chapter numbers 1 through 5.',
      { entry: entryName },
    );
  }
  return [...new Set(value as DataPackChapter[])].sort(
    (left, right) => left - right,
  );
}

function isCharacterName(name: string): name is CharacterName {
  return Object.hasOwn(CHARACTERS, name) && name !== 'EMPTY';
}

function parseCharacterName(name: string, entryName: string): CharacterIndex {
  if (!isCharacterName(name)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorCharacterName',
      '{entry} characters includes unknown name {name}.',
      { entry: entryName, name },
    );
  }
  return CHARACTERS[name];
}

function parseCharacters(
  value: unknown,
  entryName: string,
): CharacterIndex[] | undefined {
  if (value === undefined) return undefined;
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    !value.every((name) => typeof name === 'string')
  ) {
    throw dataPackError(
      'ui.settings.dataPacks.errorCharacters',
      '{entry} characters must be a non-empty list of character names.',
      { entry: entryName },
    );
  }

  const indices = [
    ...new Set(value.map((name) => parseCharacterName(name, entryName))),
  ];
  return indices.sort((left, right) => left - right);
}

function parseCharacterNumberRecord(
  value: unknown,
  entryName: string,
  field: string,
  min: number,
  max: number,
): Partial<Record<CharacterIndex, number>> | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorHealByCharacter',
      '{entry} {field} must be an object of character names to heal values.',
      { entry: entryName, field },
    );
  }

  const result = Object.create(null) as Partial<Record<CharacterIndex, number>>;
  const source = value as Record<string, unknown>;
  const keys = Object.keys(source);
  if (keys.length === 0) {
    throw dataPackError(
      'ui.settings.dataPacks.errorHealByCharacter',
      '{entry} {field} must be an object of character names to heal values.',
      { entry: entryName, field },
    );
  }

  for (const [name, amount] of Object.entries(source)) {
    if (isDangerousKey(name)) {
      throw dataPackError(
        'ui.settings.dataPacks.errorCharacterName',
        '{entry} characters includes unknown name {name}.',
        { entry: entryName, name },
      );
    }
    const character = parseCharacterName(name, entryName);
    const parsed = parseOptionalInteger(
      amount,
      entryName,
      `${field}.${name}`,
      min,
      max,
    );
    if (parsed === undefined) {
      throw dataPackError(
        min === 0 && max === PERCENT_MAX
          ? 'ui.settings.dataPacks.errorPercent'
          : 'ui.settings.dataPacks.errorHeal',
        '{entry} {field} must be a whole number from {min} to {max}.',
        { entry: entryName, field: `${field}.${name}`, min, max },
      );
    }
    result[character] = parsed;
  }

  return result;
}

function parseHealAmounts(
  source: Record<string, unknown>,
  entryName: string,
  prefix = '',
): DataPackHealAmounts {
  const field = (name: string) => (prefix ? `${prefix}.${name}` : name);
  const healAmounts: DataPackHealAmounts = {};

  const heal = parseOptionalInteger(
    source.heal,
    entryName,
    field('heal'),
    0,
    HEAL_MAX,
  );
  if (heal !== undefined) healAmounts.heal = heal;

  const healPercent = parseOptionalInteger(
    source.healPercent,
    entryName,
    field('healPercent'),
    0,
    PERCENT_MAX,
  );
  if (healPercent !== undefined) healAmounts.healPercent = healPercent;

  const healByCharacter = parseCharacterNumberRecord(
    source.healByCharacter,
    entryName,
    field('healByCharacter'),
    0,
    HEAL_MAX,
  );
  if (healByCharacter) healAmounts.healByCharacter = healByCharacter;

  const healPercentByCharacter = parseCharacterNumberRecord(
    source.healPercentByCharacter,
    entryName,
    field('healPercentByCharacter'),
    0,
    PERCENT_MAX,
  );
  if (healPercentByCharacter) {
    healAmounts.healPercentByCharacter = healPercentByCharacter;
  }

  return healAmounts;
}

function parseStats(value: unknown, entryName: string): EquipmentStats {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorStats',
      '{entry} stats must include whole-number attack, defence, and magic values from -999 to 999.',
      { entry: entryName },
    );
  }

  const source = value as Record<string, unknown>;
  const attack = parseOptionalInteger(
    source.attack,
    entryName,
    'stats.attack',
    STAT_MIN,
    STAT_MAX,
  );
  const defence = parseOptionalInteger(
    source.defence,
    entryName,
    'stats.defence',
    STAT_MIN,
    STAT_MAX,
  );
  const magic = parseOptionalInteger(
    source.magic,
    entryName,
    'stats.magic',
    STAT_MIN,
    STAT_MAX,
  );

  if (attack === undefined || defence === undefined || magic === undefined) {
    throw dataPackError(
      'ui.settings.dataPacks.errorStats',
      '{entry} stats must include whole-number attack, defence, and magic values from -999 to 999.',
      { entry: entryName },
    );
  }

  return { attack, defence, magic };
}

function parseBaseEntry(
  source: Record<string, unknown>,
  name: string,
): DataPackBaseEntry {
  if (!Number.isSafeInteger(source.id) || (source.id as number) < 1) {
    throw dataPackError(
      'ui.settings.dataPacks.errorEntryId',
      '{entry} ID must be a whole number of 1 or greater.',
      { entry: name },
    );
  }

  const displayName = requireText(
    source.displayName,
    'ui.settings.dataPacks.errorDisplayName',
    '{entry} must have a display name.',
    { entry: name },
  );
  if (displayName.length > DATA_PACK_MAX_DISPLAY_NAME) {
    throw dataPackError(
      'ui.settings.dataPacks.errorDisplayNameLength',
      '{entry} display name must be {max} characters or fewer.',
      { entry: name, max: DATA_PACK_MAX_DISPLAY_NAME },
    );
  }

  const entry: DataPackBaseEntry = {
    id: source.id as number,
    displayName,
  };

  if (source.description !== undefined) {
    const description = requireText(
      source.description,
      'ui.settings.dataPacks.errorDescription',
      '{entry} description must contain text.',
      { entry: name },
    );
    if (description.length > DATA_PACK_MAX_DESCRIPTION) {
      throw dataPackError(
        'ui.settings.dataPacks.errorDescriptionLength',
        '{entry} description must be {max} characters or fewer.',
        { entry: name, max: DATA_PACK_MAX_DESCRIPTION },
      );
    }
    entry.description = description;
  }

  const chapters = parseChapters(source.chapters, name);
  if (chapters) entry.chapters = chapters;

  return entry;
}

function parseEquipmentEntry(
  source: Record<string, unknown>,
  name: string,
): DataPackEquipmentEntry {
  const entry: DataPackEquipmentEntry = parseBaseEntry(source, name);

  if (source.stats !== undefined) {
    entry.stats = parseStats(source.stats, name);
  }

  if (source.ability !== undefined) {
    const ability = requireText(
      source.ability,
      'ui.settings.dataPacks.errorAbility',
      '{entry} ability must contain text.',
      { entry: name },
    );
    if (ability.length > DATA_PACK_MAX_ABILITY) {
      throw dataPackError(
        'ui.settings.dataPacks.errorAbilityLength',
        '{entry} ability must be {max} characters or fewer.',
        { entry: name, max: DATA_PACK_MAX_ABILITY },
      );
    }
    entry.ability = ability;
  }

  const characters = parseCharacters(source.characters, name);
  if (characters) entry.characters = characters;

  return entry;
}

function parseConsumableEntry(
  source: Record<string, unknown>,
  name: string,
): DataPackConsumableEntry {
  const entry: DataPackConsumableEntry = {
    ...parseBaseEntry(source, name),
    ...parseHealAmounts(source, name),
  };

  const tpGain = parseOptionalInteger(
    source.tpGain,
    name,
    'tpGain',
    0,
    PERCENT_MAX,
  );
  if (tpGain !== undefined) entry.tpGain = tpGain;

  const revivePercent = parseOptionalInteger(
    source.revivePercent,
    name,
    'revivePercent',
    0,
    PERCENT_MAX,
  );
  if (revivePercent !== undefined) entry.revivePercent = revivePercent;

  if (source.healsParty !== undefined) {
    if (typeof source.healsParty !== 'boolean') {
      throw dataPackError(
        'ui.settings.dataPacks.errorHealsParty',
        '{entry} healsParty must be true or false.',
        { entry: name },
      );
    }
    entry.healsParty = source.healsParty;
  }

  if (source.overworld !== undefined) {
    if (
      typeof source.overworld !== 'object' ||
      source.overworld === null ||
      Array.isArray(source.overworld)
    ) {
      throw dataPackError(
        'ui.settings.dataPacks.errorOverworld',
        '{entry} overworld must be an object of heal values.',
        { entry: name },
      );
    }
    entry.overworld = parseHealAmounts(
      source.overworld as Record<string, unknown>,
      name,
      'overworld',
    );
  }

  return entry;
}

function parseSpellEntry(
  source: Record<string, unknown>,
  name: string,
): DataPackSpellEntry {
  const entry: DataPackSpellEntry = parseBaseEntry(source, name);
  const characters = parseCharacters(source.characters, name);
  if (characters) entry.characters = characters;
  return entry;
}

function parseDataEntry(
  value: unknown,
  name: string,
  type: DataPackType,
): DataPackEntry {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorEntry',
      '{entry} must be an object.',
      { entry: name },
    );
  }

  const source = value as Record<string, unknown>;
  switch (type) {
    case 'weapons':
    case 'armors':
      return parseEquipmentEntry(source, name);
    case 'consumables':
      return parseConsumableEntry(source, name);
    case 'spells':
      return parseSpellEntry(source, name);
    default:
      return parseBaseEntry(source, name);
  }
}

function parseData(value: unknown): DataPackData {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorData',
      'Unable to import this pack. Data must be an object grouped by type.',
    );
  }

  const source = value as Record<string, unknown>;
  const data = Object.create(null) as DataPackData;
  let count = 0;

  for (const [type, entries] of Object.entries(source)) {
    if (
      isDangerousKey(type) ||
      !DATA_PACK_TYPES.includes(type as DataPackType)
    ) {
      throw dataPackError(
        'ui.settings.dataPacks.errorType',
        'Unable to import this pack. {type} is not a supported data type.',
        { type },
      );
    }
    if (
      typeof entries !== 'object' ||
      entries === null ||
      Array.isArray(entries)
    ) {
      throw dataPackError(
        'ui.settings.dataPacks.errorGroup',
        'Data group {type} must be an object.',
        { type },
      );
    }

    const parsedEntries = Object.create(null) as Record<string, DataPackEntry>;
    const ids = new Set<number>();
    for (const [name, entry] of Object.entries(entries)) {
      requireEntryKey(name);
      const parsedEntry = parseDataEntry(entry, name, type as DataPackType);
      if (ids.has(parsedEntry.id)) {
        throw dataPackError(
          'ui.settings.dataPacks.errorDuplicate',
          '{type} defines ID {id} more than once.',
          { type, id: parsedEntry.id },
        );
      }
      ids.add(parsedEntry.id);
      parsedEntries[name] = parsedEntry;
      count += 1;
      if (count > DATA_PACK_MAX_ENTRIES) {
        throw dataPackError(
          'ui.settings.dataPacks.errorTooManyEntries',
          'Unable to import this pack. Packs can contain at most {max} entries.',
          { max: DATA_PACK_MAX_ENTRIES },
        );
      }
    }
    data[type as DataPackType] = parsedEntries as never;
  }

  if (count === 0) {
    throw dataPackError(
      'ui.settings.dataPacks.errorEmpty',
      'Unable to import this pack. Add at least one data entry.',
    );
  }
  return data;
}

export function parseDataPack(json: string): DataPack {
  let value: unknown;
  try {
    value = JSON.parse(json);
  } catch {
    throw dataPackError(
      'ui.settings.dataPacks.errorJson',
      'Unable to import this pack. Choose a valid JSON file.',
    );
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorRoot',
      'Unable to import this pack. The JSON root must be an object.',
    );
  }
  const source = value as Record<string, unknown>;
  if (source.version !== DATA_PACK_VERSION) {
    throw dataPackError(
      'ui.settings.dataPacks.errorVersion',
      'Unable to import data-pack version {version}. This editor supports version {supported}.',
      {
        version: String(source.version),
        supported: DATA_PACK_VERSION,
      },
    );
  }

  const pack: DataPack = {
    id: requireText(
      source.id,
      'ui.settings.dataPacks.errorPackId',
      'Unable to import this pack. Add a unique pack ID.',
    ),
    name: requireText(
      source.name,
      'ui.settings.dataPacks.errorPackName',
      'Unable to import this pack. Add a pack name.',
    ),
    data: parseData(source.data),
  };
  if (source.modVersion !== undefined) {
    pack.modVersion = requireText(
      source.modVersion,
      'ui.settings.dataPacks.errorModVersion',
      'The mod version must contain text.',
    );
  }
  return pack;
}

export function upsertDataPack(
  packs: DataPack[],
  nextPack: DataPack,
): DataPack[] {
  const remaining = packs.filter((pack) => pack.id !== nextPack.id);
  for (const type of DATA_PACK_TYPES) {
    for (const entry of Object.values(nextPack.data[type] ?? {})) {
      const conflictingPack = remaining.find((pack) =>
        Object.values(pack.data[type] ?? {}).some(
          (existing) => existing.id === entry.id,
        ),
      );
      if (conflictingPack) {
        throw dataPackError(
          'ui.settings.dataPacks.errorConflict',
          'Unable to import {pack}. {type} ID {id} is already defined by {conflict}.',
          {
            pack: nextPack.name,
            type,
            id: entry.id,
            conflict: conflictingPack.name,
          },
        );
      }
    }
  }
  return [...remaining, nextPack].sort((left, right) =>
    left.name.localeCompare(right.name),
  );
}

export function getDataPackEntryCount(pack: DataPack): number {
  return Object.values(pack.data).reduce(
    (count, entries) => count + Object.keys(entries ?? {}).length,
    0,
  );
}

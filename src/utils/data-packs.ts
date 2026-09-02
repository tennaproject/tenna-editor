import {
  CHARACTERS,
  EQUIPMENT_ICONS,
  type CharacterIndex,
  type EquipmentIconIndex,
  type FlagValueType,
} from '@data';
import type {
  DataPack,
  DataPackBaseEntry,
  DataPackChapter,
  DataPackConsumableEntry,
  DataPackData,
  DataPackEntry,
  DataPackEquipmentEntry,
  DataPackFlagEntry,
  DataPackFlagValueRules,
  DataPackHealAmounts,
  DataPackLightWorldItemEntry,
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
const CHARACTER_IDS = {
  kris: CHARACTERS.KRIS,
  susie: CHARACTERS.SUSIE,
  ralsei: CHARACTERS.RALSEI,
  noelle: CHARACTERS.NOELLE,
} as const;
const FLAG_VALUE_TYPES = new Set<FlagValueType>([
  'boolean',
  'number',
  'map',
  'color',
]);
const BASE_ENTRY_FIELDS = new Set([
  'id',
  'displayName',
  'description',
  'chapters',
]);
const HEAL_FIELDS = [
  'heal',
  'healPercent',
  'healByCharacter',
  'healPercentByCharacter',
] as const;

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

function requireKnownFields(
  source: Record<string, unknown>,
  allowed: ReadonlySet<string>,
  entryName: string,
) {
  const field = Object.keys(source).find((name) => !allowed.has(name));
  if (field) {
    throw dataPackError(
      'ui.settings.dataPacks.errorUnknownField',
      '{entry} contains unsupported field {field}.',
      { entry: entryName, field },
    );
  }
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

function parseInteger(
  value: unknown,
  entryName: string,
  field: string,
  min: number,
  max: number,
): number {
  if (
    !Number.isSafeInteger(value) ||
    (value as number) < min ||
    (value as number) > max
  ) {
    throw dataPackError(
      'ui.settings.dataPacks.errorIntegerRange',
      '{entry} {field} must be a whole number from {min} to {max}.',
      { entry: entryName, field, min, max },
    );
  }
  return value as number;
}

function parseOptionalInteger(
  value: unknown,
  entryName: string,
  field: string,
  min: number,
  max: number,
): number | undefined {
  return value === undefined
    ? undefined
    : parseInteger(value, entryName, field, min, max);
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

function parseCharacterName(name: string, entryName: string): CharacterIndex {
  if (!Object.hasOwn(CHARACTER_IDS, name)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorCharacterName',
      '{entry} characters includes unknown name {name}.',
      { entry: entryName, name },
    );
  }
  return CHARACTER_IDS[name as keyof typeof CHARACTER_IDS];
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
    result[character] = parseInteger(
      amount,
      entryName,
      `${field}.${name}`,
      min,
      max,
    );
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
  requireKnownFields(
    source,
    new Set(['attack', 'defence', 'magic']),
    `${entryName}.stats`,
  );
  const attack = parseInteger(
    source.attack,
    entryName,
    'stats.attack',
    STAT_MIN,
    STAT_MAX,
  );
  const defence = parseInteger(
    source.defence,
    entryName,
    'stats.defence',
    STAT_MIN,
    STAT_MAX,
  );
  const magic = parseInteger(
    source.magic,
    entryName,
    'stats.magic',
    STAT_MIN,
    STAT_MAX,
  );

  return { attack, defence, magic };
}

function parseEquipmentIcon(
  value: unknown,
  entryName: string,
): EquipmentIconIndex | undefined {
  if (value === undefined) return undefined;
  if (
    !Number.isSafeInteger(value) ||
    !Object.values(EQUIPMENT_ICONS).includes(value as EquipmentIconIndex)
  ) {
    throw dataPackError(
      'ui.settings.dataPacks.errorIcon',
      '{entry} icon must be a valid equipment icon ID.',
      { entry: entryName },
    );
  }
  return value as EquipmentIconIndex;
}

function parseIntegerList(
  value: unknown,
  entryName: string,
  field: string,
): number[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || !value.every(Number.isSafeInteger)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorIntegerList',
      '{entry} {field} must be a list of whole numbers.',
      { entry: entryName, field },
    );
  }
  return [...new Set(value as number[])];
}

function parseFlagValueRules(
  value: unknown,
  entryName: string,
): DataPackFlagValueRules | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw dataPackError(
      'ui.settings.dataPacks.errorValueRules',
      '{entry} valueRules must be an object.',
      { entry: entryName },
    );
  }

  const source = value as Record<string, unknown>;
  requireKnownFields(
    source,
    new Set([
      'min',
      'max',
      'allowedValues',
      'map',
      'unusedValues',
      'invertedBoolean',
      'booleanMap',
    ]),
    `${entryName}.valueRules`,
  );
  const rules: DataPackFlagValueRules = {};

  for (const field of ['min', 'max'] as const) {
    if (source[field] !== undefined && !Number.isSafeInteger(source[field])) {
      throw dataPackError(
        'ui.settings.dataPacks.errorInteger',
        '{entry} {field} must be a whole number.',
        { entry: entryName, field: `valueRules.${field}` },
      );
    }
    if (source[field] !== undefined) rules[field] = source[field] as number;
  }

  rules.allowedValues = parseIntegerList(
    source.allowedValues,
    entryName,
    'valueRules.allowedValues',
  );
  rules.unusedValues = parseIntegerList(
    source.unusedValues,
    entryName,
    'valueRules.unusedValues',
  );

  if (source.map !== undefined) {
    if (
      typeof source.map !== 'object' ||
      source.map === null ||
      Array.isArray(source.map)
    ) {
      throw dataPackError(
        'ui.settings.dataPacks.errorValueMap',
        '{entry} valueRules.map must map whole numbers to labels.',
        { entry: entryName },
      );
    }
    const map: Record<number, string> = {};
    for (const [key, label] of Object.entries(source.map)) {
      const numericKey = Number(key);
      if (
        !Number.isSafeInteger(numericKey) ||
        typeof label !== 'string' ||
        !label.trim()
      ) {
        throw dataPackError(
          'ui.settings.dataPacks.errorValueMap',
          '{entry} valueRules.map must map whole numbers to labels.',
          { entry: entryName },
        );
      }
      map[numericKey] = label.trim();
    }
    rules.map = map;
  }

  if (source.invertedBoolean !== undefined) {
    if (typeof source.invertedBoolean !== 'boolean') {
      throw dataPackError(
        'ui.settings.dataPacks.errorBoolean',
        '{entry} {field} must be true or false.',
        { entry: entryName, field: 'valueRules.invertedBoolean' },
      );
    }
    rules.invertedBoolean = source.invertedBoolean;
  }

  if (source.booleanMap !== undefined) {
    if (
      typeof source.booleanMap !== 'object' ||
      source.booleanMap === null ||
      Array.isArray(source.booleanMap)
    ) {
      throw dataPackError(
        'ui.settings.dataPacks.errorBooleanMap',
        '{entry} valueRules.booleanMap is invalid.',
        { entry: entryName },
      );
    }
    const booleanMap = source.booleanMap as Record<string, unknown>;
    requireKnownFields(
      booleanMap,
      new Set(['trueValues', 'falseValues', 'writeTrue', 'writeFalse']),
      `${entryName}.valueRules.booleanMap`,
    );
    const trueValues = parseIntegerList(
      booleanMap.trueValues,
      entryName,
      'valueRules.booleanMap.trueValues',
    );
    const falseValues = parseIntegerList(
      booleanMap.falseValues,
      entryName,
      'valueRules.booleanMap.falseValues',
    );
    if (
      !trueValues ||
      !falseValues ||
      !Number.isSafeInteger(booleanMap.writeTrue) ||
      !Number.isSafeInteger(booleanMap.writeFalse)
    ) {
      throw dataPackError(
        'ui.settings.dataPacks.errorBooleanMap',
        '{entry} valueRules.booleanMap is invalid.',
        { entry: entryName },
      );
    }
    rules.booleanMap = {
      trueValues,
      falseValues,
      writeTrue: booleanMap.writeTrue as number,
      writeFalse: booleanMap.writeFalse as number,
    };
  }

  return rules;
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

  const icon = parseEquipmentIcon(source.icon, name);
  if (icon !== undefined) entry.icon = icon;

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

  const healsParty = parseOptionalBoolean(
    source.healsParty,
    name,
    'healsParty',
  );
  if (healsParty !== undefined) entry.healsParty = healsParty;

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
    requireKnownFields(
      source.overworld as Record<string, unknown>,
      new Set(HEAL_FIELDS),
      `${name}.overworld`,
    );
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
  const tpCost = parseOptionalInteger(
    source.tpCost,
    name,
    'tpCost',
    0,
    PERCENT_MAX,
  );
  if (tpCost !== undefined) entry.tpCost = tpCost;
  return entry;
}

function parseFlagEntry(
  source: Record<string, unknown>,
  name: string,
): DataPackFlagEntry {
  const entry: DataPackFlagEntry = parseBaseEntry(source, name);

  const volatile = parseOptionalBoolean(source.volatile, name, 'volatile');
  if (volatile !== undefined) entry.volatile = volatile;

  if (source.valueType !== undefined) {
    if (
      typeof source.valueType !== 'string' ||
      !FLAG_VALUE_TYPES.has(source.valueType as FlagValueType)
    ) {
      throw dataPackError(
        'ui.settings.dataPacks.errorValueType',
        '{entry} valueType must be boolean, number, map, or color.',
        { entry: name },
      );
    }
    entry.valueType = source.valueType as FlagValueType;
  }

  const valueRules = parseFlagValueRules(source.valueRules, name);
  if (valueRules) entry.valueRules = valueRules;
  return entry;
}

function parseOptionalBoolean(
  value: unknown,
  entryName: string,
  field: string,
): boolean | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'boolean') {
    throw dataPackError(
      'ui.settings.dataPacks.errorBoolean',
      '{entry} {field} must be true or false.',
      { entry: entryName, field },
    );
  }
  return value;
}

function parseLightWorldItemEntry(
  source: Record<string, unknown>,
  name: string,
): DataPackLightWorldItemEntry {
  const entry: DataPackLightWorldItemEntry = parseBaseEntry(source, name);

  const weapon = parseOptionalBoolean(source.weapon, name, 'weapon');
  if (weapon !== undefined) entry.weapon = weapon;
  const armor = parseOptionalBoolean(source.armor, name, 'armor');
  if (armor !== undefined) entry.armor = armor;

  const attack = parseOptionalInteger(
    source.attack,
    name,
    'attack',
    STAT_MIN,
    STAT_MAX,
  );
  if (attack !== undefined) entry.attack = attack;
  const defence = parseOptionalInteger(
    source.defence,
    name,
    'defence',
    STAT_MIN,
    STAT_MAX,
  );
  if (defence !== undefined) entry.defence = defence;
  const heal = parseOptionalInteger(source.heal, name, 'heal', 0, HEAL_MAX);
  if (heal !== undefined) entry.heal = heal;

  const darkWorldWeapon = parseOptionalInteger(
    source.darkWorldWeapon,
    name,
    'darkWorldWeapon',
    0,
    Number.MAX_SAFE_INTEGER,
  );
  if (darkWorldWeapon !== undefined) entry.darkWorldWeapon = darkWorldWeapon;
  const darkWorldArmor = parseOptionalInteger(
    source.darkWorldArmor,
    name,
    'darkWorldArmor',
    0,
    Number.MAX_SAFE_INTEGER,
  );
  if (darkWorldArmor !== undefined) entry.darkWorldArmor = darkWorldArmor;
  return entry;
}

function getEntryFields(type: DataPackType): Set<string> {
  const fields = new Set(BASE_ENTRY_FIELDS);
  if (type === 'weapons' || type === 'armors') {
    for (const field of ['stats', 'ability', 'characters', 'icon']) {
      fields.add(field);
    }
  } else if (type === 'consumables') {
    for (const field of [
      ...HEAL_FIELDS,
      'tpGain',
      'revivePercent',
      'healsParty',
      'overworld',
    ]) {
      fields.add(field);
    }
  } else if (type === 'spells') {
    fields.add('characters');
    fields.add('tpCost');
  } else if (type === 'flags') {
    fields.add('volatile');
    fields.add('valueType');
    fields.add('valueRules');
  } else if (type === 'lightWorldItems') {
    for (const field of [
      'weapon',
      'armor',
      'attack',
      'defence',
      'heal',
      'darkWorldWeapon',
      'darkWorldArmor',
    ]) {
      fields.add(field);
    }
  }
  return fields;
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
  requireKnownFields(source, getEntryFields(type), name);
  switch (type) {
    case 'weapons':
    case 'armors':
      return parseEquipmentEntry(source, name);
    case 'consumables':
      return parseConsumableEntry(source, name);
    case 'spells':
      return parseSpellEntry(source, name);
    case 'flags':
      return parseFlagEntry(source, name);
    case 'lightWorldItems':
      return parseLightWorldItemEntry(source, name);
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
  requireKnownFields(
    source,
    new Set(['version', 'id', 'name', 'modVersion', 'data']),
    'Data pack',
  );
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

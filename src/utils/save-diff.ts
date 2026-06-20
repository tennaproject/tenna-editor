import {
  ARMORS,
  CONSUMABLES,
  KEYITEMS,
  LIGHTWORLDITEMS,
  PHONECONTACTS,
  WEAPONS,
  FLAGS_META,
  type ChapterIndex,
  type CharacterIndex,
  type ConsumableIndex,
  type FlagIndex,
  type RoomIndex,
  type SpellIndex,
} from '@data';
import type { SaveBaseline, SaveGamePayload } from '@types';
import {
  armorHelpers,
  characterHelpers,
  consumableHelpers,
  keyItemHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
  roomHelpers,
  spellHelpers,
  weaponHelpers,
} from './data-helpers';
import { getPlotPointLabel } from './plot-point-helpers';
import { getGameColor } from './get-game-color';

export interface DiffEntry {
  label: string;
  path: string;
  before: string;
  after: string;
}

export interface DiffSection {
  id: string;
  title: string;
  changes: DiffEntry[];
  children?: DiffSection[];
}

export interface DiffGroup {
  id: string;
  title: string;
  entries: DiffEntry[];
}

export interface SaveDiffResult {
  sections: DiffSection[];
  groups: DiffGroup[];
  totalChanges: number;
}

export function flattenDiffSection(section: DiffSection): DiffEntry[] {
  const entries: DiffEntry[] = [];

  function visit(node: DiffSection, path: string[]) {
    for (const change of node.changes) {
      entries.push({
        ...change,
        label:
          path.length > 0
            ? `${path.join(' · ')} · ${change.label}`
            : change.label,
      });
    }
    for (const child of node.children ?? []) {
      visit(child, [...path, child.title]);
    }
  }

  visit(section, []);
  return entries;
}

const OVERVIEW_FIELDS: {
  key: keyof SaveGamePayload;
  label: string;
}[] = [
  { key: 'playerName', label: 'Player name' },
  { key: 'vesselName', label: 'Vessel name' },
  { key: 'money', label: 'Money (Dark World)' },
  { key: 'xp', label: 'XP' },
  { key: 'lv', label: 'LV' },
  { key: 'inv', label: 'Inventory size' },
  { key: 'invc', label: 'Inventory capacity' },
  { key: 'inDarkWorld', label: 'In Dark World' },
  { key: 'plot', label: 'Plot' },
  { key: 'time', label: 'Play time' },
];

function formatPrimitive(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value || '(empty)';
  return String(value);
}

function pushChange(
  changes: DiffEntry[],
  path: string,
  label: string,
  before: unknown,
  after: unknown,
) {
  const beforeStr = formatPrimitive(before);
  const afterStr = formatPrimitive(after);
  if (beforeStr === afterStr) return;
  changes.push({ path, label, before: beforeStr, after: afterStr });
}

function formatFlagValue(flag: FlagIndex, value: unknown): string {
  const meta = FLAGS_META[flag];
  if (!meta) return formatPrimitive(value);

  const raw = value ?? 0;
  const { valueType, valueRules } = meta;

  if (valueType === 'boolean') {
    const on = valueRules?.invertedBoolean ? !raw : !!raw;
    return on ? 'On' : 'Off';
  }

  if (valueType === 'map' && valueRules?.map) {
    const key = String(raw);
    return valueRules.map[key as unknown as number] ?? formatPrimitive(raw);
  }

  if (valueType === 'color') {
    return `Color ${String(raw)} (${getGameColor(Number(raw))})`;
  }

  return formatPrimitive(raw);
}

function getFlagLabel(flag: FlagIndex): string {
  const meta = FLAGS_META[flag];
  if (meta?.displayName) return meta.displayName;
  return `Flag #${flag}`;
}

function formatItemId(
  id: number,
  resolveName: (id: number) => string | undefined,
  emptyId: number,
): string {
  if (id === emptyId) return 'Empty';
  return resolveName(id) ?? String(id);
}

function diffIndexedArray(
  changes: DiffEntry[],
  pathPrefix: string,
  labelPrefix: string,
  before: number[],
  after: number[],
  formatValue: (id: number) => string,
) {
  const maxLen = Math.max(before.length, after.length);
  for (let i = 0; i < maxLen; i++) {
    const b = before[i] ?? 0;
    const a = after[i] ?? 0;
    if (b === a) continue;
    pushChange(
      changes,
      `${pathPrefix}.${i}`,
      `${labelPrefix} ${i + 1}`,
      formatValue(b),
      formatValue(a),
    );
  }
}

function diffParty(
  before: SaveGamePayload['party'],
  after: SaveGamePayload['party'],
): DiffEntry[] {
  const changes: DiffEntry[] = [];
  for (let i = 0; i < 3; i++) {
    const b = before[i];
    const a = after[i];
    if (b === a) continue;
    const formatChar = (id: CharacterIndex) =>
      characterHelpers.getById(id)?.displayName ?? String(id);
    pushChange(
      changes,
      `party.${i}`,
      `Party slot ${i + 1}`,
      formatChar(b),
      formatChar(a),
    );
  }
  return changes;
}

function diffRoom(
  before: SaveGamePayload['room'],
  after: SaveGamePayload['room'],
): DiffEntry[] {
  if (before === after) return [];
  const formatRoom = (id: RoomIndex) =>
    roomHelpers.getById(id)?.displayName ?? String(id);
  return [
    {
      path: 'room',
      label: 'Room',
      before: formatRoom(before),
      after: formatRoom(after),
    },
  ];
}

function diffCharacter(
  charIndex: CharacterIndex,
  before: SaveGamePayload['characters'][number] | undefined,
  after: SaveGamePayload['characters'][number] | undefined,
): DiffSection | null {
  const title =
    characterHelpers.getById(charIndex)?.displayName ??
    `Character ${charIndex}`;
  const changes: DiffEntry[] = [];

  if (!before || !after) {
    if (before !== after) {
      changes.push({
        path: `characters.${charIndex}`,
        label: title,
        before: before ? 'Present' : 'Missing',
        after: after ? 'Present' : 'Missing',
      });
    }
    return changes.length ? { id: `char-${charIndex}`, title, changes } : null;
  }

  const scalarKeys = [
    'health',
    'maxHealth',
    'attack',
    'defence',
    'magic',
    'guts',
    'weapon',
    'primaryArmor',
    'secondaryArmor',
    'weaponStyle',
  ] as const;

  for (const key of scalarKeys) {
    const b = before[key];
    const a = after[key];
    if (b === a) continue;

    let label: string = key;
    let beforeVal: unknown = b;
    let afterVal: unknown = a;

    if (key === 'weapon') {
      label = 'Weapon';
      beforeVal = formatItemId(
        b as number,
        (id) => weaponHelpers.getById(id as never)?.displayName,
        WEAPONS.EMPTY,
      );
      afterVal = formatItemId(
        a as number,
        (id) => weaponHelpers.getById(id as never)?.displayName,
        WEAPONS.EMPTY,
      );
    } else if (key === 'primaryArmor' || key === 'secondaryArmor') {
      label = key === 'primaryArmor' ? 'Primary armor' : 'Secondary armor';
      beforeVal = formatItemId(
        b as number,
        (id) => armorHelpers.getById(id as never)?.displayName,
        ARMORS.EMPTY,
      );
      afterVal = formatItemId(
        a as number,
        (id) => armorHelpers.getById(id as never)?.displayName,
        ARMORS.EMPTY,
      );
    } else if (key === 'weaponStyle') {
      label = 'Weapon style';
    }

    pushChange(
      changes,
      `characters.${charIndex}.${key}`,
      label,
      beforeVal,
      afterVal,
    );
  }

  diffIndexedArray(
    changes,
    `characters.${charIndex}.spells`,
    'Spell slot',
    before.spells,
    after.spells,
    (id) => spellHelpers.getById(id as SpellIndex)?.displayName ?? String(id),
  );

  const statsLen = Math.max(
    before.weaponStats.length,
    after.weaponStats.length,
  );
  for (let i = 0; i < statsLen; i++) {
    const bStats = before.weaponStats[i];
    const aStats = after.weaponStats[i];
    if (!bStats || !aStats) continue;
    const statKeys = Object.keys(bStats) as (keyof typeof bStats)[];
    for (const statKey of statKeys) {
      if (bStats[statKey] === aStats[statKey]) continue;
      pushChange(
        changes,
        `characters.${charIndex}.weaponStats.${i}.${String(statKey)}`,
        `Weapon style ${i + 1} — ${String(statKey)}`,
        bStats[statKey],
        aStats[statKey],
      );
    }
  }

  return changes.length ? { id: `char-${charIndex}`, title, changes } : null;
}

function diffCharacters(
  before: SaveGamePayload['characters'],
  after: SaveGamePayload['characters'],
): DiffSection | null {
  const children: DiffSection[] = [];
  const maxLen = Math.max(before.length, after.length);

  for (let i = 0; i < maxLen; i++) {
    const section = diffCharacter(i as CharacterIndex, before[i], after[i]);
    if (section) children.push(section);
  }

  if (!children.length) return null;
  return {
    id: 'party',
    title: 'Party',
    changes: [],
    children,
  };
}

function diffBattle(
  before: SaveGamePayload['battle'],
  after: SaveGamePayload['battle'],
): DiffSection | null {
  const changes: DiffEntry[] = [];
  const keys = Object.keys(before) as (keyof typeof before)[];
  for (const key of keys) {
    pushChange(
      changes,
      `battle.${String(key)}`,
      String(key),
      before[key],
      after[key],
    );
  }
  if (!changes.length) return null;
  return { id: 'battle', title: 'Battle', changes };
}

function diffInventory(
  before: SaveGamePayload['inventory'],
  after: SaveGamePayload['inventory'],
): DiffSection | null {
  const children: DiffSection[] = [];

  const groups: {
    id: string;
    title: string;
    key: keyof typeof before;
    empty: number;
    resolveName: (id: number) => string | undefined;
  }[] = [
    {
      id: 'consumables',
      title: 'Consumables',
      key: 'consumables',
      empty: CONSUMABLES.EMPTY,
      resolveName: (id) => consumableHelpers.getById(id as never)?.displayName,
    },
    {
      id: 'keyItems',
      title: 'Key items',
      key: 'keyItems',
      empty: KEYITEMS.EMPTY,
      resolveName: (id) => keyItemHelpers.getById(id as never)?.displayName,
    },
    {
      id: 'weapons',
      title: 'Weapons',
      key: 'weapons',
      empty: WEAPONS.EMPTY,
      resolveName: (id) => weaponHelpers.getById(id as never)?.displayName,
    },
    {
      id: 'armors',
      title: 'Armors',
      key: 'armors',
      empty: ARMORS.EMPTY,
      resolveName: (id) => armorHelpers.getById(id as never)?.displayName,
    },
  ];

  for (const group of groups) {
    const changes: DiffEntry[] = [];
    diffIndexedArray(
      changes,
      `inventory.${String(group.key)}`,
      'Slot',
      before[group.key] as number[],
      after[group.key] as number[],
      (id) => formatItemId(id, group.resolveName, group.empty),
    );
    if (changes.length) {
      children.push({ id: group.id, title: group.title, changes });
    }
  }

  if ('storage' in before && 'storage' in after) {
    const changes: DiffEntry[] = [];
    diffIndexedArray(
      changes,
      'inventory.storage',
      'Storage slot',
      (before as { storage: ConsumableIndex[] }).storage,
      (after as { storage: ConsumableIndex[] }).storage,
      (id) =>
        formatItemId(
          id,
          (itemId) => consumableHelpers.getById(itemId as never)?.displayName,
          CONSUMABLES.EMPTY,
        ),
    );
    if (changes.length) {
      children.push({ id: 'storage', title: 'Storage', changes });
    }
  }

  if (!children.length) return null;
  return { id: 'inventory', title: 'Inventory', changes: [], children };
}

function diffLightWorld(
  before: SaveGamePayload['lightWorld'],
  after: SaveGamePayload['lightWorld'],
): DiffSection | null {
  const changes: DiffEntry[] = [];
  const scalarKeys = [
    'weapon',
    'armor',
    'experience',
    'level',
    'money',
    'health',
    'maxHealth',
    'attack',
    'defence',
    'weaponStrength',
    'armorDefence',
  ] as const;

  for (const key of scalarKeys) {
    pushChange(
      changes,
      `lightWorld.${key}`,
      key.charAt(0).toUpperCase() + key.slice(1),
      before[key],
      after[key],
    );
  }

  const itemChanges: DiffEntry[] = [];
  diffIndexedArray(
    itemChanges,
    'lightWorld.items',
    'Item slot',
    before.items,
    after.items,
    (id) =>
      formatItemId(
        id,
        (itemId) => lightWorldItemHelpers.getById(itemId as never)?.displayName,
        LIGHTWORLDITEMS.EMPTY,
      ),
  );

  const phoneChanges: DiffEntry[] = [];
  diffIndexedArray(
    phoneChanges,
    'lightWorld.phone',
    'Phone slot',
    before.phone,
    after.phone,
    (id) =>
      formatItemId(
        id,
        (itemId) => phoneContactHelpers.getById(itemId as never)?.displayName,
        PHONECONTACTS.EMPTY,
      ),
  );

  const children: DiffSection[] = [];
  if (itemChanges.length) {
    children.push({ id: 'lw-items', title: 'Items', changes: itemChanges });
  }
  if (phoneChanges.length) {
    children.push({ id: 'lw-phone', title: 'Phone', changes: phoneChanges });
  }

  if (!changes.length && !children.length) return null;

  return {
    id: 'lightWorld',
    title: 'Light World',
    changes,
    children: children.length ? children : undefined,
  };
}

function diffFlags(
  before: SaveGamePayload['flags'],
  after: SaveGamePayload['flags'],
): DiffSection | null {
  const changes: DiffEntry[] = [];
  const maxLen = Math.max(before.length, after.length);

  for (let i = 0; i < maxLen; i++) {
    const b = before[i] ?? 0;
    const a = after[i] ?? 0;
    if (b === a) continue;
    const flag = i as FlagIndex;
    changes.push({
      path: `flags.${i}`,
      label: getFlagLabel(flag),
      before: formatFlagValue(flag, b),
      after: formatFlagValue(flag, a),
    });
  }

  if (!changes.length) return null;
  return { id: 'flags', title: 'Flags', changes };
}

function countChanges(sections: DiffSection[]): number {
  return sections.reduce((total, section) => {
    let n = section.changes.length;
    if (section.children) {
      n += countChanges(section.children);
    }
    return total + n;
  }, 0);
}

function savePayloadsEqual(a: SaveGamePayload, b: SaveGamePayload): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function getBaselineRevision(
  baseline: SaveBaseline | undefined,
): number {
  if (!baseline) return 0;
  const capturedAt = baseline.capturedAt;
  return capturedAt instanceof Date
    ? capturedAt.getTime()
    : new Date(String(capturedAt)).getTime();
}

export function computeSaveDiff(
  current: SaveGamePayload,
  baseline: SaveBaseline,
  chapter: ChapterIndex,
): SaveDiffResult {
  const before = baseline.payload;

  if (savePayloadsEqual(before, current)) {
    return { sections: [], groups: [], totalChanges: 0 };
  }

  const sections: DiffSection[] = [];

  const overviewChanges: DiffEntry[] = [];
  for (const { key, label } of OVERVIEW_FIELDS) {
    if (key === 'plot') {
      pushChange(
        overviewChanges,
        String(key),
        label,
        getPlotPointLabel(chapter, before.plot),
        getPlotPointLabel(chapter, current.plot),
      );
      continue;
    }
    pushChange(overviewChanges, String(key), label, before[key], current[key]);
  }
  overviewChanges.push(...diffParty(before.party, current.party));
  overviewChanges.push(...diffRoom(before.room, current.room));

  if (overviewChanges.length) {
    sections.push({
      id: 'overview',
      title: 'Overview',
      changes: overviewChanges,
    });
  }

  const partySection = diffCharacters(before.characters, current.characters);
  if (partySection) sections.push(partySection);

  const battleSection = diffBattle(before.battle, current.battle);
  if (battleSection) sections.push(battleSection);

  const inventorySection = diffInventory(before.inventory, current.inventory);
  if (inventorySection) sections.push(inventorySection);

  const lightWorldSection = diffLightWorld(
    before.lightWorld,
    current.lightWorld,
  );
  if (lightWorldSection) sections.push(lightWorldSection);

  const flagsSection = diffFlags(before.flags, current.flags);
  if (flagsSection) sections.push(flagsSection);

  const groups: DiffGroup[] = sections.map((section) => ({
    id: section.id,
    title: section.title,
    entries: flattenDiffSection(section),
  }));

  return {
    sections,
    groups,
    totalChanges: countChanges(sections),
  };
}

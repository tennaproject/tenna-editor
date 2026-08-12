import type { SelectItem } from '@components';
import type { BaseProperties, SaveSlot } from '@types';
import type { ItemType } from '@components/Fields/ItemField';
import type {
  ArmorIndex,
  ChapterIndex,
  CharacterIndex,
  ConsumableIndex,
  FlagIndex,
  KeyItemIndex,
  LightWorldItemIndex,
  PhoneContactIndex,
  RoomIndex,
  SpellIndex,
  WeaponIndex,
} from '@data';
import {
  armorHelpers,
  chapterHelpers,
  characterHelpers,
  consumableHelpers,
  formatItemLabel,
  resolveChapterMeta,
  keyItemHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
  roomHelpers,
  spellHelpers,
  getStaticSpellDisplayName,
  weaponHelpers,
} from './data-helpers';
import {
  formatPlotPointLabel,
  getChapterPlotPointMeta,
  getChapterPlotPointValues,
} from './plot-point-helpers';

const itemOptionsCache = new Map<string, SelectItem[]>();
const roomOptionsCache = new Map<string, SelectItem[]>();
const loadoutOptionsCache = new Map<string, SelectItem[]>();
const spellOptionsCache = new Map<string, SelectItem[]>();
const lightWorldLoadoutOptionsCache = new Map<string, SelectItem[]>();
const partySlotOptionsCache = new Map<string, SelectItem[]>();
const chapterFlagSetCache = new Map<ChapterIndex, Set<FlagIndex>>();
const plotOptionsCache = new Map<ChapterIndex, SelectItem[]>();

// Entries the game never hands out sink below the rest, keeping the list a
// player actually needs at the top. Relative order is otherwise preserved.
export function unusedLast(items: SelectItem[]): SelectItem[] {
  return [
    ...items.filter((item) => !item.unused),
    ...items.filter((item) => item.unused),
  ];
}

export function getChapterFlagSet(chapter: ChapterIndex): Set<FlagIndex> {
  const cached = chapterFlagSetCache.get(chapter);
  if (cached) return cached;

  const flags = chapterHelpers.getById(chapter).content.flags as Set<FlagIndex>;
  chapterFlagSetCache.set(chapter, flags);
  return flags;
}

type LoadoutOptionType = 'weapon' | 'armor';
type LightWorldLoadoutType = 'weapon' | 'armor';

export function getChapterItemOptions(
  chapter: ChapterIndex,
  type: ItemType,
  // Part of the cache key: consumable overrides can read it too.
  saveSlot: SaveSlot,
): SelectItem[] {
  const key = `${chapter}:${type}:${saveSlot}`;
  const cached = itemOptionsCache.get(key);
  if (cached) return cached;

  const chapterContent = chapterHelpers.getById(chapter).content;
  let availableIds: Set<number>;
  let getMeta: (id: number) => BaseProperties | undefined;

  switch (type) {
    case 'consumable':
    case 'storage':
      availableIds = chapterContent.consumables as Set<number>;
      getMeta = (id) =>
        resolveChapterMeta(consumableHelpers.getById(id as ConsumableIndex), {
          chapter,
          saveSlot,
        });
      break;
    case 'keyItem':
      availableIds = chapterContent.keyItems as Set<number>;
      getMeta = (id) => keyItemHelpers.getById(id as KeyItemIndex);
      break;
    case 'weapon':
      availableIds = chapterContent.weapons as Set<number>;
      getMeta = (id) =>
        resolveChapterMeta(weaponHelpers.getById(id as WeaponIndex), {
          chapter,
        });
      break;
    case 'armor':
      availableIds = chapterContent.armors as Set<number>;
      getMeta = (id) =>
        resolveChapterMeta(armorHelpers.getById(id as ArmorIndex), {
          chapter,
        });
      break;
    case 'lightWorldItem':
      availableIds = chapterContent.lightWorld.items as Set<number>;
      getMeta = (id) =>
        lightWorldItemHelpers.getById(id as LightWorldItemIndex);
      break;
    case 'phoneContact':
      availableIds = chapterContent.lightWorld.phoneContacts as Set<number>;
      getMeta = (id) => phoneContactHelpers.getById(id as PhoneContactIndex);
      break;
  }

  const items = unusedLast(
    Array.from(availableIds).map((value) => {
      const meta = getMeta(value);
      return {
        id: `${value}`,
        label: formatItemLabel(meta, 'Unknown'),
        value,
        unused: meta?.unused,
      };
    }),
  );

  itemOptionsCache.set(key, items);
  return items;
}

export function getChapterRoomOptions(
  chapter: ChapterIndex,
  showNonSavepoint: boolean,
  showDogcheckedRooms: boolean,
): SelectItem[] {
  const key = `${chapter}:${showNonSavepoint ? 'all' : 'savepoint'}:${showDogcheckedRooms ? 'dogcheck' : 'nodogcheck'}`;
  const cached = roomOptionsCache.get(key);
  if (cached) return cached;

  const roomsSource = chapterHelpers.getById(chapter).content
    .rooms as Set<RoomIndex>;

  let entries = Array.from(roomsSource).map((roomId) => {
    const meta = roomHelpers.getById(roomId);
    const name = meta.displayName || roomHelpers.getName(roomId);
    return {
      roomId,
      name,
      hasSavePoint: meta.hasSavePoint,
      dogcheck: meta.dogcheck,
    };
  });

  if (!showNonSavepoint) {
    entries = entries.filter((entry) => entry.hasSavePoint);
  }

  if (!showDogcheckedRooms) {
    entries = entries.filter((entry) => !entry.dogcheck);
  }

  const items = entries.map(({ roomId, name }) => ({
    id: roomId.toString(),
    label: name,
    value: roomId,
  }));

  roomOptionsCache.set(key, items);
  return items;
}

export function getChapterLoadoutOptions(
  chapter: ChapterIndex,
  type: LoadoutOptionType,
  character: CharacterIndex,
  allowAllElements: boolean,
  allowedElementsOverride?: ReadonlySet<number>,
): SelectItem[] {
  const canUseCache = !allowedElementsOverride;
  const key = `${chapter}:${type}:${character}:${allowAllElements ? 'all' : 'restricted'}`;
  const cached = canUseCache ? loadoutOptionsCache.get(key) : undefined;
  if (cached) return cached;

  const chapterContent = chapterHelpers.getById(chapter).content;
  const chapterAllowedElements =
    type === 'weapon'
      ? (chapterContent.weapons as Set<number>)
      : (chapterContent.armors as Set<number>);

  const characterAllowedElements =
    allowedElementsOverride ??
    characterHelpers.getById(character)[
      type === 'weapon' ? 'allowedWeapons' : 'allowedArmors'
    ];

  const availableElements = allowAllElements
    ? chapterAllowedElements
    : new Set<number>(
        [...chapterAllowedElements].filter((id) =>
          characterAllowedElements.has(id as never),
        ),
      );

  const getMeta = (value: number) =>
    type === 'weapon'
      ? weaponHelpers.getById(value as WeaponIndex)
      : armorHelpers.getById(value as ArmorIndex);

  const items = unusedLast(
    [...availableElements].map((value) => {
      const meta = resolveChapterMeta(getMeta(value), { chapter });
      return {
        id: `${value}`,
        label: meta?.displayName ?? 'Unknown',
        value,
        unused: meta?.unused,
      };
    }),
  );

  if (canUseCache) {
    loadoutOptionsCache.set(key, items);
  }
  return items;
}

export function getChapterSpellOptions(
  chapter: ChapterIndex,
  character: CharacterIndex,
  allowAllItems: boolean,
): SelectItem[] {
  const key = `${chapter}:${character}:${allowAllItems ? 'all' : 'restricted'}`;
  const cached = spellOptionsCache.get(key);
  if (cached) return cached;

  const chapterSpells = chapterHelpers.getById(chapter).content.spells;
  const characterAllowedSpells =
    characterHelpers.getById(character).allowedSpells;

  const availableSpells = allowAllItems
    ? chapterSpells
    : new Set(
        [...characterAllowedSpells].filter((spell) => chapterSpells.has(spell)),
      );

  const items = unusedLast(
    Array.from(availableSpells).map((spell) => ({
      id: `${spell}`,
      label: getStaticSpellDisplayName(spell as SpellIndex),
      value: spell,
      unused: spellHelpers.getById(spell as SpellIndex)?.unused,
    })),
  );

  spellOptionsCache.set(key, items);
  return items;
}

export function getLightWorldLoadoutOptions(
  chapter: ChapterIndex,
  type: LightWorldLoadoutType,
): SelectItem[] {
  const key = `${chapter}:lw-${type}`;
  const cached = lightWorldLoadoutOptionsCache.get(key);
  if (cached) return cached;

  const availableElements = chapterHelpers.getById(chapter).content.lightWorld
    .items as Set<number>;

  const items = unusedLast(
    [...availableElements].map((value) => {
      const meta = lightWorldItemHelpers.getById(value as LightWorldItemIndex);
      return {
        id: `${value}`,
        label: meta.displayName,
        value,
        unused: meta.unused,
      };
    }),
  );

  lightWorldLoadoutOptionsCache.set(key, items);
  return items;
}

export function getPartySlotBaseOptions(
  chapter: ChapterIndex,
  slot: number,
  allowNonStandardParty: boolean,
): SelectItem[] {
  const key = `${chapter}:${slot}:${allowNonStandardParty ? 'all' : 'standard'}`;
  const cached = partySlotOptionsCache.get(key);
  if (cached) return cached;

  const chapterCharacters = chapterHelpers.getById(chapter).content
    .characters as Set<CharacterIndex>;

  let availableCharacters: CharacterIndex[];
  if (allowNonStandardParty) {
    availableCharacters = Array.from(chapterCharacters);
  } else {
    availableCharacters = [];
    for (const characterId of chapterCharacters.keys()) {
      const meta = characterHelpers.getById(characterId);
      for (const allowedSlot of meta.allowedSlots) {
        if (slot === allowedSlot) {
          availableCharacters.push(characterId as CharacterIndex);
        }
      }
    }
  }

  availableCharacters.sort();

  const items = availableCharacters.map((characterId) => ({
    id: `${characterId}`,
    label: characterHelpers.getById(characterId).displayName,
    value: characterId,
  }));

  partySlotOptionsCache.set(key, items);
  return items;
}

export function getChapterPlotOptions(chapter: ChapterIndex): SelectItem[] {
  const cached = plotOptionsCache.get(chapter);
  if (cached) return cached;

  const items = getChapterPlotPointValues(chapter).map((value) => {
    const meta = getChapterPlotPointMeta(chapter, value);
    return {
      id: value.toString(),
      label: formatPlotPointLabel(value, meta),
      value,
    };
  });

  plotOptionsCache.set(chapter, items);
  return items;
}

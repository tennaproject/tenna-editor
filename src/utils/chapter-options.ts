import type { SelectItem } from '@components';
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
  keyItemHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
  roomHelpers,
  spellHelpers,
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
): SelectItem[] {
  const key = `${chapter}:${type}`;
  const cached = itemOptionsCache.get(key);
  if (cached) return cached;

  const chapterContent = chapterHelpers.getById(chapter).content;
  let availableIds: Set<number>;
  let getDisplayName: (id: number) => string;

  switch (type) {
    case 'consumable':
    case 'storage':
      availableIds = chapterContent.consumables as Set<number>;
      getDisplayName = (id) =>
        formatItemLabel(
          consumableHelpers.getById(id as ConsumableIndex),
          'Unknown',
        );
      break;
    case 'keyItem':
      availableIds = chapterContent.keyItems as Set<number>;
      getDisplayName = (id) =>
        formatItemLabel(keyItemHelpers.getById(id as KeyItemIndex), 'Unknown');
      break;
    case 'weapon':
      availableIds = chapterContent.weapons as Set<number>;
      getDisplayName = (id) =>
        formatItemLabel(weaponHelpers.getById(id as WeaponIndex), 'Unknown');
      break;
    case 'armor':
      availableIds = chapterContent.armors as Set<number>;
      getDisplayName = (id) =>
        formatItemLabel(armorHelpers.getById(id as ArmorIndex), 'Unknown');
      break;
    case 'lightWorldItem':
      availableIds = chapterContent.lightWorld.items as Set<number>;
      getDisplayName = (id) =>
        formatItemLabel(
          lightWorldItemHelpers.getById(id as LightWorldItemIndex),
          'Unknown',
        );
      break;
    case 'phoneContact':
      availableIds = chapterContent.lightWorld.phoneContacts as Set<number>;
      getDisplayName = (id) =>
        formatItemLabel(
          phoneContactHelpers.getById(id as PhoneContactIndex),
          'Unknown',
        );
      break;
  }

  const items = Array.from(availableIds).map((value) => ({
    id: `${value}`,
    label: getDisplayName(value),
    value,
  }));

  itemOptionsCache.set(key, items);
  return items;
}

export function getChapterRoomOptions(
  chapter: ChapterIndex,
  allowAllElements: boolean,
): SelectItem[] {
  const key = `${chapter}:${allowAllElements ? 'all' : 'savepoint'}`;
  const cached = roomOptionsCache.get(key);
  if (cached) return cached;

  const roomsSource = chapterHelpers.getById(chapter).content
    .rooms as Set<RoomIndex>;

  let entries = Array.from(roomsSource).map((roomId) => {
    const meta = roomHelpers.getById(roomId);
    const name = formatItemLabel(
      meta,
      meta?.displayName || roomHelpers.getName(roomId),
    );
    return { roomId, name, hasSavePoint: meta?.hasSavePoint };
  });

  if (!allowAllElements) {
    entries = entries.filter((entry) => entry.hasSavePoint);
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
): SelectItem[] {
  const key = `${chapter}:${type}:${character}:${allowAllElements ? 'all' : 'restricted'}`;
  const cached = loadoutOptionsCache.get(key);
  if (cached) return cached;

  const chapterContent = chapterHelpers.getById(chapter).content;
  const chapterAllowedElements =
    type === 'weapon'
      ? (chapterContent.weapons as Set<number>)
      : (chapterContent.armors as Set<number>);

  const characterAllowedElements =
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

  const items = [...availableElements].map((value) => {
    const meta = getMeta(value);
    return {
      id: `${value}`,
      label: meta.displayName,
      value,
    };
  });

  loadoutOptionsCache.set(key, items);
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
    : characterAllowedSpells.intersection(chapterSpells);

  const items = Array.from(availableSpells).map((spell) => ({
    id: `${spell}`,
    label: spellHelpers.getById(spell as SpellIndex).displayName,
    value: spell,
  }));

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

  const items = [...availableElements].map((value) => {
    const meta = lightWorldItemHelpers.getById(value as LightWorldItemIndex);
    return {
      id: `${value}`,
      label: meta.displayName,
      value,
    };
  });

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
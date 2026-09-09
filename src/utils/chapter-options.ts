import type { SelectItem } from '@components';
import type { DataEntry, RoomEntry } from '@types';
import type { ItemType } from '@components/Fields/ItemField';
import {
  isDogcheckSafeRoom,
  type ChapterIndex,
  type CharacterIndex,
  type FlagIndex,
  type RoomIndex,
} from '@data';
import { chapterHelpers, characterHelpers } from './data-helpers';
import {
  getChapterDataEntries,
  isDataEntryAvailable,
} from './resolve-game-data';
import {
  formatPlotPointLabel,
  getChapterPlotPointMeta,
  getChapterPlotPointValues,
} from './plot-point-helpers';

const partySlotOptionsCache = new Map<string, SelectItem[]>();
const chapterFlagSetCache = new Map<ChapterIndex, Set<FlagIndex>>();
const plotOptionsCache = new Map<ChapterIndex, SelectItem[]>();

export function unusedLast(items: SelectItem[]): SelectItem[] {
  return [
    ...items.filter((item) => !item.unused),
    ...items.filter((item) => item.unused),
  ];
}

function entryOption(entry: DataEntry): SelectItem {
  return {
    id: String(entry.id),
    value: entry.id,
    label: entry.displayName,
    unused: entry.unused,
    tooltip: entry.description,
    dataPack: entry.packName,
  };
}

export function getChapterItemOptions(
  chapter: ChapterIndex,
  type: ItemType,
  entries: DataEntry[],
): SelectItem[] {
  const content = chapterHelpers.getById(chapter).content;
  const ids =
    type === 'lightWorldItem'
      ? content.lightWorld.items
      : type === 'phoneContact'
        ? content.lightWorld.phoneContacts
        : content[
            type === 'storage' || type === 'consumable'
              ? 'consumables'
              : type === 'keyItem'
                ? 'keyItems'
                : type === 'weapon'
                  ? 'weapons'
                  : 'armors'
          ];
  return unusedLast(getChapterDataEntries(entries, ids).map(entryOption));
}

export function getChapterRoomOptions(
  chapter: ChapterIndex,
  showNonSavepoint: boolean,
  showDogcheckedRooms: boolean,
  entries: RoomEntry[],
): SelectItem[] {
  return getChapterDataEntries(
    entries,
    chapterHelpers.getById(chapter).content.rooms,
  )
    .filter(
      (entry) =>
        (entry.dataPack && !entry.overridesBuiltIn) ||
        showNonSavepoint ||
        entry.hasSavePoint,
    )
    .filter(
      (entry) =>
        (entry.dataPack && !entry.overridesBuiltIn) ||
        showDogcheckedRooms ||
        isDogcheckSafeRoom(chapter, entry.id as RoomIndex),
    )
    .map((entry) => ({
      ...entryOption(entry),
      invalidReasons:
        (entry.dataPack && !entry.overridesBuiltIn) ||
        isDogcheckSafeRoom(chapter, entry.id as RoomIndex)
          ? undefined
          : ['dogcheck'],
    }));
}

export function getChapterLoadoutOptions(
  chapter: ChapterIndex,
  type: 'weapon' | 'armor',
  character: CharacterIndex,
  allowAllElements: boolean,
  entries: DataEntry[],
  allowedElementsOverride?: ReadonlySet<number>,
): SelectItem[] {
  const ids =
    chapterHelpers.getById(chapter).content[
      type === 'weapon' ? 'weapons' : 'armors'
    ];
  return unusedLast(
    getChapterDataEntries(entries, ids)
      .filter(
        (entry) =>
          allowAllElements ||
          isDataEntryAvailable(entry, character, allowedElementsOverride),
      )
      .map(entryOption),
  );
}

export function getChapterSpellOptions(
  chapter: ChapterIndex,
  character: CharacterIndex,
  allowAllItems: boolean,
  entries: DataEntry[],
): SelectItem[] {
  return unusedLast(
    getChapterDataEntries(
      entries,
      chapterHelpers.getById(chapter).content.spells,
    )
      .filter(
        (entry) => allowAllItems || isDataEntryAvailable(entry, character),
      )
      .map(entryOption),
  );
}

export function getLightWorldLoadoutOptions(
  chapter: ChapterIndex,
  entries: DataEntry[],
): SelectItem[] {
  return unusedLast(
    getChapterDataEntries(
      entries,
      chapterHelpers.getById(chapter).content.lightWorld.items,
    ).map(entryOption),
  );
}

export function getChapterFlagSet(chapter: ChapterIndex): Set<FlagIndex> {
  const cached = chapterFlagSetCache.get(chapter);
  if (cached) return cached;

  const flags = chapterHelpers.getById(chapter).content.flags as Set<FlagIndex>;
  chapterFlagSetCache.set(chapter, flags);
  return flags;
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

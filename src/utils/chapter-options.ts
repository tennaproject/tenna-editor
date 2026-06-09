import type { SelectItem } from '@components';
import type { ChapterIndex, CharacterIndex } from '@data';
import { chapterHelpers, characterHelpers } from './data-helpers';

const partySlotOptionsCache = new Map<string, SelectItem[]>();

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

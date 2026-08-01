import {
  ARMORS,
  ARMORS_META,
  CONSUMABLES,
  CONSUMABLES_META,
  FLAGS,
  FLAGS_META,
  KEYITEMS,
  KEYITEMS_META,
  WEAPONS,
  WEAPONS_META,
  CHARACTERS,
  CHARACTERS_META,
  CHAPTERS,
  CHAPTERS_META,
  ROOMS,
  ROOMS_META,
  SPELLS,
  SPELLS_META,
  LIGHTWORLDITEMS,
  LIGHTWORLDITEMS_META,
  PHONECONTACTS,
  PHONECONTACTS_META,
  ENEMIES,
  ENEMIES_META,
  PARTY_MEMBERS,
  type ArmorIndex,
  type WeaponIndex,
} from '@data';
import type { BaseProperties, WithOverrides } from '@types';
import type { ChapterIndex } from '../data/chapters';
import type { FlagIndex, FlagProperties } from '../data/flags';
import type { SpellIndex } from '../data/spells';

function buildNameById<TIndex extends number, TName extends string>(
  registry: Record<TName, TIndex>,
): Record<TIndex, TName> {
  const nameById = {} as Record<TIndex, TName>;
  for (const [name, id] of Object.entries(registry) as [TName, TIndex][]) {
    nameById[id] = name;
  }
  return nameById;
}

function createDataHelpers<
  TIndex extends number,
  TName extends string,
  TProperties extends BaseProperties,
>(registry: Record<TName, TIndex>, definitions: Record<TIndex, TProperties>) {
  const nameById = buildNameById(registry);

  return {
    getIndex: (name: TName): TIndex => registry[name],
    getById: (id: TIndex): TProperties => definitions[id],
    getByName: (name: TName): TProperties => definitions[registry[name]],
    getName: (id: TIndex): TName => nameById[id],
    getAllNames: (): TName[] => Object.keys(registry) as TName[],
    getAll: (): (TProperties & { id: TIndex })[] => {
      return Object.entries(registry).map(([_, id]) => ({
        id: id as TIndex,
        ...definitions[id as TIndex],
      }));
    },
  };
}

export function formatItemLabel(
  meta: BaseProperties | undefined,
  fallback: string,
) {
  return meta?.displayName ?? fallback;
}

export function resolveChapterMeta<
  A extends { chapter: ChapterIndex },
  T extends WithOverrides<T, A>,
>(meta: T | undefined, args: A): T | undefined {
  if (!meta) return undefined;

  return { ...meta, ...meta.getOverrides?.(args) };
}

export function getStaticSpellDisplayName(spell: SpellIndex) {
  return spellHelpers.getById(spell)?.displayName ?? String(spell);
}

export interface SpellEquipment {
  weapon: WeaponIndex;
  armors: readonly ArmorIndex[];
}

const EMPTY_SPELL_EQUIPMENT: SpellEquipment = {
  weapon: WEAPONS.EMPTY,
  armors: [],
};

export function getSpellDisplayName(
  spell: SpellIndex,
  chapter: ChapterIndex,
  plot: number,
  flags: readonly unknown[],
  equipment: SpellEquipment = EMPTY_SPELL_EQUIPMENT,
) {
  const meta = spellHelpers.getById(spell);
  const overrides = meta?.getOverrides?.({
    chapter,
    plot,
    flags,
    ...equipment,
  });
  return overrides?.displayName ?? getStaticSpellDisplayName(spell);
}

// Meta
export const flagHelpers = createDataHelpers(
  FLAGS,
  FLAGS_META as Record<FlagIndex, FlagProperties>,
);
export const chapterHelpers = createDataHelpers(CHAPTERS, CHAPTERS_META);
export const roomHelpers = createDataHelpers(ROOMS, ROOMS_META);

// Characters
export const characterHelpers = createDataHelpers(CHARACTERS, CHARACTERS_META);

export function getChapterPartyMembers(chapter: ChapterIndex) {
  const characters = chapterHelpers.getById(chapter).content.characters;

  return PARTY_MEMBERS.filter((character) => characters.has(character));
}

export const spellHelpers = createDataHelpers(SPELLS, SPELLS_META);
export const enemyHelpers = createDataHelpers(ENEMIES, ENEMIES_META);

// Inventory
export const consumableHelpers = createDataHelpers(
  CONSUMABLES,
  CONSUMABLES_META,
);
export const keyItemHelpers = createDataHelpers(KEYITEMS, KEYITEMS_META);
export const weaponHelpers = createDataHelpers(WEAPONS, WEAPONS_META);
export const armorHelpers = createDataHelpers(ARMORS, ARMORS_META);

// Light World
export const lightWorldItemHelpers = createDataHelpers(
  LIGHTWORLDITEMS,
  LIGHTWORLDITEMS_META,
);
export const phoneContactHelpers = createDataHelpers(
  PHONECONTACTS,
  PHONECONTACTS_META,
);

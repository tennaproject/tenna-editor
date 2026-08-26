import {
  CHARACTERS,
  CHARACTERS_META,
  KEYITEMS,
  PHONECONTACTS,
  TEMPLATE_FLAGS,
  TEMPLATE_LIGHT_WORLD_WEAPON,
  TEMPLATE_PARTIES,
  TEMPLATE_RANDOM_FLAGS,
  TEMPLATE_START_POINTS,
  type ArmorIndex,
  type ChapterIndex,
  type CharacterIndex,
  type ConsumableIndex,
  type KeyItemIndex,
  type LightWorldItemIndex,
  type PhoneContactIndex,
  type SpellIndex,
  type TemplateParty,
  type WeaponIndex,
} from '@data';
import {
  SAVE_SCHEMA,
  type CharacterV1,
  type CharacterV2,
  type LightWorld,
  type Save,
  type SaveV1,
  type SaveV2,
  type WeaponStats,
  type WeaponStatsV2,
} from '@types';
import { createBaseline } from './save-baseline';
import { randomInt } from './random';

const FLAG_COUNTS = { 1: 9999, 2: 2500 } as const;

function zeroes(length: number): number[] {
  return new Array<number>(length).fill(0);
}

function padSpells(spells: SpellIndex[]): SpellIndex[] {
  const padded = zeroes(12) as SpellIndex[];
  spells.forEach((spell, index) => {
    padded[index] = spell;
  });
  return padded;
}

function emptyWeaponStats(): WeaponStats[] {
  return Array.from({ length: 4 }, () => ({
    attack: 0,
    defence: 0,
    magic: 0,
    bolts: 0,
    grazeAmount: 0,
    grazeSize: 0,
    boltSpeed: 0,
    special: 0,
  }));
}

function emptyWeaponStatsV2(): WeaponStatsV2[] {
  return emptyWeaponStats().map((stats) => ({
    ...stats,
    element: 0,
    elementAmount: 0,
  }));
}

function buildCharacter(
  character: CharacterIndex,
  chapter: ChapterIndex,
  party: TemplateParty,
  weaponStyle: number | string,
): CharacterV1 {
  const loadout = party[character];
  const stats = CHARACTERS_META[character].baseStats[chapter];

  return {
    health: stats.maxHealth,
    maxHealth: stats.maxHealth,
    attack: stats.attack,
    defence: stats.defence,
    magic: stats.magic,
    guts: 0,
    weapon: loadout?.weapon ?? (0 as WeaponIndex),
    primaryArmor: loadout?.primaryArmor ?? (0 as ArmorIndex),
    secondaryArmor: loadout?.secondaryArmor ?? (0 as ArmorIndex),
    weaponStyle,
    weaponStats: emptyWeaponStats(),
    spells: padSpells(loadout?.spells ?? []),
  };
}

function buildLightWorld(chapter: ChapterIndex): LightWorld {
  const phone = zeroes(8) as PhoneContactIndex[];
  phone[0] = PHONECONTACTS.CALL_HOME;

  return {
    weapon: TEMPLATE_LIGHT_WORLD_WEAPON[chapter],
    armor: 3,
    experience: 0,
    level: 1,
    money: 2,
    health: 20,
    maxHealth: 20,
    attack: 10,
    defence: 10,
    weaponStrength: 1,
    armorDefence: 0,
    items: zeroes(8) as LightWorldItemIndex[],
    phone,
  };
}

function buildFlags(chapter: ChapterIndex, flagCount: number): number[] {
  const flags = zeroes(flagCount);

  for (const [index, value] of Object.entries(TEMPLATE_FLAGS[chapter])) {
    flags[Number(index)] = value;
  }

  for (const { flag, max } of TEMPLATE_RANDOM_FLAGS) {
    flags[flag] = randomInt(max);
  }

  return flags;
}

function buildKeyItems(length: number): KeyItemIndex[] {
  const keyItems = zeroes(length) as KeyItemIndex[];
  keyItems[0] = KEYITEMS.CELL_PHONE;
  return keyItems;
}

function buildMeta<Format extends 1 | 2, Chapter extends ChapterIndex>(
  format: Format,
  chapter: Chapter,
) {
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    format,
    createdAt: now,
    modifiedAt: now,
    schema: SAVE_SCHEMA,
    chapter,
    slot: 0 as const,
    isCompletionSave: false,
    name: '',
    source: { platform: 'pc' as const },
  };
}

function createTemplateSaveV1(): SaveV1 {
  const party = TEMPLATE_PARTIES[1];
  const start = TEMPLATE_START_POINTS[1];

  return {
    meta: buildMeta(1, 1),
    playerName: 'KRIS',
    vesselName: '',
    party: [CHARACTERS.KRIS, CHARACTERS.EMPTY, CHARACTERS.EMPTY],
    money: 0,
    xp: 0,
    lv: 1,
    inv: 0,
    invc: 1,
    inDarkWorld: start.inDarkWorld,
    characters: [
      CHARACTERS.EMPTY,
      CHARACTERS.KRIS,
      CHARACTERS.SUSIE,
      CHARACTERS.RALSEI,
    ].map((character) => buildCharacter(character, 1, party, 'Normal')),
    battle: {
      boltSpeed: 100,
      grazeAmount: 100,
      grazeSize: 100,
      tension: 0,
      maxTension: 250,
    },
    inventory: {
      consumables: zeroes(13) as ConsumableIndex[],
      keyItems: buildKeyItems(13),
      weapons: zeroes(13) as WeaponIndex[],
      armors: zeroes(13) as ArmorIndex[],
    },
    lightWorld: buildLightWorld(1),
    flags: buildFlags(1, FLAG_COUNTS[1]),
    plot: start.plot,
    room: start.room,
    time: 0,
  };
}

function createTemplateSaveV2(chapter: 2 | 3 | 4 | 5): SaveV2 {
  const party = TEMPLATE_PARTIES[chapter];
  const start = TEMPLATE_START_POINTS[chapter];

  const characters: CharacterV2[] = [
    CHARACTERS.EMPTY,
    CHARACTERS.KRIS,
    CHARACTERS.SUSIE,
    CHARACTERS.RALSEI,
    CHARACTERS.NOELLE,
  ].map((character) => ({
    ...buildCharacter(character, chapter, party, 0),
    weaponStats: emptyWeaponStatsV2(),
  }));

  return {
    meta: buildMeta(2, chapter),
    playerName: 'KRIS',
    vesselName: '',
    party: [CHARACTERS.KRIS, CHARACTERS.EMPTY, CHARACTERS.EMPTY],
    money: 0,
    xp: 0,
    lv: 1,
    inv: 0,
    invc: 1,
    inDarkWorld: start.inDarkWorld,
    characters,
    battle: {
      boltSpeed: 100,
      grazeAmount: 100,
      grazeSize: 100,
      tension: 0,
      maxTension: 250,
    },
    inventory: {
      consumables: zeroes(13) as ConsumableIndex[],
      keyItems: buildKeyItems(13),
      weapons: zeroes(48) as WeaponIndex[],
      armors: zeroes(48) as ArmorIndex[],
      storage: zeroes(72) as ConsumableIndex[],
    },
    lightWorld: buildLightWorld(chapter),
    flags: buildFlags(chapter, FLAG_COUNTS[2]),
    plot: start.plot,
    room: start.room,
    time: 0,
  };
}

export function createTemplateSave(chapter: ChapterIndex): Save {
  const save: Save =
    chapter === 1 ? createTemplateSaveV1() : createTemplateSaveV2(chapter);

  save.meta.baseline = createBaseline(save, 'upload');

  return save;
}

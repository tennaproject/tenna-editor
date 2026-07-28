import {
  ARMORS_META,
  CHARACTERS_META,
  WEAPONS_META,
  type ArmorIndex,
  type ChapterIndex,
  type CharacterIndex,
  type WeaponIndex,
} from '@data';
import type { CharacterV1, EquipmentStats } from '@types';

export type LoadoutEquipmentType = 'weapon' | 'primaryArmor' | 'secondaryArmor';

const EQUIPMENT_STAT_SLOT: Record<LoadoutEquipmentType, number> = {
  weapon: 0,
  primaryArmor: 1,
  secondaryArmor: 2,
};

interface EquipmentProperties {
  stats: EquipmentStats;
  getOverrides?: (args: {
    chapter: ChapterIndex;
  }) => Partial<EquipmentProperties>;
}

export function getEquipmentStats(
  type: LoadoutEquipmentType,
  id: WeaponIndex | ArmorIndex,
  chapter: ChapterIndex,
): EquipmentStats | undefined {
  const meta = (
    type === 'weapon'
      ? WEAPONS_META[id as WeaponIndex]
      : ARMORS_META[id as ArmorIndex]
  ) as EquipmentProperties | undefined;

  if (!meta) return undefined;

  return meta.getOverrides?.({ chapter }).stats ?? meta.stats;
}

export function syncEquipmentStats(
  character: CharacterV1,
  type: LoadoutEquipmentType,
  chapter: ChapterIndex,
) {
  const stats = getEquipmentStats(type, character[type], chapter);
  const storedStats = character.weaponStats[EQUIPMENT_STAT_SLOT[type]];

  if (!stats || !storedStats) return false;

  storedStats.attack = stats.attack;
  storedStats.defence = stats.defence;
  storedStats.magic = stats.magic;
  return true;
}

export function syncAllEquipmentStats(
  character: CharacterV1,
  chapter: ChapterIndex,
) {
  syncEquipmentStats(character, 'weapon', chapter);
  syncEquipmentStats(character, 'primaryArmor', chapter);
  syncEquipmentStats(character, 'secondaryArmor', chapter);
}

export function getEffectiveCharacterStats(
  character: CharacterV1,
): EquipmentStats {
  const effective = {
    attack: character.attack,
    defence: character.defence,
    magic: character.magic,
  };

  for (const stats of character.weaponStats.slice(0, 3)) {
    effective.attack += stats.attack;
    effective.defence += stats.defence;
    effective.magic += stats.magic;
  }

  return effective;
}

export function resetCharacterCoreStats(
  character: CharacterV1,
  characterId: CharacterIndex,
  chapter: ChapterIndex,
) {
  const baseline = CHARACTERS_META[characterId]?.baseStats[chapter];
  if (!baseline) return false;

  character.attack = baseline.attack;
  character.defence = baseline.defence;
  character.magic = baseline.magic;
  syncAllEquipmentStats(character, chapter);
  return true;
}

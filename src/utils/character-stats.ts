import {
  CHARACTERS_META,
  type ArmorIndex,
  type ChapterIndex,
  type CharacterIndex,
  type WeaponIndex,
} from '@data';
import type { CharacterV1, EquipmentStats } from '@types';
import { compactBigInt, toBigInt } from './big-integer';

export type LoadoutEquipmentType = 'weapon' | 'primaryArmor' | 'secondaryArmor';

const EQUIPMENT_STAT_SLOT: Record<LoadoutEquipmentType, number> = {
  weapon: 0,
  primaryArmor: 1,
  secondaryArmor: 2,
};

export interface ResolvedEquipmentLookup {
  weapons: ReadonlyMap<number, { stats?: EquipmentStats }>;
  armors: ReadonlyMap<number, { stats?: EquipmentStats }>;
}

export function getEquipmentStats(
  type: LoadoutEquipmentType,
  id: WeaponIndex | ArmorIndex,
  resolved: ResolvedEquipmentLookup,
): EquipmentStats | undefined {
  const group = type === 'weapon' ? resolved.weapons : resolved.armors;
  return group.get(id)?.stats;
}

export function syncEquipmentStats(
  character: CharacterV1,
  type: LoadoutEquipmentType,
  resolved: ResolvedEquipmentLookup,
) {
  const stats = getEquipmentStats(type, character[type], resolved);
  const storedStats = character.weaponStats[EQUIPMENT_STAT_SLOT[type]];

  if (!stats || !storedStats) return false;

  storedStats.attack = stats.attack;
  storedStats.defence = stats.defence;
  storedStats.magic = stats.magic;
  return true;
}

export function syncAllEquipmentStats(
  character: CharacterV1,
  resolved: ResolvedEquipmentLookup,
) {
  syncEquipmentStats(character, 'weapon', resolved);
  syncEquipmentStats(character, 'primaryArmor', resolved);
  syncEquipmentStats(character, 'secondaryArmor', resolved);
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
    effective.attack = addStat(effective.attack, stats.attack);
    effective.defence = addStat(effective.defence, stats.defence);
    effective.magic = addStat(effective.magic, stats.magic);
  }

  return effective;
}

function addStat(value: number, bonus: number): number {
  if (typeof value !== 'number') {
    return compactBigInt(toBigInt(value) + BigInt(bonus)) as number;
  }
  return value + bonus;
}

export function resetCharacterCoreStats(
  character: CharacterV1,
  characterId: CharacterIndex,
  chapter: ChapterIndex,
  resolved: ResolvedEquipmentLookup,
) {
  const baseline = CHARACTERS_META[characterId]?.baseStats[chapter];
  if (!baseline) return false;

  character.attack = baseline.attack;
  character.defence = baseline.defence;
  character.magic = baseline.magic;
  syncAllEquipmentStats(character, resolved);
  return true;
}

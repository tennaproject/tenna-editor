import type { BaseProperties, EquipmentStats, WithOverrides } from '@types';
import type { ChapterIndex } from './chapters';
import { EQUIPMENT_ABILITIES, EQUIPMENT_ICONS } from './equipment';
import type { EquipmentAbilityIndex, EquipmentIconIndex } from './equipment';

export const WEAPONS = {
  EMPTY: 0,
  WOOD_BLADE: 1,
  MANE_AX: 2,
  RED_SCARF: 3,
  EVERYBODY_WEAPON: 4,
  SPOOKYSWORD: 5,
  BRAVE_AX: 6,
  DEVILSKNIFE: 7,
  TREFOIL: 8,
  RAGGER: 9,
  DAINTY_SCARF: 10,
  TWISTED_SWD: 11,
  SNOW_RING: 12,
  THORN_RING: 13,
  BOUNCE_BLADE: 14,
  CHEER_SCARF: 15,
  MECHA_SABER: 16,
  AUTO_AXE: 17,
  FIBER_SCARF: 18,
  RAGGER2: 19,
  BROKEN_SWD: 20,
  PUPPET_SCARF: 21,
  FREEZE_RING: 22,
  SABER10: 23,
  TOXIC_AXE: 24,
  FLEX_SCARF: 25,
  BLACK_SHARD: 26,
  JINGLE_BLADE: 50,
  SCARF_MARK: 51,
  JUSTICE_AXE: 52,
  WINGLADE: 53,
  ABSORB_AX: 54,
  WOOD_BLADE_2: 30,
  THATCHET: 31,
  BLUE_SHOES: 32,
  AQUA_KNIFE: 33,
  FLOWERY_SCARF: 34,
  BROKEN_SCARF: 35,
  GILDED_ROSE: 36,
  MISTLE_WP: 37,
} as const;

export type WeaponIndex = (typeof WEAPONS)[keyof typeof WEAPONS];
export type WeaponName = keyof typeof WEAPONS;

interface WeaponProperties
  extends
    BaseProperties,
    WithOverrides<WeaponProperties, { chapter: ChapterIndex }> {
  stats: EquipmentStats;
  icon?: EquipmentIconIndex;
  ability?: EquipmentAbilityIndex;
}

export const WEAPONS_META: Record<WeaponIndex, WeaponProperties> = {
  [WEAPONS.EMPTY]: {
    displayName: 'Empty',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.EMPTY,
  },
  [WEAPONS.WOOD_BLADE]: {
    displayName: 'Wood Blade',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
  },
  [WEAPONS.MANE_AX]: {
    displayName: 'Mane Ax',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
  },
  [WEAPONS.RED_SCARF]: {
    displayName: 'Red Scarf',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.EVERYBODY_WEAPON]: {
    displayName: 'EverybodyWeapon',
    stats: { attack: 12, defence: 6, magic: 8 },
    icon: EQUIPMENT_ICONS.EMPTY,
  },
  [WEAPONS.SPOOKYSWORD]: {
    displayName: 'Spookysword',
    stats: { attack: 2, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.SPOOKINESS_UP,
  },
  [WEAPONS.BRAVE_AX]: {
    displayName: 'Brave Ax',
    stats: { attack: 2, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.GUTS_UP,
  },
  [WEAPONS.DEVILSKNIFE]: {
    displayName: 'Devilsknife',
    stats: { attack: 5, defence: 0, magic: 4 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.BUSTER_TP_DOWN,
  },
  [WEAPONS.TREFOIL]: {
    displayName: 'Trefoil',
    stats: { attack: 4, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.MONEY_EARNED_UP,
  },
  [WEAPONS.RAGGER]: {
    displayName: 'Ragger',
    stats: { attack: 2, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.DAINTY_SCARF]: {
    displayName: 'DaintyScarf',
    stats: { attack: 0, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.FLUFFINESS_UP,
  },
  [WEAPONS.TWISTED_SWD]: {
    displayName: 'TwistedSwd',
    stats: { attack: 16, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.TRANCE,
  },
  [WEAPONS.SNOW_RING]: {
    displayName: 'SnowRing',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.RING,
  },
  [WEAPONS.THORN_RING]: {
    displayName: 'ThornRing',
    stats: { attack: 14, defence: 0, magic: 12 },
    icon: EQUIPMENT_ICONS.RING,
    ability: EQUIPMENT_ABILITIES.TRANCE_RING,
  },
  [WEAPONS.BOUNCE_BLADE]: {
    displayName: 'BounceBlade',
    stats: { attack: 2, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.DEFEND_UP,
  },
  [WEAPONS.CHEER_SCARF]: {
    displayName: 'CheerScarf',
    stats: { attack: 1, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.SMILEY,
  },
  [WEAPONS.MECHA_SABER]: {
    displayName: 'MechaSaber',
    stats: { attack: 4, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.ANNOYING,
  },
  [WEAPONS.AUTO_AXE]: {
    displayName: 'AutoAxe',
    stats: { attack: 4, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.BAD_IDEA,
  },
  [WEAPONS.FIBER_SCARF]: {
    displayName: 'FiberScarf',
    stats: { attack: 2, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
    getOverrides: ({ chapter }) => {
      if (chapter === 3) {
        return {
          stats: { attack: 3, defence: 0, magic: 2 },
        };
      }

      return {};
    },
  },
  [WEAPONS.RAGGER2]: {
    displayName: 'Ragger2',
    stats: { attack: 5, defence: 0, magic: -1 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.PRICKLY,
  },
  [WEAPONS.BROKEN_SWD]: {
    displayName: 'BrokenSwd',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.FAILURE,
  },
  [WEAPONS.PUPPET_SCARF]: {
    displayName: 'PuppetScarf',
    stats: { attack: 10, defence: 0, magic: -6 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.FREEZE_RING]: {
    displayName: 'FreezeRing',
    stats: { attack: 4, defence: 0, magic: 4 },
    icon: EQUIPMENT_ICONS.RING,
  },
  [WEAPONS.SABER10]: {
    displayName: 'Saber10',
    stats: { attack: 6, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
  },
  [WEAPONS.TOXIC_AXE]: {
    displayName: 'ToxicAxe',
    stats: { attack: 6, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
  },
  [WEAPONS.FLEX_SCARF]: {
    displayName: 'FlexScarf',
    stats: { attack: 4, defence: 0, magic: 1 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.BLACK_SHARD]: {
    displayName: 'BlackShard',
    stats: { attack: 16, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SHARD,
    ability: EQUIPMENT_ABILITIES.SLAY_DARK,
  },
  [WEAPONS.JINGLE_BLADE]: {
    displayName: 'JingleBlade',
    stats: { attack: 7, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.FESTIVE,
  },
  [WEAPONS.SCARF_MARK]: {
    displayName: 'ScarfMark',
    stats: { attack: 4, defence: 1, magic: 1 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.JUSTICE_AXE]: {
    displayName: 'JusticeAxe',
    stats: { attack: 12, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.UNKNOWN_WEAPON,
  },
  [WEAPONS.WINGLADE]: {
    displayName: 'Winglade',
    stats: { attack: 8, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.MONEY_5_UP,
  },
  [WEAPONS.ABSORB_AX]: {
    displayName: 'AbsorbAx',
    stats: { attack: 8, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.VAMPIRE,
  },
  [WEAPONS.WOOD_BLADE_2]: {
    displayName: 'WoodBlade2',
    stats: { attack: 10, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.COOLNESS,
  },
  [WEAPONS.THATCHET]: {
    displayName: 'Thatchet',
    stats: { attack: 10, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.WICKED,
  },
  [WEAPONS.BLUE_SHOES]: {
    displayName: 'BlueShoes',
    stats: { attack: 2, defence: 4, magic: 6 },
    icon: EQUIPMENT_ICONS.BLUE,
    ability: EQUIPMENT_ABILITIES.PACIFY_0_TP,
  },
  [WEAPONS.AQUA_KNIFE]: {
    displayName: 'AquaKnife',
    stats: { attack: 10, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.AQUA,
    ability: EQUIPMENT_ABILITIES.CRITICAL,
  },
  [WEAPONS.FLOWERY_SCARF]: {
    displayName: 'FloweryScarf',
    stats: { attack: 70, defence: 70, magic: 70 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.THE_BEST,
  },
  [WEAPONS.BROKEN_SCARF]: {
    displayName: 'BrokenScarf',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.GILDED_ROSE]: {
    displayName: 'GildedRose',
    stats: { attack: 16, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.RING,
  },
  [WEAPONS.MISTLE_WP]: {
    displayName: 'MistleWP',
    stats: { attack: 6, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
};

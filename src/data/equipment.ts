import type { BaseProperties, EquipmentStats } from '@types';

export const EQUIPMENT_ICONS = {
  EMPTY: 0,
  SWORD: 1,
  AXE: 2,
  SCARF: 3,
  ARMOR: 4,
  MAGIC: 5,
  ARROW_DOWN_RIGHT: 6,
  ARROW_UP_RIGHT: 7,
  ARROW_DOWN: 8,
  FLAME: 9,
  SMILE: 10,
  DOG: 11,
  FLUFF: 12,
  RUDE: 13,
  RING: 14,
  LOLIPOP: 15,
  EXCLAMATION: 16,
  SNOWFLAKE: 17,
  SHARD: 18,
  GINGER: 19,
  PACIFY: 20,
  FLOWERY: 21,
  SETH: 22,
  ORANGE: 23,
  BLUE: 24,
  YELLOW: 25,
  GREEN: 26,
  AQUA: 27,
  ARROW_UP: 28,
  ABILITY_ARMOR: 29,
  ABILITY_MAGIC: 30,
  ABILITY_ARROW_DOWN_RIGHT: 31,
  ABILITY_ARROW_UP_RIGHT: 32,
  ABILITY_SMILE: 33,
  ABILITY_DOG: 34,
  ABILITY_RUDE: 35,
  ABILITY_RING: 36,
  ABILITY_SHARD: 37,
  ABILITY_PACIFY: 38,
} as const;

export type EquipmentIconIndex =
  (typeof EQUIPMENT_ICONS)[keyof typeof EQUIPMENT_ICONS];
export type EquipmentIconName = keyof typeof EQUIPMENT_ICONS;

export const EQUIPMENT_STAT_ICONS: Record<
  keyof EquipmentStats,
  EquipmentIconIndex
> = {
  attack: EQUIPMENT_ICONS.SWORD,
  defence: EQUIPMENT_ICONS.ARMOR,
  magic: EQUIPMENT_ICONS.MAGIC,
};

export const EQUIPMENT_STAT_ORDER = [
  'attack',
  'defence',
  'magic',
] as const satisfies readonly (keyof EquipmentStats)[];

export const EQUIPMENT_ABILITIES = {
  // Weapons
  SPOOKINESS_UP: 0,
  GUTS_UP: 1,
  BUSTER_TP_DOWN: 2,
  MONEY_EARNED_UP: 3,
  FLUFFINESS_UP: 4,
  TRANCE: 5,
  TRANCE_RING: 6,
  DEFEND_UP: 7,
  SMILEY: 8,
  ANNOYING: 9,
  BAD_IDEA: 10,
  PRICKLY: 11,
  FAILURE: 12,
  SLAY_DARK: 13,
  COOLNESS: 14,
  WICKED: 15,
  PACIFY_0_TP: 16,
  CRITICAL: 17,
  THE_BEST: 18,
  FESTIVE: 19,
  UNKNOWN_WEAPON: 20,
  MONEY_5_UP: 21,
  VAMPIRE: 22,
  // Armors
  GRAZE_AREA: 23,
  CUTENESS: 24,
  GRAZE_TIME: 25,
  TP_GAIN: 26,
  UNKNOWN_ARMOR: 27,
  ELEC_HOLY: 28,
  ATTACK_UP: 29,
  MONEY_30_UP: 30,
  DARK_STAR: 31,
  HEAL_UP: 32,
  HAS_ANTENNA: 33,
  CAT_DEFEND: 34,
  MONEY_90_DOWN: 35,
  INV_TIME_UP: 36,
  SKILL_20_PERCENT: 37,
  SCYTHE_TP_DOWN: 38,
  DEFEND_HEAL: 39,
  ELEGANCE: 40,
  MONEY_10_DOWN: 41,
} as const;

export type EquipmentAbilityIndex =
  (typeof EQUIPMENT_ABILITIES)[keyof typeof EQUIPMENT_ABILITIES];
export type EquipmentAbilityName = keyof typeof EQUIPMENT_ABILITIES;

interface EquipmentAbilityProperties extends BaseProperties {
  icon: EquipmentIconIndex;
}

export const EQUIPMENT_ABILITIES_META: Record<
  EquipmentAbilityIndex,
  EquipmentAbilityProperties
> = {
  [EQUIPMENT_ABILITIES.SPOOKINESS_UP]: {
    displayName: 'Spookiness UP',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.GUTS_UP]: {
    displayName: 'Guts Up',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.BUSTER_TP_DOWN]: {
    displayName: 'Buster TP DOWN',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_DOWN_RIGHT,
  },
  [EQUIPMENT_ABILITIES.MONEY_EARNED_UP]: {
    displayName: 'Money Earned UP',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.FLUFFINESS_UP]: {
    displayName: 'Fluffiness UP',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  // TwistedSwd
  [EQUIPMENT_ABILITIES.TRANCE]: {
    displayName: 'Trance',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_DOWN_RIGHT,
  },
  // ThornRing
  [EQUIPMENT_ABILITIES.TRANCE_RING]: {
    displayName: 'Trance',
    icon: EQUIPMENT_ICONS.ABILITY_RING,
  },
  [EQUIPMENT_ABILITIES.DEFEND_UP]: {
    displayName: 'Defense',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.SMILEY]: {
    displayName: 'Smiley',
    icon: EQUIPMENT_ICONS.ABILITY_SMILE,
  },
  [EQUIPMENT_ABILITIES.ANNOYING]: {
    displayName: 'Annoying',
    icon: EQUIPMENT_ICONS.ABILITY_RUDE,
  },
  [EQUIPMENT_ABILITIES.BAD_IDEA]: {
    displayName: 'BadIdea',
    icon: EQUIPMENT_ICONS.ABILITY_RUDE,
  },
  [EQUIPMENT_ABILITIES.PRICKLY]: {
    displayName: 'Prickly',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.FAILURE]: {
    displayName: 'Failure',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_DOWN_RIGHT,
  },
  [EQUIPMENT_ABILITIES.SLAY_DARK]: {
    displayName: 'SlayDark',
    icon: EQUIPMENT_ICONS.ABILITY_SHARD,
  },
  [EQUIPMENT_ABILITIES.COOLNESS]: {
    displayName: 'Coolness',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.WICKED]: {
    displayName: 'Wicked',
    icon: EQUIPMENT_ICONS.ABILITY_RUDE,
  },
  [EQUIPMENT_ABILITIES.PACIFY_0_TP]: {
    displayName: 'Pacify0TP',
    icon: EQUIPMENT_ICONS.ABILITY_PACIFY,
  },
  [EQUIPMENT_ABILITIES.CRITICAL]: {
    displayName: 'Critical',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.THE_BEST]: {
    displayName: 'TheBest',
    icon: EQUIPMENT_ICONS.FLOWERY,
  },
  [EQUIPMENT_ABILITIES.FESTIVE]: {
    displayName: 'Festive',
    icon: EQUIPMENT_ICONS.ABILITY_SMILE,
  },
  // JusticeAxe
  [EQUIPMENT_ABILITIES.UNKNOWN_WEAPON]: {
    displayName: '???',
    icon: EQUIPMENT_ICONS.ABILITY_MAGIC,
  },
  // Winglade, Silver Card
  [EQUIPMENT_ABILITIES.MONEY_5_UP]: {
    displayName: '$ +5%',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.VAMPIRE]: {
    displayName: 'Vampire',
    icon: EQUIPMENT_ICONS.ABILITY_RUDE,
  },
  [EQUIPMENT_ABILITIES.GRAZE_AREA]: {
    displayName: 'GrazeArea',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.CUTENESS]: {
    displayName: 'Cuteness',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.GRAZE_TIME]: {
    displayName: 'GrazeTime',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.TP_GAIN]: {
    displayName: 'TPGain',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  // Mannequin
  [EQUIPMENT_ABILITIES.UNKNOWN_ARMOR]: {
    displayName: '???',
    icon: EQUIPMENT_ICONS.ABILITY_ARMOR,
  },
  [EQUIPMENT_ABILITIES.ELEC_HOLY]: {
    displayName: 'Elec/Holy',
    icon: EQUIPMENT_ICONS.ABILITY_ARMOR,
  },
  [EQUIPMENT_ABILITIES.ATTACK_UP]: {
    displayName: 'Attack',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.MONEY_30_UP]: {
    displayName: '$ +30%',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.DARK_STAR]: {
    displayName: 'Dark/Star',
    icon: EQUIPMENT_ICONS.ABILITY_ARMOR,
  },
  [EQUIPMENT_ABILITIES.HEAL_UP]: {
    displayName: 'Heal+',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.HAS_ANTENNA]: {
    displayName: 'HasAntenna',
    icon: EQUIPMENT_ICONS.ABILITY_SMILE,
  },
  [EQUIPMENT_ABILITIES.CAT_DEFEND]: {
    displayName: 'CatDefend',
    icon: EQUIPMENT_ICONS.ABILITY_DOG,
  },
  [EQUIPMENT_ABILITIES.MONEY_90_DOWN]: {
    displayName: '$ -90%',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_DOWN_RIGHT,
  },
  [EQUIPMENT_ABILITIES.INV_TIME_UP]: {
    displayName: 'InvTime+',
    icon: EQUIPMENT_ICONS.ABILITY_MAGIC,
  },
  [EQUIPMENT_ABILITIES.SKILL_20_PERCENT]: {
    displayName: 'Skill20%',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.SCYTHE_TP_DOWN]: {
    displayName: 'ScytheTP-',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_DOWN_RIGHT,
  },
  [EQUIPMENT_ABILITIES.DEFEND_HEAL]: {
    displayName: 'DefendHeal',
    icon: EQUIPMENT_ICONS.ABILITY_MAGIC,
  },
  [EQUIPMENT_ABILITIES.ELEGANCE]: {
    displayName: 'Elegance',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_UP_RIGHT,
  },
  [EQUIPMENT_ABILITIES.MONEY_10_DOWN]: {
    displayName: '$ -10%',
    icon: EQUIPMENT_ICONS.ABILITY_ARROW_DOWN_RIGHT,
  },
};

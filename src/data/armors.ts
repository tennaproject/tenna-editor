import type { BaseProperties, EquipmentStats, WithOverrides } from '@types';
import type { ChapterIndex } from './chapters';

export const ARMORS = {
  EMPTY: 0,
  AMBER_CARD: 1,
  DICE_BRACE: 2,
  PINK_RIBBON: 3,
  WHITE_RIBBON: 4,
  IRON_SHACKLE: 5,
  MOUSE_TOKEN: 6,
  JEVILSTAIL: 7,
  SILVER_CARD: 8,
  TWIN_RIBBON: 9,
  GLOW_WRIST: 10,
  CHAIN_MAIL: 11,
  B_SHOT_BOWTIE: 12,
  SPIKE_BAND: 13,
  SILVER_WATCH: 14,
  TENSION_BOW: 15,
  MANNEQUIN: 16,
  DARK_GOLD_BAND: 17,
  SKY_MANTLE: 18,
  SPIKE_SHACKLE: 19,
  FRAYED_BOWTIE: 20,
  DEALMAKER: 21,
  ROYAL_PIN: 22,
  SHADOW_MANTLE: 23,
  LODE_STONE: 24,
  GINGER_GUARD: 25,
  BLUE_RIBBON: 26,
  TENNA_TIE: 27,
  WAFERGUARD: 50,
  MYSTIC_BAND: 51,
  POWER_BAND: 52,
  PRINCESS_RBN: 53,
  GOLD_WIDOW: 54,
  MONARCH_RBN: 30,
  TRUE_TIE: 31,
  DOG_WIDOW: 32,
  RED_RIBBON: 33,
  NETSKIE_HAT: 34,
  SETH_SPECS: 35,
  YELLOW_HAT: 36,
  O_GLOVE: 37,
  GREEN_APRON: 38,
} as const;

export type ArmorIndex = (typeof ARMORS)[keyof typeof ARMORS];
export type ArmorName = keyof typeof ARMORS;

interface ArmorProperties
  extends
    BaseProperties,
    WithOverrides<ArmorProperties, { chapter: ChapterIndex }> {
  stats: EquipmentStats;
}

export const ARMORS_META: Record<ArmorIndex, ArmorProperties> = {
  [ARMORS.EMPTY]: {
    displayName: 'Empty',
    stats: { attack: 0, defence: 0, magic: 0 },
  },
  [ARMORS.AMBER_CARD]: {
    displayName: 'Amber Card',
    stats: { attack: 0, defence: 1, magic: 0 },
  },
  [ARMORS.DICE_BRACE]: {
    displayName: 'Dice Brace',
    stats: { attack: 0, defence: 2, magic: 0 },
  },
  [ARMORS.PINK_RIBBON]: {
    displayName: 'Pink Ribbon',
    stats: { attack: 0, defence: 1, magic: 0 },
  },
  [ARMORS.WHITE_RIBBON]: {
    displayName: 'White Ribbon',
    stats: { attack: 0, defence: 2, magic: 0 },
  },
  [ARMORS.IRON_SHACKLE]: {
    displayName: 'Iron Shackle',
    stats: { attack: 1, defence: 2, magic: 0 },
  },
  [ARMORS.MOUSE_TOKEN]: {
    displayName: 'MouseToken',
    stats: { attack: 0, defence: 0, magic: 2 },
  },
  [ARMORS.JEVILSTAIL]: {
    displayName: 'Jevilstail',
    stats: { attack: 2, defence: 2, magic: 2 },
  },
  [ARMORS.SILVER_CARD]: {
    displayName: 'Silver Card',
    stats: { attack: 0, defence: 2, magic: 0 },
  },
  [ARMORS.TWIN_RIBBON]: {
    displayName: 'TwinRibbon',
    stats: { attack: 0, defence: 3, magic: 0 },
  },
  [ARMORS.GLOW_WRIST]: {
    displayName: 'GlowWrist',
    stats: { attack: 0, defence: 2, magic: 0 },
  },
  [ARMORS.CHAIN_MAIL]: {
    displayName: 'ChainMail',
    stats: { attack: 0, defence: 3, magic: 0 },
  },
  [ARMORS.B_SHOT_BOWTIE]: {
    displayName: 'B.ShotBowtie',
    stats: { attack: 0, defence: 2, magic: 1 },
  },
  [ARMORS.SPIKE_BAND]: {
    displayName: 'SpikeBand',
    stats: { attack: 2, defence: 1, magic: 0 },
  },
  [ARMORS.SILVER_WATCH]: {
    displayName: 'Silver Watch',
    stats: { attack: 0, defence: 2, magic: 0 },
  },
  [ARMORS.TENSION_BOW]: {
    displayName: 'TensionBow',
    stats: { attack: 0, defence: 2, magic: 0 },
  },
  [ARMORS.MANNEQUIN]: {
    displayName: 'Mannequin',
    stats: { attack: 0, defence: 0, magic: 0 },
  },
  [ARMORS.DARK_GOLD_BAND]: {
    displayName: 'DarkGoldBand',
    stats: { attack: 0, defence: 0, magic: 0 },
  },
  [ARMORS.SKY_MANTLE]: {
    displayName: 'SkyMantle',
    stats: { attack: 0, defence: 1, magic: 0 },
  },
  [ARMORS.SPIKE_SHACKLE]: {
    displayName: 'SpikeShackle',
    stats: { attack: 3, defence: 1, magic: 0 },
  },
  [ARMORS.FRAYED_BOWTIE]: {
    displayName: 'FrayedBowtie',
    stats: { attack: 1, defence: 1, magic: 1 },
  },
  [ARMORS.DEALMAKER]: {
    displayName: 'Dealmaker',
    stats: { attack: 0, defence: 5, magic: 5 },
  },
  [ARMORS.ROYAL_PIN]: {
    displayName: 'RoyalPin',
    stats: { attack: 0, defence: 3, magic: 1 },
  },
  [ARMORS.SHADOW_MANTLE]: {
    displayName: 'ShadowMantle',
    stats: { attack: 0, defence: 5, magic: 0 },
    getOverrides: ({ chapter }) => ({
      stats: { attack: 0, defence: chapter, magic: 0 },
    }),
  },
  [ARMORS.LODE_STONE]: {
    displayName: 'LodeStone',
    stats: { attack: 0, defence: 2, magic: 0 },
  },
  [ARMORS.GINGER_GUARD]: {
    displayName: 'GingerGuard',
    stats: { attack: 0, defence: 3, magic: 0 },
  },
  [ARMORS.BLUE_RIBBON]: {
    displayName: 'BlueRibbon',
    stats: { attack: 0, defence: 1, magic: 1 },
  },
  [ARMORS.TENNA_TIE]: {
    displayName: 'TennaTie',
    stats: { attack: 0, defence: 5, magic: -2 },
  },
  [ARMORS.WAFERGUARD]: {
    displayName: 'Waferguard',
    stats: { attack: 0, defence: 4, magic: 0 },
  },
  [ARMORS.MYSTIC_BAND]: {
    displayName: 'MysticBand',
    stats: { attack: 0, defence: 0, magic: 4 },
  },
  [ARMORS.POWER_BAND]: {
    displayName: 'PowerBand',
    stats: { attack: 4, defence: 0, magic: 0 },
  },
  [ARMORS.PRINCESS_RBN]: {
    displayName: 'PrincessRBN',
    stats: { attack: 2, defence: 4, magic: 0 },
  },
  [ARMORS.GOLD_WIDOW]: {
    displayName: 'GoldWidow',
    stats: { attack: 1, defence: 5, magic: 1 },
  },
  [ARMORS.MONARCH_RBN]: {
    displayName: 'MonarchRBN',
    stats: { attack: 0, defence: 6, magic: 2 },
  },
  [ARMORS.TRUE_TIE]: {
    displayName: 'TrueTie',
    stats: { attack: 1, defence: 5, magic: 0 },
  },
  [ARMORS.DOG_WIDOW]: {
    displayName: 'DogWidow',
    stats: { attack: 0, defence: 6, magic: 0 },
  },
  [ARMORS.RED_RIBBON]: {
    displayName: 'RedRibbon',
    stats: { attack: 0, defence: 4, magic: 1 },
  },
  [ARMORS.NETSKIE_HAT]: {
    displayName: 'NetskieHat',
    stats: { attack: 0, defence: 6, magic: 0 },
  },
  [ARMORS.SETH_SPECS]: {
    displayName: 'SethSpecs',
    stats: { attack: 0, defence: 4, magic: 6 },
  },
  [ARMORS.YELLOW_HAT]: {
    displayName: 'YellowHat',
    stats: { attack: 4, defence: 4, magic: 4 },
  },
  [ARMORS.O_GLOVE]: {
    displayName: 'O.Glove',
    stats: { attack: 4, defence: 8, magic: 0 },
  },
  [ARMORS.GREEN_APRON]: {
    displayName: 'GreenApron',
    stats: { attack: 0, defence: 7, magic: 0 },
  },
};

import type {
  AbilityValues,
  BaseProperties,
  EquipmentStats,
  WithOverrides,
} from '@types';
import type { ChapterIndex } from './chapters';
import { EQUIPMENT_ABILITIES, EQUIPMENT_ICONS } from './equipment';
import type { EquipmentAbilityIndex, EquipmentIconIndex } from './equipment';

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
  icon?: EquipmentIconIndex;
  ability?: EquipmentAbilityIndex;
  abilityValues?: AbilityValues;
}

export const ARMORS_META: Record<ArmorIndex, ArmorProperties> = {
  [ARMORS.EMPTY]: {
    displayName: 'Empty',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.EMPTY,
  },
  [ARMORS.AMBER_CARD]: {
    displayName: 'Amber Card',
    description: 'A thin square charm that sticks\nto you, increasing defense.',
    stats: { attack: 0, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.DICE_BRACE]: {
    displayName: 'Dice Brace',
    description: 'A bracelet made out of various\nsymbol-inscribed cubes.',
    stats: { attack: 0, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.PINK_RIBBON]: {
    displayName: 'Pink Ribbon',
    description:
      'A cute hair ribbon that increases\nthe range bullets increase tension.',
    stats: { attack: 0, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.GRAZE_AREA,
    abilityValues: { value: 20 },
    getOverrides: ({ chapter }) => {
      if (chapter === 1) {
        return {
          unused: true,
        };
      }
      else if (chapter === 3) {
        return {
          description:
            'A cute hair ribbon. Increases the range\nat which bullets raise tension.',
        };
      }

      return {};
    },
  },
  [ARMORS.WHITE_RIBBON]: {
    displayName: 'White Ribbon',
    description: 'A crinkly hair ribbon that slightly\nincreases your defense.',
    stats: { attack: 0, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.CUTENESS,
  },
  [ARMORS.IRON_SHACKLE]: {
    displayName: 'Iron Shackle',
    description: 'Shackle that ironically increases\nyour attack and defense.',
    stats: { attack: 1, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.MOUSE_TOKEN]: {
    displayName: 'MouseToken',
    description:
      'A golden coin with a once-powerful mousewizard engraved on it.',
    stats: { attack: 0, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.ARMOR,
    getOverrides: ({ chapter }) => {
      if (chapter === 3) {
        return {
          description:
            'A golden coin with a once-powerful mouse\nwizard engraved on it.',
        };
      }

      return {};
    },
    unused: true,
  },
  [ARMORS.JEVILSTAIL]: {
    displayName: 'Jevilstail',
    description: 'A J-shaped tail that gives you devilenergy.',
    stats: { attack: 2, defence: 2, magic: 2 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.SILVER_CARD]: {
    displayName: 'Silver Card',
    description: 'A square charm that increases\ndropped money by 5%',
    stats: { attack: 0, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.MONEY_5_UP,
  },
  [ARMORS.TWIN_RIBBON]: {
    displayName: 'TwinRibbon',
    description: "Two ribbons. You'll have to put\nyour hair into pigtails.",
    stats: { attack: 0, defence: 3, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.GRAZE_AREA,
    abilityValues: { value: 25 },
  },
  [ARMORS.GLOW_WRIST]: {
    displayName: 'GlowWrist',
    description:
      'A tough bracelet made of green wires,\nand studded with sharp glowing lights.',
    stats: { attack: 0, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.CHAIN_MAIL]: {
    displayName: 'ChainMail',
    description:
      "Chain-armor. Send it to 10 others\nor it'll lose its defensive rating",
    stats: { attack: 0, defence: 3, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.B_SHOT_BOWTIE]: {
    displayName: 'B.ShotBowtie',
    description:
      'A handsome bowtie. Looks like the brand\nname has been cut off.',
    stats: { attack: 0, defence: 2, magic: 1 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.SPIKE_BAND]: {
    displayName: 'SpikeBand',
    description:
      'A black wristband covered in spikes.\nHas the tendency to get stuck to itself.',
    stats: { attack: 2, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.SILVER_WATCH]: {
    displayName: 'Silver Watch',
    description: 'Grazing bullets affects\nthe turn length by 10% more',
    stats: { attack: 0, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.GRAZE_TIME,
  },
  [ARMORS.TENSION_BOW]: {
    displayName: 'TensionBow',
    description: 'Gain 10% more tension from\ngrazing bullets',
    stats: { attack: 0, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.TP_GAIN,
    abilityValues: { value: 10 },
  },
  [ARMORS.MANNEQUIN]: {
    displayName: 'Mannequin',
    description:
      "It's a mannequin with the clothes\npermanently attached. Useless",
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.EMPTY,
    ability: EQUIPMENT_ABILITIES.UNKNOWN_ARMOR,
  },
  [ARMORS.DARK_GOLD_BAND]: {
    displayName: 'DarkGoldBand',
    description: 'A black metal with a golden shine.',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    unused: true,
  },
  [ARMORS.SKY_MANTLE]: {
    displayName: 'SkyMantle',
    description:
      'A cape that shimmers fluorescently.\nProtects against Elec and Holy attacks.',
    stats: { attack: 0, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.ELEC_HOLY,
    unused: true,
  },
  [ARMORS.SPIKE_SHACKLE]: {
    displayName: 'SpikeShackle',
    stats: { attack: 3, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.ATTACK,
    unused: true,
  },
  [ARMORS.FRAYED_BOWTIE]: {
    displayName: 'FrayedBowtie',
    description:
      'An old bowtie. It seems to have\nlost much of its defensive value.',
    stats: { attack: 1, defence: 1, magic: 1 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.DEALMAKER]: {
    displayName: 'Dealmaker',
    description:
      'Fashionable pink and yellow glasses.\nGreatly increase $ gained, and...?',
    stats: { attack: 0, defence: 5, magic: 5 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.MONEY_30_UP,
  },
  [ARMORS.ROYAL_PIN]: {
    displayName: 'RoyalPin',
    description:
      "A brooch engraved with Queen's face.\nCareful of the sharp part.",
    stats: { attack: 0, defence: 3, magic: 1 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.SHADOW_MANTLE]: {
    displayName: 'ShadowMantle',
    description:
      'Shadows slip off like water.\nGreatly protects against Dark and Star attacks.',
    stats: { attack: 0, defence: 5, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.DARK_STAR,
    getOverrides: ({ chapter }) => ({
      stats: { attack: 0, defence: chapter, magic: 0 },
    }),
  },
  [ARMORS.LODE_STONE]: {
    displayName: 'LodeStone',
    description:
      "A lodestone token shaped like a snail's shell.\nEnemy bullets give a bit more TP.",
    stats: { attack: 0, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.TP_GAIN,
    abilityValues: { value: 5 },
  },
  [ARMORS.GINGER_GUARD]: {
    displayName: 'GingerGuard',
    description:
      'A steel bangle tempered by extreme flame.\nIts shape is humanoid in nature.',
    stats: { attack: 0, defence: 3, magic: 0 },
    icon: EQUIPMENT_ICONS.GINGER,
  },
  [ARMORS.BLUE_RIBBON]: {
    displayName: 'BlueRibbon',
    description:
      'A blue cheer bow. When the user uses a\nhealing move, it recovers slightly more HP.',
    stats: { attack: 0, defence: 1, magic: 1 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.HEAL_UP,
  },
  [ARMORS.TENNA_TIE]: {
    displayName: 'TennaTie',
    description:
      'A giant, heavy-duty, bullet-proof tie.\nHow to even wear it...?',
    stats: { attack: 0, defence: 5, magic: -2 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.WAFERGUARD]: {
    displayName: 'Waferguard',
    description:
      'Although it looks brittle, it contains a magical\nenergy that blunts damage on impact. +4DF',
    stats: { attack: 0, defence: 4, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.MYSTIC_BAND]: {
    displayName: 'MysticBand',
    description:
      'A silver armlet stained with amber.\nIncreases magic only. MAG +4',
    stats: { attack: 0, defence: 0, magic: 4 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.POWER_BAND]: {
    displayName: 'PowerBand',
    description:
      'A silver armlet stained with red essence.\nIncreases strength only. ATK +4',
    stats: { attack: 4, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.PRINCESS_RBN]: {
    displayName: 'PrincessRBN',
    description:
      'Elegant lace ribbon with gloves,\ndelicate enough to see through. +4 DEF +2 ATK',
    stats: { attack: 2, defence: 4, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.ELEGANCE,
  },
  [ARMORS.GOLD_WIDOW]: {
    displayName: 'GoldWidow',
    description:
      'A spider made of gold. It gathers coins\ninto it, reducing $ gained.',
    stats: { attack: 1, defence: 5, magic: 1 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.MONEY_10_DOWN,
  },
  [ARMORS.MONARCH_RBN]: {
    displayName: 'MonarchRBN',
    description:
      'A ribbon like the wings of a butterfly.\nIncreases healing ability when equipped.',
    stats: { attack: 0, defence: 6, magic: 2 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.HAS_ANTENNA,
  },
  [ARMORS.TRUE_TIE]: {
    displayName: 'TrueTie',
    description:
      'The genuine tie worn by a forgotten TV star.\nDefends against the Puppet&Cat element.',
    stats: { attack: 1, defence: 5, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.CAT_DEFEND,
  },
  [ARMORS.DOG_WIDOW]: {
    displayName: 'DogWidow',
    description:
      'A brooch in the shape of a golden pooch.\nYou lose almost all money after battle.',
    stats: { attack: 0, defence: 6, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
    ability: EQUIPMENT_ABILITIES.MONEY_90_DOWN,
  },
  [ARMORS.RED_RIBBON]: {
    displayName: 'RedRibbon',
    description:
      "A ribbon with an inscription to drive\naway resident spirits, if they don't pay.",
    stats: { attack: 0, defence: 4, magic: 1 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.NETSKIE_HAT]: {
    displayName: 'NetskieHat',
    description:
      'A white-yellow hat for someone with fox\nears. Somehow you can wear more than one.',
    stats: { attack: 0, defence: 6, magic: 0 },
    icon: EQUIPMENT_ICONS.ARMOR,
  },
  [ARMORS.SETH_SPECS]: {
    displayName: 'SethSpecs',
    description:
      "A tactician's glasses. Become invulnerable for\nlonger after being damaged.",
    stats: { attack: 0, defence: 4, magic: 6 },
    icon: EQUIPMENT_ICONS.SETH,
    ability: EQUIPMENT_ABILITIES.INV_TIME_UP,
  },
  [ARMORS.YELLOW_HAT]: {
    displayName: 'YellowHat',
    description: 'The hat of a just cowboy. Makes spells\n20% more effective.',
    stats: { attack: 4, defence: 4, magic: 4 },
    icon: EQUIPMENT_ICONS.YELLOW,
    ability: EQUIPMENT_ABILITIES.SKILL_20_PERCENT,
  },
  [ARMORS.O_GLOVE]: {
    displayName: 'O.Glove',
    description:
      "The glove of a brave fighter.\nSusie's SCYTHEMARE will cost less TP. ", // Trailing space from the game's string
    stats: { attack: 4, defence: 8, magic: 0 },
    icon: EQUIPMENT_ICONS.ORANGE,
    ability: EQUIPMENT_ABILITIES.SCYTHE_TP_DOWN,
  },
  [ARMORS.GREEN_APRON]: {
    displayName: 'GreenApron',
    description:
      'The apron of a kind chef. The wearer\nrecovers 16% of their max HP after defending.',
    stats: { attack: 0, defence: 7, magic: 0 },
    icon: EQUIPMENT_ICONS.GREEN,
    ability: EQUIPMENT_ABILITIES.DEFEND_HEAL,
  },
};

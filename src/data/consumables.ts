import type { BaseProperties } from '@types';
import type { SaveSlot, WithOverrides } from '@types';
import type { ChapterIndex } from './chapters';
import { CHARACTERS, type CharacterIndex } from './characters';

export const CONSUMABLES = {
  EMPTY: 0,
  DARK_CANDY: 1,
  REVIVEMINT: 2,
  GLOWSHARD: 3,
  MANUAL: 4,
  BROKENCAKE: 5,
  TOPCAKE: 6,
  SPINCAKE: 7,
  DARKBURGER: 8,
  LANCERCOOKIE: 9,
  GIGASALAD: 10,
  CLUBSSANDWICH: 11,
  HEARTSDONUT: 12,
  CHOCODIAMOND: 13,
  FAVSANDWICH: 14,
  ROUXLSROUX: 15,
  CD_BAGEL: 16,
  MANNEQUIN: 17,
  KRIS_TEA: 18,
  NOELLE_TEA: 19,
  RALSEI_TEA: 20,
  SUSIE_TEA: 21,
  DD_BURGER: 22,
  LIGHTCANDY: 23,
  BUTLERJUICE: 24,
  SPAGHETTICODE: 25,
  JAVACOOKIE: 26,
  TENSIONBIT: 27,
  TENSIONGEM: 28,
  TENSIONMAX: 29,
  REVIVEDUST: 30,
  REVIVEBRITE: 31,
  S_POISON: 32,
  DOGDOLLAR: 33,
  TVDINNER: 34,
  PIPIS: 35,
  FLATSODA: 36,
  TVSLOP: 37,
  EXECBUFFET: 38,
  DELUXEDINNER: 39,
  ANCIENTSWEET: 60,
  RHAPSOTEA: 61,
  SCARLIXIR: 62,
  BITTERTEAR: 63,
  PUNCH_BOWL: 40,
  FLAVIGNE: 41,
  GREEN_TEA: 42,
  ORANGE_JUICE: 43,
  SCHADENBROT: 64,
  TREE_CAKE: 65,
  S_POTION: 66,
  RAW_MOON: 67,
  PHANTA: 68,
  FLOWERY_SODA: 69,
  SHIKA_COLA: 70,
} as const;

export type ConsumableIndex = (typeof CONSUMABLES)[keyof typeof CONSUMABLES];
export type ConsumableName = keyof typeof CONSUMABLES;

export interface HealAmounts {
  heal?: number;
  healByCharacter?: Partial<Record<CharacterIndex, number>>;
  healPercent?: number;
  healPercentByCharacter?: Partial<Record<CharacterIndex, number>>;
}

interface ConsumableProperties
  extends
    BaseProperties,
    HealAmounts,
    WithOverrides<
      ConsumableProperties,
      { chapter: ChapterIndex; saveSlot: SaveSlot }
    > {
  healsParty?: boolean;
  tpGain?: number;
  revivePercent?: number;
  // Used for a few items when used on Noelle in the overworld
  extraHeal?: {
    host: CharacterIndex;
    character: CharacterIndex;
    amount: number;
  };
  // anything omitted falls back to the in-battle value
  overworld?: HealAmounts;
}

export const CONSUMABLES_META: Record<ConsumableIndex, ConsumableProperties> = {
  [CONSUMABLES.EMPTY]: { displayName: 'Empty' },
  [CONSUMABLES.DARK_CANDY]: {
    displayName: 'Dark Candy',
    description:
      'Heals 40 HP. A red-and-black star\nthat tastes like marshmallows.',
    heal: 40,
    getOverrides: ({ chapter }) => {
      if (chapter >= 4) {
        return {
          displayName: 'Darker Candy',
          description:
            'A candy that has grown sweeter with time.\nSaid to taste like toasted marshmallow. +120HP',
          heal: 120,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.REVIVEMINT]: {
    displayName: 'ReviveMint',
    description: 'Heals a fallen ally to MAX HP.\nA minty green crystal.',
    revivePercent: 100,
  },
  [CONSUMABLES.GLOWSHARD]: {
    displayName: 'Glowshard',
    description: 'A shimmering shard.\nIts use is unknown.',
    getOverrides: ({ chapter }) => {
      if (chapter >= 2) {
        return {
          displayName: 'Glowshard',
          description: 'A shimmering shard.\nIts value increases each Chapter.',
        };
      }

      return {};
    },
  },
  [CONSUMABLES.MANUAL]: {
    displayName: 'Manual',
    description: "Ralsei's handmade book full of\nvarious tips and tricks.",
  },
  [CONSUMABLES.BROKENCAKE]: {
    displayName: 'BrokenCake',
    description:
      'Though broken, it seethes with power.\nA master smith could fix it.',
    heal: 20,
    unused: true,
  },
  [CONSUMABLES.TOPCAKE]: {
    displayName: 'Top Cake',
    description:
      'This cake will make your taste buds\nspin! Heals 160 HP to the team.',
    heal: 160,
    healsParty: true,
  },
  [CONSUMABLES.SPINCAKE]: {
    displayName: 'SpinCake',
    description: 'A pastry in the shape of a top.\nHeals 80 HP to the team.',
    heal: 80,
    healsParty: true,
    getOverrides: ({ chapter }) => {
      const byChapter: Partial<Record<ChapterIndex, number>> = {
        2: 140,
        3: 150,
        4: 160,
        5: 180,
      };
      const amount = byChapter[chapter];

      if (amount !== undefined) {
        return {
          description: `A pastry in the shape of a top.\nHeals ${amount} HP to the team.`,
          heal: amount,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.DARKBURGER]: {
    displayName: 'Darkburger',
    description:
      'A mysterious black burger made of...\nHey, this is just burnt! +70HP',
    heal: 70,
    healByCharacter: { [CHARACTERS.NOELLE]: 20 },
  },
  [CONSUMABLES.LANCERCOOKIE]: {
    displayName: 'LancerCookie',
    description:
      "A cookie shaped like Lancer's face.\nMaybe not a cookie. Heals 5 HP?",
    heal: 50,
    overworld: { heal: 4 },
    getOverrides: ({ chapter }) => {
      if (chapter >= 2) {
        return {
          description:
            "A cookie shaped like Lancer's face.\nMaybe not a cookie. Heals 1 HP?",
          overworld: { heal: 1 },
        };
      }

      return {};
    },
  },
  [CONSUMABLES.GIGASALAD]: {
    displayName: 'GigaSalad',
    description:
      "An enormous salad... but, it's just\nlettuce, so it's worthless. +4HP",
    heal: 4,
    healByCharacter: { [CHARACTERS.NOELLE]: 90 },
    unused: true,
  },
  [CONSUMABLES.CLUBSSANDWICH]: {
    displayName: 'ClubsSandwich',
    description:
      'A sandwich that can be split into 3.\nHeals 30 HP to the team.',
    heal: 30,
    healsParty: true,
    getOverrides: ({ chapter }) => {
      if (chapter >= 2) {
        return {
          description:
            'A sandwich that can be split into 3.\nHeals 70 HP to the team.',
          heal: 70,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.HEARTSDONUT]: {
    displayName: 'HeartsDonut',
    description:
      "Hearts, don't it!? It's filled with\ndivisive, clotty red jam. +??HP",
    overworld: {
      healByCharacter: {
        [CHARACTERS.KRIS]: 20,
        [CHARACTERS.SUSIE]: 80,
        [CHARACTERS.RALSEI]: 50,
        [CHARACTERS.NOELLE]: 30,
      },
    },
    healByCharacter: {
      [CHARACTERS.KRIS]: 10,
      [CHARACTERS.SUSIE]: 90,
      [CHARACTERS.RALSEI]: 60,
    },
    getOverrides: ({ chapter }) => {
      if (chapter >= 2) {
        return {
          overworld: {},
          healByCharacter: {
            [CHARACTERS.KRIS]: 20,
            [CHARACTERS.SUSIE]: 80,
            [CHARACTERS.RALSEI]: 50,
            [CHARACTERS.NOELLE]: 30,
          },
        };
      }

      return {};
    },
  },
  [CONSUMABLES.CHOCODIAMOND]: {
    displayName: 'ChocDiamond',
    description: "It's quite small, but some\npeople REALLY like it. +??HP",
    overworld: {
      healByCharacter: {
        [CHARACTERS.KRIS]: 80,
        [CHARACTERS.SUSIE]: 20,
        [CHARACTERS.RALSEI]: 50,
        [CHARACTERS.NOELLE]: 35,
      },
    },
    extraHeal: {
      host: CHARACTERS.NOELLE,
      character: CHARACTERS.KRIS,
      amount: 35,
    },
    healByCharacter: {
      [CHARACTERS.KRIS]: 80,
      [CHARACTERS.SUSIE]: 30,
      [CHARACTERS.RALSEI]: 30,
    },
    getOverrides: ({ chapter }) => {
      if (chapter >= 2) {
        return {
          overworld: {
            healByCharacter: {
              [CHARACTERS.KRIS]: 80,
              [CHARACTERS.SUSIE]: 20,
              [CHARACTERS.RALSEI]: 50,
              [CHARACTERS.NOELLE]: 35,
            },
          },
          healByCharacter: {
            [CHARACTERS.KRIS]: 80,
            [CHARACTERS.SUSIE]: 20,
            [CHARACTERS.RALSEI]: 30,
            [CHARACTERS.NOELLE]: 70,
          },
        };
      }

      return {};
    },
  },
  [CONSUMABLES.FAVSANDWICH]: {
    displayName: 'FavSandwich',
    description: "You'd think it tastes perfect.\nHeals 500HP.",
    heal: 500,
    unused: true,
  },
  [CONSUMABLES.ROUXLSROUX]: {
    displayName: 'RouxlsRoux',
    description:
      'A dark roux with a delicate aroma.\nAlso... has worms in it. +50HP',
    heal: 50,
    getOverrides: ({ chapter }) => {
      if (chapter === 1) {
        return {
          overworld: {
            heal: 50,
          },
          heal: 60,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.CD_BAGEL]: {
    displayName: 'CD Bagel',
    description:
      'A bagel with a reflective inside.\nMakes music with each bite. +80HP',
    heal: 80,
  },
  [CONSUMABLES.MANNEQUIN]: {
    displayName: 'Mannequin',
    description:
      "It's a mannequin with the clothes\npermanently attached. Useless",
    unused: true,
  },
  [CONSUMABLES.KRIS_TEA]: {
    displayName: 'Kris Tea',
    description: 'It\'s own-flavored tea.\nThe flavor just says "Kris."',
    healByCharacter: {
      [CHARACTERS.KRIS]: 10,
      [CHARACTERS.SUSIE]: 120,
      [CHARACTERS.RALSEI]: 120,
      [CHARACTERS.NOELLE]: 70,
    },
    getOverrides: ({ chapter }) => {
      if (chapter >= 3) {
        return {
          displayName: 'RottenTea',
          description:
            'A tea that has deteriorated after a short while\ndue to its poor craftsmanship. +10HP',
          heal: 10,
          healByCharacter: undefined,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.SUSIE_TEA]: {
    displayName: 'Susie Tea',
    description: 'It\'s own-flavored tea.\nThe flavor just says "Susie."',
    healByCharacter: {
      [CHARACTERS.KRIS]: 120,
      [CHARACTERS.SUSIE]: 10,
      [CHARACTERS.RALSEI]: 120,
      [CHARACTERS.NOELLE]: 400,
    },
    getOverrides: ({ chapter }) => {
      if (chapter >= 3) {
        return {
          displayName: 'RottenTea',
          description:
            'A tea that has deteriorated after a short while\ndue to its poor craftsmanship. +10HP',
          heal: 10,
          healByCharacter: undefined,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.NOELLE_TEA]: {
    displayName: 'Noelle Tea',
    description: 'It\'s own-flavored tea.\nThe flavor just says "Noelle."',
    healByCharacter: {
      [CHARACTERS.KRIS]: 70,
      [CHARACTERS.SUSIE]: 120,
      [CHARACTERS.RALSEI]: 50,
      [CHARACTERS.NOELLE]: 10,
    },
    getOverrides: ({ chapter }) => {
      if (chapter >= 3) {
        return {
          displayName: 'RottenTea',
          description:
            'A tea that has deteriorated after a short while\ndue to its poor craftsmanship. +10HP',
          heal: 10,
          healByCharacter: undefined,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.RALSEI_TEA]: {
    displayName: 'Ralsei Tea',
    description: 'It\'s own-flavored tea.\nThe flavor just says "Ralsei."',
    healByCharacter: {
      [CHARACTERS.KRIS]: 60,
      [CHARACTERS.SUSIE]: 120,
      [CHARACTERS.RALSEI]: 10,
      [CHARACTERS.NOELLE]: 50,
    },
    getOverrides: ({ chapter }) => {
      if (chapter >= 3) {
        return {
          displayName: 'RottenTea',
          description:
            'A tea that has deteriorated after a short while\ndue to its poor craftsmanship. +10HP',
          heal: 10,
          healByCharacter: undefined,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.DD_BURGER]: {
    displayName: 'DD-Burger',
    description:
      "It's the Double-Dark-Burger.\nIt'll take two bites to finish!",
    heal: 60,
    healByCharacter: { [CHARACTERS.NOELLE]: 20 },
  },
  [CONSUMABLES.LIGHTCANDY]: {
    displayName: 'LightCandy',
    description: "White candy with a chalky texture.\nIt'll recover 120HP.",
    heal: 120,
  },
  [CONSUMABLES.BUTLERJUICE]: {
    displayName: 'ButJuice',
    description:
      "It's short for ButlerJuice.\nIt changes color with temperature.",
    heal: 100,
  },
  [CONSUMABLES.SPAGHETTICODE]: {
    displayName: 'SpagettiCode',
    description:
      'Spaghetti woven by master coders, made\nof macarons and ribbons. +30HP to all.',
    heal: 30,
    healsParty: true,
  },
  [CONSUMABLES.JAVACOOKIE]: {
    displayName: 'JavaCookie',
    description:
      'A coffee-and-chocolate flavored cookie.\nWords spark out when you bite it.',
    heal: 90,
    healByCharacter: { [CHARACTERS.KRIS]: 100 },
    unused: true,
  },
  [CONSUMABLES.TENSIONBIT]: {
    displayName: 'TensionBit',
    description: 'Raises TP by 32% in battle.',
    tpGain: 32,
  },
  [CONSUMABLES.TENSIONGEM]: {
    displayName: 'TensionGem',
    description: 'Raises TP by 50% in battle.',
    tpGain: 50,
  },
  [CONSUMABLES.TENSIONMAX]: {
    displayName: 'TensionMax',
    description: 'Raises TP to full in battle.',
    tpGain: 100,
  },
  [CONSUMABLES.REVIVEDUST]: {
    displayName: 'ReviveDust',
    description:
      'A minty powder that revives all\nfallen party members to 25% HP.',
    overworld: {
      heal: 50,
    },
    heal: 10,
    healsParty: true,
    revivePercent: 25,
  },
  [CONSUMABLES.REVIVEBRITE]: {
    displayName: 'ReviveBrite',
    description:
      'A breakable mint that revives all\nfallen party members to 100% HP.',
    heal: 50,
    healsParty: true,
    revivePercent: 100,
    unused: true,
  },
  [CONSUMABLES.S_POISON]: {
    displayName: 'S.POISON',
    description:
      'A strange concoction made of\ncolorful squares. Will poison you.',
    heal: 60,
    overworld: {
      heal: -20,
      healByCharacter: { [CHARACTERS.NOELLE]: 0 },
    },
  },
  [CONSUMABLES.DOGDOLLAR]: {
    displayName: 'DogDollar',
    description:
      'A dollar with a certain dog on it.\nIts value decreases each Chapter.',
  },
  [CONSUMABLES.TVDINNER]: {
    displayName: 'TVDinner',
    description:
      'A TV-shaped premade meal. It even has\na giant crumb of your favorite pie.',
    heal: 100,
    getOverrides: ({ saveSlot }) => {
      if (saveSlot === 1) {
        return {
          description:
            "A TV-shaped premade meal. The TV's pointy\nnose is used as a cone for the ice cream.",
        };
      }

      if (saveSlot === 2) {
        return {
          description:
            'A TV-shaped premade meal. Unfortunately,\nthe vegan steak seems to be a normal shape.',
        };
      }

      return {};
    },
  },
  [CONSUMABLES.PIPIS]: {
    displayName: 'Pipis',
    description: 'A certain person\'s special "???"\nCannot be used in battle.',
    heal: 100,
  },
  [CONSUMABLES.FLATSODA]: {
    displayName: 'FlatSoda',
    description:
      'Flat soda someone already took\na big sip from. Recovers 20HP',
    heal: 20,
  },
  [CONSUMABLES.TVSLOP]: {
    displayName: 'TVSlop',
    description:
      'Some sort of bland cafeteria food.\nThe ice cream cone is soggy and saggy.',
    heal: 80,
  },
  [CONSUMABLES.EXECBUFFET]: {
    displayName: 'ExecBuffet',
    description:
      'A dinner for cushy TV executives.\nThe blue "caviar" is unforgettable.',
    heal: 100,
    healsParty: true,
  },
  [CONSUMABLES.DELUXEDINNER]: {
    displayName: 'DeluxeDinner',
    description:
      'A TV Dinner for high-ranking contestants.\nComes with detachable antennas. +140 HP.',
    heal: 140,
  },
  [CONSUMABLES.ANCIENTSWEET]: {
    displayName: 'AncientSweet',
    description:
      'A chocolatey cone etched with arcane\nglyphs. Only Kris can eat it. +400 HP.',
    heal: 40,
    healByCharacter: { [CHARACTERS.KRIS]: 400 },
  },
  [CONSUMABLES.RHAPSOTEA]: {
    displayName: 'Rhapsotea',
    description:
      "A smooth, silvery drink. It sounds like\nwhispered singing as it's poured. +115 HP.",
    heal: 115,
  },
  [CONSUMABLES.SCARLIXIR]: {
    displayName: 'Scarlixir',
    description:
      'A red brew with a sickeningly fruity taste.\nRecovers 160 HP.',
    heal: 160,
    healByCharacter: { [CHARACTERS.NOELLE]: 155 },
    extraHeal: {
      host: CHARACTERS.NOELLE,
      character: CHARACTERS.KRIS,
      amount: 5,
    },
  },
  [CONSUMABLES.BITTERTEAR]: {
    displayName: 'BitterTear',
    description:
      'Bitter water that fell in droplets from the sky.\nRecovers all HP.',
    heal: 999,
  },
  [CONSUMABLES.PUNCH_BOWL]: {
    displayName: 'PunchBowl',
    description:
      'A bowl of sick elixir that packs an\nalmost physical punch. +200HP to all.',
    heal: 200,
    healsParty: true,
  },
  [CONSUMABLES.FLAVIGNE]: {
    displayName: 'Flavigne',
    description:
      'A small white candy in various floral flavors.\nRumored to have been a bullet pattern. +130HP.',
    heal: 130,
  },
  [CONSUMABLES.GREEN_TEA]: {
    displayName: 'GreenTea',
    description:
      'A sweet orange tea with a strong flavor of\ncardadad. Made by "Green." +180HP.',
    heal: 180,
  },
  [CONSUMABLES.ORANGE_JUICE]: {
    displayName: 'OrangeJuice',
    description:
      'Green juice made by a girl named "Orange."\nA smoothie of aloe and citrine. +80HP.',
    heal: 80,
  },
  [CONSUMABLES.SCHADENBROT]: {
    displayName: 'Schadenbrot',
    description:
      'A hunk of bread laden with sauer regrets.\nRecovers 200 HP to all.',
    heal: 200,
    healsParty: true,
    unused: true,
  },
  [CONSUMABLES.TREE_CAKE]: {
    displayName: 'TreeCake',
    description:
      'A cake of bread laden with joyful memories.\nRecovers 160 HP to all.',
    heal: 160,
    healsParty: true,
  },
  [CONSUMABLES.S_POTION]: {
    displayName: 'S.POTION',
    description:
      'An energy drink collaborating with a certain car brand.\nRecovers 200 HP.',
    heal: 200,
  },
  [CONSUMABLES.RAW_MOON]: {
    displayName: 'Raw Moon',
    description:
      'A bubbly liquid in a sweet floral blue.\n+Slight%TP, +100HP unless you like it more.',
    heal: 100,
    healByCharacter: { [CHARACTERS.KRIS]: 200 },
    tpGain: 16,
  },
  [CONSUMABLES.PHANTA]: {
    displayName: 'Phanta',
    description:
      "Grape-flavored phantasmagoria of a soda's dream.\n+Slight%TP, +100HP unless you like it more.",
    heal: 100,
    healByCharacter: { [CHARACTERS.SUSIE]: 200 },
    tpGain: 16,
  },
  [CONSUMABLES.FLOWERY_SODA]: {
    displayName: 'FlowerySoda',
    description:
      "Embarrassingly white lactose flavor.\nSaid to be Ralsei's favorite on the bottle.",
    overworld: {
      healByCharacter: { [CHARACTERS.RALSEI]: 0 },
    },
    heal: 50,
    healByCharacter: { [CHARACTERS.RALSEI]: 200 },
  },
  [CONSUMABLES.SHIKA_COLA]: {
    displayName: 'Shikacola',
    description:
      'A natural drink infused with nutmeg and\ndeer hair. Heals all party members. +80HPall',
    heal: 80,
    healByCharacter: { [CHARACTERS.NOELLE]: 5 },
    healsParty: true,
  },
};

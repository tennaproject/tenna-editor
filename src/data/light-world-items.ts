import type { BaseProperties, WithOverrides } from '@types';
import { ARMORS, type ArmorIndex } from './armors';
import type { ChapterIndex } from './chapters';
import { CONSUMABLES, type ConsumableIndex } from './consumables';
import { WEAPONS, type WeaponIndex } from './weapons';

export const LIGHTWORLDITEMS = {
  EMPTY: 0,
  HOT_CHOCOLATE: 1,
  PENCIL: 2,
  BANDAGE: 3,
  BOUQUET: 4,
  BALL_OF_JUNK: 5,
  HALLOWEEN_PENCIL: 6,
  LUCKY_PENCIL: 7,
  EGG: 8,
  CARDS: 9,
  BOX_OF_HEART_CANDY: 10,
  GLASS: 11,
  ERASER: 12,
  MECH_PENCIL: 13,
  WRISTWATCH: 14,
  HOLIDAY_PENCIL: 15,
  CACTUSNEEDLE: 16,
  BLACKSHARD: 17,
  QUILLPEN: 18,
  HONEY_TOAST: 19,
  BREAD: 20,
  SEEDS: 21,
  PENCIL2: 22,
  PETAL: 23,
};

export type LightWorldItemIndex =
  (typeof LIGHTWORLDITEMS)[keyof typeof LIGHTWORLDITEMS];
export type LightWorldItemName = keyof typeof LIGHTWORLDITEMS;

interface LightWorldItemOverrideInputs {
  chapter: ChapterIndex;
  items: readonly ConsumableIndex[];
}

interface LightWorldItemProperties
  extends
    BaseProperties,
    WithOverrides<LightWorldItemProperties, LightWorldItemOverrideInputs> {
  weapon?: boolean;
  armor?: boolean;
  attack?: number;
  defence?: number;
  heal?: number;
  darkWorldWeapon?: WeaponIndex;
  darkWorldArmor?: ArmorIndex;
}

export const LIGHTWORLDITEMS_META: Record<
  LightWorldItemIndex,
  LightWorldItemProperties
> = {
  [LIGHTWORLDITEMS.EMPTY]: { displayName: 'Empty' },
  [LIGHTWORLDITEMS.HOT_CHOCOLATE]: {
    displayName: 'Hot Chocolate',
    description:
      'Topped with home-made marshmallows in the shape of bunnies.',
  },
  [LIGHTWORLDITEMS.PENCIL]: {
    displayName: 'Pencil',
    description:
      'Mightier than a sword?\nMaybe equal at best.',
    weapon: true,
    attack: 1,
    darkWorldWeapon: WEAPONS.WOOD_BLADE,
  },
  [LIGHTWORLDITEMS.BANDAGE]: {
    displayName: 'Bandage',
    // description: '"Bandage" - Heals 10 HP\nIt has cartoon characters on it.', // Original description, but it doesn't actually heal 10
    description: 'It has cartoon characters on it.',
    heal: 1,
  },
  [LIGHTWORLDITEMS.BOUQUET]: {
    displayName: 'Bouquet',
    description:
      'A bouquet of beautiful flowers in many colors.\nPerhaps it could be offered to someone.',
  },
  [LIGHTWORLDITEMS.BALL_OF_JUNK]: {
    displayName: 'Ball of Junk',
    description:
      'A small ball of accumulated things in your pocket.',
    getOverrides: ({ items }) => {
      if (items.includes(CONSUMABLES.DARK_CANDY)) {
        return {
          description:
            'A small ball of accumulated things in your pocket.\nIt smells like scratch\'n\'sniff marshmallow stickers.',
        };
      }

      return {};
    },
  },
  [LIGHTWORLDITEMS.HALLOWEEN_PENCIL]: {
    displayName: 'Halloween Pencil',
    description:
      'Orange with black bats on it.',
    weapon: true,
    attack: 1,
    darkWorldWeapon: WEAPONS.SPOOKYSWORD,
  },
  [LIGHTWORLDITEMS.LUCKY_PENCIL]: {
    displayName: 'Lucky Pencil',
    description:
      'Covered in green clovers and rainbows.',
    weapon: true,
    attack: 1,
    darkWorldWeapon: WEAPONS.TREFOIL,
  },
  [LIGHTWORLDITEMS.EGG]: {
    displayName: 'Egg',
    description: 'Not too important, not too unimportant.',
  },
  [LIGHTWORLDITEMS.CARDS]: {
    displayName: 'Cards',
    description: 'The Jack of Spades, and the Rules Card.',
  },
  [LIGHTWORLDITEMS.BOX_OF_HEART_CANDY]: {
    displayName: 'Box of Heart Candy',
    description: "It's not yours. Will that stop you?",
  },
  [LIGHTWORLDITEMS.GLASS]: {
    displayName: 'Glass',
    description:
      'There is a small shard of something in your pocket.\nIt feels like glass, but...',
  },
  [LIGHTWORLDITEMS.ERASER]: {
    displayName: 'Eraser',
    description:
      'Pink, it bounces when thrown on the ground.',
    weapon: true,
    attack: 1,
    darkWorldWeapon: WEAPONS.BOUNCE_BLADE,
  },
  [LIGHTWORLDITEMS.MECH_PENCIL]: {
    displayName: 'Mech. Pencil',
    description:
      "It's tempting to click it repeatedly.",
    weapon: true,
    attack: 1,
    darkWorldWeapon: WEAPONS.MECHA_SABER,
  },
  [LIGHTWORLDITEMS.WRISTWATCH]: {
    displayName: 'Wristwatch',
    description:
      'Maybe an expensive antique.\nStuck before half past noon.',
    armor: true,
    defence: 1,
    darkWorldArmor: ARMORS.SILVER_WATCH,
  },
  [LIGHTWORLDITEMS.HOLIDAY_PENCIL]: {
    displayName: 'Holiday Pencil',
    description:
      'A festive candycane pencil.\nDo not eat.',
    weapon: true,
    attack: 1,
    darkWorldWeapon: WEAPONS.JINGLE_BLADE,
  },
  [LIGHTWORLDITEMS.CACTUSNEEDLE]: {
    displayName: 'CactusNeedle',
    description:
      "Ouch! ... It's somewhat sentimental in a way.",
    weapon: true,
    attack: 2,
    darkWorldWeapon: WEAPONS.SABER10,
  },
  [LIGHTWORLDITEMS.BLACKSHARD]: {
    displayName: 'BlackShard',
    description:
      "A small chip of extremely hard glass.\nOddly, it's nearly opaque.",
    weapon: true,
    attack: 16,
    darkWorldWeapon: WEAPONS.BLACK_SHARD,
  },
  [LIGHTWORLDITEMS.QUILLPEN]: {
    displayName: 'QuillPen',
    description: 'A pen fashioned from a white feather.',
    weapon: true,
    attack: 1,
    darkWorldWeapon: WEAPONS.WINGLADE,
  },
  [LIGHTWORLDITEMS.HONEY_TOAST]: {
    displayName: 'Honey Toast',
    description: 'A food that a parent could eat.',
  },
  [LIGHTWORLDITEMS.BREAD]: {
    displayName: 'Bread',
    description:
      'A loaf of bread. Tends to leave crumbs wherever it goes.',
  },
  [LIGHTWORLDITEMS.SEEDS]: {
    displayName: 'Seeds',
    description: 'The seed of the golden flower.',
  },
  [LIGHTWORLDITEMS.PENCIL2]: {
    displayName: 'Pencil2',
    description:
      "It's a No. 2 Pencil. ... that\ndoesn't make it any stronger.",
    weapon: true,
    attack: 2,
    darkWorldWeapon: WEAPONS.WOOD_BLADE_2,
  },
  [LIGHTWORLDITEMS.PETAL]: {
    displayName: 'Petal',
    description:
      "A cyan colored petal. It's not\na weapon, but it's nice.",
    weapon: true,
    attack: 0,
    darkWorldWeapon: WEAPONS.AQUA_KNIFE,
  },
};

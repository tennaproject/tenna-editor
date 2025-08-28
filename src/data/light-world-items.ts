import type { BaseProperties } from '@types';

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
};

export type LightWorldItemIndex =
  (typeof LIGHTWORLDITEMS)[keyof typeof LIGHTWORLDITEMS];
export type LightWorldItemName = keyof typeof LIGHTWORLDITEMS;

interface LightWorldItemProperties extends BaseProperties {
  weapon?: boolean;
  armor?: boolean;
}

export const LIGHTWORLDITEMS_META: Record<
  LightWorldItemIndex,
  LightWorldItemProperties
> = {
  [LIGHTWORLDITEMS.EMPTY]: { displayName: 'Empty', weapon: true, armor: true },
  [LIGHTWORLDITEMS.HOT_CHOCOLATE]: { displayName: 'Hot Chocolate' },
  [LIGHTWORLDITEMS.PENCIL]: { displayName: 'Pencil', weapon: true },
  [LIGHTWORLDITEMS.BANDAGE]: { displayName: 'Bandage', armor: true },
  [LIGHTWORLDITEMS.BOUQUET]: { displayName: 'Bouquet' },
  [LIGHTWORLDITEMS.BALL_OF_JUNK]: { displayName: 'Ball of Junk' },
  [LIGHTWORLDITEMS.HALLOWEEN_PENCIL]: {
    displayName: 'Halloween Pencil',
    weapon: true,
  },
  [LIGHTWORLDITEMS.LUCKY_PENCIL]: { displayName: 'Lucky Pencil', weapon: true },
  [LIGHTWORLDITEMS.EGG]: { displayName: 'Egg' },
  [LIGHTWORLDITEMS.CARDS]: { displayName: 'Cards' },
  [LIGHTWORLDITEMS.BOX_OF_HEART_CANDY]: { displayName: 'Box of Heart Candy' },
  [LIGHTWORLDITEMS.GLASS]: { displayName: 'Glass' },
  [LIGHTWORLDITEMS.ERASER]: { displayName: 'Eraser', weapon: true },
  [LIGHTWORLDITEMS.MECH_PENCIL]: { displayName: 'Mech. Pencil', weapon: true },
  [LIGHTWORLDITEMS.WRISTWATCH]: { displayName: 'Wristwatch', armor: true },
  [LIGHTWORLDITEMS.HOLIDAY_PENCIL]: {
    displayName: 'Holiday Pencil',
    weapon: true,
  },
  [LIGHTWORLDITEMS.CACTUSNEEDLE]: { displayName: 'CactusNeedle', weapon: true },
  [LIGHTWORLDITEMS.BLACKSHARD]: { displayName: 'BlackShard', weapon: true },
  [LIGHTWORLDITEMS.QUILLPEN]: { displayName: 'QuillPen', weapon: true },
};

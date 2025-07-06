import type { BaseProperties } from '../types';

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

export const LIGHTWORLDITEMS_META: Record<LightWorldItemIndex, BaseProperties> =
  {
    [LIGHTWORLDITEMS.EMPTY]: { displayName: 'Empty' },
    [LIGHTWORLDITEMS.HOT_CHOCOLATE]: { displayName: 'Hot Chocolate' },
    [LIGHTWORLDITEMS.PENCIL]: { displayName: 'Pencil' },
    [LIGHTWORLDITEMS.BANDAGE]: { displayName: 'Bandage' },
    [LIGHTWORLDITEMS.BOUQUET]: { displayName: 'Bouquet' },
    [LIGHTWORLDITEMS.BALL_OF_JUNK]: { displayName: 'Ball of Junk' },
    [LIGHTWORLDITEMS.HALLOWEEN_PENCIL]: { displayName: 'Halloween Pencil' },
    [LIGHTWORLDITEMS.LUCKY_PENCIL]: { displayName: 'Lucky Pencil' },
    [LIGHTWORLDITEMS.EGG]: { displayName: 'Egg' },
    [LIGHTWORLDITEMS.CARDS]: { displayName: 'Cards' },
    [LIGHTWORLDITEMS.BOX_OF_HEART_CANDY]: { displayName: 'Box of Heart Candy' },
    [LIGHTWORLDITEMS.GLASS]: { displayName: 'Glass' },
    [LIGHTWORLDITEMS.ERASER]: { displayName: 'Eraser' },
    [LIGHTWORLDITEMS.MECH_PENCIL]: { displayName: 'Mech. Pencil' },
    [LIGHTWORLDITEMS.WRISTWATCH]: { displayName: 'Wristwatch' },
    [LIGHTWORLDITEMS.HOLIDAY_PENCIL]: { displayName: 'Holiday Pencil' },
    [LIGHTWORLDITEMS.CACTUSNEEDLE]: { displayName: 'CactusNeedle' },
    [LIGHTWORLDITEMS.BLACKSHARD]: { displayName: 'BlackShard' },
    [LIGHTWORLDITEMS.QUILLPEN]: { displayName: 'QuillPen' },
  };

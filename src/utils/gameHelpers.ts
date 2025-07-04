import {
  ARMORS,
  ARMORS_META,
  CONSUMABLES,
  CONSUMABLES_META,
  FLAGS,
  FLAGS_META,
  KEY_ITEMS,
  KEY_ITEMS_META,
  WEAPONS,
  WEAPONS_META,
} from '../data';
import { createEntityHelpers } from './entityHelpers';

export const flagHelpers = createEntityHelpers(FLAGS, FLAGS_META);
export const consumableHelpers = createEntityHelpers(
  CONSUMABLES,
  CONSUMABLES_META,
);
export const keyItemHelpers = createEntityHelpers(KEY_ITEMS, KEY_ITEMS_META);
export const weaponHelpers = createEntityHelpers(WEAPONS, WEAPONS_META);
export const armorHelpers = createEntityHelpers(ARMORS, ARMORS_META);

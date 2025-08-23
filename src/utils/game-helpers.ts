import {
  ARMORS,
  ARMORS_META,
  CONSUMABLES,
  CONSUMABLES_META,
  FLAGS,
  FLAGS_META,
  KEYITEMS,
  KEYITEMS_META,
  WEAPONS,
  WEAPONS_META,
  CHARACTERS,
  CHARACTERS_META,
  CHAPTERS,
  CHAPTERS_META,
} from '@data';
import { createEntityHelpers } from './entity-helpers';

export const flagHelpers = createEntityHelpers(FLAGS, FLAGS_META);
export const consumableHelpers = createEntityHelpers(
  CONSUMABLES,
  CONSUMABLES_META,
);
export const keyItemHelpers = createEntityHelpers(KEYITEMS, KEYITEMS_META);
export const weaponHelpers = createEntityHelpers(WEAPONS, WEAPONS_META);
export const armorHelpers = createEntityHelpers(ARMORS, ARMORS_META);
export const characterHelpers = createEntityHelpers(
  CHARACTERS,
  CHARACTERS_META,
);
export const chapterHelpers = createEntityHelpers(CHAPTERS, CHAPTERS_META);

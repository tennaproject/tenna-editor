import { CONSUMABLES, CONSUMABLES_META } from '../data/consumables';
import { FLAGS_META, FLAGS } from '../data/flags';
import { createEntityHelpers } from './entityHelpers';

export const flagHelpers = createEntityHelpers(FLAGS, FLAGS_META);
export const consumableHelpers = createEntityHelpers(
  CONSUMABLES,
  CONSUMABLES_META,
);

import type { BaseProperties } from '@types';
import {
  FLAGS,
  type FlagIndex,
  type FlagProperties,
  type FlagValueType,
} from './flags';

export interface FlagBitfieldProperties extends BaseProperties {
  parent: FlagIndex;
  index: number;
  width?: number;
  valueType?: FlagValueType;
  valueRules?: FlagProperties['valueRules'];
}

const FLAG_BITFIELD_ENTRIES = {
  CASTLE_CLIMB_CUTSCENE0: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 0,
    displayName: 'Saw Rouxls & Mizzle cutscene',
    description: 'Whether the Rouxls & Mizzle cutscene. (over 5 minutes)',
    valueType: 'boolean',
  },
  CASTLE_CLIMB_CUTSCENE1: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 1,
    displayName: 'Saw Rouxls looking for extra darlings cutscene',
    description:
      'Whether you saw the Rouxls looking for extra darlings cutscene. (26.7 seconds to 5 minutes)',
    valueType: 'boolean',
  },
  CASTLE_CLIMB_CUTSCENE2: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 4,
    displayName: 'Saw Rouxls looking for extra darlings cutscene a second time',
    description:
      'Whether you saw the Rouxls looking for extra darlings cutscene a second time. (26.7 seconds to 5 minutes)',
    valueType: 'boolean',
  },
  CASTLE_CLIMB_CUTSCENE3: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 5,
    displayName: 'Saw Shadowguy sock cutscene',
    description:
      'Whether you saw the Shadowguy sock cutscene. (25 to 26.6 seconds)',
    valueType: 'boolean',
  },
  CASTLE_CLIMB_CUTSCENE4: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 6,
    displayName: 'Saw sad Iconman cutscene',
    description:
      'Whether you saw the sad Iconman cutscene. (23.3 to 24.9 seconds)',
    valueType: 'boolean',
  },
  CASTLE_CLIMB_CUTSCENE5: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 2,
    displayName: 'Saw Princess Ralsei cutscene',
    description:
      'Whether you saw the Princess Ralsei cutscene. (under 23.3 seconds)',
    valueType: 'boolean',
  },
  CASTLE_CLIMB_CUTSCENE5_CHOICE: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 3,
    displayName: 'Princess Ralsei choice',
    description: 'Whether you wanted Ralsei to be your princess.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Nah bro...',
        1: 'Of course!',
      },
    },
  },
  CASTLE_CLIMB_CUTSCENE6: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 8,
    displayName: 'Saw Princess Ralsei cutscene a second time',
    description:
      'Whether you saw the Princess Ralsei cutscene a second time. (under 23.3 seconds)',
    valueType: 'boolean',
  },
  CASTLE_CLIMB_CUTSCENE9: {
    parent: FLAGS.CASTLE_CLIMB_CUTSCENES,
    index: 7,
    displayName: 'Saw Rouxls & Mizzle cutscene a second time',
    description:
      'Whether you saw the Rouxls & Mizzle cutscene a second time. (over 5 minutes)',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE0: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 0,
    displayName: 'Destroyed third middle leaf pile',
    description:
      'Whether you destroyed the third leaf pile in the middle section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE1: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 1,
    displayName: 'Destroyed first left leaf wall pile',
    description:
      'Whether you destroyed the first leaf pile of the left leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE2: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 2,
    displayName: 'Destroyed second left leaf wall pile',
    description:
      'Whether you destroyed the second leaf pile of the left leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE3: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 3,
    displayName: 'Destroyed third left leaf wall pile',
    description:
      'Whether you destroyed the third leaf pile of the left leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE4: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 4,
    displayName: 'Destroyed fourth left leaf wall pile',
    description:
      'Whether you destroyed the fourth leaf pile of the left leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE5: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 5,
    displayName: 'Destroyed bottom left leaf pile',
    description:
      'Whether you destroyed the left leaf pile inbetween the leaf walls in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE6: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 6,
    displayName: 'Destroyed bottom right leaf pile',
    description:
      'Whether you destroyed the right leaf pile inbetween the leaf walls in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE7: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 7,
    displayName: 'Destroyed second right leaf wall pile',
    description:
      'Whether you destroyed the second leaf pile of the right leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE8: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 8,
    displayName: 'Destroyed first right leaf wall pile',
    description:
      'Whether you destroyed the first leaf pile of the right leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE9: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 9,
    displayName: 'Destroyed third right leaf wall pile',
    description:
      'Whether you destroyed the third leaf pile of the right leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE10: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 10,
    displayName: 'Destroyed fourth right leaf wall pile',
    description:
      'Whether you destroyed the fourth leaf pile of the right leaf wall in the bottom section of the second dash room.',
    valueType: 'boolean',
  },
  FIRSTDASH_LEAFPILES: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 11,
    displayName: 'Destroyed leaf piles',
    description:
      'Whether you destroyed the leaf piles at the end of the first dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE12: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 12,
    displayName: 'Destroyed first middle leaf pile',
    description:
      'Whether you destroyed the first leaf pile in the middle section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE13: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 13,
    displayName: 'Destroyed second middle leaf pile',
    description:
      'Whether you destroyed the second leaf pile in the middle section of the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_DESTOYEDTEA: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 15,
    displayName: 'Crashed tea party',
    description:
      'Whether you crashed the Floradinn tea party in the second dash room.',
    valueType: 'boolean',
  },
  NEWDASH_LEAFPILE16: {
    parent: FLAGS.DASH_LEAFPILE_FLAGS,
    index: 16,
    displayName: 'Destroyed fourth middle leaf pile',
    description:
      'Whether you destroyed the fourth leaf pile in the middle section of the second dash room.',
    valueType: 'boolean',
  },
  IDEAL_DINER_TALKED_TO_YELLOW: {
    parent: FLAGS.IDEAL_DINER_FLAGS,
    index: 0,
    width: 2,
    displayName: 'Talked to Yellow',
    description: 'Whether you talked to Yellow in the Ideal Diner.',
    valueType: 'boolean',
  },
  IDEAL_DINER_CHECKED_REGISTER: {
    parent: FLAGS.IDEAL_DINER_FLAGS,
    index: 1,
    width: 2,
    displayName: 'Took money from cash register',
    description:
      'Whether you checked the cash register in the Ideal Diner and took 1 Flowery Dollar from it.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_JUMP_TUTORIAL: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 1,
    displayName: 'Jump tutorial',
    description: 'Whether you completed the jump tutorial.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_ACT_TUTORIAL: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 2,
    displayName: 'Act tutorial',
    description: 'Whether you completed the act tutorial.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_TREE_SMASHED: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 3,
    displayName: 'Tree knocked over',
    description: 'Whether you used Rude Buster on the tree, knocking it over.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_TREE_FRUIT1_SMASHED: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 4,
    displayName: 'Fruit 1 destroyed',
    description:
      'Whether you used Rude Buster on the first tree fruit, destroying it.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_TREE_FRUIT2_SMASHED: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 5,
    displayName: 'Fruit 2 destroyed',
    description:
      'Whether you used Rude Buster on the second tree fruit, destroying it.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_TREE_FRUIT3_SMASHED: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 6,
    displayName: 'Fruit 3 destroyed',
    description:
      'Whether you used Rude Buster on the third tree fruit, destroying it.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_BRAMBLES_ACTED: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 7,
    displayName: 'Acted on vines',
    description:
      'Whether you tried acting on the vines, prompting Susie to tell you to use your sword.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_ATTACK_WALL: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 8,
    displayName: 'Attacked wall',
    description:
      'Whether you attacked a wall, prompting Ralsei to tell you how to jump.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_PINKBELL: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 9,
    displayName: 'Got Pink Coin',
    description:
      'Whether you destroyed the Pink Coin bell in the platforming tutorial room.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_BELL_AQUAPLATFORMING1: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 10,
    displayName: 'Destroyed tutorial bell',
    description:
      'Whether you destroyed the bell in the platforming tutorial room.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_BELL_AQUAPLATFORMING2: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 11,
    displayName: 'Destroyed long tutorial bell',
    description:
      'Whether you destroyed the long bell in the platforming tutorial room.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_BELL_AQUAHOLE: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 12,
    displayName: 'Destroyed pre-Shrine bell',
    description:
      'Whether you destroyed the bell in the room before the Shrine.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_BELL_AQUAHOLE_LEFT1: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 13,
    displayName: 'Destroyed first Shrine door bell',
    description:
      'Whether you destroyed the first bell in the Shrine fast travel door room.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_BELL_AQUAHOLE_LEFT2: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 14,
    displayName: 'Destroyed second Shrine door bell',
    description:
      'Whether you destroyed the second bell in the Shrine fast travel door room.',
    valueType: 'boolean',
  },
  PLATFORMING_INTRO_BELL_AQUAHOLE_LEFT3: {
    parent: FLAGS.PLATFORMING_INTRO_FLAGS,
    index: 15,
    displayName: 'Destroyed third Shrine door bell',
    description:
      'Whether you destroyed the third bell in the Shrine fast travel door room.',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN1: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 13,
    displayName: 'Collected 1st coin',
    description:
      'Whether you collected the 1st coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN2: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 12,
    displayName: 'Collected 2nd coin',
    description:
      'Whether you collected the 2nd coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN3: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 11,
    displayName: 'Collected 3rd coin',
    description:
      'Whether you collected the 3rd coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN4: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 10,
    displayName: 'Collected 4th coin',
    description:
      'Whether you collected the 4th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN5: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 9,
    displayName: 'Collected 5th coin',
    description:
      'Whether you collected the 5th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN6: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 8,
    displayName: 'Collected 6th coin',
    description:
      'Whether you collected the 6th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN7: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 7,
    displayName: 'Collected 7th coin',
    description:
      'Whether you collected the 7th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN8: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 6,
    displayName: 'Collected 8th coin',
    description:
      'Whether you collected the 8th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN9: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 5,
    displayName: 'Collected 9th coin',
    description:
      'Whether you collected the 9th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN10: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 4,
    displayName: 'Collected 10th coin',
    description:
      'Whether you collected the 10th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN11: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 3,
    displayName: 'Collected 11th coin',
    description:
      'Whether you collected the 11th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN12: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 2,
    displayName: 'Collected 12th coin',
    description:
      'Whether you collected the 12th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN13: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS1,
    index: 1,
    displayName: 'Collected 13th coin',
    description:
      'Whether you collected the 13th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN14: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 17,
    displayName: 'Collected 14th coin',
    description:
      'Whether you collected the 14th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN15: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 16,
    displayName: 'Collected 15th coin',
    description:
      'Whether you collected the 15th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN16: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 15,
    displayName: 'Collected 16th coin',
    description:
      'Whether you collected the 16th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN17: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 14,
    displayName: 'Collected 17th coin',
    description:
      'Whether you collected the 17th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN18: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 13,
    displayName: 'Collected 18th coin',
    description:
      'Whether you collected the 18th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN19: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 12,
    displayName: 'Collected 19th coin',
    description:
      'Whether you collected the 19th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN20: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 11,
    displayName: 'Collected 20th coin',
    description:
      'Whether you collected the 20th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN21: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 10,
    displayName: 'Collected 21st coin',
    description:
      'Whether you collected the 21st coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN22: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 9,
    displayName: 'Collected 22nd coin',
    description:
      'Whether you collected the 22nd coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN23: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 8,
    displayName: 'Collected 23rd coin',
    description:
      'Whether you collected the 23rd coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN24: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 7,
    displayName: 'Collected 24th coin',
    description:
      'Whether you collected the 24th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN25: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 6,
    displayName: 'Collected 25th coin',
    description:
      'Whether you collected the 25th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN26: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 5,
    displayName: 'Collected 26th coin',
    description:
      'Whether you collected the 26th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN27: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 4,
    displayName: 'Collected 27th coin',
    description:
      'Whether you collected the 27th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN28: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 3,
    displayName: 'Collected 28th coin',
    description:
      'Whether you collected the 28th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_COIN29: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 2,
    displayName: 'Collected 29th coin',
    description:
      'Whether you collected the 29th coin in the dash section of End of Garden. (Ordered right to left)',
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_AQUA_BULLETPATTERNS: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 1,
    displayName: "Defeated Aqua's bullet patterns",
    description:
      "Whether you defeated Aqua's bullet patterns in End of Garden.",
    valueType: 'boolean',
  },
  GARDEN_AQUADASH_PLAT_PINKCOIN: {
    parent: FLAGS.GARDEN_AQUADASH_PLAT_COINS2,
    index: 0,
    displayName: 'Got Pink Coin',
    description: 'Whether you destroyed the Pink Coin bell in End of Garden.',
    valueType: 'boolean',
  },
  SCISSORS_PUZZLE_SHAPED_BUSH_CUT: {
    parent: FLAGS.SCISSORS_PUZZLE_FLAGS,
    index: 8,
    displayName: 'Cut the shaped bush',
    description: 'Whether the scissors puzzle shaped bush was cut.',
    valueType: 'boolean',
  },
  SCISSORS_PUZZLE_FLOWERY_FACE_PATH_CUT: {
    parent: FLAGS.SCISSORS_PUZZLE_FLAGS,
    index: 10,
    displayName: 'Cut the Flowery-face path bush',
    description:
      'Whether the scissors puzzle bush leading to the Flowery face room was cut.',
    valueType: 'boolean',
  },
  RALSEI_HOLD_Z_HINT: {
    parent: FLAGS.SCISSORS_PUZZLE_FLAGS,
    index: 11,
    displayName: 'Ralsei hold-Z hint',
    description: 'Whether Ralsei told Kris that they can hold Z.',
    valueType: 'boolean',
  },
  HOPSCHEF_PROGRESS: {
    parent: FLAGS.HOPSCHEF_PROGRESS_FLAG,
    index: 0,
    width: 2,
    displayName: 'Hopschef progress',
    description: 'Progress state for the Hopschef challenge.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Default state',
        1: 'Destroyed BREAD',
        2: 'Completed challenge',
      },
    },
  },
  HOPSCHEF_REWARDS: {
    parent: FLAGS.HOPSCHEF_PROGRESS_FLAG,
    index: 1,
    width: 3,
    displayName: 'Hopschef highest reward',
    description: 'The highest reward you have gotten from Hopschef.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Default state',
        1: '10 F$ (15 seconds or less)',
        2: '20 F$ (12 seconds or less)',
        3: '40 F$ (8 seconds or less)',
        4: '40 F$ in all big coins (5 seconds or less)',
      },
    },
  },
  FERROLL_SMASHED_PARTY: {
    parent: FLAGS.FERROLL_SMASHED_FLAGS,
    index: 0,
    width: 4,
    displayName: 'Smashed party',
    description: 'Whether Ferroll smashed your party members.',
    valueType: 'boolean',
  },
  FERROLL_SMASHED_MONEY: {
    parent: FLAGS.FERROLL_SMASHED_FLAGS,
    index: 1,
    width: 4,
    displayName: 'Smashed money',
    description: 'Whether Ferroll smashed your money.',
    valueType: 'boolean',
  },
  CLIFFS_CUTDOWN_TUTORIAL_BULLETPATTERN: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 10,
    displayName: "Defeated Seth's bullet pattern",
    description: "Whether you defeated Seth's bullet pattern.",
    valueType: 'boolean',
  },
  CLIFFS_CUTDOWN_TUTORIAL_GRASSRIGHT2: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 11,
    displayName: 'Cut second right grass',
    description:
      'Whether you cut the second piece of grass on the right side of the room.',
    valueType: 'boolean',
  },
  CLIFFS_CUTDOWN_TUTORIAL_GRASSRIGHT1: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 12,
    displayName: 'Cut first right grass',
    description:
      'Whether you cut the first piece of grass on the right side of the room.',
    valueType: 'boolean',
  },
  CLIFFS_CUTDOWN_TUTORIAL_GRASSLEFT1: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 13,
    displayName: 'Cut first left grass',
    description:
      'Whether you cut the first piece of grass on the left side of the room.',
    valueType: 'boolean',
  },
  CLIFFS_CUTDOWN_TUTORIAL_GRASSLEFT2: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 14,
    displayName: 'Cut second left grass',
    description:
      'Whether you cut the second piece of grass on the left side of the room.',
    valueType: 'boolean',
  },
  CLIFFS_CUTDOWN_TUTORIAL_GRASSLEFT3: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 15,
    displayName: 'Cut third left grass',
    description:
      'Whether you cut the third piece of grass on the left side of the room.',
    valueType: 'boolean',
  },
  CLIFFS_CUTDOWN_TUTORIAL_PINKBELL: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 16,
    displayName: 'Got Pink Coin',
    description:
      'Whether you destroyed the Pink Coin bell in the Cliffs First Climb platforming room.',
    valueType: 'boolean',
  },
  CLIFFS_BONUSCOMBAT_PINKBELL: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 17,
    displayName: 'Got Pink Coin',
    description:
      'Whether you destroyed the Pink Coin bell in the Cliffs Windstruggler room.',
    valueType: 'boolean',
  },
  CLIFFS_BONUSCOMBAT_BULLETPATTERN: {
    parent: FLAGS.CLIFFS_CUTDOWN_TUTORIAL_FLAGS,
    index: 18,
    displayName: "Defeated Seth's bullet pattern",
    description:
      "Whether you defeated Seth's bullet pattern in the Cliffs Windstruggler room.",
    valueType: 'boolean',
  },
  ASGORE_DOCUMENT_TOTALREAD: {
    parent: FLAGS.ASGORE_DOCUMENT_PROGRESS,
    index: 0,
    width: 2,
    displayName: 'Total documents read',
    description:
      "Tracks how many of Asgore's documents you have read in total.",
    valueType: 'number',
    valueRules: { min: 0 },
  },
  ASGORE_DOCUMENT_LEFTFIRST: {
    parent: FLAGS.ASGORE_DOCUMENT_PROGRESS,
    index: 2,
    width: 1,
    displayName: 'Read left documents first',
    description:
      'Whether you read the documents on the left side of Flower Castle before the documents on the right side.',
    valueType: 'boolean',
  },
  ASGORE_DOCUMENT_RIGHTFIRST: {
    parent: FLAGS.ASGORE_DOCUMENT_PROGRESS,
    index: 3,
    width: 1,
    displayName: 'Read right documents first',
    description:
      'Whether you read the documents on the right side of Flower Castle before the documents on the left side.',
    valueType: 'boolean',
  },
  TERAKOTA_PUZZLE_STATUE1: {
    parent: FLAGS.TERAKOTA_PUZZLE_FLAGS,
    index: 0,
    displayName: 'Pushed statue 1',
    description: 'Whether you pushed the first Terakota statue off.',
    valueType: 'boolean',
  },
  TERAKOTA_PUZZLE_STATUE2: {
    parent: FLAGS.TERAKOTA_PUZZLE_FLAGS,
    index: 2,
    displayName: 'Pushed statue 2',
    description: 'Whether you pushed the second Terakota statue off.',
    valueType: 'boolean',
  },
  TERAKOTA_PUZZLE_STATUE3: {
    parent: FLAGS.TERAKOTA_PUZZLE_FLAGS,
    index: 6,
    displayName: 'Pushed statue 3',
    description: 'Whether you pushed the third Terakota statue off.',
    valueType: 'boolean',
  },
  TERAKOTA_PUZZLE_STATUE4: {
    parent: FLAGS.TERAKOTA_PUZZLE_FLAGS,
    index: 3,
    displayName: 'Pushed statue 4',
    description: 'Whether you pushed the fourth Terakota statue off.',
    valueType: 'boolean',
  },
  TERAKOTA_PUZZLE_STATUE5: {
    parent: FLAGS.TERAKOTA_PUZZLE_FLAGS,
    index: 8,
    displayName: 'Pushed statue 5',
    description: 'Whether you pushed the fifth Terakota statue off.',
    valueType: 'boolean',
  },
  TERAKOTA_PUZZLE_SOLVED: {
    parent: FLAGS.TERAKOTA_PUZZLE_FLAGS,
    index: 10,
    displayName: 'Puzzle solved',
    description: 'Whether you solved the Terakota statue puzzle.',
    valueType: 'boolean',
  },
  DEFEATED_FIRST_ORANGE_BP: {
    parent: FLAGS.DEFEATED_FIRST_ORANGE_BP_FLAG,
    index: 10,
    width: 1,
    displayName: "Defeated Orange's first bullet pattern",
    description: "Whether you defeated Orange's first bullet pattern.",
    valueType: 'boolean',
  },
  FOXHUNT_FIRST_TERAKOTA: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 0,
    width: 1,
    displayName: 'Pushed first Terakota statue',
    description:
      'Whether you pushed the Terakota statue at the entrance of the Terakota room.',
    valueType: 'boolean',
  },
  FOXHUNT_FOX1: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 1,
    width: 1,
    displayName: 'Got running fox',
    description:
      'Whether you got the fox running between Terakota statues for the fox hunt.',
    valueType: 'boolean',
  },
  FOXHUNT_FOX2: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 2,
    width: 1,
    displayName: 'Got bullet fox',
    description:
      'Whether you got the fox hidden between paw bullets for the fox hunt.',
    valueType: 'boolean',
  },
  FOXHUNT_FOX3: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 3,
    width: 1,
    displayName: 'Got chaos fox',
    description: 'Whether you got the fox in the chaos room for the fox hunt.',
    valueType: 'boolean',
  },
  FOXHUNT_FOX4: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 4,
    width: 1,
    displayName: 'Got Terakota statue fox',
    description:
      'Whether you got the fox hidden under a Terakota statue for the fox hunt.',
    valueType: 'boolean',
  },
  FOXHUNT_FOX5: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 5,
    width: 1,
    displayName: 'Got sock fox',
    description: 'Whether you got fox in the sock room for the fox hunt.',
    valueType: 'boolean',
  },
  FOXHUNT_AQUA: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 7,
    width: 1,
    displayName: 'Beat Aqua Netskie',
    description: 'Whether you beat the Netskie that disguised itself as Aqua.',
    valueType: 'boolean',
  },
  FOXHUNT_TERAKOTA_PUSHED: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 7,
    width: 2,
    displayName: 'Terakota statue push dialogue',
    description:
      'Handles the dialogue that plays when pushing more Terakota statues off after finding the Terakota fox.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Default state',
        1: 'Pushed off 4 Terakota statues',
        2: 'Pushed off 10 Terakota statues',
        3: 'Pushed off all Terakota statues',
      },
    },
  },
  FOXHUNT_OPENDOOR: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 8,
    width: 1,
    displayName: 'Opened fox door',
    description: 'Whether you opened the door that requires five foxes.',
    valueType: 'boolean',
  },
  FOXHUNT_TERASKIP: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 9,
    width: 1,
    displayName: 'Fought Terakota',
    description:
      'Whether you fought the Terakota in the Terakota statues room.',
    valueType: 'boolean',
  },
  FOXHUNT_CHAOS_AQUA: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 10,
    width: 1,
    displayName: 'Picked up Aqua',
    description: 'Whether you picked up Aqua in the chaos room.',
    valueType: 'boolean',
  },
  FOXHUNT_CHAOS_SETH: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 11,
    width: 1,
    displayName: 'Picked up Seth',
    description: 'Whether you picked up Seth in the chaos room.',
    valueType: 'boolean',
  },
  FOXHUNT_CHAOS_WATER: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 12,
    width: 1,
    displayName: 'Picked up bottle of water',
    description: 'Whether you picked up the bottle of water in the chaos room.',
    valueType: 'boolean',
  },
  FOXHUNT_CHAOS_DOG: {
    parent: FLAGS.FOXHUNT_FLAGS,
    index: 13,
    width: 1,
    displayName: 'Picked up Annoying Dog',
    description: 'Whether you picked up the Annoying Dog in the chaos room.',
    valueType: 'boolean',
  },
  PINK_DOOR_SHORTCUT_UNLOCKED: {
    parent: FLAGS.PINK_DOOR_FLAGS,
    index: 0,
    width: 1,
    displayName: 'Unlocked shortcut to door',
    description:
      'Whether the shortcut leading from the start of Top of Castle to the Pink Door has been unlocked.',
    valueType: 'boolean',
  },
  PINK_DOOR_SHORTCUT_CUTSCENE: {
    parent: FLAGS.PINK_DOOR_FLAGS,
    index: 1,
    width: 1,
    displayName: 'Watched shortcut cutscene',
    description:
      'Whether you have watched the cutscene of the shortcut to the Pink Door being created.',
    valueType: 'boolean',
  },
  PINK_DOOR_INTERACTED_NO_KEY: {
    parent: FLAGS.PINK_DOOR_FLAGS,
    index: 2,
    width: 1,
    displayName: 'Interacted with door without key',
    description: 'Whether you interacted the Pink Door without having the key.',
    valueType: 'boolean',
  },
  PINK_DOOR_PINKCOIN: {
    parent: FLAGS.PINK_DOOR_FLAGS,
    index: 10,
    width: 1,
    displayName: 'Got Pink Coin',
    description: 'Whether you got the Pink Coin in the Pink Door room.',
    valueType: 'boolean',
  },
  UNLOCKED_SETH_BREAKS_PRECAFE: {
    parent: FLAGS.UNLOCKED_BREAK_CHARACTERS_PRECAFE,
    index: 0,
    width: 2,
    displayName: 'Seth (Pre-Cafe revisit)',
    description:
      'Previous unlock state of breaks involving Seth prior to revisiting the Flower Cafe. Used for checking if they were recently unlocked or lost.',
    valueType: 'map',
    valueRules: {
      map: {
        2: 'Lost',
        0: 'Locked',
        1: 'Unlocked',
      },
    },
  },
  UNLOCKED_YELLOW_BREAKS_PRECAFE: {
    parent: FLAGS.UNLOCKED_BREAK_CHARACTERS_PRECAFE,
    index: 1,
    width: 2,
    displayName: 'Yellow (Pre-Cafe revisit)',
    description:
      'Previous unlock state of breaks involving Yellow prior to revisiting the Flower Cafe. Used for checking if they were recently unlocked or lost.',
    valueType: 'map',
    valueRules: {
      map: {
        2: 'Lost',
        0: 'Locked',
        1: 'Unlocked',
      },
    },
  },
  UNLOCKED_GREEN_BREAKS_PRECAFE: {
    parent: FLAGS.UNLOCKED_BREAK_CHARACTERS_PRECAFE,
    index: 2,
    width: 2,
    displayName: 'Green (Pre-Cafe revisit)',
    description:
      'Previous unlock state of breaks involving Green prior to revisiting the Flower Cafe. Used for checking if they were recently unlocked or lost.',
    valueType: 'map',
    valueRules: {
      map: {
        2: 'Lost',
        0: 'Locked',
        1: 'Unlocked',
      },
    },
  },
  UNLOCKED_AQUA_BREAKS_PRECAFE: {
    parent: FLAGS.UNLOCKED_BREAK_CHARACTERS_PRECAFE,
    index: 3,
    width: 2,
    displayName: 'Aqua (Pre-Cafe revisit)',
    description:
      'Previous unlock state of breaks involving Aqua prior to revisiting the Flower Cafe. Used for checking if she was recently unlocked.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Locked',
        1: 'Unlocked',
      },
    },
  },
  UNLOCKED_BLUE_BREAKS_PRECAFE: {
    parent: FLAGS.UNLOCKED_BREAK_CHARACTERS_PRECAFE,
    index: 4,
    width: 2,
    displayName: 'Blue (Pre-Cafe revisit)',
    description:
      'Previous unlock state of breaks involving Blue prior to revisiting the Flower Cafe. Used for checking if he was recently unlocked or lost.',
    valueType: 'map',
    valueRules: {
      map: {
        2: 'Lost',
        0: 'Locked',
        1: 'Unlocked',
      },
    },
  },
  UNLOCKED_ORANGE_BREAKS_PRECAFE: {
    parent: FLAGS.UNLOCKED_BREAK_CHARACTERS_PRECAFE,
    index: 5,
    width: 2,
    displayName: 'Orange (Pre-Cafe revisit)',
    description:
      'Previous unlock state of breaks involving Orange prior to revisiting the Flower Cafe. Used for checking if she was recently unlocked or lost.',
    valueType: 'map',
    valueRules: {
      map: {
        2: 'Lost',
        0: 'Locked',
        1: 'Unlocked',
      },
    },
  },
  UNLOCKED_PINK_BREAKS_PRECAFE: {
    parent: FLAGS.UNLOCKED_BREAK_CHARACTERS_PRECAFE,
    index: 6,
    width: 2,
    displayName: 'Pink (Pre-Cafe revisit)',
    description:
      'Previous unlock state of breaks involving Pink prior to revisiting the Flower Cafe. Used for checking if she was recently unlocked.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Locked',
        1: 'Unlocked',
      },
    },
  },
  BREAKBOUGHT_AQUA_KRIS: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 0,
    width: 1,
    displayName: 'Aqua & Kris',
    description: 'Bought status of the Aqua & Kris break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_AQUA_SETH: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 1,
    width: 1,
    displayName: 'Aqua & Seth',
    description: 'Bought status of the Aqua & Seth break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_AQUA_YELLOW: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 2,
    width: 1,
    displayName: 'Aqua & Yellow',
    description: 'Bought status of the Aqua & Yellow break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_AQUA_GREEN: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 4,
    width: 1,
    displayName: 'Aqua & Green',
    description: 'Bought status of the Aqua & Green break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_AQUA_BLUE: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 5,
    width: 1,
    displayName: 'Aqua & Blue',
    description: 'Bought status of the Aqua & Blue break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_AQUA_ORANGE: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 6,
    width: 1,
    displayName: 'Aqua & Orange',
    description: 'Bought status of the Aqua & Orange break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_SETH_RALSEI: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 7,
    width: 1,
    displayName: 'Seth & Ralsei',
    description: 'Bought status of the Seth & Ralsei break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_SETH_SUSIE: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 8,
    width: 1,
    displayName: 'Seth & Susie',
    description: 'Bought status of the Seth & Susie break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_SETH_YELLOW: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 9,
    width: 1,
    displayName: 'Seth & Yellow',
    description: 'Bought status of the Seth & Yellow break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_SETH_GREEN: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 10,
    width: 1,
    displayName: 'Seth & Green',
    description: 'Bought status of the Seth & Green break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_SETH_BLUE: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 11,
    width: 1,
    displayName: 'Seth & Blue',
    description: 'Bought status of the Seth & Blue break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_SETH_ORANGE: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 12,
    width: 1,
    displayName: 'Seth & Orange',
    description: 'Bought status of the Seth & Orange break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_YELLOW_RALSEI: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 13,
    width: 1,
    displayName: 'Yellow & Ralsei',
    description: 'Bought status of the Yellow & Ralsei break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_YELLOW_GREEN: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 14,
    width: 1,
    displayName: 'Yellow & Green',
    description: 'Bought status of the Yellow & Green break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_YELLOW_BLUE: {
    parent: FLAGS.BOUGHT_BREAKS1,
    index: 15,
    width: 1,
    displayName: 'Yellow & Blue',
    description: 'Bought status of the Yellow & Blue break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_YELLOW_ORANGE: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 0,
    width: 1,
    displayName: 'Yellow & Orange',
    description: 'Bought status of the Yellow & Orange break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_GREEN: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 1,
    width: 1,
    displayName: 'Green',
    description: 'Bought status of the Green break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_GREEN_ORANGE: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 2,
    width: 1,
    displayName: 'Green & Orange',
    description: 'Bought status of the Green & Orange break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_BLUE_SUSIE: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 3,
    width: 1,
    displayName: 'Blue & Susie',
    description: 'Bought status of the Blue & Susie break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_BLUE_ORANGE: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 4,
    width: 1,
    displayName: 'Blue & Orange',
    description: 'Bought status of the Blue & Orange break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_BLUE_ORANGE2: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 5,
    width: 1,
    displayName: 'Blue & Orange 2',
    description: 'Bought status of the Blue & Orange 2 break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_BLUE_ORANGE3: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 6,
    width: 1,
    displayName: 'Blue & Orange 3',
    description: 'Bought status of the Blue & Orange 3 break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_BLUE_GREEN: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 7,
    width: 1,
    displayName: 'Blue & Green',
    description: 'Bought status of the Blue & Green break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_ORANGE_SUSIE: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 8,
    width: 1,
    displayName: 'Orange & Susie',
    description: 'Bought status of the Orange & Susie break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_ORANGE_RALSEI: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 9,
    width: 1,
    displayName: 'Orange & Ralsei',
    description: 'Bought status of the Orange & Ralsei break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_PINK_ORANGE: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 10,
    width: 1,
    displayName: 'Pink & Orange',
    description: 'Bought status of the Pink & Orange break.',
    valueType: 'boolean',
  },
  BREAKBOUGHT_PINK_KRIS: {
    parent: FLAGS.BOUGHT_BREAKS2,
    index: 11,
    width: 1,
    displayName: 'Pink & Kris',
    description: 'Bought status of the Pink & Kris break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_AQUA_KRIS: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 0,
    width: 1,
    displayName: 'Aqua & Kris',
    description: 'Watched status of the Aqua & Kris break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_AQUA_SETH: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 1,
    width: 1,
    displayName: 'Aqua & Seth',
    description: 'Watched status of the Aqua & Seth break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_AQUA_YELLOW: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 2,
    width: 1,
    displayName: 'Aqua & Yellow',
    description: 'Watched status of the Aqua & Yellow break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_AQUA_GREEN: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 4,
    width: 1,
    displayName: 'Aqua & Green',
    description: 'Watched status of the Aqua & Green break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_AQUA_BLUE: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 5,
    width: 1,
    displayName: 'Aqua & Blue',
    description: 'Watched status of the Aqua & Blue break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_AQUA_ORANGE: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 6,
    width: 1,
    displayName: 'Aqua & Orange',
    description: 'Watched status of the Aqua & Orange break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_SETH_RALSEI: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 7,
    width: 1,
    displayName: 'Seth & Ralsei',
    description: 'Watched status of the Seth & Ralsei break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_SETH_SUSIE: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 8,
    width: 1,
    displayName: 'Seth & Susie',
    description: 'Watched status of the Seth & Susie break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_SETH_YELLOW: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 9,
    width: 1,
    displayName: 'Seth & Yellow',
    description: 'Watched status of the Seth & Yellow break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_SETH_GREEN: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 10,
    width: 1,
    displayName: 'Seth & Green',
    description: 'Watched status of the Seth & Green break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_SETH_BLUE: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 11,
    width: 1,
    displayName: 'Seth & Blue',
    description: 'Watched status of the Seth & Blue break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_SETH_ORANGE: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 12,
    width: 1,
    displayName: 'Seth & Orange',
    description: 'Watched status of the Seth & Orange break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_YELLOW_RALSEI: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 13,
    width: 1,
    displayName: 'Yellow & Ralsei',
    description: 'Watched status of the Yellow & Ralsei break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_YELLOW_GREEN: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 14,
    width: 1,
    displayName: 'Yellow & Green',
    description: 'Watched status of the Yellow & Green break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_YELLOW_BLUE: {
    parent: FLAGS.WATCHED_BREAKS1,
    index: 15,
    width: 1,
    displayName: 'Yellow & Blue',
    description: 'Watched status of the Yellow & Blue break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_YELLOW_ORANGE: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 0,
    width: 1,
    displayName: 'Yellow & Orange',
    description: 'Watched status of the Yellow & Orange break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_GREEN: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 1,
    width: 1,
    displayName: 'Green',
    description: 'Watched status of the Green break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_GREEN_ORANGE: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 2,
    width: 1,
    displayName: 'Green & Orange',
    description: 'Watched status of the Green & Orange break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_BLUE_SUSIE: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 3,
    width: 1,
    displayName: 'Blue & Susie',
    description: 'Watched status of the Blue & Susie break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_BLUE_ORANGE: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 4,
    width: 1,
    displayName: 'Blue & Orange',
    description: 'Watched status of the Blue & Orange break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_BLUE_ORANGE2: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 5,
    width: 1,
    displayName: 'Blue & Orange 2',
    description: 'Watched status of the Blue & Orange 2 break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_BLUE_ORANGE3: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 6,
    width: 1,
    displayName: 'Blue & Orange 3',
    description: 'Watched status of the Blue & Orange 3 break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_BLUE_GREEN: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 7,
    width: 1,
    displayName: 'Blue & Green',
    description: 'Watched status of the Blue & Green break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_ORANGE_SUSIE: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 8,
    width: 1,
    displayName: 'Orange & Susie',
    description: 'Watched status of the Orange & Susie break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_ORANGE_RALSEI: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 9,
    width: 1,
    displayName: 'Orange & Ralsei',
    description: 'Watched status of the Orange & Ralsei break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_PINK_ORANGE: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 10,
    width: 1,
    displayName: 'Pink & Orange',
    description: 'Watched status of the Pink & Orange break.',
    valueType: 'boolean',
  },
  BREAKWATCHED_PINK_KRIS: {
    parent: FLAGS.WATCHED_BREAKS2,
    index: 11,
    width: 1,
    displayName: 'Pink & Kris',
    description: 'Watched status of the Pink & Kris break.',
    valueType: 'boolean',
  },
  SHADOW_PLATFORM_X_FCASTLE_RIGHT_PUZZLE1: {
    parent: FLAGS.RIGHT_PUZZLE_SHADOW_PLATFORM_X,
    index: 0,
    width: 5,
    displayName: 'Vertical platform X position',
    description:
      'X position of the vertical shadow platform in the first shadow platform puzzle room.',
    valueType: 'number',
  },
  SHADOW_PLATFORM_X_FCASTLE_RIGHT_PUZZLE2: {
    parent: FLAGS.RIGHT_PUZZLE_SHADOW_PLATFORM_X,
    index: 1,
    width: 5,
    displayName: 'Horizontal platform X position',
    description:
      'X position of the horizontal shadow platform in the first shadow platform puzzle room.',
    valueType: 'number',
  },
  SHADOW_PLATFORM_Y_FCASTLE_RIGHT_PUZZLE1: {
    parent: FLAGS.RIGHT_PUZZLE_SHADOW_PLATFORM_Y,
    index: 0,
    width: 5,
    displayName: 'Vertical platform Y position',
    description:
      'Y position of the vertical shadow platform in the first shadow platform puzzle room.',
    valueType: 'number',
  },
  SHADOW_PLATFORM_Y_FCASTLE_RIGHT_PUZZLE2: {
    parent: FLAGS.RIGHT_PUZZLE_SHADOW_PLATFORM_Y,
    index: 1,
    width: 5,
    displayName: 'Horizontal platform Y position',
    description:
      'Y position of the horizontal shadow platform in the first shadow platform puzzle room.',
    valueType: 'number',
  },
  SHADOW_PLATFORM_X_FCASTLE_SIDEPUZZLE1: {
    parent: FLAGS.SIDEPUZZLE_SHADOW_PLATFORM_X,
    index: 0,
    width: 5,
    displayName: 'Large platform X position',
    description:
      'X position of the large shadow platform in the second shadow platform puzzle room.',
    valueType: 'number',
  },
  SHADOW_PLATFORM_X_FCASTLE_SIDEPUZZLE2: {
    parent: FLAGS.SIDEPUZZLE_SHADOW_PLATFORM_X,
    index: 1,
    width: 5,
    displayName: 'Small platform X position',
    description:
      'X position of the small shadow platform in the second shadow platform puzzle room.',
    valueType: 'number',
  },
  SHADOW_PLATFORM_Y_FCASTLE_SIDEPUZZLE1: {
    parent: FLAGS.SIDEPUZZLE_SHADOW_PLATFORM_Y,
    index: 0,
    width: 5,
    displayName: 'Large platform Y position',
    description:
      'Y position of the large shadow platform in the second shadow platform puzzle room.',
    valueType: 'number',
  },
  SHADOW_PLATFORM_Y_FCASTLE_SIDEPUZZLE2: {
    parent: FLAGS.SIDEPUZZLE_SHADOW_PLATFORM_Y,
    index: 1,
    width: 5,
    displayName: 'Small platform Y position',
    description:
      'Y position of the small shadow platform in the second shadow platform puzzle room.',
    valueType: 'number',
  },
  FCASTLE_BOUNCE1_BELL1: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 0,
    displayName: 'Destroyed first bell',
    description:
      'Whether you destroyed the first bell in the right section of the first bounce flower room.',
    valueType: 'boolean',
  },
  FCASTLE_BOUNCE1_BELL2: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 1,
    displayName: 'Destroyed second bell',
    description:
      'Whether you destroyed the second bell in the right section of the first bounce flower room.',
    valueType: 'boolean',
  },
  FCASTLE_BOUNCE1_BELL3: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 2,
    displayName: 'Destroyed third bell',
    description:
      'Whether you destroyed the third bell in the right section of the first bounce flower room.',
    valueType: 'boolean',
  },
  FCASTLE_BOUNCE1_BELL4: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 3,
    displayName: 'Destroyed large bell',
    description:
      'Whether you destroyed the large bell at the top of the first bounce flower room.',
    valueType: 'boolean',
  },
  FCASTLE_BOUNCE3_GOLDCOIN: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 4,
    displayName: 'Collected gold coin',
    description:
      'Whether you collected the gold coin in the right section of the punishment zone platforming room.',
    valueType: 'boolean',
  },
  FCASTLE_RIGHT_PUZZLE_COIN1: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 10,
    displayName: 'Collected left silver coin',
    description:
      'Whether you collected the left silver coin in the first shadow platform puzzle room.',
    valueType: 'boolean',
  },
  FCASTLE_RIGHT_PUZZLE_GOLDCOIN: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 11,
    displayName: 'Collected gold coin',
    description:
      'Whether you collected the gold coin in the first shadow platform puzzle room.',
    valueType: 'boolean',
  },
  FCASTLE_RIGHT_PUZZLE_COIN2: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 12,
    displayName: 'Collected right silver coin',
    description:
      'Whether you collected the right silver coin in the first shadow platform puzzle room.',
    valueType: 'boolean',
  },
  FCASTLE_SIDEPUZZLE_GOLDCOIN1: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 14,
    displayName: 'Collected first gold coin',
    description:
      'Whether you collected the first gold coin in the second shadow platform puzzle room.',
    valueType: 'boolean',
  },
  FCASTLE_SIDEPUZZLE_GOLDCOIN2: {
    parent: FLAGS.FCASTLE_BELLS_FLAGS,
    index: 15,
    displayName: 'Collected second gold coin',
    description:
      'Whether you collected the second gold coin in the second shadow platform puzzle room.',
    valueType: 'boolean',
  },
  DANGEROUS_PLATFORMING_JUMPS: {
    parent: FLAGS.DANGEROUS_PLATFORMING_CHUTE_FLAGS,
    index: 0,
    width: 4,
    displayName: 'Wall jump attempts',
    description:
      'The amount of times you tried to jump over the wall. Used for dialogue that appears when trying to jump over it a certain amount of times. Ends up getting reset to 1 if you try jumping in the jail chute after Yellow does, possible by mistake an an unused bitfield labelled as "CHUTE" exists.',
    valueType: 'number',
  },
  DANGEROUS_PLATFORMING_CHUTE: {
    parent: FLAGS.DANGEROUS_PLATFORMING_CHUTE_FLAGS,
    index: 4,
    displayName: 'Chute jumps',
    description:
      'Unused bitfield likely intended to be used when you tried jumping in the jail chute, however the bitfield for trying to jump over the wall is used instead.',
    valueType: 'boolean',
  },
  DANGEROUS_PLATFORMING_PAYOFF: {
    parent: FLAGS.DANGEROUS_PLATFORMING_CHUTE_FLAGS,
    index: 5,
    displayName: 'Managed to get over the wall',
    description:
      "Whether you got over the wall using Blue's cloud platform after trying to jump over it beforehand.",
    valueType: 'boolean',
  },
  DANGEROUS_PLATFORMING_AQUASETH: {
    parent: FLAGS.DANGEROUS_PLATFORMING_CHUTE_FLAGS,
    index: 6,
    displayName: 'Saw Aqua and Seth scene',
    description:
      'Whether you saw the scene of Aqua running after Yellow to also get blown up.',
    valueType: 'boolean',
  },
  SAW_FINAL_STARWALKER: {
    parent: FLAGS.FINAL_STARWALKER_FLAG,
    index: 0,
    displayName: 'Final Starwalker scene',
    description:
      "Saw Original Starwalker's final Starwalker scene at the top of the Castle; enables Kris's Walkerstar title.",
    valueType: 'boolean',
  },
  PLATCONTROLS_HIGHLIGHTED: {
    parent: FLAGS.MISC_BITFIELD_FLAGS,
    index: 0,
    width: 2,
    displayName: 'Platformer controls highlighted',
    description:
      'Handles whether the controls for platformer mode in the settings are highlighted.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Highlighted',
        1: 'Selected; in the process of being unhighlighted',
        2: 'Unhighlighted',
      },
    },
  },
  SAW_FERROLL: {
    parent: FLAGS.MISC_BITFIELD_FLAGS,
    index: 1,
    width: 2,
    displayName: 'Met Ferroll',
    description:
      "Whether you have talked to Ferroll. This applies to both when he is in the cave and when he is in Pink's room.",
    valueType: 'boolean',
  },
  ENCOUNTERED_SHI_SANDPIT: {
    parent: FLAGS.MISC_BITFIELD_FLAGS,
    index: 2,
    width: 2,
    displayName: 'Encountered Shi',
    description: 'Whether you encountered the Shi in the sand trap.',
    valueType: 'boolean',
  },
  GARDEN_AQUAPLATFORMING_BATTLE: {
    parent: FLAGS.GARDEN_AQUAPLATFORMING_FLAGS,
    index: 1,
    displayName: 'Completed optional battle',
    description:
      'Whether the optional battle in the first Garden aqua platforming room was completed.',
    valueType: 'boolean',
  },
  GARDEN_AQUAPLATFORMING_GRASS1: {
    parent: FLAGS.GARDEN_AQUAPLATFORMING_FLAGS,
    index: 5,
    displayName: 'Cut grass 1',
    description:
      'Whether the first tracked patch of grass in the room was cut.',
    valueType: 'boolean',
  },
  GARDEN_AQUAPLATFORMING_GRASS2: {
    parent: FLAGS.GARDEN_AQUAPLATFORMING_FLAGS,
    index: 6,
    displayName: 'Cut grass 2',
    description:
      'Whether the second tracked patch of grass in the room was cut.',
    valueType: 'boolean',
  },
  GARDEN_AQUAPLATFORMING_GRASS3: {
    parent: FLAGS.GARDEN_AQUAPLATFORMING_FLAGS,
    index: 7,
    displayName: 'Cut grass 3',
    description:
      'Whether the third tracked patch of grass in the room was cut.',
    valueType: 'boolean',
  },
  GARDEN_AQUAPLATFORMING_GRASS4: {
    parent: FLAGS.GARDEN_AQUAPLATFORMING_FLAGS,
    index: 8,
    displayName: 'Cut grass 4',
    description:
      'Whether the fourth tracked patch of grass in the room was cut.',
    valueType: 'boolean',
  },
  RALSEI_CASTLE_BASKETBALL_QUEEN_CUTSCENE: {
    parent: FLAGS.RALSEI_CASTLE_BASKETBALL_FLAGS,
    index: 0,
    width: 2,
    displayName: 'Saw Queen basketball cutscene',
    description:
      'Whether the Chapter 5 Castle Town basketball cutscene with Queen was seen.',
    valueType: 'boolean',
  },
  GARDEN_FINAL_PLATFORMING_STATUE: {
    parent: FLAGS.GARDEN_FINAL_PLATFORMING_FLAGS,
    index: 0,
    displayName: 'Transformed statue',
    description:
      'Whether the statue in the final Garden platforming room was transformed.',
    valueType: 'boolean',
  },
  GARDEN_FINAL_PLATFORMING_PINK_BELL: {
    parent: FLAGS.GARDEN_FINAL_PLATFORMING_FLAGS,
    index: 2,
    displayName: 'Destroyed Pink Coin bell',
    description:
      'Whether the Pink Coin bell in the final Garden platforming room was destroyed.',
    valueType: 'boolean',
  },
  CLIFF_NETSKIE_CLIMB_STAIRS: {
    parent: FLAGS.CLIFF_NETSKIE_CLIMB_FLAGS,
    index: 1,
    displayName: 'Created fox stairs',
    description: 'Whether the foxes in Netskie Climb formed a set of stairs.',
    valueType: 'boolean',
  },
  CLIFF_NETSKIE_CLIMB_FOXES_FLED: {
    parent: FLAGS.CLIFF_NETSKIE_CLIMB_FLAGS,
    index: 2,
    displayName: 'Foxes fled',
    description: 'Whether the foxes in Netskie Climb fled.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_GRASS: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 0,
    displayName: 'Cut grass',
    description: 'Whether the tracked grass in the final Cliffs dash was cut.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN1: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 1,
    displayName: 'Collected coin 1',
    description: 'Whether coin 1 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN2: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 2,
    displayName: 'Collected coin 2',
    description: 'Whether coin 2 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN3: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 3,
    displayName: 'Collected coin 3',
    description: 'Whether coin 3 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN4: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 4,
    displayName: 'Collected coin 4',
    description: 'Whether coin 4 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN5: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 5,
    displayName: 'Collected coin 5',
    description: 'Whether coin 5 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN6: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 6,
    displayName: 'Collected coin 6',
    description: 'Whether coin 6 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN7: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 7,
    displayName: 'Collected coin 7',
    description: 'Whether coin 7 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN8: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 8,
    displayName: 'Collected coin 8',
    description: 'Whether coin 8 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN9: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 9,
    displayName: 'Collected coin 9',
    description: 'Whether coin 9 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN10: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 10,
    displayName: 'Collected coin 10',
    description: 'Whether coin 10 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN11: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 11,
    displayName: 'Collected coin 11',
    description: 'Whether coin 11 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN12: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 12,
    displayName: 'Collected coin 12',
    description: 'Whether coin 12 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN13: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 13,
    displayName: 'Collected coin 13',
    description: 'Whether coin 13 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN14: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 14,
    displayName: 'Collected coin 14',
    description: 'Whether coin 14 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN15: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 15,
    displayName: 'Collected coin 15',
    description: 'Whether coin 15 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN16: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 16,
    displayName: 'Collected coin 16',
    description: 'Whether coin 16 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN17: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS,
    index: 17,
    displayName: 'Collected coin 17',
    description: 'Whether coin 17 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN18: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 0,
    displayName: 'Collected coin 18',
    description: 'Whether coin 18 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN19: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 1,
    displayName: 'Collected coin 19',
    description: 'Whether coin 19 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN20: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 2,
    displayName: 'Collected coin 20',
    description: 'Whether coin 20 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN21: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 3,
    displayName: 'Collected coin 21',
    description: 'Whether coin 21 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN22: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 4,
    displayName: 'Collected coin 22',
    description: 'Whether coin 22 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN23: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 5,
    displayName: 'Collected coin 23',
    description: 'Whether coin 23 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN24: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 6,
    displayName: 'Collected coin 24',
    description: 'Whether coin 24 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN25: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 7,
    displayName: 'Collected coin 25',
    description: 'Whether coin 25 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN26: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 8,
    displayName: 'Collected coin 26',
    description: 'Whether coin 26 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_FINAL_DASH_COIN27: {
    parent: FLAGS.CLIFF_FINAL_DASH_FLAGS_2,
    index: 9,
    displayName: 'Collected coin 27',
    description: 'Whether coin 27 in the final Cliffs dash was collected.',
    valueType: 'boolean',
  },
  CLIFF_TWIRLFLOWER_SUSIE_COMMENT: {
    parent: FLAGS.CLIFF_TWIRLFLOWER_FLAGS,
    index: 1,
    width: 2,
    displayName: "Susie's sunset comment",
    description:
      "Which of Susie's comments about the sunset in the twirlflower platforming room was heard.",
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Not heard',
        1: "The sunset's beautiful",
        2: 'How is there a sun down here?',
      },
    },
  },
  CLIFF_TWIRLFLOWER_BELL_LOWER_LEFT: {
    parent: FLAGS.CLIFF_TWIRLFLOWER_FLAGS,
    index: 10,
    displayName: 'Destroyed lower-left bell',
    description:
      'Whether the lower-left bell in the twirlflower platforming room was destroyed.',
    valueType: 'boolean',
  },
  CLIFF_TWIRLFLOWER_BELL_LOWER_RIGHT: {
    parent: FLAGS.CLIFF_TWIRLFLOWER_FLAGS,
    index: 11,
    displayName: 'Destroyed lower-right bell',
    description:
      'Whether the lower-right bell in the twirlflower platforming room was destroyed.',
    valueType: 'boolean',
  },
  CLIFF_TWIRLFLOWER_BELL_UPPER: {
    parent: FLAGS.CLIFF_TWIRLFLOWER_FLAGS,
    index: 12,
    displayName: 'Destroyed upper bell',
    description:
      'Whether the upper bell in the twirlflower platforming room was destroyed.',
    valueType: 'boolean',
  },
  CLIFF_TWIRLFLOWER_SETH_AQUA_BATTLE: {
    parent: FLAGS.CLIFF_TWIRLFLOWER_FLAGS,
    index: 15,
    displayName: 'Completed Seth and Aqua battle',
    description:
      'Whether the Seth and Aqua battle connected to the twirlflower area was completed.',
    valueType: 'boolean',
  },
  CLIFF_TWIRLFLOWER_WIND_BELL: {
    parent: FLAGS.CLIFF_TWIRLFLOWER_FLAGS,
    index: 16,
    displayName: 'Destroyed wind-room bell',
    description:
      'Whether the tracked bell in the twirlflower wind room was destroyed.',
    valueType: 'boolean',
  },
  CLIFF_TWIRLFLOWER_BELL_BUNCH: {
    parent: FLAGS.CLIFF_TWIRLFLOWER_FLAGS,
    index: 17,
    displayName: 'Destroyed bell bunch',
    description:
      'Whether the tracked bunch of bells in the twirlflower area was destroyed.',
    valueType: 'boolean',
  },
  PINK_SHOP_BOUGHT_SETH_SPECS: {
    parent: FLAGS.PINK_SHOP_PURCHASE_FLAGS,
    index: 0,
    displayName: 'Bought SethSpecs',
    description: 'Whether SethSpecs were purchased from the Pink shop.',
    valueType: 'boolean',
  },
  PINK_SHOP_BOUGHT_BLUE_SHOES: {
    parent: FLAGS.PINK_SHOP_PURCHASE_FLAGS,
    index: 1,
    displayName: 'Bought BlueShoes',
    description: 'Whether BlueShoes were purchased from the Pink shop.',
    valueType: 'boolean',
  },
  PINK_SHOP_BOUGHT_AQUA_KNIFE: {
    parent: FLAGS.PINK_SHOP_PURCHASE_FLAGS,
    index: 2,
    displayName: 'Bought AquaKnife',
    description: 'Whether the AquaKnife was purchased from the Pink shop.',
    valueType: 'boolean',
  },
  PINK_SHOP_BOUGHT_YELLOW_HAT: {
    parent: FLAGS.PINK_SHOP_PURCHASE_FLAGS,
    index: 3,
    displayName: 'Bought YellowHat',
    description: 'Whether the YellowHat was purchased from the Pink shop.',
    valueType: 'boolean',
  },
  PINK_SHOP_BOUGHT_ORANGE_GLOVE: {
    parent: FLAGS.PINK_SHOP_PURCHASE_FLAGS,
    index: 4,
    displayName: 'Bought O.Glove',
    description: 'Whether the O.Glove was purchased from the Pink shop.',
    valueType: 'boolean',
  },
  PINK_SHOP_BOUGHT_GREEN_APRON: {
    parent: FLAGS.PINK_SHOP_PURCHASE_FLAGS,
    index: 5,
    displayName: 'Bought GreenApron',
    description: 'Whether the GreenApron was purchased from the Pink shop.',
    valueType: 'boolean',
  },
  PINK_SHOP_BOUGHT_FLOWERY_SCARF: {
    parent: FLAGS.PINK_SHOP_PURCHASE_FLAGS,
    index: 6,
    displayName: 'Bought FloweryScarf',
    description: 'Whether the FloweryScarf was purchased from the Pink shop.',
    valueType: 'boolean',
  },
  SHORTCUT_HOPSCHEF: {
    parent: FLAGS.FLOWER_CASTLE_SHORTCUT_FLAGS,
    index: 0,
    displayName: 'Unlocked Hopschef shortcut',
    description:
      'Whether the Hopschef shortcut door in Flower Castle was unlocked.',
    valueType: 'boolean',
  },
  SHORTCUT_PINK_DOOR: {
    parent: FLAGS.FLOWER_CASTLE_SHORTCUT_FLAGS,
    index: 2,
    displayName: 'Unlocked Pink Door shortcut',
    description:
      'Whether the Pink Door shortcut in Flower Castle was unlocked.',
    valueType: 'boolean',
  },
  SHORTCUT_LAST_ROOM: {
    parent: FLAGS.FLOWER_CASTLE_SHORTCUT_FLAGS,
    index: 3,
    displayName: 'Unlocked Last Room shortcut',
    description:
      'Whether the Last Room shortcut in Flower Castle was unlocked.',
    valueType: 'boolean',
  },
  SHORTCUT_TOP_OF_CASTLE: {
    parent: FLAGS.FLOWER_CASTLE_SHORTCUT_FLAGS,
    index: 4,
    displayName: 'Unlocked top-of-castle shortcut',
    description:
      'Whether the shortcut to the top of Flower Castle was unlocked.',
    valueType: 'boolean',
  },
} satisfies Record<string, FlagBitfieldProperties>;

export type FlagBitfieldName = keyof typeof FLAG_BITFIELD_ENTRIES;
export type FlagBitfieldId = FlagBitfieldName;

// IDs and names are the same string 
export const FLAG_BITFIELDS = Object.fromEntries(
  Object.keys(FLAG_BITFIELD_ENTRIES).map((name) => [name, name]),
) as { [K in FlagBitfieldName]: K };

export const FLAG_BITFIELDS_META: Record<
  FlagBitfieldId,
  FlagBitfieldProperties
> = FLAG_BITFIELD_ENTRIES;

export type SaveFlagRef =
  | { kind: 'flag'; flag: FlagIndex }
  | { kind: 'bitfield'; bitfield: FlagBitfieldId };

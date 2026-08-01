import type { BaseProperties, WithOverrides } from '@types';
import { FLAGS } from './flags';
import type { ChapterIndex } from './chapters';

export const KEYITEMS = {
  EMPTY: 0,
  CELL_PHONE: 1,
  EGG: 2,
  BROKEN_CAKE: 3,
  BROKEN_KEY_A: 4,
  DOOR_KEY: 5,
  BROKEN_KEY_B: 6,
  BROKEN_KEY_C: 7,
  LANCER: 8,
  ROUXLS_KAARD: 9,
  EMPTY_DISK: 10,
  LOADED_DISK: 11,
  KEYGEN: 12,
  SHADOW_CRYSTAL: 13,
  STARWALKER: 14,
  PURE_CRYSTAL: 15,
  ODD_CONTROLLER: 16,
  BACKSTAGE_PASS: 17,
  TRIP_TICKET: 18,
  LANCER_CON: 19,
  SHEET_MUSIC: 30,
  CLAIMB_CLAWS: 31,
  SCISSORS: 20,
  YELLOW_SHRED: 21,
  BOOT_OIL: 22,
  RED_SPLATTER: 23,
  BROMIDE_R: 24,
  PETAL_FEATHER: 25,
  PERP_BOOK: 26,
  BLUE_STRING: 27,
  TRAIN_PLAN: 28,
  YELLOW_KEY: 29,
  MYSTERY_KEY: 32,
  BROMIDE_F: 33,
} as const;

export type KeyItemIndex = (typeof KEYITEMS)[keyof typeof KEYITEMS];
export type KeyItemName = keyof typeof KEYITEMS;

interface KeyItemOverrideInputs {
  chapter: ChapterIndex;
  plot: number;
  flags: readonly unknown[];
}

interface KeyItemProperties
  extends
    BaseProperties,
    WithOverrides<KeyItemProperties, KeyItemOverrideInputs> {
  descriptionValues?: Record<string, string | number>;
}

const SHADOW_CRYSTAL_FLAGS = [
  FLAGS.OBTAINED_SHADOW_CRYSTAL_CH1,
  FLAGS.OBTAINED_SHADOW_CRYSTAL_CH2,
  FLAGS.OBTAINED_SHADOW_CRYSTAL_CH3,
  FLAGS.OBTAINED_SHADOW_CRYSTAL_CH4,
  FLAGS.OBTAINED_SHADOW_CRYSTAL_CH5,
] as const;

const shadowCrystalCount = (flags: readonly unknown[]) =>
  SHADOW_CRYSTAL_FLAGS.filter((flag) => Number(flags[flag])).length;

const sideBPhase = (flags: readonly unknown[]) => {
  if (Number(flags[FLAGS.SNOWGRAVE_FAIL])) {
    return 0;
  }

  const progress = Number(flags[FLAGS.SNOWGRAVE_ROUTE_PROGRESS]) || 0;

  if (progress >= 20) return 4;
  if (progress >= 7) return 3;
  if (progress >= 4) return 2;
  if (progress > 0) return 1;

  return 0;
};

// Descriptions for Lancer change like every 2 steps lol
const LANCER_PLOT_LINES: readonly (readonly [number, string])[] = [
  [
    200,
    "Hoho! What a terrific boy's adventure.\nTime to kick off my feet and relax...",
  ],
  [99, "Hoho! It's me, Lancer! Release me and\nI will release you!"],
  [
    90,
    'Hey! Thanks for the tape! I was hungry!\nPush my tummy to hear a cool song!',
  ],
  [85, 'Did I miss something? I was doing my\ncalisthetics. Stay handsome.'],
  [79, 'The bluebird of crappiness.\nFly high, bluebird. Fly high.'],
  [75, 'That golden statue... could it be...\nThe illusory nipple technique!?'],
  [70, 'Ho-ho! A soft cream is following you!\nCan we make them a bad guy?'],
  [
    66,
    "Split up? We'll solve this mystery fast!\nYou? You can be the un-talking dog.",
  ],
  [
    65,
    "We fell! But don't worry. I'm a strong boy.\nI won't be trounced by a mere bounce!",
  ],
  [
    60,
    'Sounded like milk out there. Splat!\nWere you three osmosing without me!?',
  ],
  [55, 'Hohoho! That game looked fun!\nLet me be the stool next!'],
  [20, 'Hohoho! ROUXLS jumped out of your\npocket! How dadcrobatic! (Lesser)'],
];

export const KEYITEMS_META: Record<KeyItemIndex, KeyItemProperties> = {
  [KEYITEMS.EMPTY]: { displayName: 'Empty' },
  [KEYITEMS.CELL_PHONE]: {
    displayName: 'Cell Phone',
    description: 'It can be used to make calls.',
  },
  [KEYITEMS.EGG]: {
    displayName: 'Egg',
    description: 'Not too important, not too unimportant.',
  },
  [KEYITEMS.BROKEN_CAKE]: {
    displayName: 'BrokenCake',
    description:
      'Though broken, it seethes with power.\nA master smith could fix it.',
  },
  [KEYITEMS.BROKEN_KEY_A]: {
    displayName: 'Broken Key A',
    description:
      "It's the top part of a key.\nA smith could fix all three parts.",
  },
  [KEYITEMS.DOOR_KEY]: {
    displayName: 'Door Key',
    description:
      'The key to a mysterious cell.\nSomething feels strange about it.',
  },
  [KEYITEMS.BROKEN_KEY_B]: {
    displayName: 'Broken Key B',
    description:
      "It's the middle part of a key.\nA smith could fix all three parts.",
  },
  [KEYITEMS.BROKEN_KEY_C]: {
    displayName: 'Broken Key C',
    description:
      "It's the bottom part of a key.\nA smith could fix all three parts.",
  },
  [KEYITEMS.LANCER]: {
    displayName: 'Lancer',
    description: "Hohoho! I'm a tough boy!\nTreat me like one of your ITEMS!",
    getOverrides: ({ chapter, plot, flags }) => {
      if (chapter === 3) {
        return {
          description: 'Ho ho ho!\nEnjoy my prescence for a single room!',
        };
      }

      const phase = sideBPhase(flags);

      if (
        phase >= 1 &&
        (Number(flags[FLAGS.SNOWGRAVE_ROUTE_PROGRESS]) || 0) >= 1.5
      ) {
        return {
          description:
            phase >= 3
              ? 'A stone statue.\nStrangely, it looks like Lancer...'
              : '(Innocent boys are fast asleep.)',
        };
      }

      if (plot >= 75 && plot < 79 && Number(flags[FLAGS.OBTAINED_SHOE]) === 1) {
        return {
          description:
            "Wow! Thanks for the free sample!\nI couldn't eat another bite!!",
        };
      }

      const line = LANCER_PLOT_LINES.find(([threshold]) => plot >= threshold);

      if (line) {
        return { description: line[1] };
      }

      return {};
    },
  },
  [KEYITEMS.ROUXLS_KAARD]: {
    displayName: 'Rouxls Kaard',
    description:
      'Thou gazeth upon a man most handsometh.\nThis daringst genius, adoredeth beyondth all hey let me speakst',
    getOverrides: ({ plot }) => {
      if (plot >= 200) {
        return {
          description:
            'Oh, milord! Tis I, your humblest servante,\nrighte here where I never lefteth!',
        };
      }

      return {};
    },
  },
  [KEYITEMS.EMPTY_DISK]: {
    displayName: 'EmptyDisk',
    description:
      "A data disk from a strange machine.\nDidn't someone want this?",
  },
  [KEYITEMS.LOADED_DISK]: {
    displayName: 'LoadedDisk',
    description: 'A strange disk. You can feel it\nsmiling in your hand.',
  },
  [KEYITEMS.KEYGEN]: {
    displayName: 'KeyGen',
    description: 'A shady-looking program that can\nopen certain doors.',
  },
  [KEYITEMS.SHADOW_CRYSTAL]: {
    displayName: 'ShadowCrystal',
    description:
      'A sharp shadow moves like water in the hand.\nYou have collected [{count}].',
    getOverrides: ({ flags }) => ({
      descriptionValues: { count: shadowCrystalCount(flags) },
    }),
  },
  [KEYITEMS.STARWALKER]: {
    displayName: 'Starwalker',
    description: 'The original                     \n         (Starwalker)',
  },
  [KEYITEMS.PURE_CRYSTAL]: {
    displayName: 'PureCrystal',
    description: 'The shadow purified by the cat',
  },
  [KEYITEMS.ODD_CONTROLLER]: {
    displayName: 'OddController',
    description:
      'A gamepad no one wanted to use.\nThe buttons are an ugly pink and yellow.',
  },
  [KEYITEMS.BACKSTAGE_PASS]: {
    displayName: 'BackstagePass',
    description:
      'A pass for big shots allowed backstage.\nShow it to Ramb in front of the door.',
  },
  [KEYITEMS.TRIP_TICKET]: {
    displayName: 'TripTicket',
    description:
      'A ticket to nowhere. It shows a map\npointing to the left of a red X...',
  },
  [KEYITEMS.LANCER_CON]: {
    displayName: 'LancerCon',
    description: "Lancer's controller. It's covered in dirt.",
    getOverrides: ({ flags }) => {
      const count = Number(flags[FLAGS.LANCER_CONTROL_NUM]) || 0;
      if (count > 1) {
        return {
          displayName: `LancerConX${count}`,
          description: "Lancer's controllers. They're covered in dirt.",
        };
      }

      return {};
    },
  },
  [KEYITEMS.SHEET_MUSIC]: {
    displayName: 'SheetMusic',
    description:
      'Music that Susie attempted to transcribe.\nUSE it to read it.',
  },
  [KEYITEMS.CLAIMB_CLAWS]: {
    displayName: 'ClaimbClaws',
    description:
      "Claws so small they conveniently can't\nbe seen. Use them to climb up obvious walls.",
  },
  [KEYITEMS.SCISSORS]: {
    displayName: 'Scissors',
    description:
      'Obviously stolen scissors which could easily\nbe used to cut up cloth.',
  },
  [KEYITEMS.YELLOW_SHRED]: {
    displayName: 'YellowShred',
    description:
      'A shred of yellow fabric with a corn pattern.\nThe edge is black and smells.',
  },
  [KEYITEMS.BOOT_OIL]: {
    displayName: 'BootOil',
    description:
      'A black, opaque oil with no distinctive odor.\nUsed to unsqueaken Cowboy boots.',
  },
  [KEYITEMS.RED_SPLATTER]: {
    displayName: 'RedSplatter',
    description: 'A mysterious puddle of red criminal\nliquid.',
  },
  [KEYITEMS.BROMIDE_R]: {
    displayName: 'BromideR',
    description: '"Good night, sweet prince"\nUSE this item to observe it.',
  },
  [KEYITEMS.PETAL_FEATHER]: {
    displayName: 'PetalFeather',
    description:
      'A petal which makes you light as a feather.\nAllows the use of MYSTERIOUS STATUES.',
    getOverrides: ({ plot, flags }) => {
      if (plot >= 398 && !Number(flags[FLAGS.FROZEN_CHICKEN])) {
        return {
          description:
            'Allows use of MYSTERIOUS STATUES.\nNot to be confused with a certain other feather.',
        };
      }

      return {};
    },
  },
  [KEYITEMS.PERP_BOOK]: {
    displayName: 'PerpBook',
    description: 'A purple book with a decidedly floral scent.',
  },
  [KEYITEMS.BLUE_STRING]: {
    displayName: 'BlueString',
    description: 'String which could be used to bound something\nin care.',
  },
  [KEYITEMS.TRAIN_PLAN]: {
    displayName: 'TrainPlan',
    description:
      'A blueprint which details how to alter tracks\ninto a smashing machine with 2 rollercoasts.',
  },
  [KEYITEMS.YELLOW_KEY]: {
    displayName: 'YellowKey',
    description:
      'A yellow key that looks like it could\nopen a yellow door. Smells of corn.',
  },
  [KEYITEMS.MYSTERY_KEY]: {
    displayName: 'MysteryKey',
    description:
      "A pink key with an ectoplasmic aura.\nMaybe it's a family heirloom.",
  },
  [KEYITEMS.BROMIDE_F]: {
    displayName: 'BromideF',
    description: '"Secret Steamy Bathtime"\nUSE this item to observe it.',
  },
};

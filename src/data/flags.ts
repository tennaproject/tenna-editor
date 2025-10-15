import type { BaseProperties } from '@types';

const ALPHABET = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
  8: 'I',
  9: 'J',
  10: 'K',
  11: 'L',
  12: 'M',
  13: 'N',
  14: 'O',
  15: 'P',
  16: 'Q',
  17: 'R',
  18: 'S',
  19: 'T',
  20: 'U',
  21: 'V',
  22: 'W',
  23: 'X',
  24: 'Y',
  25: 'Z',
} as const;

const GAMESHOW_RANKS = {
  '-1': 'None',
  0: 'Z',
  1: 'C',
  2: 'B',
  3: 'A',
  4: 'S',
  5: 'T',
} as const;

export const FLAGS = {
  SIMPLIFY_VFX: 8,
  CAN_PARTY_ACT: 34,
  STORAGE_SIZE: 64,
  GOT_MOSS_CH1: 106,
  THRASH_MACHINE_HEAD: 220,
  THRASH_MACHINE_BODY: 221,
  THRASH_MACHINE_SHOE: 222,
  THRASH_MACHINE_HEAD_COLOR: 223,
  THRASH_MACHINE_BODY_COLOR: 224,
  THRASH_MACHINE_SHOE_COLOR: 225,
  RUNNING_TUTORIAL: 206,
  MANUAL_STATUS: 207,
  JEVIL_PROGRESS: 241,
  VIOLENT_KING: 247,
  VIOLENT_ENDING_CH1: 248,
  INSPECTED_BEDS_CH1: 252,
  TALKED_BERDLY_CH1: 256,
  GOT_SPINCAKE: 253,
  STARWALKER: 254,
  TALKED_RUDY: 255,
  PICNIC_TABLE_FINGERS: 257,
  ONION_CH1: 258,
  ONION_YOUR_NAME: 259,
  ONION_NAME: 260,
  TALKED_QC: 261,
  ASGORE_FLOWERS_PROGRESS: 262,
  EGG_FRIDGE: 263,
  TALKED_CATTY: 265,
  TALKED_ALPHYS: 269,
  TALKED_UNDYNE: 270,
  TALKED_BURGERPANTS: 271,
  TALKED_SANS: 273,
  GOT_SANS_PHONE: 274,
  TALKED_NOELLE: 276,
  ENTERED_HOME_COUNT: 277,
  USED_RUDY_SINK: 278,
  HUGGED_DUMMY: 300,
  CARNIVAL_GIFT: 307,
  SPAMTON_PROGRESS: 309,
  RALSEI_PHOTO_STATUS: 325,
  RECRUITED_HACKER: 357,
  INSPECTED_BED_KRIS: 409,
  INSPECTED_BED_SUSIE: 410,
  INSPECTED_BED_LANCER: 411,
  INSPECTED_BED_CLOVER: 412,
  INSPECTED_BED_NOELLE: 413,
  INSPECTED_BEDS_CH2: 414,
  TALKED_METTATON: 422,
  ONION_CH2: 424,
  ONION_MISSED: 425,
  TOOK_ASRIEL_MONEY: 430,
  BERDLY_BROKEN_ARM: 457,
  CARS_HIT_COUNT: 462,
  RECRUIT_DEBUG: 601,
  RECRUIT_LANCER_1: 602,
  RECRUIT_DUMMY: 603,
  RECRUIT_RALSEI_TUTORIAL: 604,
  RECRUIT_RUDINN: 605,
  RECRUIT_HATHY: 606,
  RECRUIT_CLOVER_1: 607,
  RECRUIT_C_ROUND: 609,
  RECRUIT_K_ROUND_1: 610,
  RECRUIT_PONMAN: 611,
  RECRUIT_LANCER_2: 612,
  RECRUIT_RABBICK: 613,
  RECRUIT_BLOXER: 614,
  RECRUIT_JIGSAWRY: 615,
  RECRUIT_CLOVER_2: 616,
  RECRUIT_DOOMTANK: 617,
  RECRUIT_LANCER_3: 618,
  RECRUIT_SUSIE_AND_LANCER: 619,
  RECRUIT_JEVIL: 620,
  RECRUIT_K_ROUND_2: 621,
  RECRUIT_RUDINN_RANGER: 622,
  RECRUIT_HEAD_HATHY: 623,
  RECRUIT_KING: 625,
  RECRUIT_AMBYU_LANCE: 630,
  RECRUIT_POPPUP: 631,
  RECRUIT_TASQUE: 632,
  RECRUIT_WEREWIRE: 633,
  RECRUIT_MAUS: 634,
  RECRUIT_VIROVIROKUN: 635,
  RECRUIT_SWATCHLING: 636,
  RECRUIT_CAPN: 637,
  RECRUIT_K_K: 638,
  RECRUIT_SWEET: 639,
  RECRUIT_WEREWEREWIRE: 640,
  RECRUIT_GRAZETEST: 641,
  RECRUIT_TASQUE_MANAGER: 642,
  RECRUIT_BERDLY_1: 643,
  RECRUIT_MAUSWHEEL: 644,
  RECRUIT_ROUXLS_1: 645,
  RECRUIT_BERDLY_2: 646,
  RECRUIT_CLOVER_DOJO: 647,
  RECRUIT_QUEEN: 648,
  RECRUIT_SPAMTON: 649,
  RECRUIT_SPAMTON_NEO: 650,
  RECRUIT_GIGA_QUEEN: 651,
  RECRUIT_JIGSAW_JOE_DOJO: 652,
  RECRUIT_PIPIS: 653,
  RECRUIT_SHADOWGUY: 654,
  RECRUIT_SHUTTAH: 655,
  RECRUIT_ZAPPER: 656,
  RECRUIT_RIBBICK: 657,
  RECRUIT_WATERCOOLER: 658,
  RECRUIT_PIPPINS: 659,
  RECRUIT_ELNINA: 660,
  RECRUIT_LANINO: 661,
  RECRUIT_GUEI: 662,
  RECRUIT_BALTHIZARD: 663,
  RECRUIT_BIBLIOX: 664,
  RECRUIT_MIZZLE: 665,
  RECRUIT_WICABEL: 666,
  RECRUIT_WINGLADE: 667,
  RECRUIT_ORGANIKK: 668,
  RECRUIT_MISS_MIZZLE: 669,
  SHOWED_FAMILY_PHOTO_TO_SUSIE: 744,
  SHOWED_ASRIEL_PHOTO_TO_SUSIE: 745,
  GOT_SUSIE_PRIZE: 747,
  CLEANED_UP_BLOOD_STAIN: 748,
  TALKED_METTATON_TENNA: 779,
  TALKED_KING_KNIGHT: 789,
  SAW_TENNA_KING_SCENE: 790,
  AXE_OF_JUSTICE_PROGRESS: 852,
  DONATION_FOUNTAIN_COUNT: 898,
  VESSEL_HEAD: 900,
  VESSEL_BODY: 901,
  VESSEL_LEGS: 902,
  VESSEL_FOOD: 903,
  VESSEL_BLOOD_TYPE: 904,
  VESSEL_COLOR: 905,
  VESSEL_FEELING: 906,
  VESSEL_HONESTY: 907,
  VESSEL_PAIN_SEIZURE: 908,
  VESSEL_GIFT: 909,
  EGG_ROOM_CH1: 910,
  EGG_CH1: 911,
  SINCE_CHAPTER: 914,
  WEIRDROUTE_PROGRESS_CH2: 915,
  WEIRDROUTE_FAILED: 916,
  EGG_ROOM_CH2: 917,
  GOT_MOSS_CH2: 920,
  GOT_MOSS_WITH_NOELLE: 921,
  GOT_MOSS_WITH_SUSIE: 922,
  NOELLE_ICE_SHOCK_COUNT: 925,
  EGG_CH3: 930,
  EGG_CH4: 931,
  GAMESHOW_LETTER_FIRST: 1012,
  GAMESHOW_LETTER_SECOND: 1013,
  GAMESHOW_LETTER_THIRD: 1014,
  CH3_POINTS: 1044,
  SUSIE_HEAL_COUNT: 1045,
  KNIGHT_FIGHT: 1047,
  SWORD_PROGRESS: 1055,
  SKIPPED_INTRO_CH3: 1071,
  GOT_MOSS_CH3: 1078,
  BIBLIOX_PROGRESS: 1092,
  RALSEI_HORSE: 1152,
  RANK_BOARD_1: 1173,
  RANK_BOARD_2: 1174,
  UNLOCKED_SUSIEZILLA: 1189,
  SCORE_COOKING: 1193,
  RANK_COOKING: 1194,
  SCORE_LIGHTNERS_LIVE: 1195,
  RANK_LIGHTNERS_LIVE: 1196,
  SCORE_SUSIEZILLA: 1197,
  RANK_SUSIEZILLA: 1198,
  GOT_GOLDEN_TENNA: 1222,
  ENTERED_1225_ROOM: 1226,
  STARWALKER_CH3: 1240,
  TALKED_NAPSTABLOOK_UNDYNE: 1552,
  TALKED_NAPSTABLOOK_SHELTER: 1553,
  TALKED_ASGORE_OUTFIT: 1565,
  TALKED_ASGORE_WELLBEING: 1566,
  GOT_MOSS_CH4: 1592,
  INSPECTED_GLASS_WITH_NOELLE: 1623,
  WEIRDROUTE_FAILED_CH4: 1656,
} as const;

export type FlagIndex = (typeof FLAGS)[keyof typeof FLAGS];
export type FlagName = keyof typeof FLAGS;

export type FlagValueType = 'boolean' | 'number' | 'map' | 'color';

export interface FlagProperties extends BaseProperties {
  valueType?: FlagValueType;
  valueRules?: {
    min?: number;
    max?: number;
    allowedValues?: number[];
    map?: Record<number, string>;
    invertedBoolean?: boolean;
  };
}

export const FLAGS_META: Record<FlagIndex, FlagProperties> = {
  [FLAGS.SIMPLIFY_VFX]: {
    valueType: 'boolean',
    displayName: 'Simplify VFX',
    description: `
     As the name suggests it turning this on simplifies some of the VFX in game.`,
  },
  [FLAGS.CAN_PARTY_ACT]: {
    displayName: 'Party Members can ACT',
    valueType: 'boolean',
    valueRules: {
      invertedBoolean: true,
    },
  },
  [FLAGS.STORAGE_SIZE]: {
    displayName: 'Storage size',
    description: `
    The number of slots in the storage.
    `,
  },
  [FLAGS.GOT_MOSS_CH1]: {
    displayName: 'Got moss in Jail',
    valueType: 'boolean',
  },
  [FLAGS.THRASH_MACHINE_HEAD]: {
    displayName: 'Head',
    valueType: 'map',
    valueRules: {
      map: {
        '-1': 'None',
        0: 'Laser',
        1: 'Sword',
        2: 'Flame',
        3: 'Duck',
      },
    },
  },
  [FLAGS.THRASH_MACHINE_BODY]: {
    displayName: 'Body',
    valueType: 'map',
    valueRules: {
      map: {
        '-1': 'None',
        0: 'Plain',
        1: 'Wheel',
        2: 'Tank',
        3: 'Duck',
      },
    },
  },
  [FLAGS.THRASH_MACHINE_SHOE]: {
    displayName: 'Shoe',
    valueType: 'map',
    valueRules: {
      map: {
        '-1': 'None',
        0: 'Sneak',
        1: 'Attractive Wheels',
        2: 'Tread',
        3: 'Duck',
      },
    },
  },
  [FLAGS.THRASH_MACHINE_HEAD_COLOR]: {
    displayName: 'Head Color',
    valueType: 'color',
  },
  [FLAGS.THRASH_MACHINE_BODY_COLOR]: {
    displayName: 'Body Color',
    valueType: 'color',
  },
  [FLAGS.THRASH_MACHINE_SHOE_COLOR]: {
    displayName: 'Shoe Color',
    valueType: 'color',
  },
  [FLAGS.RUNNING_TUTORIAL]: {
    displayName: 'Learned to run',
    valueType: 'boolean',
  },
  [FLAGS.MANUAL_STATUS]: {
    displayName: 'Manual Status',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Not dropped',
        1: 'Dropped once',
        3: 'Dropped twice',
      },
    },
  },
  [FLAGS.JEVIL_PROGRESS]: {
    displayName: 'Jevil Progress',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Talked',
        5: 'Opened door',
        6: 'Defeated violently',
        7: 'Defeated peacefully',
      },
    },
  },
  [FLAGS.VIOLENT_KING]: {
    displayName: 'Defeated King Violently',
    valueType: 'boolean',
  },
  [FLAGS.VIOLENT_ENDING_CH1]: {
    displayName: 'Got Violent Ending',
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_BEDS_CH1]: {
    displayName: 'Inspected beds in Card Castle',
    valueType: 'boolean',
  },
  [FLAGS.GOT_SPINCAKE]: {
    displayName: 'Got SpinCake',
    valueType: 'boolean',
  },
  [FLAGS.STARWALKER]: {
    displayName: 'Talked to original &ensp;*Starwalker*',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_RUDY]: {
    displayName: 'Talked to Rudy',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'No',
        1: 'Noelle left',
        2: 'Talked',
      },
    },
  },
  [FLAGS.TALKED_BERDLY_CH1]: {
    displayName: 'Talked to Berdly',
    valueType: 'boolean',
  },
  [FLAGS.PICNIC_TABLE_FINGERS]: {
    displayName: 'You put your fingers in the picnic table',
    valueType: 'boolean',
  },
  [FLAGS.ONION_CH1]: {
    displayName: 'Status',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Not interacted',
        1: 'Talk in progress',
        2: 'Befriended',
        3: 'Refused friendship',
      },
    },
  },
  [FLAGS.ONION_YOUR_NAME]: {
    displayName: 'Your Name',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Kris',
        2: 'Hippopotamus',
      },
    },
  },
  [FLAGS.ONION_NAME]: {
    displayName: 'Onion Name',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Onion',
        2: 'Beauty',
        3: 'Asriel II',
        4: 'Disgusting',
      },
    },
  },
  [FLAGS.TALKED_QC]: {
    displayName: 'Talked to QC',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'No',
        1: 'Got chocolate',
        2: 'Full inventory',
      },
    },
  },
  [FLAGS.ASGORE_FLOWERS_PROGRESS]: {
    displayName: 'Asgore Flowers Progress',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: `In Asgore's shop`,
        2: 'Got flowers',
        3: 'Gave flowers to Toriel',
        4: 'Flowers thrown out',
      },
    },
  },
  [FLAGS.EGG_FRIDGE]: {
    displayName: 'Egg Fridge',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Interacted with no Egg',
        2: 'Egg inside',
      },
    },
  },
  [FLAGS.TALKED_CATTY]: {
    displayName: 'Talked to Catty',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_ALPHYS]: {
    displayName: 'Talked to Alphys',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_UNDYNE]: {
    displayName: 'Talked to Undyne',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_BURGERPANTS]: {
    displayName: 'Talked to Burgerpants',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'No',
        1: 'Unmasked',
        2: 'Talked',
      },
    },
  },
  [FLAGS.TALKED_SANS]: {
    displayName: 'Talked to Sans',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'No',
        1: 'Talked',
        2: 'Talked about brother',
      },
    },
  },
  [FLAGS.GOT_SANS_PHONE]: {
    displayName: `Got Sans's phone number`,
    valueType: 'map',
    valueRules: {
      map: {
        0: 'No',
        1: 'Got number',
        2: 'Called',
      },
    },
  },
  [FLAGS.TALKED_NOELLE]: {
    displayName: 'Talked to Noelle',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'No',
        1: 'Talked',
        2: 'Talked about Susie',
      },
    },
  },
  [FLAGS.ENTERED_HOME_COUNT]: {
    displayName: 'Times you entered home',
    valueType: 'number',
    valueRules: {
      min: 0,
      max: 8,
    },
  },
  [FLAGS.USED_RUDY_SINK]: {
    displayName: `Used Rudy's sink in hospital`,
    valueType: 'boolean',
  },
  [FLAGS.HUGGED_DUMMY]: {
    displayName: 'Hugged Dummy',
    valueType: 'boolean',
  },
  [FLAGS.CARNIVAL_GIFT]: {
    displayName: 'Carnival Gift Recipient',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Ralsei',
        2: 'Susie',
        3: 'Noelle',
        4: 'Berdly',
      },
    },
  },
  [FLAGS.SPAMTON_PROGRESS]: {
    displayName: 'Spamton Progress',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Spared',
        3: 'Got KeyGen',
        4: 'Used KeyGen',
        5: 'Entered basement',
        7: 'Loaded disk',
        8: 'Inserted disk',
        9: 'Defeated NEO',
      },
    },
  },
  [FLAGS.RALSEI_PHOTO_STATUS]: {
    displayName: `Ralsei's Photo Type`,
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Hug',
        2: 'Pose',
        3: 'Rude',
        4: 'Blank',
      },
    },
  },
  [FLAGS.RECRUITED_HACKER]: {
    displayName: 'Recruited Hacker',
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_BED_KRIS]: {
    displayName: `Inspected Kris's Bed`,
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_BED_SUSIE]: {
    displayName: `Inspected Susie's Bed`,
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_BED_LANCER]: {
    displayName: `Inspected Lancer's Bed`,
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_BED_CLOVER]: {
    displayName: `Inspected Clover's Bed`,
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_BED_NOELLE]: {
    displayName: `Inspected Noelle's Bed`,
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_BEDS_CH2]: {
    displayName: 'Got Bed Inspector Title',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_METTATON]: {
    displayName: 'Talked to Mettaton',
    valueType: 'boolean',
  },
  [FLAGS.ONION_CH2]: {
    displayName: 'Talked to Onion',
    valueType: 'boolean',
  },
  [FLAGS.ONION_MISSED]: {
    displayName: 'Did you miss Onion?',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Yes',
        2: 'No',
      },
    },
  },
  [FLAGS.TOOK_ASRIEL_MONEY]: {
    displayName: `Took Asriel's money`,
    valueType: 'boolean',
  },
  [FLAGS.BERDLY_BROKEN_ARM]: {
    displayName: `Berdly's Arm Broken`,
    valueType: 'boolean',
  },
  [FLAGS.CARS_HIT_COUNT]: {
    displayName: 'Cars Hit Count',
    valueType: 'number',
    valueRules: {
      min: 0,
    },
  },
  [FLAGS.RECRUIT_DEBUG]: { displayName: 'RECRUIT_DEBUG' },
  [FLAGS.RECRUIT_LANCER_1]: { displayName: 'RECRUIT_LANCER_1' },
  [FLAGS.RECRUIT_DUMMY]: { displayName: 'RECRUIT_DUMMY' },
  [FLAGS.RECRUIT_RALSEI_TUTORIAL]: { displayName: 'RECRUIT_RALSEI_TUTORIAL' },
  [FLAGS.RECRUIT_RUDINN]: { displayName: 'RECRUIT_RUDINN' },
  [FLAGS.RECRUIT_HATHY]: { displayName: 'RECRUIT_HATHY' },
  [FLAGS.RECRUIT_CLOVER_1]: { displayName: 'RECRUIT_CLOVER_1' },
  [FLAGS.RECRUIT_C_ROUND]: { displayName: 'RECRUIT_C_ROUND' },
  [FLAGS.RECRUIT_K_ROUND_1]: { displayName: 'RECRUIT_K_ROUND_1' },
  [FLAGS.RECRUIT_PONMAN]: { displayName: 'RECRUIT_PONMAN' },
  [FLAGS.RECRUIT_LANCER_2]: { displayName: 'RECRUIT_LANCER_2' },
  [FLAGS.RECRUIT_RABBICK]: { displayName: 'RECRUIT_RABBICK' },
  [FLAGS.RECRUIT_BLOXER]: { displayName: 'RECRUIT_BLOXER' },
  [FLAGS.RECRUIT_JIGSAWRY]: { displayName: 'RECRUIT_JIGSAWRY' },
  [FLAGS.RECRUIT_CLOVER_2]: { displayName: 'RECRUIT_CLOVER_2' },
  [FLAGS.RECRUIT_DOOMTANK]: { displayName: 'RECRUIT_DOOMTANK' },
  [FLAGS.RECRUIT_LANCER_3]: { displayName: 'RECRUIT_LANCER_3' },
  [FLAGS.RECRUIT_SUSIE_AND_LANCER]: { displayName: 'RECRUIT_SUSIE_AND_LANCER' },
  [FLAGS.RECRUIT_JEVIL]: { displayName: 'RECRUIT_JEVIL' },
  [FLAGS.RECRUIT_K_ROUND_2]: { displayName: 'RECRUIT_K_ROUND_2' },
  [FLAGS.RECRUIT_RUDINN_RANGER]: { displayName: 'RECRUIT_RUDINN_RANGER' },
  [FLAGS.RECRUIT_HEAD_HATHY]: { displayName: 'RECRUIT_HEAD_HATHY' },
  [FLAGS.RECRUIT_KING]: { displayName: 'RECRUIT_KING' },
  [FLAGS.RECRUIT_AMBYU_LANCE]: { displayName: 'RECRUIT_AMBYU_LANCE' },
  [FLAGS.RECRUIT_POPPUP]: { displayName: 'RECRUIT_POPPUP' },
  [FLAGS.RECRUIT_TASQUE]: { displayName: 'RECRUIT_TASQUE' },
  [FLAGS.RECRUIT_WEREWIRE]: { displayName: 'RECRUIT_WEREWIRE' },
  [FLAGS.RECRUIT_MAUS]: { displayName: 'RECRUIT_MAUS' },
  [FLAGS.RECRUIT_VIROVIROKUN]: { displayName: 'RECRUIT_VIROVIROKUN' },
  [FLAGS.RECRUIT_SWATCHLING]: { displayName: 'RECRUIT_SWATCHLING' },
  [FLAGS.RECRUIT_CAPN]: { displayName: 'RECRUIT_CAPN' },
  [FLAGS.RECRUIT_K_K]: { displayName: 'RECRUIT_K_K' },
  [FLAGS.RECRUIT_SWEET]: { displayName: 'RECRUIT_SWEET' },
  [FLAGS.RECRUIT_WEREWEREWIRE]: { displayName: 'RECRUIT_WEREWEREWIRE' },
  [FLAGS.RECRUIT_GRAZETEST]: { displayName: 'RECRUIT_GRAZETEST' },
  [FLAGS.RECRUIT_TASQUE_MANAGER]: { displayName: 'RECRUIT_TASQUE_MANAGER' },
  [FLAGS.RECRUIT_BERDLY_1]: { displayName: 'RECRUIT_BERDLY_1' },
  [FLAGS.RECRUIT_MAUSWHEEL]: { displayName: 'RECRUIT_MAUSWHEEL' },
  [FLAGS.RECRUIT_ROUXLS_1]: { displayName: 'RECRUIT_ROUXLS_1' },
  [FLAGS.RECRUIT_BERDLY_2]: { displayName: 'RECRUIT_BERDLY_2' },
  [FLAGS.RECRUIT_CLOVER_DOJO]: { displayName: 'RECRUIT_CLOVER_2_DOJO' },
  [FLAGS.RECRUIT_QUEEN]: { displayName: 'RECRUIT_QUEEN' },
  [FLAGS.RECRUIT_SPAMTON]: { displayName: 'RECRUIT_SPAMTON' },
  [FLAGS.RECRUIT_SPAMTON_NEO]: { displayName: 'RECRUIT_SPAMTON_NEO' },
  [FLAGS.RECRUIT_GIGA_QUEEN]: { displayName: 'RECRUIT_GIGA_QUEEN' },
  [FLAGS.RECRUIT_JIGSAW_JOE_DOJO]: { displayName: 'RECRUIT_JIGSAW_JOE_DOJO' },
  [FLAGS.RECRUIT_PIPIS]: { displayName: 'RECRUIT_PIPIS' },
  [FLAGS.RECRUIT_SHADOWGUY]: { displayName: 'RECRUIT_SHADOWGUY' },
  [FLAGS.RECRUIT_SHUTTAH]: { displayName: 'RECRUIT_SHUTTAH' },
  [FLAGS.RECRUIT_ZAPPER]: { displayName: 'RECRUIT_ZAPPER' },
  [FLAGS.RECRUIT_RIBBICK]: { displayName: 'RECRUIT_RIBBICK' },
  [FLAGS.RECRUIT_WATERCOOLER]: { displayName: 'RECRUIT_WATERCOOLER' },
  [FLAGS.RECRUIT_PIPPINS]: { displayName: 'RECRUIT_PIPPINS' },
  [FLAGS.RECRUIT_ELNINA]: { displayName: 'RECRUIT_ELNINA' },
  [FLAGS.RECRUIT_LANINO]: { displayName: 'RECRUIT_LANINO' },
  [FLAGS.RECRUIT_GUEI]: { displayName: 'RECRUIT_GUEI' },
  [FLAGS.RECRUIT_BALTHIZARD]: { displayName: 'RECRUIT_BALTHIZARD' },
  [FLAGS.RECRUIT_BIBLIOX]: { displayName: 'RECRUIT_BIBLIOX' },
  [FLAGS.RECRUIT_MIZZLE]: { displayName: 'RECRUIT_MIZZLE' },
  [FLAGS.RECRUIT_WICABEL]: { displayName: 'RECRUIT_WICABEL' },
  [FLAGS.RECRUIT_WINGLADE]: { displayName: 'RECRUIT_WINGLADE' },
  [FLAGS.RECRUIT_ORGANIKK]: { displayName: 'RECRUIT_ORGANIKK' },
  [FLAGS.RECRUIT_MISS_MIZZLE]: { displayName: 'RECRUIT_MISS_MIZZLE' },
  [FLAGS.SHOWED_FAMILY_PHOTO_TO_SUSIE]: {
    displayName: 'Showed family photo to Susie',
    valueType: 'boolean',
  },
  [FLAGS.SHOWED_ASRIEL_PHOTO_TO_SUSIE]: {
    displayName: 'Showed Asriel photo to Susie',
    valueType: 'boolean',
  },
  [FLAGS.GOT_SUSIE_PRIZE]: {
    displayName: `Got Susie's prize`,
    valueType: 'boolean',
  },
  [FLAGS.CLEANED_UP_BLOOD_STAIN]: {
    displayName: 'Cleaned up blood stain',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_METTATON_TENNA]: {
    displayName: 'Talked to Mettaton about Tenna',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'No',
        1: 'Did not gave Tenna',
        2: 'Gave Tenna',
      },
    },
  },
  [FLAGS.TALKED_KING_KNIGHT]: {
    displayName: 'Talked with King about Knight',
    valueType: 'boolean',
  },
  [FLAGS.SAW_TENNA_KING_SCENE]: {
    displayName: 'Saw scene with King and Tenna in Castle Town',
    valueType: 'boolean',
  },
  [FLAGS.AXE_OF_JUSTICE_PROGRESS]: {
    displayName: 'Defeated Hammer of Justice',
    valueType: 'boolean',
  },
  [FLAGS.DONATION_FOUNTAIN_COUNT]: {
    displayName: 'Money In Donation Fountain',
    valueType: 'number',
  },
  [FLAGS.VESSEL_HEAD]: {
    displayName: 'Head',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Head 1',
        1: 'Head 2',
        2: 'Head 3',
        3: 'Head 4',
        4: 'Head 5',
        5: 'Head 6',
        6: 'Head 7',
        7: 'Head 8',
      },
    },
  },
  [FLAGS.VESSEL_BODY]: {
    displayName: 'Body',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Body 1',
        1: 'Body 2',
        2: 'Body 3',
        3: 'Body 4',
        4: 'Body 5',
        5: 'Body 6',
      },
    },
  },
  [FLAGS.VESSEL_LEGS]: {
    displayName: 'Legs',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Legs 1',
        1: 'Legs 2',
        2: 'Legs 3',
        3: 'Legs 4',
      },
    },
  },
  [FLAGS.VESSEL_FOOD]: {
    displayName: 'What is its favorite food?',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Sweet',
        1: 'Soft',
        2: 'Sour',
        3: 'Salty',
        4: 'Pain',
        5: 'Cold',
      },
    },
  },
  [FLAGS.VESSEL_BLOOD_TYPE]: {
    displayName: 'Your favorite blood type?',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'A',
        1: 'AB',
        2: 'B',
        3: 'C',
        4: 'D',
      },
    },
  },
  [FLAGS.VESSEL_COLOR]: {
    displayName: 'What color does it like most?',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Red',
        1: 'Blue',
        2: 'Green',
        3: 'Yellow',
      },
    },
  },
  [FLAGS.VESSEL_GIFT]: {
    displayName: 'Please give it a gift',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Mind',
        1: 'Kindness',
        '-1': 'Ambition',
        '-2': 'Bravery',
        '-3': 'Voice',
      },
    },
  },
  [FLAGS.VESSEL_FEELING]: {
    displayName: 'How do you feel about your creation? (It will not hear.)',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Love',
        1: 'Hope',
        2: 'Disgust',
        3: 'Fear',
      },
    },
  },
  [FLAGS.VESSEL_HONESTY]: {
    displayName: 'Have you answered honestly?',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Yes',
        1: 'No',
      },
    },
  },
  [FLAGS.VESSEL_PAIN_SEIZURE]: {
    displayName: 'You acknowledge the possibility of pain and seizure.',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Yes',
        1: 'No',
      },
    },
  },
  [FLAGS.EGG_ROOM_CH1]: {
    displayName: 'Egg Room',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Not found',
        1: 'Found',
        2: 'Talked to Man',
      },
    },
  },
  [FLAGS.EGG_CH1]: {
    displayName: 'Got Egg in Chapter 1',
    valueType: 'boolean',
  },
  [FLAGS.SINCE_CHAPTER]: {
    displayName: 'Starting Chapter',
    description: 'Number of chapter that you started this save from.',
    valueType: 'map',
    valueRules: {
      map: {
        1: 'Chapter 1',
        2: 'Chapter 2',
        3: 'Chapter 3',
        4: 'Chapter 4',
      },
    },
  },
  [FLAGS.WEIRDROUTE_PROGRESS_CH2]: {
    displayName: 'Weird Route Progress',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Froze monsters',
        2: 'Can get Freeze Ring',
        3: 'Got Freeze Ring',
        4: 'Passed force field',
        5: 'Passed mouse puzzle',
        6: 'Used Snowgrave',
      },
    },
  },
  [FLAGS.WEIRDROUTE_FAILED]: {
    displayName: 'Weird Route Failed',
    valueType: 'boolean',
  },
  [FLAGS.EGG_ROOM_CH2]: {
    displayName: 'Egg Room',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'Not found',
        1: 'Encountered Annoying Dog',
        2: 'Found',
        3: 'Talked to Man',
      },
    },
  },
  [FLAGS.GOT_MOSS_CH2]: {
    displayName: 'Got moss',
    valueType: 'boolean',
  },
  [FLAGS.GOT_MOSS_WITH_NOELLE]: {
    displayName: 'Ate moss with Noelle in party',
    valueType: 'boolean',
  },
  [FLAGS.GOT_MOSS_WITH_SUSIE]: {
    displayName: 'Ate moss with Susie in party',
    valueType: 'boolean',
  },
  [FLAGS.NOELLE_ICE_SHOCK_COUNT]: {
    displayName: 'Noelle Ice Shock spell count',
    valueType: 'number',
    valueRules: {
      min: 0,
    },
  },
  [FLAGS.EGG_CH3]: {
    displayName: 'Got Egg',
    valueType: 'boolean',
  },
  [FLAGS.EGG_CH4]: {
    displayName: 'Got Egg',
    valueType: 'boolean',
  },
  [FLAGS.GAMESHOW_LETTER_FIRST]: {
    valueType: 'map',
    valueRules: {
      map: ALPHABET,
    },
    displayName: 'First letter',
  },
  [FLAGS.GAMESHOW_LETTER_SECOND]: {
    valueType: 'map',
    valueRules: {
      map: ALPHABET,
    },
    displayName: 'Second letter',
  },
  [FLAGS.GAMESHOW_LETTER_THIRD]: {
    valueType: 'map',
    valueRules: {
      map: ALPHABET,
    },
    displayName: 'Third letter',
  },
  [FLAGS.CH3_POINTS]: {
    displayName: 'Points (PTs)',
    description: 'Currency used in Chapter 3',
    valueType: 'number',
    valueRules: {
      min: 0,
      max: 99999,
    },
  },
  [FLAGS.SUSIE_HEAL_COUNT]: {
    displayName: `Susie's Heal Count`,
    valueType: 'number',
    valueRules: {
      min: 0,
      max: 15,
    },
  },
  [FLAGS.KNIGHT_FIGHT]: {
    displayName: 'Knight Fight Status',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Deafeated',
        2: 'Lost',
      },
    },
  },
  [FLAGS.SWORD_PROGRESS]: {
    displayName: 'Sword Progress',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Got Ice Key',
        '1.5': 'Entered Ice Palace',
        2: 'Finished Ice Palace',
        3: 'Got Shelter Key',
        4: 'Entered sewers',
        5: 'Entered Shelter',
        6: 'Defeated ERAM',
      },
    },
  },
  [FLAGS.SKIPPED_INTRO_CH3]: {
    displayName: 'Slept through Tenna introduction',
    valueType: 'boolean',
  },
  [FLAGS.GOT_MOSS_CH3]: {
    displayName: 'Got Moss in Chapter 3',
    valueType: 'boolean',
  },
  [FLAGS.BIBLIOX_PROGRESS]: {
    displayName: 'Bibliox Progress (Egg Room)',
    valueType: 'map',
    valueRules: {
      map: {
        0: 'None',
        1: 'Talked about wardrobe',
        2: 'Wardrobe appeared',
        3: 'Checked Wardrobe',
        4: 'Got TripTicket',
        6: 'Got TripTicket after SWORD route',
      },
    },
  },
  [FLAGS.RALSEI_HORSE]: {
    displayName: 'Tracks Ralsei being horse',
  },
  [FLAGS.RANK_BOARD_1]: {
    displayName: 'Board 1 Rank',
    valueType: 'map',
    valueRules: {
      map: GAMESHOW_RANKS,
    },
  },
  [FLAGS.RANK_BOARD_2]: {
    displayName: 'Board 2 Rank',
    valueType: 'map',
    valueRules: {
      map: GAMESHOW_RANKS,
    },
  },
  [FLAGS.UNLOCKED_SUSIEZILLA]: {
    displayName: 'Unlocked Susiezilla',
    valueType: 'boolean',
  },
  [FLAGS.SCORE_COOKING]: {
    displayName: 'Cooking Score',
    valueType: 'number',
  },
  [FLAGS.RANK_COOKING]: {
    displayName: 'Cooking Rank',
    valueType: 'map',
    valueRules: {
      map: GAMESHOW_RANKS,
    },
  },
  [FLAGS.SCORE_LIGHTNERS_LIVE]: {
    displayName: 'Lightners Live Score',
    valueType: 'number',
  },
  [FLAGS.RANK_LIGHTNERS_LIVE]: {
    displayName: 'Lightners Live Rank',
    valueType: 'map',
    valueRules: {
      map: GAMESHOW_RANKS,
    },
  },
  [FLAGS.SCORE_SUSIEZILLA]: {
    displayName: 'Susiezilla Score',
    valueType: 'number',
  },
  [FLAGS.RANK_SUSIEZILLA]: {
    displayName: 'Susiezilla Rank',
    valueType: 'map',
    valueRules: {
      map: GAMESHOW_RANKS,
    },
  },
  [FLAGS.GOT_GOLDEN_TENNA]: {
    displayName: 'Got Golden Tenna Statue',
    valueType: 'boolean',
  },
  [FLAGS.ENTERED_1225_ROOM]: {
    displayName: 'Entered 1225 Gacha Machine Room',
    valueType: 'boolean',
  },
  [FLAGS.STARWALKER_CH3]: {
    displayName: 'Talked to original &ensp;*Starwalker*',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_NAPSTABLOOK_UNDYNE]: {
    displayName: 'Talked to Napstablook about Undyne',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_NAPSTABLOOK_SHELTER]: {
    displayName: 'Talked to Napstablook about shelter',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_ASGORE_OUTFIT]: {
    displayName: 'Talked to Asgore about his outfit',
    valueType: 'boolean',
  },
  [FLAGS.TALKED_ASGORE_WELLBEING]: {
    displayName: 'Talked to Asgore about his well-being',
    valueType: 'boolean',
  },
  [FLAGS.GOT_MOSS_CH4]: {
    displayName: 'Got Moss in Chapter 4',
    valueType: 'boolean',
  },
  [FLAGS.INSPECTED_GLASS_WITH_NOELLE]: {
    displayName: `Inspected Glass in Noelle's house`,
    valueType: 'boolean',
  },
  [FLAGS.WEIRDROUTE_FAILED_CH4]: {
    displayName: 'Weird Route failed',
    valueType: 'boolean',
  },
};

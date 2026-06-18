import type { FlagName } from './flags';

export interface StoryClusterDef {
  id: string;
  title: string;
  flags: FlagName[];
}

export interface StorySectionDef {
  id: string;
  title: string;
  clusters: StoryClusterDef[];
}

export const STORY_SECTIONS = {
  1: [
    {
      id: 'beginning-to-forest',
      title: 'Beginning to Forest',
      clusters: [
        {
          id: 'field-entrance',
          title: 'Field Entrance',
          flags: ['GOT_GLOWSHARD'],
        },
        {
          id: 'dummy-room',
          title: 'Dummy Room',
          flags: [
            'HUGGED_DUMMY',
            'TUTORIAL_END',
            'MANUAL_STATUS',
            'RUNNING_TUTORIAL',
          ],
        },
        {
          id: 'forest-path',
          title: 'Forest Path',
          flags: [
            'GOT_CANDY',
            'GOT_BROKEN_CAKE',
            'GOT_CANDY_2',
            'GOT_WHITE_RIBBON',
          ],
        },
        {
          id: 'maze-of-death',
          title: 'Maze of Death',
          flags: ['C_ROUND_OUTCOME'],
        },
        {
          id: 'seams-area',
          title: "Seam's Shop Area",
          flags: ['TALKED_JOE', 'DONATED_TO_HOLE'],
        },
        {
          id: 'great-board',
          title: 'Great Board',
          flags: ['GOT_KEY_C', 'TEAM_NAME'],
        },
        {
          id: 'school-prophecy',
          title: 'School & Prophecy',
          flags: ['RAN_IN_SCHOOL', 'SKIPPED_PROPHECY', 'BE_SUBJECT_ANSWER'],
        },
      ],
    },
    {
      id: 'forest-to-card-castle',
      title: 'Forest to Card Castle',
      clusters: [
        {
          id: 'diamond-room',
          title: 'Diamond Room',
          flags: ['GOT_RAGGER'],
        },
        {
          id: 'puzzle-rooms',
          title: 'Puzzle Rooms',
          flags: [
            'GOT_DICE_BRACE',
            'SOLVED_CLOVER_PUZZLE',
            'CLOVER_VIOLENCE',
            'INTERACTED_CLOVER',
          ],
        },
        {
          id: 'bake-sale',
          title: 'Bake Sale',
          flags: ['GOT_SPINCAKE'],
        },
        {
          id: 'bloxer-room',
          title: 'Bloxer Room',
          flags: ['GOT_BLOXER_MONEY', 'GOT_BLOXER_MINT'],
        },
        {
          id: 'dancer-room',
          title: 'Scissor Dancer Room',
          flags: ['GOT_DANCER_MINT'],
        },
        {
          id: 'invisible-paths',
          title: 'Invisible Paths',
          flags: ['GOT_KEY_B'],
        },
        {
          id: 'thrash-machine',
          title: 'Thrash Machine',
          flags: ['MADE_THRASH_MACHINE'],
        },
        {
          id: 'starwalker-room',
          title: 'Starwalker Room',
          flags: ['STARWALKER', 'EGG_ROOM_CH1', 'EGG_CH1'],
        },
        {
          id: 'tree-switch-room',
          title: 'Tree Switch Room',
          flags: [
            'PICNIC_TABLE_FINGERS',
            'BOX_PUZZLE_STATE',
            'TALKED_ABOUT_CHEST',
            'SOLVED_DARK_PUZZLE',
          ],
        },
      ],
    },
    {
      id: 'card-castle-to-light-world',
      title: 'Card Castle to Light World',
      clusters: [
        {
          id: 'prison-cell',
          title: 'Prison Cell',
          flags: ['GOT_MOSS_CH1', 'GOT_IRON_SHACKLE'],
        },
        {
          id: 'jevil-keys',
          title: 'Jevil & Broken Keys',
          flags: [
            'GOT_KEY_A',
            'JEVIL_PROGRESS',
            'JEVIL_CHEST',
            'GOT_JEVIL_CHEST',
          ],
        },
        {
          id: 'castle-floors',
          title: 'Castle Floors',
          flags: ['GOT_CLUBSWICH', 'INSPECTED_BEDS_CH1', 'GOT_CASTLE_MINT'],
        },
        {
          id: 'throne-room',
          title: 'Throne Room',
          flags: [
            'PEACEFUL_KING',
            'VIOLENT_ENDING_CH1',
            'LANCER_FOLLOW_PROGRESS',
          ],
        },
        {
          id: 'castle-post-king',
          title: 'Castle After King',
          flags: [
            'ELEVATOR_FLOOR',
            'ELEVATOR_UNLOCKED',
            'INTERACTED_SALSA',
            'JAIL_INTERACTS',
          ],
        },
      ],
    },
    {
      id: 'light-world-to-ending',
      title: 'Light World to Ending',
      clusters: [
        {
          id: 'hospital',
          title: 'Hospital',
          flags: ['TALKED_RUDY', 'USED_RUDY_SINK'],
        },
        {
          id: 'main-street',
          title: 'Main Street',
          flags: [
            'TALKED_SANS',
            'GOT_SANS_PHONE',
            'TALKED_ALPHYS',
            'TALKED_QC',
            'TALKED_METTATON',
          ],
        },
        {
          id: 'asgores-shop',
          title: "Asgore's Flower Shop",
          flags: ['ASGORE_FLOWERS_PROGRESS', 'EGG_FRIDGE'],
        },
        {
          id: 'home',
          title: 'Home',
          flags: ['ENTERED_HOME_COUNT'],
        },
        {
          id: 'onionsan',
          title: "Onionsan's Pond",
          flags: ['ONION_CH1', 'ONION_YOUR_NAME', 'ONION_NAME'],
        },
        {
          id: 'town-npcs',
          title: 'Town NPCs',
          flags: [
            'TALKED_NOELLE',
            'TALKED_BERDLY_CH1',
            'TALKED_BURGERPANTS',
            'TALKED_CATTY',
            'TALKED_UNDYNE',
          ],
        },
      ],
    },
  ],
  2: [
    {
      id: 'light-world-to-cyber-field',
      title: 'Light World to Cyber Field',
      clusters: [
        {
          id: 'home',
          title: 'Home',
          flags: ['TEXT_FLAG_832', 'TOY_DELIVER_PROGRESS'],
        },
        {
          id: 'castle-town',
          title: 'Castle Town',
          flags: [
            'TALKED_KING_PROLOGUE',
            'GAVE_JEVIL_CRYSTAL',
            'MR_SOCIETY_LEFT',
          ],
        },
        {
          id: 'party-dojo-start',
          title: 'Party Dojo Start',
          flags: ['BEAT_DOJO_CLOVER', 'BEAT_TM_SAYS', 'BEAT_JOE'],
        },
      ],
    },
    {
      id: 'cyber-field-to-cyber-city',
      title: 'Cyber Field to Cyber City',
      clusters: [
        {
          id: 'cyber-field',
          title: 'Cyber Field',
          flags: ['GOT_GLOWWRIST', 'GOT_NUBERT_TREASURE'],
        },
        {
          id: 'hacker-quest',
          title: "Hacker's Checks Quest",
          flags: [
            'MET_HACKER',
            'GOT_CHESTMARK',
            'GIASFELFEBREHBER',
            'GOT_CHESTMARK_2',
            'GOT_GLOWWRIST_2',
            'RECRUITED_HACKER',
          ],
        },
        {
          id: 'sweet-capn-cakes',
          title: "Sweet Cap'n Cakes",
          flags: ['GOT_TENSION_BIT'],
        },
        {
          id: 'virovirokun-room',
          title: 'Virovirokun Room',
          flags: ['UNLOCKED_MINT_CHEST', 'GOT_CH2_MINT'],
        },
        {
          id: 'teacup-ride',
          title: 'Teacup Ride',
          flags: ['GOT_RAGGER2'],
        },
      ],
    },
    {
      id: 'cyber-city-to-queens-mansion',
      title: "Cyber City to Queen's Mansion",
      clusters: [
        {
          id: 'trash-zone',
          title: 'Trash Zone',
          flags: [
            'GOT_CANDY_4',
            'GOT_TRASH_20',
            'GOT_TRASH_BAGEL_2',
            'GOT_TRASH_80',
            'GOT_TRASH_20_2',
          ],
        },
        {
          id: 'city-streets',
          title: 'City Streets',
          flags: [
            'GOT_CANDY_3',
            'GOT_PINK_RIBBON',
            'GOT_BOUNCE_BLADE',
            'CARS_HIT_COUNT',
          ],
        },
        {
          id: 'egg-room',
          title: 'Egg Room',
          flags: ['EGG_ROOM_CH2', 'GOT_CH2_EGG'],
        },
        {
          id: 'dumpster-moss',
          title: 'Dumpster & Moss',
          flags: [
            'GOT_MOSS_CH2',
            'GOT_MOSS_WITH_NOELLE',
            'GOT_MOSS_WITH_SUSIE',
          ],
        },
        {
          id: 'amusement-cars',
          title: 'Amusement & Car Section',
          flags: [
            'NOELLE_ICE_SHOCK_COUNT',
            'CARNIVAL_GIFT',
            'GOT_CHEST_BAGEL',
            'GOT_CHEST_CANDY',
          ],
        },
      ],
    },
    {
      id: 'queens-mansion-to-light-world',
      title: "Queen's Mansion to Light World",
      clusters: [
        {
          id: 'lancers-room',
          title: "Lancer's Room",
          flags: ['LANCER_CARED_FOR'],
        },
        {
          id: 'swatch-shop',
          title: "Swatch's Shop",
          flags: ['BAGELS_PURCHASED', 'GOT_REVIVE_DUST'],
        },
        {
          id: 'mansion-halls',
          title: 'Mansion Halls',
          flags: [
            'GOT_CHAIN_MAIL',
            'GOT_BASEMENT_DOLLAR',
            'STATUE_SINK_PROGRESS',
            'FUNNY_BUTLER_PROGRESS',
          ],
        },
        {
          id: 'spamton',
          title: 'Spamton',
          flags: [
            'SPAMTON_PROGRESS',
            'GOT_DEALMAKER',
            'GOT_SPAMTON_CHEST',
            'TALKED_SNOWGRAVE_NEO',
          ],
        },
        {
          id: 'mansion-loot',
          title: 'Mansion Loot',
          flags: ['GOT_PAINTING_MINT', 'GOT_MANSION_GLOWSHARD'],
        },
        {
          id: 'bedroom-statues',
          title: 'Bedroom Statues',
          flags: [
            'INSPECTED_BED_KRIS',
            'INSPECTED_BED_SUSIE',
            'INSPECTED_BED_LANCER',
            'INSPECTED_BED_CLOVER',
            'INSPECTED_BED_NOELLE',
            'STOLE_SUSIE_STATUE',
            'STOLE_ICE_E_STATUE',
          ],
        },
        {
          id: 'weird-route',
          title: 'Weird Route',
          flags: [
            'WEIRDROUTE_PROGRESS_CH2',
            'WEIRDROUTE_FAILED',
            'RALSEI_PHOTO_STATUS',
            'BERDLY_BROKEN_ARM',
          ],
        },
      ],
    },
    {
      id: 'light-world-to-ending',
      title: 'Light World to Ending',
      clusters: [
        {
          id: 'castle-town-return',
          title: 'Castle Town Return',
          flags: ['TALKED_QUEENIE_BEANIE'],
        },
        {
          id: 'party-dojo-return',
          title: 'Party Dojo Return',
          flags: ['BEAT_ALLSTARS'],
        },
        {
          id: 'home',
          title: 'Home',
          flags: [
            'INSPECTED_BEDS_CH2',
            'INTERACTED_SINK_CH2',
            'CHOCOLATES_WHO_GAVE',
            'TOOK_ASRIEL_MONEY',
            'DEPOSITED_CH2_EGG',
            'FAVE_PARTY_MEMBER_2',
            'CALLED_MOM_BUSY',
          ],
        },
        {
          id: 'town',
          title: 'Town',
          flags: [
            'ONION_CH2',
            'ONION_MISSED',
            'TALKED_ALVIN',
            'SEEN_SHELTER_SCENE',
            'SEEN_POLICE_SCENE',
          ],
        },
      ],
    },
  ],
  3: [
    {
      id: 'couch-cliffs-to-board-1',
      title: 'Couch Cliffs to Board 1',
      clusters: [
        {
          id: 'couch-cliffs',
          title: 'Couch Cliffs',
          flags: ['SUSIE_HEAL_COUNT', 'SKIPPED_INTRO_CH3', 'CH3_COUCH_WALKING'],
        },
        {
          id: 'overworld',
          title: 'Overworld',
          flags: ['GOT_ONE_POINT'],
        },
        {
          id: 'tennas-gameshow',
          title: "Tenna's Game Show",
          flags: [
            'GAMESHOW_LETTER_FIRST',
            'GAMESHOW_LETTER_SECOND',
            'GAMESHOW_LETTER_THIRD',
            'GAMESHOW_JAPANESE',
            'GAMESHOW_NAME_1_BACKUP',
            'GAMESHOW_NAME_2_BACKUP',
            'GAMESHOW_NAME_3_BACKUP',
          ],
        },
      ],
    },
    {
      id: 'board-1-to-green-room',
      title: 'Board 1 to Green Room',
      clusters: [
        {
          id: 'keys-quizzes',
          title: 'Keys & Quizzes',
          flags: [
            'BOARD_KEY_TRACKER',
            'BOARD_KEY_ACTUAL',
            'OVERWORLD_QUIZ_1',
            'OVERWORLD_QUIZ_2',
            'OVERWORLD_QUIZ_3',
            'MAILROOM_STATUS',
          ],
        },
        {
          id: 'board-progress',
          title: 'Board 1 Progress',
          flags: [
            'CH3_POINTS',
            'SCORE_COOKING',
            'RANK_COOKING',
            'RANK_BOARD_1',
            'GOT_RAMB_PRIZE_1',
          ],
        },
      ],
    },
    {
      id: 'green-room-to-board-2',
      title: 'Green Room to Board 2',
      clusters: [
        {
          id: 'rank-rooms',
          title: 'Rank Rooms',
          flags: [
            'WATERCOOLER_C_RANK',
            'WATERCOOLER_CRATER_POINTS',
            'GOT_DOG_DOLLAR',
            'GOT_GOLDEN_TENNA',
          ],
        },
        {
          id: 'minigames',
          title: 'Minigames',
          flags: [
            'UNLOCKED_SUSIEZILLA',
            'SCORE_SUSIEZILLA',
            'RANK_SUSIEZILLA',
            'GOT_CURTAIN_SABER',
          ],
        },
        {
          id: 'sword-route',
          title: 'Sword Route Part 1',
          flags: [
            'SWORD_PROGRESS',
            'SWORD_ROUTE_KILLS',
            'SUSIE_SWORD_NOTICED',
            'BIBLIOX_PROGRESS',
            'GOT_CH3_MINT',
          ],
        },
      ],
    },
    {
      id: 'board-2-to-green-room',
      title: 'Board 2 to Green Room',
      clusters: [
        {
          id: 'photos',
          title: 'Photo Hunt',
          flags: [
            'BONUS_ZONE_OPENED',
            'HERO_PHOTO_TAKEN',
            'CACTUS_PHOTO_TAKEN',
            'SPRING_PHOTO_TAKEN',
            'HALF_FLOWER_PHOTO',
          ],
        },
        {
          id: 'board-2-collectibles',
          title: 'Board 2 Collectibles',
          flags: ['GOT_MOSS_CH3'],
        },
        {
          id: 'river-islands',
          title: 'River & Secret Islands',
          flags: [
            'ROUXLS_BLOCK_PURCHASED',
            'TROPIC_TENNA_FOUND',
            'LAWNMOWER_DESTROYED_PAPER',
            'LAWNMOWER_SCORE',
          ],
        },
        {
          id: 'board-progress',
          title: 'Board 2 Progress',
          flags: [
            'RANK_BOARD_2',
            'SCORE_LIGHTNERS_LIVE',
            'RANK_LIGHTNERS_LIVE',
          ],
        },
      ],
    },
    {
      id: 'green-room-to-tv-world',
      title: 'Green Room to TV World',
      clusters: [
        {
          id: 'board-2-rewards',
          title: 'Board 2 Rewards',
          flags: [
            'GOT_RAMB_PRIZE_2',
            'RAISE_BAT_HARD_HISCORE',
            'RAISE_BAT_HARD_HIRANK',
          ],
        },
        {
          id: 'gacha-room',
          title: 'Gacha Room',
          flags: ['ENTERED_1225_ROOM'],
        },
        {
          id: 'sword-route-part-2',
          title: 'Sword Route Part 2',
          flags: ['COLDPLACE_ENTERED'],
        },
      ],
    },
    {
      id: 'tv-world-to-green-room',
      title: 'TV World to Green Room',
      clusters: [
        {
          id: 'tv-world',
          title: 'TV World',
          flags: [
            'LANCER_CONTROLLER_COUNT',
            'ENCOUNT_SECOND_WATERCOOLER',
            'ENCOUNT_SECOND_RIBBICK',
            'RECRUIT_SHADOWGUY',
            'OPENED_SAMS_ZONE',
            'CHEATER_JAILED',
          ],
        },
        {
          id: 'bonus-zone',
          title: 'Bonus Zone',
          flags: [
            'OPENED_BONUS_ZONE',
            'TENNA_BONUS_ENTERED',
            'BONUS_ZONE_TREASURE_1',
            'BONUS_ZONE_TREASURE_2',
            'BONUS_ZONE_TREASURE_3',
            'BONUS_ZONE_POINTS_1',
            'BONUS_ZONE_POINTS_2',
            'BONUS_ZONE_POINTS_3',
            'BONUS_ZONE_POINTS_4',
            'PIPPINS_BONUS_STOLE',
          ],
        },
        {
          id: 'cool-trashy',
          title: 'Cool Trashy',
          flags: [
            'EGG_CH3',
            'GOT_TRASH_CH3_1',
            'GOT_TRASH_CH3_2',
            'GOT_TRASH_CH3_3',
            'GOT_TRASH_CH3_4',
            'GOT_TRASH_CH3_5',
            'GOT_TRASH_CH3_6',
            'GOT_TRASH_CH3_7',
            'GOT_TRASH_CH3_8',
            'GOT_COOLTRASHY_REWARD',
          ],
        },
        {
          id: 'sneak-mission',
          title: 'Sneak Mission',
          flags: [
            'OVERWORLD_QUIZ_4',
            'OVERWORLD_QUIZ_5',
            'OVERWORLD_QUIZ_6',
            'GOT_300_POINTS',
            'SNEAK_TIMES_CAUGHT',
            'SNEAK_ZAPPER_STATE',
          ],
        },
      ],
    },
    {
      id: 'green-room-to-ending',
      title: 'Green Room to Ending',
      clusters: [
        {
          id: 'sword-route-finale',
          title: 'Sword Route Finale',
          flags: [
            'SWORDROUTE_SODA',
            'GOT_SHADOWMANTLE_ITEM',
            'SHADOWMANTLE_DEFEATED',
            'TIMES_GAINED_AT_CH3',
            'TIMES_LEVELED_CH3',
          ],
        },
        {
          id: 'bosses',
          title: 'Bosses',
          flags: ['ENCOUNT_TENNA', 'ENCOUNT_ROUXLS_WEATHER'],
        },
        {
          id: 'knight',
          title: 'Roaring Knight',
          flags: [
            'KNIGHT_FIGHT',
            'KNIGHT_PEP_TALK',
            'KNIGHT_DEATHS_COUNT',
            'SHADOW_FAILED_CH3',
            'GLASS_FAILED_CH3',
          ],
        },
        {
          id: 'goulden-son',
          title: 'Goulden Son',
          flags: ['GOULDEN_SON_TALE', 'GOULDEN_SON_DESTINATION'],
        },
      ],
    },
  ],
  4: [
    {
      id: 'light-world-to-dark-sanctuary',
      title: 'Light World to Dark Sanctuary',
      clusters: [
        {
          id: 'home',
          title: 'Home',
          flags: [
            'CLEANED_UP_BLOOD_STAIN',
            'GOT_SUSIE_PRIZE',
            'SHOWED_FAMILY_PHOTO_TO_SUSIE',
            'SHOWED_ASRIEL_PHOTO_TO_SUSIE',
          ],
        },
        {
          id: 'castle-town',
          title: 'Castle Town',
          flags: [
            'RALSEI_ROOM_PIANO',
            'SEEN_RALSEI_ROOM',
            'TEA_PARTY_DINER_FLAG',
            'TALKED_KING_KNIGHT',
            'SAW_TENNA_KING_SCENE',
            'TALKED_METTATON_TENNA',
            'CASTLE_2F_FLAG',
          ],
        },
        {
          id: 'castle-tv',
          title: 'Castle TV',
          flags: ['CASTLE_TV_ZONE1_COMPLETE', 'CASTLE_TV_WATCHED'],
        },
        {
          id: 'party-dojo',
          title: 'Party Dojo',
          flags: ['UNKNOWN_815'],
        },
        {
          id: 'mike-room',
          title: 'Mike Room',
          flags: [
            'CASTLE_TV_BATTLE_COMPLETE',
            'MIKE_DOOR_OPENED',
            'MIKE_MINIGAME_SCORE_1',
            'MIKE_MINIGAME_HISCORE',
            'MIKE_MINIGAME_SCORE_2',
          ],
        },
        {
          id: 'town-npcs',
          title: 'Town NPCs',
          flags: [
            'TEXT_FLAG_776',
            'NPC_FACING_786',
            'READABLE_733',
            'TALKED_NAPSTABLOOK_UNDYNE',
            'TALKED_NAPSTABLOOK_SHELTER',
            'TALKED_ASGORE_OUTFIT',
            'TALKED_ASGORE_WELLBEING',
            'READABLE_754',
            'INSPECTED_GLASS_WITH_NOELLE',
          ],
        },
        {
          id: 'diner-and-route',
          title: 'Diner & Route State',
          flags: ['WEIRDROUTE_FAILED_CH4', 'HAD_TEA_SCENE', 'TEXT_FLAG_833'],
        },
        {
          id: 'beach-festival',
          title: 'Beach Festival',
          flags: ['UNKNOWN_712', 'BEACH_STATE', 'UNKNOWN_713'],
        },
      ],
    },
    {
      id: 'dark-sanctuary-1-to-2',
      title: 'Dark Sanctuary Part 1 to Dark Sanctuary Part 2',
      clusters: [
        {
          id: 'dark-sanctuary-intro',
          title: 'Dark Sanctuary Intro',
          flags: [
            'CHURCH_INTRO_FLAG',
            'CHURCH_INTRO_GERSON',
            'INTRO_GERSON_1617',
            'CHURCH_INTRO_PIANO',
            'INTRO_GUEI_TALKED',
          ],
        },
        {
          id: 'secret-piano',
          title: 'Secret Piano',
          flags: [
            'TEXT_FLAG_838',
            'SECRET_PIANO_VALUE',
            'SECRET_PIANO_PROGRESS',
            'SECRET_PIANO_SOLVED',
          ],
        },
        {
          id: 'gerson-study',
          title: "Gerson's Study",
          flags: ['GERSON_STUDY_PROGRESS'],
        },
        {
          id: 'donation-fountain',
          title: 'Donation Fountain',
          flags: [
            'DONATION_100_REWARD',
            'FOUNTAIN_ITEM_RECEIVED',
            'DONATION_FOUNTAIN_COUNT',
          ],
        },
        {
          id: 'climb',
          title: 'Side Climb',
          flags: [
            'SIDECLIMB_PROGRESS',
            'TRUE_CLIMB_ADVENTURE',
            'TRUE_CLIMB_PROGRESS',
            'CH4_INTRO_PROGRESS',
          ],
        },
      ],
    },
    {
      id: 'dark-sanctuary-2-to-second-sanctuary',
      title: 'Dark Sanctuary Part 2 to Second Sanctuary',
      clusters: [
        {
          id: 'mizzle',
          title: 'Mizzle',
          flags: ['MIZZLE_ENCOUNTER', 'MIZZLE_SPECIAL'],
        },
        {
          id: 'church',
          title: 'Church',
          flags: [
            'CHURCH_AXE_OF_JUSTICE_PROGRESS',
            'CHURCH_ARENA_STATE',
            'CHURCH_SHADOW_PUZZLE_STATE',
            'CHURCH_SHADOW_PUZZLE_TIMER',
            'GUEI_MONSTER_ENCOUNTERED',
          ],
        },
      ],
    },
    {
      id: 'second-sanctuary-to-third-sanctuary',
      title: 'Second Sanctuary to Third Sanctuary',
      clusters: [
        {
          id: 'collectibles',
          title: 'Collectibles',
          flags: ['EGG_CH4', 'GOT_MOSS_CH4'],
        },
        {
          id: 'church-areas',
          title: 'Church Areas',
          flags: [
            'CHURCHC_ENCOUNTER_1',
            'FOUNTAIN_SPECIAL',
            'DARKMAZE_CANDY_PROGRESS',
          ],
        },
        {
          id: 'bookshelf-piano-puzzle',
          title: 'Bookshelf Piano Puzzle',
          flags: [
            'REMOTE_PIANO_SHELF_X1',
            'BOOKSHELF_PUZZLE_REVEALED',
            'PIANO_COUCH_VISIBLE',
            'RALSEI_ROOM_PIANO',
            'BOOKSHELF_PUZZLE_OLD_SOLVED',
          ],
        },
      ],
    },
    {
      id: 'third-sanctuary-to-ending',
      title: 'Third Sanctuary to Ending',
      clusters: [
        {
          id: 'hidden-prophecies',
          title: 'Hidden Prophecies',
          flags: ['SUPER_PROPHECIES_SEEN'],
        },
        {
          id: 'story-beats',
          title: 'Story Beats',
          flags: [
            'KNIGHT_CLIMB_PROGRESS',
            'KNIGHT_CLIMB_1660',
            'POST_DARK_WORLD',
            'ARENA_PROGRESS',
            'PURIFIED_COUNT',
          ],
        },
      ],
    },
  ],
} as const satisfies Record<1 | 2 | 3 | 4, StorySectionDef[]>;

export type StoryChapterNumber = keyof typeof STORY_SECTIONS;

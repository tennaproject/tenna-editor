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
          id: 'dark-world-entrance',
          title: 'Dark World Entrance',
          flags: ['DARK_AREA_MOVEMENT_CHOICE', 'SOLVED_EYE_PUZZLE'],
        },
        {
          id: 'training-dummy',
          title: 'Training Dummy',
          flags: [
            'RALSEI_TUTORIAL_OUTCOME',
            'LEARNED_TO_RUN',
            'MANUAL_DISPOSAL_PROGRESS',
          ],
        },
        {
          id: 'prophecy',
          title: 'The Prophecy',
          flags: ['SKIPPED_PROPHECY'],
        },
        {
          id: 'field',
          title: 'Field',
          flags: [
            'OBTAINED_GLOWSHARD',
            'SAW_FIELD_SONG',
            'INTERACTED_WITH_SALSA',
            'LANCER_PRE_HATHY_DIALOGUE',
            'DARK_CANDY_TREE_1_TAKEN',
            'OBTAINED_BROKEN_CAKE_PIECE',
            'DARK_CANDY_TREE_2_TAKEN',
            'OBTAINED_WHITE_RIBBON',
          ],
        },
        {
          id: 'box-puzzle',
          title: 'Box Puzzle',
          flags: ['VANDALIZED_BOX_PUZZLE_STATE'],
        },
        {
          id: 'c-round',
          title: 'C. Round',
          flags: ['C_ROUND_OUTCOME'],
        },
        {
          id: 'jigsaw-joe',
          title: "Jigsaw Joe's Tutorials",
          flags: ['TALKED_TO_JIGSAW_JOE', 'DONATED_TO_HOLE'],
        },
        {
          id: 'great-board',
          title: 'Great Board',
          flags: ['OBTAINED_BROKEN_KEY_C', 'TEAM_NAME'],
        },
      ],
    },
    {
      id: 'forest-to-card-castle',
      title: 'Forest to Card Castle',
      clusters: [
        {
          id: 'forest-maze',
          title: 'Forest Maze',
          flags: [
            'LANCER_DEAD_END_COUNT',
            'SUSIE_DEAD_END_COUNT',
            'LANCER_FOLLOW_DIALOGUE_PROGRESS',
          ],
        },
        {
          id: 'ragger',
          title: 'Ragger',
          flags: ['ASKED_ROYAL_COAT_RACK_ABOUT_CHEST', 'OBTAINED_RAGGER'],
        },
        {
          id: 'dice-brace',
          title: 'Dice Brace',
          flags: ['SOLVED_DICE_BRACE_PUZZLE', 'OBTAINED_DICE_BRACE'],
        },
        {
          id: 'clover',
          title: 'Clover',
          flags: ['SOLVED_CLOVER_PUZZLE', 'CLOVER_VIOLENCE'],
        },
        {
          id: 'bake-sale',
          title: 'Bake Sale',
          flags: ['SUSIE_BOUGHT_SNACK', 'TRADED_TOP_CAKE'],
        },
        {
          id: 'bloxer-room',
          title: 'Bloxer Room',
          flags: ['OBTAINED_BLOXER_ROOM_MONEY'],
        },
        {
          id: 'scissor-dancer-room',
          title: 'Scissor Dancer Room',
          flags: ['OBTAINED_DANCER_REVIVE_MINT', 'OBTAINED_BROKEN_KEY_B'],
        },
        {
          id: 'rouxls-puzzles',
          title: "Rouxls's Puzzles",
          flags: ['SOLVED_FIRST_ROUXLS_PUZZLE', 'SOLVED_SECOND_ROUXLS_PUZZLE'],
        },
        {
          id: 'k-round',
          title: 'K. Round',
          flags: ['CHECKED_K_ROUND'],
        },
        {
          id: 'darkening-room',
          title: 'Darkening Room',
          flags: ['SOLVED_DARK_PUZZLE'],
        },
        {
          id: 'starwalker-room',
          title: 'Starwalker Room',
          flags: [
            'TALKED_TO_STARWALKER_CH1',
            'EGG_ROOM_PROGRESS_CH1',
            'OBTAINED_EGG_CH1',
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
          flags: [
            'JAIL_INTERACTION_COUNT',
            'ATE_MOSS_CH1',
            'OBTAINED_IRON_SHACKLE',
          ],
        },
        {
          id: 'castle-elevator',
          title: 'Castle Elevator',
          flags: ['CARD_CASTLE_ELEVATOR_UNLOCKED'],
        },
        {
          id: 'jevil',
          title: 'Jevil',
          flags: [
            'OBTAINED_BROKEN_KEY_A',
            'JEVIL_PROGRESS',
            'JEVIL_REWARD_CHEST_ITEM',
            'OBTAINED_JEVIL_REWARD',
            'OBTAINED_SHADOW_CRYSTAL_CH1',
          ],
        },
        {
          id: 'castle-floors',
          title: 'Castle Floors',
          flags: [
            'OBTAINED_CLUBS_SANDWICH',
            'INSPECTED_BEDS_CH1',
            'OBTAINED_CASTLE_REVIVE_MINT',
          ],
        },
        {
          id: 'castle-npcs',
          title: 'Castle NPCs',
          flags: [
            'RUDINN_DIALOGUE_OUTCOME',
            'TALKED_TO_HATHY',
            'SUMMONED_BLUH_CHEST',
          ],
        },
        {
          id: 'king',
          title: 'King',
          flags: ['SPARED_KING', 'VIOLENT_ENDING_CH1', 'SPARED_LANCER'],
        },
        {
          id: 'after-king',
          title: 'After King',
          flags: ['SHORTCUT_DOOR_HELP'],
        },
        {
          id: 'bake-sale-return',
          title: 'Bake Sale Return',
          flags: ['TALKED_TO_TOPCHEF_AFTER_RETURNING_TOP_CAKE'],
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
          flags: ['RUDY_DIALOGUE_PROGRESS_CH1', 'USED_RUDY_SINK_CH1'],
        },
        {
          id: 'librarby',
          title: 'Librarby',
          flags: ['TALKED_TO_BERDLY_AT_HOSPITAL_WINDOW'],
        },
        {
          id: 'police-station',
          title: 'Police Station',
          flags: ['TALKED_TO_UNDYNE_CH1'],
        },
        {
          id: 'sans-store',
          title: "Sans's Store",
          flags: [
            'SANS_DIALOGUE_PROGRESS_CH1',
            'SANS_PHONE_PROGRESS',
            'IDIOT_BABY_STATUS',
          ],
        },
        {
          id: 'alphys-alley',
          title: "Alphys's Alley",
          flags: ['TALKED_TO_ALPHYS_CH1'],
        },
        {
          id: 'qc-diner',
          title: "QC's Diner",
          flags: ['QC_DIALOGUE_PROGRESS_CH1'],
        },
        {
          id: 'ice-e-pizza',
          title: "ICE-E's P'E'ZZA",
          flags: ['BURGERPANTS_DIALOGUE_PROGRESS_CH1'],
        },
        {
          id: 'asgores-shop',
          title: "Asgore's Flower Shop",
          flags: ['BOUQUET_QUEST_PROGRESS_CH1', 'ASGORE_FRIDGE_EGG_STATUS'],
        },
        {
          id: 'catty',
          title: 'Catty',
          flags: ['TALKED_TO_CATTY_CH1'],
        },
        {
          id: 'picnic-table',
          title: 'Picnic Table',
          flags: ['PUT_FINGERS_IN_PICNIC_TABLE'],
        },
        {
          id: 'onionsan',
          title: "Onionsan's Pond",
          flags: ['ONION_STATUS_CH1', 'ONION_PLAYER_NAME', 'ONION_NAME'],
        },
        {
          id: 'noelle',
          title: 'Noelle',
          flags: ['NOELLE_DIALOGUE_PROGRESS_CH1'],
        },
        {
          id: 'home',
          title: 'Home',
          flags: ['HOME_RETURN_COUNT_CH1', 'TORIEL_CALL_COUNT'],
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
          flags: ['TOOK_AZZY_MONEY'],
        },
        {
          id: 'castle-town',
          title: 'Castle Town',
          flags: [
            'HUGGED_DUMMY_CH2',
            'TOY_DELIVER_PROGRESS',
            'MR_SOCIETY_LEFT',
          ],
        },
        {
          id: 'party-dojo-start',
          title: 'First Party Dojo Challenges',
          flags: [
            'TALKED_TO_JIGSAW_JOE_CH2',
            'COMPLETED_GRAZING',
            'COMPLETED_DOJO_CLOVER',
            'COMPLETED_JOE',
          ],
        },
        {
          id: 'seam-and-king',
          title: 'Seam & King',
          flags: ['GAVE_JEVIL_CRYSTAL', 'KING_JAIL_DIALOGUE_PROGRESS'],
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
          flags: ['OBTAINED_FIRST_GLOW_WRIST', 'OBTAINED_NUBERT_TREASURE'],
        },
        {
          id: 'hacker-quest',
          title: "Hacker's Checks Quest",
          flags: [
            'MET_HACKER',
            'OBTAINED_CHESTMARK',
            'OBTAINED_SECOND_GLOW_WRIST',
            'OBTAINED_CHESTMARK_2',
            'SOLVED_GIASFCLFEBREBREBEHR_PUZZLE',
            'RECRUITED_HACKER',
          ],
        },
        {
          id: 'sweet-capn-cakes',
          title: "Sweet Cap'n Cakes",
          flags: ['CD_BAGELS_PURCHASED', 'OBTAINED_TENSION_BIT'],
        },
        {
          id: 'virovirokun-room',
          title: 'Virovirokun Room',
          flags: ['UNLOCKED_MINT_CHEST', 'OBTAINED_THIRD_REVIVE_MINT_CH2'],
        },
        {
          id: 'teacup-ride',
          title: 'Teacup Ride',
          flags: ['LEARNED_TEACUPS', 'OBTAINED_RAGGER_2'],
        },
        {
          id: 'berdly-fights',
          title: "Berdly's Fights",
          flags: [
            'BERDLY_1_ENCOUNTER_OUTCOME',
            'BERDLY_2_ENCOUNTER_OUTCOME',
            'SPARED_BERDLY_ALL_THREE_TIMES',
          ],
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
            'OBTAINED_TRASH_CAN_DARK_CANDY',
            'OBTAINED_TRASH_CAN_20_DOLLARS',
            'OBTAINED_TRASH_CAN_CD_BAGEL',
          ],
        },
        {
          id: 'cyber-city',
          title: 'Cyber City',
          flags: ['OBTAINED_PINK_RIBBON', 'OBTAINED_BOUNCE_BLADE'],
        },
        {
          id: 'traffic',
          title: 'Traffic',
          flags: ['CARS_HIT', 'CAR_PART_COMPLETED'],
        },
        {
          id: 'egg-room',
          title: 'Egg Room',
          flags: ['EGG_ROOM_PROGRESS_CH2', 'OBTAINED_EGG_CH2'],
        },
        {
          id: 'moss',
          title: 'Moss',
          flags: [
            'OBTAINED_MOSS_CH2',
            'ATE_MOSS_WITH_NOELLE',
            'ATE_MOSS_WITH_SUSIE',
          ],
        },
        {
          id: 'cyber-city-trash',
          title: 'Cyber City Trash Cans',
          flags: [
            'OBTAINED_TRASH_CAN_80_DOLLARS',
            'OBTAINED_SECOND_TRASH_CAN_20_DOLLARS',
            'OBTAINED_SECOND_TRASH_CAN_CD_BAGEL',
          ],
        },
        {
          id: 'amusement-park',
          title: 'Amusement Park',
          flags: [
            'PLUSH_RECIPIENT',
            'OBTAINED_CD_BAGEL_CHEST',
            'OBTAINED_SECRET_DARK_CANDY',
            'EASTER_EGG_FORCEFIELD',
            'BALLOON_TEACUP_EASTER_EGG_PROGRESS',
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
          id: 'mansion-halls',
          title: 'Mansion Halls',
          flags: [
            'OBTAINED_CHAIN_MAIL',
            'OBTAINED_ONE_DOLLAR_CHEST',
            'STATUE_SINK_PROGRESS',
            'SWATCHLING_VASE_ROOM_PROGRESS',
            'FOUND_SHORTCUT_OUT',
            'OBTAINED_FOURTH_REVIVE_MINT',
            'OBTAINED_MANSION_GLOWSHARD',
            'OBTAINED_REVIVE_DUST',
          ],
        },
        {
          id: 'spamton',
          title: 'Spamton',
          flags: [
            'SPAMTON_QUEST_PROGRESS',
            'ENTERED_BASEMENT_COUNT',
            'OBTAINED_DEALMAKER',
            'OBTAINED_SPAMTON_REWARD',
            'TALKED_TO_SPAMTON_BEHIND_BASEMENT_DOOR',
            'OBTAINED_SHADOW_CRYSTAL_CH2',
          ],
        },
        {
          id: 'ralsei-photo',
          title: "Ralsei's Photo",
          flags: ['RALSEI_PHOTO_STATE'],
        },
        {
          id: 'rouxls-and-queen',
          title: 'Rouxls & Queen',
          flags: [
            'HOUSES_HIT',
            'ROUXLS_ENCOUNTER_OUTCOME',
            'QUEEN_ENCOUNTER_OUTCOME',
          ],
        },
        {
          id: 'bedroom-statues',
          title: 'Bedrooms & Statues',
          flags: [
            'INSPECTED_KRIS_BED',
            'INSPECTED_SUSIE_BED',
            'INSPECTED_LANCER_BED',
            'INSPECTED_CLOVER_BED',
            'INSPECTED_NOELLE_BED',
            'STOLE_SUSIE_STATUE',
            'STOLE_ICE_E_STATUE',
            'BED_INSPECTOR_CH2',
          ],
        },
        {
          id: 'weird-route',
          title: 'Weird Route',
          flags: ['SNOWGRAVE_ROUTE_PROGRESS', 'SNOWGRAVE_FAIL', 'ICESHOCKS'],
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
          flags: ['SAW_KING_QUEEN_REUNION'],
        },
        {
          id: 'party-dojo-return',
          title: 'Last Party Dojo Challenges',
          flags: ['COMPLETED_TASQUE_MANAGER_SAYS', 'COMPLETED_ALLSTARS'],
        },
        {
          id: 'hospital',
          title: 'Hospital',
          flags: ['SAW_HOSPITAL_SCENE', 'INTERACTED_WITH_SINK_CH2'],
        },
        {
          id: 'police-station',
          title: 'Police Station',
          flags: ['POLICE_SCENE_PROGRESS', 'CHOCOLATE_RECIPIENT'],
        },
        {
          id: 'graveyard-and-bunker',
          title: 'Graveyard & Bunker',
          flags: ['ALVIN_DIALOGUE_PROGRESS', 'SAW_SHELTER_SCENE'],
        },
        {
          id: 'sans-store',
          title: "Sans's Store",
          flags: ['DEPOSITED_EGG_CH2'],
        },
        {
          id: 'mettaton',
          title: 'Mettaton',
          flags: ['TALKED_TO_METTATON_CH2'],
        },
        {
          id: 'onionsan',
          title: "Onionsan's Pond",
          flags: ['TALKED_TO_ONION_CH2', 'ONION_WAS_MISSED'],
        },
        {
          id: 'home',
          title: 'Home',
          flags: ['CALLED_MOM_BUSY'],
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
          flags: [
            'SUSIE_HEAL_PRACTICE_COUNT',
            'COUCH_SKIP_CH3',
            'COUCH_WALKAWAY_CH3',
          ],
        },
        {
          id: 'point-chest',
          title: '10 Point Chest',
          flags: ['POINT_CHEST_STATE'],
        },
        {
          id: 'starwalker',
          title: 'Original Starwalker',
          flags: ['TALKED_TO_STARWALKER_CH3'],
        },
        {
          id: 'tennas-gameshow',
          title: "Tenna's Game Show",
          flags: [
            'GAMESHOW_NAME_1',
            'GAMESHOW_NAME_2',
            'GAMESHOW_NAME_3',
            'GAMESHOW_NAME_JA',
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
          id: 'board-keys',
          title: 'Board Keys',
          flags: ['BOARD_KEY_COUNT'],
        },
        {
          id: 'quizzes',
          title: 'Quizzes',
          flags: ['OVERWORLD_QUIZ_1', 'OVERWORLD_QUIZ_2', 'OVERWORLD_QUIZ_3'],
        },
        {
          id: 'secret-mailroom',
          title: 'Secret Mailroom',
          flags: ['TENNA_MAILROOM_PROGRESS'],
        },
        {
          id: 'party-stats',
          title: 'Party Stats',
          flags: ['PLUCKED_GRASS_COUNT', 'CARRIED_RALSEI_COUNT'],
        },
        {
          id: 'board-1-progress',
          title: 'Board 1 Progress',
          flags: [
            'POINTS_CH3',
            'COOKING_BEST_SCORE',
            'COOKING_BEST_RANK',
            'RANK_BOARD_1',
            'OBTAINED_RAMB_BOARD_REWARD_1',
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
            'C_RANK_WATERCOOLER_ENCOUNTER_OUTCOME',
            'OBTAINED_COOLER_CRATER',
            'OBTAINED_CURTAIN_SABER10',
          ],
        },
        {
          id: 'susiezilla',
          title: 'Susiezilla',
          flags: [
            'UNLOCKED_SUSIEZILLA',
            'SUSIEZILLA_HIGH_SCORE',
            'SUSIEZILLA_HIGH_RANK',
          ],
        },
        {
          id: 'ball-machine',
          title: 'Ball Machine',
          flags: [
            'GACHA_LASTBET',
            'OBTAINED_TENNA_TIE',
            'OBTAINED_EXECBUFFET',
            'OBTAINED_TENSIONMAX',
            'OBTAINED_REVIVEMINT',
            'OBTAINED_BLUE_RIBBON',
            'OBTAINED_TENNA_STATUE',
            'OBTAINED_DOG_DOLLAR',
          ],
        },
        {
          id: 'sword-route-part-1',
          title: 'Sword Route Part 1',
          flags: [
            'SWORD_ROUTE_PROGRESS',
            'SWORD_ROUTE_KILLS',
            'SUSIE_NOTICE_SWORD',
            'BIBLIOX_QUEST_PROGRESS_CH3',
            'OBTAINED_REVIVE_MINT_CH3',
          ],
        },
      ],
    },
    {
      id: 'board-2-to-green-room',
      title: 'Board 2 to Green Room',
      clusters: [
        {
          id: 'photo-hunt',
          title: 'Photo Hunt',
          flags: [
            'OBTAINED_ANTLION_PHOTO',
            'OBTAINED_HERO_PHOTO',
            'OBTAINED_CACTUS_PHOTO',
            'OBTAINED_SPRING_PHOTO',
            'OBTAINED_HALF_FLOWER',
          ],
        },
        {
          id: 'moss',
          title: 'Moss',
          flags: ['OBTAINED_MOSS_CH3'],
        },
        {
          id: 'river-and-islands',
          title: 'River & Secret Islands',
          flags: [
            'FOUND_ISLAND_TENNA',
            'LAWNMOWER_BEAT_PAPER',
            'LAWNMOWER_SCORE',
          ],
        },
        {
          id: 'board-2-progress',
          title: 'Board 2 Progress',
          flags: ['RANK_BOARD_2', 'RAISE_BAT_HISCORE', 'RAISE_BAT_HIRANK'],
        },
      ],
    },
    {
      id: 'green-room-to-tv-world',
      title: 'Green Room to TV World',
      clusters: [
        {
          id: 'board-2-reward',
          title: 'Board 2 Reward',
          flags: ['OBTAINED_RAMB_BOARD_REWARD_2'],
        },
        {
          id: 'gacha-room',
          title: 'Gacha Room',
          flags: ['OBTAINED_1225_ROOM'],
        },
        {
          id: 'sword-route-part-2',
          title: 'Sword Route Part 2',
          flags: ['ENTERED_COLDPLACE'],
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
            'LANCER_CONTROL_NUM',
            'SECOND_WATERCOOLER_ENCOUNTER_OUTCOME',
            'SECOND_RIBBICK_ENCOUNTER_OUTCOME',
            'JAILED_CHEATER',
          ],
        },
        {
          id: 'sams-zone',
          title: "Sam's Zone",
          flags: ['OPENED_SAMS_ZONE'],
        },
        {
          id: 'bonus-zone',
          title: 'Bonus Zone',
          flags: [
            'OPENED_BONUS_ZONE',
            'TENNA_BONUS_ZONE',
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
            'OPENED_TRASH_CAN_1_CH3',
            'OPENED_TRASH_CAN_2_CH3',
            'OPENED_TRASH_CAN_3_CH3',
            'OPENED_TRASH_CAN_4_CH3',
            'OPENED_TRASH_CAN_5_CH3',
            'OPENED_TRASH_CAN_6_CH3',
            'OPENED_TRASH_CAN_7_CH3',
            'OPENED_TRASH_CAN_8_CH3',
            'OBTAINED_COOL_TRASHY_REWARD',
          ],
        },
        {
          id: 'egg-room',
          title: 'Egg & One Point',
          flags: [
            'OBTAINED_EGG_CH3',
            'OBTAINED_ONE_POINT',
            'PRE_EGG_BLOCK_STATE',
          ],
        },
        {
          id: 'sneak-mission',
          title: 'Sneak Mission',
          flags: [
            'OVERWORLD_QUIZ_4',
            'OVERWORLD_QUIZ_5',
            'OVERWORLD_QUIZ_6',
            'OBTAINED_300_POINTS',
            'LAST_SNEAK_TIMES_FOUND_COUNT',
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
            'OBTAINED_SHADOWMANTLE',
            'DEFEATED_MANTLE',
          ],
        },
        {
          id: 'rouxls-and-tenna',
          title: 'Rouxls & Tenna',
          flags: [
            'ROUXLS_WEATHER_ENCOUNTER_OUTCOME',
            'TENNA_ENCOUNTER_OUTCOME',
          ],
        },
        {
          id: 'roaring-knight',
          title: 'The Roaring Knight',
          flags: [
            'KNIGHT_BATTLE_OUTCOME_CH3',
            'ALMOST_BEAT_KNIGHT',
            'KNIGHT_DEATHS_COUNT',
            'OBTAINED_SHADOW_CRYSTAL_CH3',
          ],
        },
        {
          id: 'violence-stats',
          title: 'Violence Stats',
          flags: ['AT_MAGIC_GAIN_COUNT_CH3', 'LEVEL_UP_COUNT_CH3'],
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
          id: 'kris-room',
          title: "Kris's Room",
          flags: [
            'SHOWED_FAMILY_PHOTO_TO_SUSIE',
            'SHOWED_ASRIEL_PHOTO_TO_SUSIE',
            'OPENED_DRAGON_BOOK_DRAWER_FOR_SUSIE',
            'CLEANED_KRIS_ROOM_STAIN',
            'TOOK_ASRIEL_DRAWER_MONEY_CH4',
            'INTERACTED_WITH_CHAIRIEL_SUSIE',
          ],
        },
        {
          id: 'school',
          title: 'School',
          flags: ['TEMMIE_SONG_LINE'],
        },
        {
          id: 'susies-healing',
          title: "Susie's Healing",
          flags: ['SUSIE_HEAL_PRACTICE_COUNT'],
        },
        {
          id: 'church-service',
          title: 'Church Service',
          flags: [
            'TALKED_TO_RUDY_ABOUT_ASGORE',
            'ASKED_ALVIN_ABOUT_SHELTER',
            'PRAISED_ALVINS_SERMON',
            'ASKED_ALVIN_ABOUT_ASGORE',
            'MONSTER_KID_CHURCH_RESPONSE',
            'MADE_ALPHYS_JUICE',
            'ALPHYS_JUICE_OUTCOME',
            'ALPHYS_SHELTER_REASON',
            'ALPHYS_UNDYNE_CHURCH_RESPONSE',
            'FIRST_ADDED_JUICE',
          ],
        },
        {
          id: 'church-clues',
          title: 'Church Clues',
          flags: [
            'CHURCH_CLUES_GATHERED',
            'OBTAINED_NOELLE_CLUE',
            'OBTAINED_ALPHYS_CLUE',
            'INTERACTED_WITH_CHURCH_CUPBOARD',
            'INTERACTED_WITH_CHURCH_BOOKS',
            'INTERACTED_WITH_CHURCH_CANDLES',
            'INTERACTED_WITH_CHURCH_BOOKSHELF',
            'WHO_KRIS_PRAYED_FOR',
            'WHAT_CANDLES_ARE_FOR',
            'OPENED_CHURCH_CLOSET',
          ],
        },
        {
          id: 'hospital',
          title: 'Hospital',
          flags: [
            'INTRODUCED_SUSIE_TO_RUDY_AFTER_CHURCH',
            'BROUGHT_SUSIE_TO_RUDY_AFTER_CHURCH',
            'USED_RUDY_SINK_CH4',
            'INTERACTED_WITH_RUDY_FLOWERS_CH4',
            'VISITED_BERDLY_IN_HOSPITAL_CH4',
            'SAW_SUSIE_POST_BERDLY_VISIT_SCENE',
          ],
        },
        {
          id: 'castle-town',
          title: 'Castle Town',
          flags: [
            'COMPLETED_CASTLE_TOWN_RETURN_SCENE_CH4',
            'SAW_EMPTY_RALSEI_ROOM',
            'HEARD_RALSEI_PLUSH_DIALOGUE',
            'SAW_LANCER_ROOM_RENOVATION_SCENE',
            'TALKED_TO_KING_ABOUT_KNIGHT',
            'SAW_TENNA_ENTERTAIN_KING_SCENE',
            'SAW_QUEEN_DRINKING_SCENE',
            'SUSIE_CARRIED_LANCER',
          ],
        },
        {
          id: 'tea-party',
          title: 'Tea Time',
          flags: ['RALSEI_HAS_A_SURPRISE', 'WOULD_YOU_LIKE_SUGAR'],
        },
        {
          id: 'party-dojo',
          title: 'Party Dojo',
          flags: [
            'WEATHER_DUO_DOJO_OUTCOME',
            'TALKED_TO_JIGSAW_JOE_IN_LOVE_DOJO',
          ],
        },
        {
          id: 'concert',
          title: 'Concert T-Ranks',
          flags: [
            'RAISE_BAT_HISCORE',
            'RAISE_BAT_HARD_HISCORE',
            'RAISE_BAT_HARD_HIRANK',
          ],
        },
        {
          id: 'mike-zone',
          title: 'Mike Room',
          flags: [
            'UNLOCKED_MIKE_ZONE_DOOR',
            'ENTERED_MIKE_ZONE_ACCOMPANIED',
            'PET_FIRST_MIKE_STATUE',
            'MIKE_STATUES_STATE',
            'SAVED_TERRIFIED_MAUS',
            'PET_CHEST_MIKE_STATUE',
            'STARTED_MIKE_BATTLE',
            'SAW_FAKE_MIKES_POST_BATTLE_SCENE',
            'OPENED_MIKE_DOOR',
            'OBTAINED_TV_ZONE_3_CHEST',
            'INTERACTED_WITH_MICROPHONE_CRYSTAL',
          ],
        },
        {
          id: 'mike-minigames',
          title: 'Mike Minigames',
          flags: [
            'UNLOCKED_MIKE_MINIGAMES',
            'BATTAT_HIGH_SCORE',
            'PLUEY_HIGH_SCORE',
            'JONGLER_HIGH_SCORE',
          ],
        },
        {
          id: 'bakery-and-cafe',
          title: 'Bakery & Cafe',
          flags: [
            'TALKED_TO_MALIUS_ABOUT_NEW_FUSIONS',
            'TALKED_TO_MALIUS_CH4',
            'TALKED_TO_TOPCHEF_CH4',
            'TALKED_TO_SWATCH_IN_CAFE',
            'CASTLE_TOWN_ADDISON_LINEUP',
          ],
        },
        {
          id: 'diner',
          title: 'Diner',
          flags: [
            'COMPLETED_DINER_SCENE_WITH_SUSIE',
            'DREW_SUSIE_AT_DINER',
            'DINER_PAYMENT_REFUSED',
            'SAW_EGG_MAN_IN_DINER',
          ],
        },
        {
          id: 'ice-e-pizza',
          title: "ICE-E's P'E'ZZA",
          flags: ['ASKED_BURGERPANTS_TO_CONTINUE', 'BURGERPANTS_DATE_PROGRESS'],
        },
        {
          id: 'sans-store',
          title: "Sans's Store",
          flags: ['TALKED_TO_SANS_AT_GRILL', 'SANS_SIGN_PROGRESS'],
        },
        {
          id: 'police-station',
          title: 'Police Station',
          flags: [
            'TALKED_TO_NAPSTABLOOK_ABOUT_UNDYNE',
            'TALKED_TO_NAPSTABLOOK_ABOUT_SHELTER',
          ],
        },
        {
          id: 'catty-and-bratty',
          title: 'Catty & Bratty',
          flags: ['TALKED_TO_CATTY_IN_ALLEY', 'TALKED_TO_BRATTY_ABOUT_CATTY'],
        },
        {
          id: 'alphys',
          title: 'Alphys',
          flags: ['TALKED_TO_ALPHYS_CH4', 'ASKED_ALPHYS_TO_EXPLAIN_CH4'],
        },
        {
          id: 'catti',
          title: 'Catti',
          flags: ['TALKED_TO_CATTI_ABOUT_SUSIE_IN_HOMETOWN'],
        },
        {
          id: 'tenna-adoption',
          title: 'A Beautiful TV Adoption',
          flags: [
            'BROUGHT_TENNA_TO_SCHOOL',
            'TENNA_METTATON_GIFT_PROGRESS',
            'INTERACTED_WITH_TV_BROKEN',
            'SUGGESTED_TENNA_TO_METTATON',
            'INTERACTED_WITH_TV_FIXED',
          ],
        },
        {
          id: 'noelles-house',
          title: "Noelle's House",
          flags: [
            'HOLIDAY_GATE_STATE',
            'KEPT_NOELLE_WAITING',
            'CHECKED_NOELLE_BROWSING_HISTORY',
            'FOUND_CAT_PETTERZ_4',
            'TOOK_NOELLE_DESK_PENCIL',
            'USED_TREAT_CATCHER_WITH_SUSIE_AND_NOELLE',
            'MADE_NOISE_IN_NOELLE_HOUSE_COUNT',
            'SEARCHED_DESS_BELONGINGS',
            'GLASS_NOELLE_WHISPERING',
          ],
        },
        {
          id: 'noelles-kitchen',
          title: "Noelle's Kitchen",
          flags: [
            'BERDLY_PHONE_CALL_PROGRESS',
            'NOELLE_KITCHEN_PHONE_LINE',
            'NOELLE_KITCHEN_SOUL_CAPTURE_PROGRESS',
            'NOELLE_KITCHEN_PIANO_APPROACH_PROGRESS',
            'NOELLE_KITCHEN_PIANO_SONG',
            'ENTERED_NOELLE_KITCHEN_COUNT',
          ],
        },
        {
          id: 'noelles-bedroom',
          title: "Noelle's Bedroom",
          flags: [
            'PRESENTS_CHECKED',
            'NOELLE_BATHROOM_ASGORE_LINE',
            'NOELLE_BEDROOM_ASGORE_CURRENT_LINE',
            'TALKED_TO_NOELLE_AFTER_PHONE_THROW',
            'TALKED_TO_SUSIE_AFTER_PHONE_THROW',
          ],
        },
        {
          id: 'asgore-after-noelles',
          title: "Asgore After Noelle's",
          flags: ['ASKED_ASGORE_ABOUT_OUTFIT', 'ASKED_ASGORE_IF_OKAY'],
        },
        {
          id: 'weird-route',
          title: 'Weird Route',
          flags: [
            'NOELLE_SLAPPED_KRIS_WEIRD_ROUTE',
            'HOMETOWN_WEIRD_CUTSCENE_PROGRESS',
            'KRIS_NOELLE_ESCAPE_WEIRD_ABORT',
          ],
        },
        {
          id: 'seam',
          title: 'Seam',
          flags: [
            'GAVE_KNIGHT_SHADOW_CRYSTAL_TO_SEAM',
            'TALKED_TO_SEAM_ABOUT_ADDISONS',
          ],
        },
      ],
    },
    {
      id: 'dark-sanctuary-1-to-2',
      title: 'Dark Sanctuary Part 1 to Dark Sanctuary Part 2',
      clusters: [
        {
          id: 'sanctuary-intro',
          title: 'First Sanctuary Intro',
          flags: [
            'CHAIR_SKIP_CH4',
            'TRIGGERED_FIRST_SANCTUARY_INTRO_TEMP_SAVE',
            'CHECKED_FIRST_SANCTUARY_PROPHECY_SAVE_POINT',
            'SPLATTED_NEXT_TO_RALSEI',
            'RALSEI_SMILE_RESPONSE',
            'TRIGGERED_GERSON_SILHOUETTE',
            'CHECKED_LOCKED_CHURCH_DOOR',
            'USED_PARTY_ACTION_ON_GUEI',
            'INTERACTED_WITH_USELESS_GLOVES',
          ],
        },
        {
          id: 'intro-piano',
          title: 'Intro Piano',
          flags: [
            'SOLVED_INTRO_PIANO_PUZZLE',
            'INTRO_PIANO_LEFT_HINT_REVEALED',
            'INTRO_PIANO_RIGHT_HINT_REVEALED',
          ],
        },
        {
          id: 'dark-maze-chests',
          title: 'Dark Maze Chests & Hints',
          flags: [
            'OPENED_DARK_MAZE_CHEST',
            'DARK_MAZE_BOTTOM_HINT_REVEALED',
            'DARK_MAZE_TOP_HINT_REVEALED',
          ],
        },
        {
          id: 'gerson-study',
          title: "Gerson's Study",
          flags: [
            'TALKED_TO_GERSON_IN_STUDY',
            'ASKED_GERSON_ABOUT_HIS_WORK_BEFORE_JACKENSTEIN',
            'ASKED_GERSON_ABOUT_KNIGHT_BEFORE_JACKENSTEIN',
            'SUSIE_COPIED_WALL_NOTES',
            'STUDY_SHEET_MUSIC_PROGRESS',
            'CHECKED_GERSON_TABLE_FIRST_SANCTUARY',
            'CHECKED_GERSON_STUDY_SAVE_POINT',
          ],
        },
        {
          id: 'dark-maze',
          title: 'Dark Maze',
          flags: ['CANDY_BOWL_PROGRESS', 'DARKER_CANDY_BOWL_STATE'],
        },
        {
          id: 'worship-room',
          title: 'Worship Room',
          flags: ['RIPPLE_WORSHIP_PROGRESS', 'OBTAINED_WORSHIP_CHEST'],
        },
        {
          id: 'donation-fountain',
          title: 'Donation Fountain',
          flags: [
            'MONEY_FOUNTAIN_DONATION',
            'MONEYFOUNTAIN_DONATION_OVER_100',
            'INTERACTED_WITH_ITEM_FOUNTAIN',
          ],
        },
        {
          id: 'bookshelf-puzzle',
          title: 'Bookshelf Puzzle',
          flags: [
            'BOOKSHELF_PUZZLE_SHELF_1_X',
            'BOOKSHELF_PUZZLE_SHELF_1_Y',
            'BOOKSHELF_PUZZLE_SHELF_2_X',
            'BOOKSHELF_PUZZLE_SHELF_2_Y',
            'BOOKSHELF_PUZZLE_SHELF_3_X',
            'BOOKSHELF_PUZZLE_SHELF_3_Y',
            'STOLE_LADDER_FOR_RALSEI',
            'OPENED_BOOKSHELF_PUZZLE_CHEST',
          ],
        },
        {
          id: 'piano-puzzle',
          title: 'Piano Puzzle',
          flags: [
            'PIANO_PUZZLE_LEFT_HINT_STATE',
            'PIANO_PUZZLE_RIGHT_HINT_STATE',
            'SOLVED_PIANO_PUZZLE',
            'PIANO_PUZZLE_WITHOUT_HINT_ATTEMPTS',
            'OPENED_LEFT_PIANO_PIECE_CHEST',
            'TALKED_TO_FIRE_EXTINGUISHER',
            'INTERACTED_WITH_PIANO_PUZZLE_SAVE_POINT',
          ],
        },
        {
          id: 'jackenstein',
          title: 'Jackenstein',
          flags: [
            'JACKENSTEIN_CUTSCENE_PROGRESS',
            'TALKED_TO_JACKENSTEIN_IN_STUDY',
            'CAN_CLIMB',
          ],
        },
        {
          id: 'gerson-chase',
          title: 'Gerson Chase',
          flags: ['GERSON_CUTSCENE_PROGRESS', 'OPENED_GERSON_CHASE_CHEST'],
        },
        {
          id: 'couch-cushion',
          title: 'Couch Cushion',
          flags: ['TOLD_RALSEI_TO_SIT'],
        },
      ],
    },
    {
      id: 'dark-sanctuary-2-to-second-sanctuary',
      title: 'Dark Sanctuary Part 2 to Second Sanctuary',
      clusters: [
        {
          id: 'climbing-room',
          title: 'Climbing Room',
          flags: [
            'ACTIVATED_TRUE_CLIMB_LEFT_SHORTCUT',
            'ACTIVATED_TRUE_CLIMB_RIGHT_SHORTCUT',
            'OBTAINED_JACKENSTEIN_CHEST',
          ],
        },
        {
          id: 'golden-tune',
          title: 'Golden Tune & Miss Mizzle',
          flags: [
            'AWAKENED_MIZZLE_PROGRESS',
            'ALERTED_MIZZLES',
            'HOLY_WATERCOOLER_ENCOUNTER_OUTCOME',
            'SECOND_MIZZLE_ENCOUNTER_OUTCOME',
            'SOLVED_GOLDEN_PIANO',
          ],
        },
        {
          id: 'gerson-battle',
          title: 'Hammer of Justice',
          flags: [
            'STARTED_GERSON_BATTLE',
            'HAMMER_OF_JUSTICE_ATTEMPT_COUNT',
            'DEFEATED_HAMMER_OF_JUSTICE',
            'JUSTICE_AXE_REWARD_STATE',
            'OBTAINED_SHADOW_CRYSTAL_CH4',
            'SUSIE_LEARNED_BETTER_HEAL',
            'TALKED_TO_GERSON_AFTER_BATTLE',
          ],
        },
        {
          id: 'sound-of-justice',
          title: 'Sound of Justice',
          flags: [
            'SOUND_OF_JUSTICE_ATTEMPT_COUNT',
            'SOUND_OF_JUSTICE_SUSIE_ENCOUNTER_OUTCOME',
            'SOUND_OF_JUSTICE_KRIS_ENCOUNTER_OUTCOME',
          ],
        },
        {
          id: 'second-sanctuary-entry',
          title: 'Second Sanctuary Entrance',
          flags: [
            'OBTAINED_RIGHTCONNECT_CHEST',
            'FIRST_MIZZLE_ENCOUNTER_OUTCOME',
            'OPENED_TRUE_CLIMB_CHEST',
            'OBTAINED_SIDE_CLIMB_POWER_BAND',
            'CLIMBING_CHALLENGE_FIRST_TIME',
            'CLIMBING_CHALLENGE_SECOND_TIME',
          ],
        },
        {
          id: 'susie-backstory',
          title: "Susie's Backstory",
          flags: ['LISTENED_SUSIE_PIANO_STORY'],
        },
      ],
    },
    {
      id: 'second-sanctuary-to-third-sanctuary',
      title: 'Second Sanctuary to Third Sanctuary',
      clusters: [
        {
          id: 'library',
          title: 'Library',
          flags: [
            'MOVED_MOVABLE_PIANO',
            'OBTAINED_LIBRARY_CHEST',
            'OBTAINED_LIBRARYCONNECTOR_CHEST',
          ],
        },
        {
          id: 'money-fountain',
          title: 'Fountain Chest',
          flags: ['OBTAINED_MONEYFOUNTAIN_CHEST', 'STEEL_ENCOUNTER_OUTCOME'],
        },
        {
          id: 'egg-and-moss',
          title: 'Egg & Moss',
          flags: ['WINDOWS_LOOPED', 'OBTAINED_EGG_CH4', 'MOSS_OUTCOME_CH4'],
        },
        {
          id: 'gallery',
          title: 'Gallery',
          flags: ['OBTAINED_GALLERY_CHEST'],
        },
        {
          id: 'right-piano-room',
          title: 'Right Piano Room',
          flags: [
            'RIGHT_PIANO_PIECE_SHELF_1_X',
            'RIGHT_PIANO_PIECE_SHELF_1_Y',
            'RIGHT_PIANO_PIECE_SHELF_2_X',
            'RIGHT_PIANO_PIECE_SHELF_2_Y',
            'STOLE_PILLOW_FOR_RALSEI',
            'OPENED_RIGHT_PIANO_PIECE_CHEST',
          ],
        },
        {
          id: 'prophecy-maze',
          title: 'Prophecy Maze',
          flags: ['OBTAINED_PROPHECYMAZE_CHEST'],
        },
        {
          id: 'second-sanctuary-exit',
          title: 'Second Sanctuary Exit',
          flags: ['PRESSED_KNIGHTCLIMBPOST_SWITCH'],
        },
      ],
    },
    {
      id: 'third-sanctuary-to-ending',
      title: 'Third Sanctuary to Ending',
      clusters: [
        {
          id: 'dog-race',
          title: 'Annoying Dog Race',
          flags: ['FINISHED_ANNOYING_DOG_RACE', 'OBTAINED_DOGCLIMB_CHEST'],
        },
        {
          id: 'princess-ribbon',
          title: 'Princess Ribbon',
          flags: ['OBTAINED_PROPHECIES_CHEST'],
        },
        {
          id: 'third-sanctuary-entry',
          title: 'Third Sanctuary Entrance',
          flags: ['STARTED_THIRD_SANCTUARY_MUSIC'],
        },
        {
          id: 'hidden-prophecies',
          title: 'Hidden Prophecies',
          flags: [
            'THIRD_SANCTUARY_MISSED_SOMETHING_RESPONSE',
            'OBTAINED_MINORLEGEND_CHEST',
          ],
        },
        {
          id: 'angel-prophecy',
          title: 'Angel Prophecy',
          flags: ['SAW_ANGEL_PROPHECY'],
        },
        {
          id: 'waferguard',
          title: 'Waferguard',
          flags: ['WAFER_ROOM_STATE', 'OBTAINED_TREASURE_CHEST'],
        },
        {
          id: 'titan',
          title: 'Titan',
          flags: [
            'TITAN_ATTEMPT_COUNT',
            'TITAN_SPAWN_ENCOUNTER_OUTCOME',
            'PURIFIED_COUNT',
            'SLAIN_COUNT',
          ],
        },
        {
          id: 'backtrack',
          title: 'Backtrack',
          flags: ['SPOOKY_HAND_PUSHED_BACK'],
        },
        {
          id: 'shadow-crystal',
          title: 'Shadow Crystal',
          flags: [
            'SHADOW_SANCTUARY',
            'SHADOW_FINAL_PROPHECY',
            'SHADOW_FAILED_CH4',
          ],
        },
        {
          id: 'return-to-castle-town',
          title: 'Return to Castle Town',
          flags: [
            'MIKE_PORTAL_UNLOCKED',
            'MIKE_PORTAL_CUTSCENE',
            'MIKE_PORTAL_RETURN_CHOICE',
            'MIKE_PORTAL_TRIP_COUNT',
          ],
        },
        {
          id: 'hometown-ending',
          title: 'Hometown Ending',
          flags: [
            'CHECKED_GERSON_GRAVE_WITH_SUSIE',
            'CHECKED_SHELTER_WITH_SUSIE',
            'CHECKED_SHELTER_PANEL',
            'TRIED_TO_ENTER_SCHOOL_END_CH4',
            'KNOCKED_EAST_DOOR_END_CH4',
            'CHECKED_LAKE_TABLE_BEFORE_RAIN',
            'CHECKED_LAKE_TABLE_AFTER_RAIN',
            'LAKE_SITTING_SCENE_PROGRESS',
            'LAKE_CUTSCENE_PROGRESS_CH4',
            'RALSEI_BLOODY_FACE',
          ],
        },
      ],
    },
  ],
} as const satisfies Record<1 | 2 | 3 | 4, StorySectionDef[]>;

export type StoryChapterNumber = keyof typeof STORY_SECTIONS;

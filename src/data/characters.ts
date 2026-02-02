import type { BaseProperties, WithOverrides } from '@types';
import { type ChapterIndex } from './chapters';
import { WEAPONS, type WeaponIndex } from './weapons';
import { ROOMS, type RoomIndex } from './rooms';
import { ARMORS, type ArmorIndex } from './armors';
import { SPELLS, type SpellIndex } from './spells';

export const CHARACTERS = {
  EMPTY: 0,
  KRIS: 1,
  SUSIE: 2,
  RALSEI: 3,
  NOELLE: 4,
} as const;

export type CharacterIndex = (typeof CHARACTERS)[keyof typeof CHARACTERS];
export type CharacterName = keyof typeof CHARACTERS;

interface CharacterTitle {
  name: string;
  description: string;
}

export const CHARACTER_TITLES: Record<
  CharacterName,
  Record<string, CharacterTitle>
> = {
  EMPTY: {
    EMPTY: {
      name: 'Empty',
      description: 'This is empty slot',
    },
  },
  KRIS: {
    HERO: {
      name: 'Hero',
      description: 'Body contains a human SOUL',
    },
    LEADER: {
      name: 'Leader',
      description: 'Commands the party with various ACTs',
    },
    BED_INSPECTOR: {
      name: 'Bed Inspector',
      description: 'Commands the party with various ACTs',
    },
    TACTICIAN: {
      name: 'Tactician',
      description: 'Commands the party by ACTs. Sometimes',
    },
    MOSS_FINDER: {
      name: 'Moss Finder',
      description: 'Basic moss-finding abilities',
    },
    LEADER_WEIRDROUTE: {
      name: 'Leader',
      description: 'Commands',
    },
    DIRECTOR: {
      name: 'Director',
      description: 'Moves the actors around',
    },
    MOSS_MYSTERY: {
      name: 'Moss Mystery',
      description: 'Intermediate moss skills',
    },
    BLAZER: {
      name: 'Blazer',
      description: 'Specializes in sword attacks',
    },
    ICE_BLAZER: {
      name: 'Ice Blazer',
      description: 'Specializes in sword attacks',
    },
    SHEATH: {
      name: 'Sheath',
      description: 'Breath quickens around swords',
    },
    ENJOYING: {
      name: 'Enjoying',
      description: 'The Youthful Days',
    },
    DARK_HERO: {
      name: 'Dark Hero',
      description: 'Carries out fate with the blade',
    },
    MOSS_MOST: {
      name: 'Moss Most',
      description: 'Munched the most moist mosses',
    },
    DARK_BEAD: {
      name: 'Dark Bead',
      description: 'Broken off, but still locked',
    },
  },
  SUSIE: {
    MEAN_GIRL: {
      name: 'Mean Girl',
      description: "Won't do anything but fight",
    },
    DARK_KNIGHT: {
      name: 'Dark Knight',
      description: 'Does damage using dark energy',
    },
    HEALING_MASTER: {
      name: 'Healing Master',
      description: 'Can use ultimate healing (Losers!)',
    },
    MOSS_ENJOYER: {
      name: 'Moss Enjoyer',
      description: 'Supports those that find moss',
    },
    DARK_ACTOR: {
      name: 'Dark Actor',
      description: 'Participates in occult ACTs',
    },
    DARK_HERO: {
      name: 'Dark Hero',
      description: 'Carries out fate with the blade',
    },
    AXE_OF_JUSTICE: {
      name: 'Axe of Justice',
      description: 'Faces fate with the blade',
    },
  },
  RALSEI: {
    LONELY_PRINCE: {
      name: 'Lonely Prince',
      description: 'Dark-World being. Has no subjects',
    },
    FLUFFY_PRINCE: {
      name: 'Fluffy Prince',
      description: 'Weak, but has nice healing powers',
    },
    PRICKLY_PRINCE: {
      name: 'Prickly Prince',
      description: 'Deals damage with his rugged scarf',
    },
    DARK_PRINCE: {
      name: 'Dark Prince',
      description: 'Dark-World being. Has friends now',
    },
    HUG_PRINCE: {
      name: 'Hug Prince',
      description: 'Receives and gives many hugs',
    },
    POSE_PRINCE: {
      name: 'Pose Prince',
      description: 'Poses for photos at times',
    },
    RUDE_PRINCE: {
      name: 'Rude Prince',
      description: 'Friends with a rude gesturer',
    },
    BLANK_PRINCE: {
      name: 'Blank Prince',
      description: "Doesn't even have a photo",
    },
    DARK_ACTOR: {
      name: 'Dark Actor',
      description: 'Has issues with method acting',
    },
    HORSE: {
      name: 'Horse',
      description: 'Is a horse',
    },
    EX_HORSE: {
      name: 'Ex-Horse',
      description: 'Was a horse at some point',
    },
    DARK_HERO: {
      name: 'Dark Hero',
      description: 'Records and faces the fate',
    },
    STOOL_BOY: {
      name: 'Stool Boy',
      description: 'Boy with stool like abilities',
    },
  },
  NOELLE: {
    SNOWCASTER: {
      name: 'Snowcaster',
      description: 'Might be able to use some cool moves',
    },
    FROSTMANCER: {
      name: 'Frostmancer',
      description: 'Freezes the enemy',
    },
    ICE_TRANCER: {
      name: 'Ice Trancer',
      description: 'Receives pain to become stronger',
    },
    MOSS_NEUTRAL: {
      name: 'Moss Neutral',
      description: 'Neither chaotic nor lawful to moss',
    },
  },
} as const;

interface CharacterPropertiesOverrides {
  chapter: ChapterIndex;
  plot: number;
  flags: {
    inspectedBedsCh1: boolean;
    inspectedBedKris: boolean;
    inspectedBedSusie: boolean;
    inspectedBedLancer: boolean;
    inspectedBedClover: boolean;
    inspectedBedNoelle: boolean;
    inspectedBedsCh2: boolean;
    weirdRouteProgressCh2: number;
    weirdRouteFailed: boolean;
    swordProgress: number;
    gotMossCh1: boolean;
    gotMossCh2: boolean;
    gotMossCh3: boolean;
    gotMossCh4: boolean;
    gotMossWithSusie: boolean;
    axeOfJusticeProgress: number;
    ralseiPhotoStatus: number;
    ralseiHorse: boolean;
    gotMossWithNoelle: boolean;
    noelleIceShockCount: number;
  };
  hasEgg: boolean;
  weapon: WeaponIndex;
  room: RoomIndex;
}

interface CharacterProperties
  extends BaseProperties,
    WithOverrides<CharacterProperties, CharacterPropertiesOverrides> {
  allowedSlots: number[];
  title: CharacterTitle;
  lv: number;
  allowedWeapons: Set<WeaponIndex>;
  allowedArmors: Set<ArmorIndex>;
  allowedSpells: Set<SpellIndex>;
}

export const CHARACTERS_META: Record<CharacterIndex, CharacterProperties> = {
  [CHARACTERS.EMPTY]: {
    displayName: 'Empty',
    allowedSlots: [1, 2],
    title: CHARACTER_TITLES.EMPTY.EMPTY,
    lv: 0,
    allowedWeapons: new Set<WeaponIndex>([]),
    allowedArmors: new Set<ArmorIndex>([]),
    allowedSpells: new Set<SpellIndex>([SPELLS.EMPTY]),
  },
  [CHARACTERS.KRIS]: {
    displayName: 'Kris',
    allowedSlots: [0],
    title: CHARACTER_TITLES.KRIS.HERO,
    lv: 1,
    allowedWeapons: new Set<WeaponIndex>([
      WEAPONS.EMPTY,
      WEAPONS.SPOOKYSWORD,
      WEAPONS.WOOD_BLADE,
      WEAPONS.TREFOIL,
      WEAPONS.BOUNCE_BLADE,
      WEAPONS.WINGLADE,
      WEAPONS.SABER10,
      WEAPONS.MECHA_SABER,
      WEAPONS.TWISTED_SWD,
      WEAPONS.BLACK_SHARD,
      WEAPONS.JINGLE_BLADE,
      WEAPONS.EVERYBODY_WEAPON,
    ]),
    allowedArmors: new Set<ArmorIndex>([
      ARMORS.EMPTY,
      ARMORS.AMBER_CARD,
      ARMORS.IRON_SHACKLE,
      ARMORS.DICE_BRACE,
      ARMORS.MOUSE_TOKEN,
      ARMORS.PINK_RIBBON,
      ARMORS.MANNEQUIN,
      ARMORS.ROYAL_PIN,
      ARMORS.WHITE_RIBBON,
      ARMORS.JEVILSTAIL,
      ARMORS.SILVER_WATCH,
      ARMORS.SILVER_CARD,
      ARMORS.CHAIN_MAIL,
      ARMORS.B_SHOT_BOWTIE,
      ARMORS.TENSION_BOW,
      ARMORS.SKY_MANTLE,
      ARMORS.SPIKE_SHACKLE,
      ARMORS.TENNA_TIE,
      ARMORS.TWIN_RIBBON,
      ARMORS.GLOW_WRIST,
      ARMORS.SPIKE_BAND,
      ARMORS.DARK_GOLD_BAND,
      ARMORS.FRAYED_BOWTIE,
      ARMORS.DEALMAKER,
      ARMORS.SHADOW_MANTLE,
      ARMORS.LODE_STONE,
      ARMORS.GINGER_GUARD,
      ARMORS.BLUE_RIBBON,
      ARMORS.WAFERGUARD,
      ARMORS.MYSTIC_BAND,
      ARMORS.POWER_BAND,
      ARMORS.PRINCESS_RBN,
      ARMORS.GOLD_WIDOW,
    ]),
    allowedSpells: new Set<SpellIndex>([SPELLS.EMPTY, SPELLS.ACT]),
    getOverrides: ({ chapter, plot, flags, hasEgg }) => {
      const overrides: Partial<CharacterProperties> = {};

      if (chapter === 1) {
        if (plot > 30) {
          overrides.title = CHARACTER_TITLES.KRIS.LEADER;
        }

        if (flags.inspectedBedsCh1) {
          overrides.title = CHARACTER_TITLES.KRIS.BED_INSPECTOR;
        }

        return overrides;
      }

      if (chapter === 2) {
        overrides.title = CHARACTER_TITLES.KRIS.LEADER;
        overrides.lv = 2;

        if (plot > 200) {
          overrides.lv = 3;
        }

        if (plot > 60) {
          overrides.title = CHARACTER_TITLES.KRIS.TACTICIAN;
        }

        if (
          flags.inspectedBedsCh1 &&
          flags.inspectedBedsCh2 &&
          flags.inspectedBedKris &&
          flags.inspectedBedSusie &&
          flags.inspectedBedLancer &&
          flags.inspectedBedClover &&
          flags.inspectedBedNoelle
        ) {
          overrides.title = CHARACTER_TITLES.KRIS.BED_INSPECTOR;
        }

        if (flags.gotMossCh2) {
          overrides.title = CHARACTER_TITLES.KRIS.MOSS_FINDER;
        }

        if (!flags.weirdRouteFailed && flags.weirdRouteProgressCh2 > 0) {
          overrides.title = CHARACTER_TITLES.KRIS.LEADER_WEIRDROUTE;
        }

        return overrides;
      }

      if (chapter === 3) {
        overrides.title = CHARACTER_TITLES.KRIS.TACTICIAN;
        overrides.lv = 3;

        if (plot >= 250) {
          overrides.title = CHARACTER_TITLES.KRIS.DIRECTOR;
        }

        if (flags.gotMossCh3) {
          overrides.title = CHARACTER_TITLES.KRIS.MOSS_MYSTERY;
        }

        if (flags.swordProgress === 1) {
          overrides.title = CHARACTER_TITLES.KRIS.BLAZER;
        }

        if (flags.swordProgress === 3) {
          overrides.title = CHARACTER_TITLES.KRIS.ICE_BLAZER;
        }

        if (flags.swordProgress === 6) {
          overrides.title = CHARACTER_TITLES.KRIS.SHEATH;
        }

        if (hasEgg) {
          overrides.title = CHARACTER_TITLES.KRIS.ENJOYING;
        }

        return overrides;
      }

      if (chapter === 4) {
        overrides.title = CHARACTER_TITLES.KRIS.DARK_HERO;
        overrides.lv = 4;

        if (
          flags.gotMossCh1 &&
          flags.gotMossCh2 &&
          flags.gotMossCh3 &&
          flags.gotMossCh4
        ) {
          overrides.title = CHARACTER_TITLES.KRIS.MOSS_MOST;
        }

        if (flags.weirdRouteProgressCh2 >= 3) {
          overrides.title = CHARACTER_TITLES.KRIS.DARK_BEAD;
        }

        return overrides;
      }

      return overrides;
    },
  },
  [CHARACTERS.SUSIE]: {
    displayName: 'Susie',
    allowedSlots: [1, 2],
    title: CHARACTER_TITLES.SUSIE.MEAN_GIRL,
    lv: 1,
    allowedWeapons: new Set<WeaponIndex>([
      WEAPONS.DEVILSKNIFE,
      WEAPONS.MANE_AX,
      WEAPONS.BRAVE_AX,
      WEAPONS.ABSORB_AX,
      WEAPONS.TOXIC_AXE,
      WEAPONS.AUTO_AXE,
      WEAPONS.JUSTICE_AXE,
      WEAPONS.EVERYBODY_WEAPON,
    ]),
    allowedArmors: new Set<ArmorIndex>([
      ARMORS.EMPTY,
      ARMORS.AMBER_CARD,
      ARMORS.DICE_BRACE,
      ARMORS.WHITE_RIBBON,
      ARMORS.IRON_SHACKLE,
      ARMORS.MOUSE_TOKEN,
      ARMORS.JEVILSTAIL,
      ARMORS.SILVER_CARD,
      ARMORS.GLOW_WRIST,
      ARMORS.CHAIN_MAIL,
      ARMORS.B_SHOT_BOWTIE,
      ARMORS.SPIKE_BAND,
      ARMORS.SILVER_WATCH,
      ARMORS.TENSION_BOW,
      ARMORS.SKY_MANTLE,
      ARMORS.SPIKE_SHACKLE,
      ARMORS.DEALMAKER,
      ARMORS.ROYAL_PIN,
      ARMORS.SHADOW_MANTLE,
      ARMORS.LODE_STONE,
      ARMORS.GINGER_GUARD,
      ARMORS.TENNA_TIE,
      ARMORS.WAFERGUARD,
      ARMORS.MYSTIC_BAND,
      ARMORS.POWER_BAND,
      ARMORS.GOLD_WIDOW,
    ]),
    allowedSpells: new Set<SpellIndex>([
      SPELLS.EMPTY,
      SPELLS.RUDE_BUSTER,
      SPELLS.RED_BUSTER,
      SPELLS.SUSIE_HEAL,
    ]),
    getOverrides: ({ chapter, plot, flags }) => {
      const overrides: Partial<CharacterProperties> = {};

      if (chapter === 1) {
        if (plot > 154) {
          overrides.title = CHARACTER_TITLES.SUSIE.DARK_KNIGHT;
        }

        return overrides;
      }

      if (chapter === 2) {
        overrides.title = CHARACTER_TITLES.SUSIE.DARK_KNIGHT;
        overrides.lv = 2;

        if (plot > 200) {
          overrides.lv = 3;
        }

        if (plot >= 95) {
          overrides.title = CHARACTER_TITLES.SUSIE.HEALING_MASTER;
        }

        if (flags.gotMossWithSusie) {
          overrides.title = CHARACTER_TITLES.SUSIE.MOSS_ENJOYER;
        }

        return overrides;
      }

      if (chapter === 3) {
        overrides.title = CHARACTER_TITLES.SUSIE.DARK_KNIGHT;
        overrides.lv = 3;

        if (plot >= 250) {
          overrides.title = CHARACTER_TITLES.SUSIE.DARK_ACTOR;
        }

        return overrides;
      }

      if (chapter === 4) {
        overrides.title = CHARACTER_TITLES.SUSIE.DARK_KNIGHT;
        overrides.lv = 4;

        if (flags.axeOfJusticeProgress > 0) {
          overrides.title = CHARACTER_TITLES.SUSIE.AXE_OF_JUSTICE;
        }

        return overrides;
      }

      return overrides;
    },
  },
  [CHARACTERS.RALSEI]: {
    displayName: 'Ralsei',
    allowedSlots: [1, 2],
    title: CHARACTER_TITLES.RALSEI.LONELY_PRINCE,
    lv: 1,
    allowedWeapons: new Set<WeaponIndex>([
      WEAPONS.EMPTY,
      WEAPONS.RAGGER,
      WEAPONS.RED_SCARF,
      WEAPONS.DAINTY_SCARF,
      WEAPONS.PUPPET_SCARF,
      WEAPONS.CHEER_SCARF,
      WEAPONS.FLEX_SCARF,
      WEAPONS.FIBER_SCARF,
      WEAPONS.RAGGER2,
      WEAPONS.SCARF_MARK,
      WEAPONS.EVERYBODY_WEAPON,
    ]),
    allowedArmors: new Set<ArmorIndex>([
      ARMORS.EMPTY,
      ARMORS.AMBER_CARD,
      ARMORS.DICE_BRACE,
      ARMORS.PINK_RIBBON,
      ARMORS.IRON_SHACKLE,
      ARMORS.MOUSE_TOKEN,
      ARMORS.JEVILSTAIL,
      ARMORS.SILVER_CARD,
      ARMORS.TWIN_RIBBON,
      ARMORS.GLOW_WRIST,
      ARMORS.CHAIN_MAIL,
      ARMORS.B_SHOT_BOWTIE,
      ARMORS.SPIKE_BAND,
      ARMORS.SILVER_WATCH,
      ARMORS.TENSION_BOW,
      ARMORS.SKY_MANTLE,
      ARMORS.SPIKE_SHACKLE,
      ARMORS.FRAYED_BOWTIE,
      ARMORS.DEALMAKER,
      ARMORS.ROYAL_PIN,
      ARMORS.SHADOW_MANTLE,
      ARMORS.LODE_STONE,
      ARMORS.GINGER_GUARD,
      ARMORS.BLUE_RIBBON,
      ARMORS.TENNA_TIE,
      ARMORS.WAFERGUARD,
      ARMORS.MYSTIC_BAND,
      ARMORS.POWER_BAND,
      ARMORS.PRINCESS_RBN,
      ARMORS.GOLD_WIDOW,
    ]),
    allowedSpells: new Set<SpellIndex>([
      SPELLS.EMPTY,
      SPELLS.HEAL_PRAYER,
      SPELLS.PACIFY,
      SPELLS.DUAL_HEAL,
    ]),
    getOverrides: ({ chapter, plot, flags, weapon, room }) => {
      const overrides: Partial<CharacterProperties> = {};

      if (chapter === 1) {
        if (weapon === WEAPONS.RAGGER) {
          overrides.title = CHARACTER_TITLES.RALSEI.PRICKLY_PRINCE;
        }

        if (weapon === WEAPONS.DAINTY_SCARF) {
          overrides.title = CHARACTER_TITLES.RALSEI.FLUFFY_PRINCE;
        }

        return overrides;
      }

      if (chapter === 2) {
        overrides.title = CHARACTER_TITLES.RALSEI.DARK_PRINCE;
        overrides.lv = 2;

        if (plot > 200) {
          overrides.lv = 3;
        }

        switch (flags.ralseiPhotoStatus) {
          case 1:
            overrides.title = CHARACTER_TITLES.RALSEI.HUG_PRINCE;
            break;
          case 2:
            overrides.title = CHARACTER_TITLES.RALSEI.POSE_PRINCE;
            break;
          case 3:
            overrides.title = CHARACTER_TITLES.RALSEI.RUDE_PRINCE;
            break;
          case 4:
            overrides.title = CHARACTER_TITLES.RALSEI.BLANK_PRINCE;
            break;
          default:
            break;
        }

        return overrides;
      }

      if (chapter === 3) {
        overrides.title = CHARACTER_TITLES.RALSEI.DARK_PRINCE;
        overrides.title.description = 'Dark-World being. Has Friends, but...';
        overrides.lv = 3;

        if (plot >= 250) {
          overrides.title = CHARACTER_TITLES.RALSEI.DARK_ACTOR;
        }

        if (room === ROOMS.DW_TEEVIE_COWBOY_ZONE_02_AFTER) {
          if (!flags.ralseiHorse) {
            overrides.title = CHARACTER_TITLES.RALSEI.HORSE;
          }
        }

        if (flags.ralseiHorse) {
          overrides.title = CHARACTER_TITLES.RALSEI.EX_HORSE;
        }

        if (plot >= 320) {
          overrides.title = CHARACTER_TITLES.RALSEI.DARK_PRINCE;
          overrides.title.description = 'Dark-World being. Has friends';
        }

        return overrides;
      }

      if (chapter === 4) {
        overrides.title = CHARACTER_TITLES.RALSEI.DARK_HERO;
        overrides.lv = 4;

        if (room === ROOMS.DW_CHURCH_BOOKCASE && plot >= 145) {
          overrides.title = CHARACTER_TITLES.RALSEI.STOOL_BOY;
        }

        return overrides;
      }

      return overrides;
    },
  },
  [CHARACTERS.NOELLE]: {
    displayName: 'Noelle',
    allowedSlots: [1, 2],
    title: CHARACTER_TITLES.NOELLE.SNOWCASTER,
    lv: 1,
    allowedWeapons: new Set<WeaponIndex>([
      WEAPONS.THORN_RING,
      WEAPONS.SNOW_RING,
      WEAPONS.FREEZE_RING,
      WEAPONS.EVERYBODY_WEAPON,
      WEAPONS.BLACK_SHARD,
      WEAPONS.JINGLE_BLADE,
    ]),
    allowedArmors: new Set<ArmorIndex>([
      ARMORS.EMPTY,
      ARMORS.AMBER_CARD,
      ARMORS.DICE_BRACE,
      ARMORS.PINK_RIBBON,
      ARMORS.WHITE_RIBBON,
      ARMORS.IRON_SHACKLE,
      ARMORS.MOUSE_TOKEN,
      ARMORS.JEVILSTAIL,
      ARMORS.SILVER_CARD,
      ARMORS.TWIN_RIBBON,
      ARMORS.GLOW_WRIST,
      ARMORS.CHAIN_MAIL,
      ARMORS.B_SHOT_BOWTIE,
      ARMORS.SPIKE_BAND,
      ARMORS.SILVER_WATCH,
      ARMORS.TENSION_BOW,
      ARMORS.SKY_MANTLE,
      ARMORS.SPIKE_SHACKLE,
      ARMORS.FRAYED_BOWTIE,
      ARMORS.DEALMAKER,
      ARMORS.ROYAL_PIN,
      ARMORS.LODE_STONE,
      ARMORS.GINGER_GUARD,
      ARMORS.BLUE_RIBBON,
      ARMORS.TENNA_TIE,
      ARMORS.WAFERGUARD,
      ARMORS.MYSTIC_BAND,
      ARMORS.POWER_BAND,
      ARMORS.PRINCESS_RBN,
    ]),
    allowedSpells: new Set<SpellIndex>([
      SPELLS.EMPTY,
      SPELLS.HEAL_PRAYER,
      SPELLS.SLEEPMIST,
      SPELLS.ICESHOCK,
      SPELLS.SNOWGRAVE,
    ]),
    getOverrides: ({ plot, flags, weapon }) => {
      const overrides: Partial<CharacterProperties> = {};

      if (flags.noelleIceShockCount > 0) {
        overrides.lv = 2;
        if (plot > 250) {
          overrides.lv = 3;
        }

        overrides.title = CHARACTER_TITLES.NOELLE.FROSTMANCER;
      }

      if (weapon === WEAPONS.THORN_RING) {
        overrides.lv = 2;
        if (plot > 250) {
          overrides.lv = 3;
        }

        overrides.title = CHARACTER_TITLES.NOELLE.ICE_TRANCER;
      }

      if (
        flags.gotMossWithNoelle &&
        (!flags.weirdRouteFailed || flags.weirdRouteProgressCh2 === 0)
      ) {
        overrides.lv = 2;
        if (plot > 250) {
          overrides.lv = 3;
        }

        overrides.title = CHARACTER_TITLES.NOELLE.MOSS_NEUTRAL;
      }

      return overrides;
    },
  },
};

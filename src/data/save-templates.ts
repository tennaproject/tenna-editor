import { ARMORS, type ArmorIndex } from './armors';
import { CHARACTERS, type CharacterIndex } from './characters';
import type { ChapterIndex } from './chapters';
import { FLAGS, type FlagIndex } from './flags';
import { LIGHTWORLDITEMS, type LightWorldItemIndex } from './light-world-items';
import { ROOMS, type RoomIndex } from './rooms';
import {
  CH1_PLOT,
  CH2_PLOT,
  CH3_PLOT,
  CH4_PLOT,
  CH5_PLOT,
} from './plot-points';
import { SPELLS, type SpellIndex } from './spells';
import { WEAPONS, type WeaponIndex } from './weapons';

export interface TemplateLoadout {
  weapon: WeaponIndex;
  primaryArmor: ArmorIndex;
  secondaryArmor: ArmorIndex;
  spells: SpellIndex[];
}

export type TemplateParty = Partial<Record<CharacterIndex, TemplateLoadout>>;

const NOELLE_LOADOUT: TemplateLoadout = {
  weapon: WEAPONS.SNOW_RING,
  primaryArmor: ARMORS.SILVER_WATCH,
  secondaryArmor: ARMORS.ROYAL_PIN,
  spells: [SPELLS.HEAL_PRAYER, SPELLS.SLEEPMIST, SPELLS.ICESHOCK],
};

const CH1_PARTY: TemplateParty = {
  [CHARACTERS.KRIS]: {
    weapon: WEAPONS.WOOD_BLADE,
    primaryArmor: ARMORS.EMPTY,
    secondaryArmor: ARMORS.EMPTY,
    spells: [SPELLS.ACT],
  },
  [CHARACTERS.SUSIE]: {
    weapon: WEAPONS.MANE_AX,
    primaryArmor: ARMORS.EMPTY,
    secondaryArmor: ARMORS.EMPTY,
    spells: [SPELLS.RUDE_BUSTER],
  },
  [CHARACTERS.RALSEI]: {
    weapon: WEAPONS.RED_SCARF,
    primaryArmor: ARMORS.EMPTY,
    secondaryArmor: ARMORS.EMPTY,
    spells: [SPELLS.PACIFY, SPELLS.HEAL_PRAYER],
  },
};

const CH2_PARTY: TemplateParty = {
  [CHARACTERS.KRIS]: {
    weapon: WEAPONS.WOOD_BLADE,
    primaryArmor: ARMORS.AMBER_CARD,
    secondaryArmor: ARMORS.AMBER_CARD,
    spells: [SPELLS.ACT],
  },
  [CHARACTERS.SUSIE]: {
    weapon: WEAPONS.MANE_AX,
    primaryArmor: ARMORS.AMBER_CARD,
    secondaryArmor: ARMORS.AMBER_CARD,
    spells: [SPELLS.RUDE_BUSTER],
  },
  [CHARACTERS.RALSEI]: {
    weapon: WEAPONS.RED_SCARF,
    primaryArmor: ARMORS.AMBER_CARD,
    secondaryArmor: ARMORS.WHITE_RIBBON,
    spells: [SPELLS.PACIFY, SPELLS.HEAL_PRAYER],
  },
  [CHARACTERS.NOELLE]: NOELLE_LOADOUT,
};

const CH3_PARTY: TemplateParty = {
  [CHARACTERS.KRIS]: {
    weapon: WEAPONS.MECHA_SABER,
    primaryArmor: ARMORS.AMBER_CARD,
    secondaryArmor: ARMORS.GLOW_WRIST,
    spells: [SPELLS.ACT],
  },
  [CHARACTERS.SUSIE]: {
    weapon: WEAPONS.AUTO_AXE,
    primaryArmor: ARMORS.AMBER_CARD,
    secondaryArmor: ARMORS.GLOW_WRIST,
    spells: [SPELLS.RUDE_BUSTER, SPELLS.SUSIE_HEAL],
  },
  [CHARACTERS.RALSEI]: {
    weapon: WEAPONS.FIBER_SCARF,
    primaryArmor: ARMORS.AMBER_CARD,
    secondaryArmor: ARMORS.GLOW_WRIST,
    spells: [SPELLS.PACIFY, SPELLS.HEAL_PRAYER],
  },
  [CHARACTERS.NOELLE]: NOELLE_LOADOUT,
};

const CH4_PARTY: TemplateParty = {
  [CHARACTERS.KRIS]: {
    weapon: WEAPONS.SABER10,
    primaryArmor: ARMORS.GINGER_GUARD,
    secondaryArmor: ARMORS.GLOW_WRIST,
    spells: [SPELLS.ACT],
  },
  [CHARACTERS.SUSIE]: {
    weapon: WEAPONS.TOXIC_AXE,
    primaryArmor: ARMORS.GINGER_GUARD,
    secondaryArmor: ARMORS.GLOW_WRIST,
    spells: [SPELLS.RUDE_BUSTER, SPELLS.SUSIE_HEAL],
  },
  [CHARACTERS.RALSEI]: {
    weapon: WEAPONS.FLEX_SCARF,
    primaryArmor: ARMORS.GINGER_GUARD,
    secondaryArmor: ARMORS.GLOW_WRIST,
    spells: [SPELLS.PACIFY, SPELLS.HEAL_PRAYER],
  },
  [CHARACTERS.NOELLE]: NOELLE_LOADOUT,
};

const CH5_PARTY: TemplateParty = {
  [CHARACTERS.KRIS]: {
    weapon: WEAPONS.WINGLADE,
    primaryArmor: ARMORS.GINGER_GUARD,
    secondaryArmor: ARMORS.GINGER_GUARD,
    spells: [SPELLS.ACT],
  },
  [CHARACTERS.SUSIE]: {
    weapon: WEAPONS.TOXIC_AXE,
    primaryArmor: ARMORS.GINGER_GUARD,
    secondaryArmor: ARMORS.GINGER_GUARD,
    spells: [SPELLS.RUDE_BUSTER, SPELLS.SUSIE_HEAL, SPELLS.SCYTHEMARE],
  },
  [CHARACTERS.RALSEI]: {
    weapon: WEAPONS.FLEX_SCARF,
    primaryArmor: ARMORS.GINGER_GUARD,
    secondaryArmor: ARMORS.GINGER_GUARD,
    spells: [SPELLS.PACIFY, SPELLS.HEAL_PRAYER, SPELLS.REVIVE_SONG],
  },
  [CHARACTERS.NOELLE]: NOELLE_LOADOUT,
};

export const TEMPLATE_PARTIES: Record<ChapterIndex, TemplateParty> = {
  1: CH1_PARTY,
  2: CH2_PARTY,
  3: CH3_PARTY,
  4: CH4_PARTY,
  5: CH5_PARTY,
};

export interface TemplateStartPoint {
  room: RoomIndex;
  plot: number;
  inDarkWorld: boolean;
}

export const TEMPLATE_START_POINTS: Record<ChapterIndex, TemplateStartPoint> = {
  1: {
    room: ROOMS.KRISROOM,
    plot: CH1_PLOT.NEW_GAME,
    inDarkWorld: false,
  },
  2: {
    room: ROOMS.KRISROOM_CH2,
    plot: CH2_PLOT.NEW_GAME,
    inDarkWorld: false,
  },
  3: {
    room: ROOMS.DW_COUCH_OVERWORLD_INTRO,
    plot: CH3_PLOT.NEW_GAME,
    inDarkWorld: true,
  },
  4: {
    room: ROOMS.TORHOUSE_CH4,
    plot: CH4_PLOT.WOKE_UP,
    inDarkWorld: false,
  },
  5: {
    room: ROOMS.KRISROOM_CH5,
    plot: CH5_PLOT.NEW_GAME,
    inDarkWorld: false,
  },
};

export const TEMPLATE_LIGHT_WORLD_WEAPON: Record<
  ChapterIndex,
  LightWorldItemIndex
> = {
  1: LIGHTWORLDITEMS.PENCIL,
  2: LIGHTWORLDITEMS.PENCIL,
  3: LIGHTWORLDITEMS.PENCIL,
  4: LIGHTWORLDITEMS.PENCIL,
  5: LIGHTWORLDITEMS.QUILLPEN,
};

export type TemplateFlags = Partial<Record<FlagIndex, number>>;

const CH1_FLAGS: TemplateFlags = {
  [FLAGS.SOUND_VOLUME]: 1,
  [FLAGS.MUSIC_VOLUME]: 0.85,
  [FLAGS.AUDIO_VOLUME]: 0.6,
};

const CH2_FLAGS: TemplateFlags = {
  ...CH1_FLAGS,
  [FLAGS.BATTLE_MUSIC_STATE]: 1,
  [FLAGS.WRIST_PROTECTOR_ENABLED]: 1,
  [FLAGS.LOUD_STEPS_DISABLED]: 1,
  [FLAGS.PARTY_ACTS_DISABLED]: 1,
  [FLAGS.STORAGE_CAPACITY]: 24,
  [FLAGS.RECRUITED_RUDINN]: 1,
  [FLAGS.RECRUITED_HATHY]: 1,
  [FLAGS.RECRUITED_PONMAN]: 1,
  [FLAGS.RECRUITED_RABBICK]: 1,
  [FLAGS.RECRUITED_BLOXER]: 1,
  [FLAGS.RECRUITED_JIGSAW]: 1,
  [FLAGS.RECRUITED_RUDINN_RANGER]: 1,
  [FLAGS.RECRUITED_HEAD_HATHY]: 1,
  [FLAGS.CAFE_TOP_LEFT_RECRUIT]: 15,
  [FLAGS.CAFE_TOP_RIGHT_RECRUIT]: 5,
  [FLAGS.CAFE_BOTTOM_LEFT_RECRUIT]: 6,
  [FLAGS.CAFE_BOTTOM_RIGHT_RECRUIT]: 5,
};

const CH3_FLAGS: TemplateFlags = {
  ...CH2_FLAGS,
  [FLAGS.PARTY_ACTS_DISABLED]: 0,
  [FLAGS.SPARED_BERDLY_ALL_THREE_TIMES]: 1,
  [FLAGS.RECRUITED_TASQUE]: 1,
  [FLAGS.RECRUITED_WEREWIRE]: 1,
  [FLAGS.RECRUITED_SWATCHLING]: 1,
  [FLAGS.RECRUITED_TASQUE_MANAGER]: 1,
};

const CH4_FLAGS: TemplateFlags = {
  ...CH3_FLAGS,
  [FLAGS.STORAGE_CAPACITY]: 36,
  [FLAGS.RECRUITED_SHADOWGUY]: 1,
  [FLAGS.RECRUITED_ZAPPER]: 1,
  [FLAGS.RECRUITED_RIBBICK]: 1,
  [FLAGS.RECRUITED_PIPPINS]: 1,
  [FLAGS.RECRUITED_ELNINA]: 1,
  [FLAGS.RECRUITED_LANINO]: 1,
};

const CH5_FLAGS: TemplateFlags = {
  ...CH4_FLAGS,
  [FLAGS.STORAGE_CAPACITY]: 48,
  [FLAGS.RECRUITED_GUEI]: 1,
  [FLAGS.RECRUITED_BALTHIZARD]: 1,
  [FLAGS.RECRUITED_MIZZLE]: 1,
  [FLAGS.RECRUITED_ORGANIKK]: 1,
  [FLAGS.VOICE_CLIPS_ENABLED]: 2,
};

export const TEMPLATE_FLAGS: Record<ChapterIndex, TemplateFlags> = {
  1: CH1_FLAGS,
  2: CH2_FLAGS,
  3: CH3_FLAGS,
  4: CH4_FLAGS,
  5: CH5_FLAGS,
};

export const TEMPLATE_RANDOM_FLAGS: { flag: FlagIndex; max: number }[] = [
  { flag: FLAGS.THRASH_MACHINE_HEAD, max: 3 },
  { flag: FLAGS.THRASH_MACHINE_BODY, max: 3 },
  { flag: FLAGS.THRASH_MACHINE_SHOE, max: 3 },
  { flag: FLAGS.THRASH_MACHINE_HEAD_COLOR, max: 30 },
  { flag: FLAGS.THRASH_MACHINE_BODY_COLOR, max: 30 },
  { flag: FLAGS.THRASH_MACHINE_SHOE_COLOR, max: 30 },
];

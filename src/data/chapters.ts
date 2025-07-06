import type { BaseProperties } from '../types';
import { ARMORS, type ArmorIndex } from './armors';
import { CHARACTERS, type CharacterIndex } from './characters';
import { CONSUMABLES, type ConsumableIndex } from './consumables';
import { KEYITEMS, type KeyItemIndex } from './keyItems';
import { LIGHTWORLDITEMS, type LightWorldItemIndex } from './lightWorldItems';
import { PHONECONTACTS, type PhoneContactIndex } from './phoneContacts';
import { SPELLS, type SpellIndex } from './spells';
import { WEAPONS, type WeaponIndex } from './weapons';

export const CHAPTERS = {
  CH1: 1,
  CH2: 2,
  CH3: 3,
  CH4: 4,
} as const;

export type ChapterIndex = (typeof CHAPTERS)[keyof typeof CHAPTERS];
export type ChapterName = keyof typeof CHAPTERS;

interface ChapterProperties extends BaseProperties {
  content: ChapterContent;
}

interface ChapterContent {
  characters: Set<CharacterIndex>;
  consumables: Set<ConsumableIndex>;
  keyItems: Set<KeyItemIndex>;
  spells: Set<SpellIndex>;
  weapons: Set<WeaponIndex>;
  armors: Set<ArmorIndex>;
  lightWorld: {
    items: Set<LightWorldItemIndex>;
    phoneContacts: Set<PhoneContactIndex>;
  };
}

const CH1_CONTENT: ChapterContent = {
  characters: new Set<CharacterIndex>([
    CHARACTERS.EMPTY,
    CHARACTERS.KRIS,
    CHARACTERS.SUSIE,
    CHARACTERS.RALSEI,
  ]),
  consumables: new Set<ConsumableIndex>([
    CONSUMABLES.EMPTY,
    CONSUMABLES.DARK_CANDY,
    CONSUMABLES.REVIVEMINT,
    CONSUMABLES.GLOWSHARD,
    CONSUMABLES.MANUAL,
    CONSUMABLES.BROKENCAKE,
    CONSUMABLES.TOPCAKE,
    CONSUMABLES.SPINCAKE,
    CONSUMABLES.DARKBURGER,
    CONSUMABLES.LANCERCOOKIE,
    CONSUMABLES.GIGASALAD,
    CONSUMABLES.CLUBSSANDWICH,
    CONSUMABLES.HEARTSDONUT,
    CONSUMABLES.CHOCODIAMOND,
    CONSUMABLES.FAVSANDWICH,
    CONSUMABLES.ROUXLSROUX,
  ]),
  keyItems: new Set<KeyItemIndex>([
    KEYITEMS.EMPTY,
    KEYITEMS.CELL_PHONE,
    KEYITEMS.EGG,
    KEYITEMS.BROKEN_CAKE,
    KEYITEMS.BROKEN_KEY_A,
    KEYITEMS.DOOR_KEY,
    KEYITEMS.BROKEN_KEY_B,
    KEYITEMS.BROKEN_KEY_C,
  ]),
  spells: new Set<SpellIndex>([
    SPELLS.EMPTY,
    SPELLS.RUDE_SWORD,
    SPELLS.HEAL_PRAYER,
    SPELLS.PACIFY,
    SPELLS.RUDE_BUSTER,
    SPELLS.RED_BUSTER,
    SPELLS.DUAL_HEAL,
    SPELLS.ACT,
  ]),
  weapons: new Set<WeaponIndex>([
    WEAPONS.EMPTY,
    WEAPONS.WOOD_BLADE,
    WEAPONS.MANE_AX,
    WEAPONS.RED_SCARF,
    WEAPONS.EVERYBODY_WEAPON,
    WEAPONS.SPOOKYSWORD,
    WEAPONS.BRAVE_AX,
    WEAPONS.DEVILSKNIFE,
    WEAPONS.TREFOIL,
    WEAPONS.RAGGER,
    WEAPONS.DAINTY_SCARF,
  ]),
  armors: new Set<ArmorIndex>([
    ARMORS.EMPTY,
    ARMORS.AMBER_CARD,
    ARMORS.DICE_BRACE,
    ARMORS.PINK_RIBBON,
    ARMORS.WHITE_RIBBON,
    ARMORS.IRONSHACKLE,
    ARMORS.MOUSE_TOKEN,
    ARMORS.JEVILSTAIL,
    ARMORS.SILVER_CARD,
  ]),
  lightWorld: {
    items: new Set<LightWorldItemIndex>([
      LIGHTWORLDITEMS.EMPTY,
      LIGHTWORLDITEMS.HOT_CHOCOLATE,
      LIGHTWORLDITEMS.PENCIL,
      LIGHTWORLDITEMS.BANDAGE,
      LIGHTWORLDITEMS.BOUQUET,
      LIGHTWORLDITEMS.BALL_OF_JUNK,
      LIGHTWORLDITEMS.HALLOWEEN_PENCIL,
      LIGHTWORLDITEMS.LUCKY_PENCIL,
      LIGHTWORLDITEMS.EGG,
    ]),
    phoneContacts: new Set<PhoneContactIndex>([
      PHONECONTACTS.EMPTY,
      PHONECONTACTS.CALL_HOME,
      PHONECONTACTS.SANS,
    ]),
  },
};

const CH2_CONTENT: ChapterContent = {
  characters: new Set<CharacterIndex>([
    ...CH1_CONTENT.characters,
    CHARACTERS.NOELLE,
  ]),
  consumables: new Set([
    ...CH1_CONTENT.consumables,
    CONSUMABLES.CD_BAGEL,
    CONSUMABLES.MANNEQUIN,
    CONSUMABLES.KRIS_TEA,
    CONSUMABLES.NOELLE_TEA,
    CONSUMABLES.RALSEI_TEA,
    CONSUMABLES.SUSIE_TEA,
    CONSUMABLES.DD_BURGER,
    CONSUMABLES.LIGHTCANDY,
    CONSUMABLES.BUTLERJUICE,
    CONSUMABLES.SPAGHETTICODE,
    CONSUMABLES.JAVACOOKIE,
    CONSUMABLES.TENSIONBIT,
    CONSUMABLES.TENSIONGEM,
    CONSUMABLES.TENSIONMAX,
    CONSUMABLES.REVIVEDUST,
    CONSUMABLES.REVIVEBRITE,
    CONSUMABLES.S_POISON,
    CONSUMABLES.DOGDOLLAR,
  ]),
  keyItems: new Set<KeyItemIndex>([
    ...CH1_CONTENT.keyItems,
    KEYITEMS.LANCER,
    KEYITEMS.ROUXLS_KAARD,
    KEYITEMS.EMPTY_DISK,
    KEYITEMS.LOADED_DISK,
    KEYITEMS.KEYGEN,
    KEYITEMS.SHADOW_CRYSTAL,
    KEYITEMS.STARWALKER,
    KEYITEMS.PURE_CRYSTAL,
  ]),
  spells: new Set<SpellIndex>([
    ...CH1_CONTENT.spells,
    SPELLS.SLEEPMIST,
    SPELLS.ICESHOCK,
    SPELLS.SNOWGRAVE,
    SPELLS.SUSIE_HEAL,
  ]),
  weapons: new Set<WeaponIndex>([
    ...CH1_CONTENT.weapons,
    WEAPONS.TWISTED_SWD,
    WEAPONS.SNOW_RING,
    WEAPONS.THORN_RING,
    WEAPONS.BOUNCE_BLADE,
    WEAPONS.CHEER_SCARF,
    WEAPONS.MECHA_SABER,
    WEAPONS.AUTO_AXE,
    WEAPONS.FIBER_SCARF,
    WEAPONS.RAGGER2,
    WEAPONS.BROKEN_SWD,
    WEAPONS.PUPPET_SCARF,
    WEAPONS.FREEZE_RING,
  ]),
  armors: new Set<ArmorIndex>([
    ...CH1_CONTENT.armors,
    ARMORS.TWIN_RIBBON,
    ARMORS.GLOW_WRIST,
    ARMORS.CHAIN_MAIL,
    ARMORS.B_SHOT_BOWTIE,
    ARMORS.SPIKE_BAND,
    ARMORS.SILVER_WATCH,
    ARMORS.TENSION_BOW,
    ARMORS.MANNEQUIN,
    ARMORS.DARK_GOLD_BAND,
    ARMORS.SKY_MANTLE,
    ARMORS.SPIKE_SHACKLE,
    ARMORS.FRAYED_BOWTIE,
    ARMORS.DEALMAKER,
    ARMORS.ROYAL_PIN,
  ]),
  lightWorld: {
    items: new Set<LightWorldItemIndex>([
      ...CH1_CONTENT.lightWorld.items,
      LIGHTWORLDITEMS.CARDS,
      LIGHTWORLDITEMS.BOX_OF_HEART_CANDY,
      LIGHTWORLDITEMS.GLASS,
      LIGHTWORLDITEMS.ERASER,
      LIGHTWORLDITEMS.MECH_PENCIL,
      LIGHTWORLDITEMS.WRISTWATCH,
    ]),
    phoneContacts: new Set<PhoneContactIndex>([
      ...CH1_CONTENT.lightWorld.phoneContacts,
    ]),
  },
};

const CH3_CONTENT: ChapterContent = {
  characters: new Set<CharacterIndex>([...CH2_CONTENT.characters]),
  consumables: new Set([
    ...CH2_CONTENT.consumables,
    CONSUMABLES.TVDINNER,
    CONSUMABLES.PIPIS,
    CONSUMABLES.FLATSODA,
    CONSUMABLES.TVSLOP,
    CONSUMABLES.EXECBUFFET,
    CONSUMABLES.DELUXEDINNER,
  ]),
  keyItems: new Set<KeyItemIndex>([
    ...CH2_CONTENT.keyItems,
    KEYITEMS.ODD_CONTROLLER,
    KEYITEMS.BACKSTAGE_PASS,
    KEYITEMS.TRIP_TICKET,
    KEYITEMS.LANCER_CON,
  ]),
  spells: new Set<SpellIndex>([...CH2_CONTENT.spells]),
  weapons: new Set<WeaponIndex>([
    ...CH2_CONTENT.weapons,
    WEAPONS.SABER10,
    WEAPONS.TOXIC_AXE,
    WEAPONS.FLEX_SCARF,
    WEAPONS.BLACK_SHARD,
  ]),
  armors: new Set<ArmorIndex>([
    ...CH2_CONTENT.armors,
    ARMORS.SHADOW_MANTLE,
    ARMORS.LODE_STONE,
    ARMORS.GINGER_GUARD,
    ARMORS.BLUE_RIBBON,
    ARMORS.TENNA_TIE,
  ]),
  lightWorld: {
    items: new Set<LightWorldItemIndex>([...CH2_CONTENT.lightWorld.items]),
    phoneContacts: new Set<PhoneContactIndex>([
      ...CH2_CONTENT.lightWorld.phoneContacts,
    ]),
  },
};

const CH4_CONTENT: ChapterContent = {
  characters: new Set<CharacterIndex>([...CH3_CONTENT.characters]),
  consumables: new Set([
    ...CH3_CONTENT.consumables,
    CONSUMABLES.ANCIENTSWEET,
    CONSUMABLES.RHAPSOTEA,
    CONSUMABLES.SCARLIXIR,
    CONSUMABLES.BITTERTEAR,
  ]),
  keyItems: new Set<KeyItemIndex>([
    ...CH3_CONTENT.keyItems,
    KEYITEMS.SHEET_MUSIC,
    KEYITEMS.CLAIMB_CLAWS,
  ]),
  spells: new Set<SpellIndex>([...CH3_CONTENT.spells]),
  weapons: new Set<WeaponIndex>([
    ...CH3_CONTENT.weapons,
    WEAPONS.JINGLE_BLADE,
    WEAPONS.SCARF_MARK,
    WEAPONS.JUSTICE_AXE,
    WEAPONS.WINGLADE,
    WEAPONS.ABSORB_AX,
  ]),
  armors: new Set<ArmorIndex>([
    ...CH3_CONTENT.armors,
    ARMORS.WATERGUARD,
    ARMORS.MYSTIC_BAND,
    ARMORS.POWER_BAND,
    ARMORS.PRINCESS_RBN,
    ARMORS.GOLD_WIDOW,
  ]),
  lightWorld: {
    items: new Set<LightWorldItemIndex>([
      ...CH3_CONTENT.lightWorld.items,
      LIGHTWORLDITEMS.HOLIDAY_PENCIL,
      LIGHTWORLDITEMS.CACTUSNEEDLE,
      LIGHTWORLDITEMS.BLACKSHARD,
      LIGHTWORLDITEMS.QUILLPEN,
    ]),
    phoneContacts: new Set<PhoneContactIndex>([
      ...CH3_CONTENT.lightWorld.phoneContacts,
    ]),
  },
};

export const CHAPTERS_META: Record<ChapterIndex, ChapterProperties> = {
  [CHAPTERS.CH1]: {
    displayName: 'The Beginning',
    content: CH1_CONTENT,
  },
  [CHAPTERS.CH2]: {
    displayName: "A Cyber's World",
    content: CH2_CONTENT,
  },
  [CHAPTERS.CH3]: {
    displayName: 'Late Night',
    content: CH3_CONTENT,
  },
  [CHAPTERS.CH4]: {
    displayName: 'Prophecy',
    content: CH4_CONTENT,
  },
};

import type {
  AbilityValues,
  BaseProperties,
  EquipmentStats,
  WithOverrides,
} from '@types';
import type { ChapterIndex } from './chapters';
import { EQUIPMENT_ABILITIES, EQUIPMENT_ICONS } from './equipment';
import type { EquipmentAbilityIndex, EquipmentIconIndex } from './equipment';

export const WEAPONS = {
  EMPTY: 0,
  WOOD_BLADE: 1,
  MANE_AX: 2,
  RED_SCARF: 3,
  EVERYBODY_WEAPON: 4,
  SPOOKYSWORD: 5,
  BRAVE_AX: 6,
  DEVILSKNIFE: 7,
  TREFOIL: 8,
  RAGGER: 9,
  DAINTY_SCARF: 10,
  TWISTED_SWD: 11,
  SNOW_RING: 12,
  THORN_RING: 13,
  BOUNCE_BLADE: 14,
  CHEER_SCARF: 15,
  MECHA_SABER: 16,
  AUTO_AXE: 17,
  FIBER_SCARF: 18,
  RAGGER2: 19,
  BROKEN_SWD: 20,
  PUPPET_SCARF: 21,
  FREEZE_RING: 22,
  SABER10: 23,
  TOXIC_AXE: 24,
  FLEX_SCARF: 25,
  BLACK_SHARD: 26,
  JINGLE_BLADE: 50,
  SCARF_MARK: 51,
  JUSTICE_AXE: 52,
  WINGLADE: 53,
  ABSORB_AX: 54,
  WOOD_BLADE_2: 30,
  THATCHET: 31,
  BLUE_SHOES: 32,
  AQUA_KNIFE: 33,
  FLOWERY_SCARF: 34,
  BROKEN_SCARF: 35,
  GILDED_ROSE: 36,
  MISTLE_WP: 37,
} as const;

export type WeaponIndex = (typeof WEAPONS)[keyof typeof WEAPONS];
export type WeaponName = keyof typeof WEAPONS;

interface WeaponProperties
  extends
    BaseProperties,
    WithOverrides<WeaponProperties, { chapter: ChapterIndex; }> {
  stats: EquipmentStats;
  icon?: EquipmentIconIndex;
  ability?: EquipmentAbilityIndex;
  abilityValues?: AbilityValues;
}

export const WEAPONS_META: Record<WeaponIndex, WeaponProperties> = {
  [WEAPONS.EMPTY]: {
    displayName: 'Empty',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.EMPTY,
  },
  [WEAPONS.WOOD_BLADE]: {
    displayName: 'Wood Blade',
    description: 'A wooden practice blade with a carbon-\nreinforced core.',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
  },
  [WEAPONS.MANE_AX]: {
    displayName: 'Mane Ax',
    description: 'Beginner\'s ax forged from the\nmane of a dragon whelp.',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
  },
  [WEAPONS.RED_SCARF]: {
    displayName: 'Red Scarf',
    description: 'A basic scarf made of lightly\nmagical fiber.',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.EVERYBODY_WEAPON]: {
    displayName: 'EverybodyWeapon',
    description: 'It felt right for everyone.',
    stats: { attack: 12, defence: 6, magic: 8 },
    icon: EQUIPMENT_ICONS.EMPTY,
  },
  [WEAPONS.SPOOKYSWORD]: {
    displayName: 'Spookysword',
    description: 'A black-and-orange sword with a bat hilt.',
    stats: { attack: 2, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.SPOOKINESS_UP,
  },
  [WEAPONS.BRAVE_AX]: {
    displayName: 'Brave Ax',
    description: 'A glossy ax from a block warrior.\nSuitable for heroes.',
    stats: { attack: 2, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.GUTS_UP,
  },
  [WEAPONS.DEVILSKNIFE]: {
    displayName: 'Devilsknife',
    description: 'Skull-emblazoned scythe-ax.\nReduces Rudebuster\'s cost by 10',
    stats: { attack: 5, defence: 0, magic: 4 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.BUSTER_TP_DOWN,
  },
  [WEAPONS.TREFOIL]: {
    displayName: 'Trefoil',
    description: 'Mossy rapier with a clover emblem.\nIncreases $ found by 5%.',
    stats: { attack: 4, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.MONEY_EARNED_UP,
  },
  [WEAPONS.RAGGER]: {
    displayName: 'Ragger',
    description: 'A rugged scarf that cuts enemies like a dagger.',
    stats: { attack: 2, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.DAINTY_SCARF]: {
    displayName: 'DaintyScarf',
    description: 'Delicate scarf that increases healing\npower but has no attack.',
    stats: { attack: 0, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.FLUFFINESS_UP,
  },
  [WEAPONS.TWISTED_SWD]: {
    displayName: 'TwistedSwd',
    description: 'A strange blade',
    stats: { attack: 16, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.TRANCE,
  },
  [WEAPONS.SNOW_RING]: {
    displayName: 'SnowRing',
    description: 'A ring with the emblem of the\nsnowflake',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.RING,
  },
  [WEAPONS.THORN_RING]: {
    displayName: 'ThornRing',
    description: 'Wearer takes damage from pain\nReduces the TP cost of ice spells',
    stats: { attack: 14, defence: 0, magic: 12 },
    icon: EQUIPMENT_ICONS.RING,
    ability: EQUIPMENT_ABILITIES.TRANCE_RING,
  },
  [WEAPONS.BOUNCE_BLADE]: {
    displayName: 'BounceBlade',
    description: 'A pink saber with a rubber blade.\nWeak, but increases defence.',
    stats: { attack: 2, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.DEFENSE,
  },
  [WEAPONS.CHEER_SCARF]: {
    displayName: 'CheerScarf',
    description: 'A scarf with colorful you-can-do-it\nimagery. Gains more TP from criticals.',
    stats: { attack: 1, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.SMILEY,
  },
  [WEAPONS.MECHA_SABER]: {
    displayName: 'MechaSaber',
    description: 'The blade extends when you press the hilt.\nCHA-CHK!',
    stats: { attack: 4, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.ANNOYING,
  },
  [WEAPONS.AUTO_AXE]: {
    displayName: 'AutoAxe',
    description: 'Make sure to charge it by\nplugging it into the wall.',
    stats: { attack: 4, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.BAD_IDEA,
  },
  [WEAPONS.FIBER_SCARF]: {
    displayName: 'FiberScarf',
    description: 'A scarf made of soft microfiber.\nBalances attack and magic.',
    stats: { attack: 2, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
    getOverrides: ({ chapter }) => {
      if (chapter === 3) {
        return {
          stats: { attack: 3, defence: 0, magic: 2 },
        };
      }

      return {};
    },
  },
  [WEAPONS.RAGGER2]: {
    displayName: 'Ragger2',
    description: 'A sharp and scratchy scarf.\nWorse healing, better attack.',
    stats: { attack: 5, defence: 0, magic: -1 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.PRICKLY,
  },
  [WEAPONS.BROKEN_SWD]: {
    displayName: 'BrokenSwd',
    description: 'A rejected sword cut into 2 pieces.\nNot even you can equip this...',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.FAILURE,
  },
  [WEAPONS.PUPPET_SCARF]: {
    displayName: 'PuppetScarf',
    description: 'A scarf made of strange strings.\nFor those that abandon healing.',
    stats: { attack: 10, defence: 0, magic: -6 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.FREEZE_RING]: {
    displayName: 'FreezeRing',
    description: 'A ring with a snowglobe on it.\n... is that someone inside?',
    stats: { attack: 4, defence: 0, magic: 4 },
    icon: EQUIPMENT_ICONS.RING,
  },
  [WEAPONS.SABER10]: {
    displayName: 'Saber10',
    description: 'A saber made of 10 cactus needles.\nFortunately, can deal more than 10 damage.',
    stats: { attack: 6, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
  },
  [WEAPONS.TOXIC_AXE]: {
    displayName: 'ToxicAxe',
    description: 'An axe used to clear wastelands\nin a fetid swamp. Not poison, but gross.',
    stats: { attack: 6, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
  },
  [WEAPONS.FLEX_SCARF]: {
    displayName: 'FlexScarf',
    description: 'A scarf that is warm and fuzzy, but with\na metal core that lets it keep its shape.',
    stats: { attack: 4, defence: 0, magic: 1 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.BLACK_SHARD]: {
    displayName: 'BlackShard',
    description: 'A dagger-like shard of the Black Knife.\nStrikes the weakness of dark-element enemies.',
    stats: { attack: 16, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SHARD,
    ability: EQUIPMENT_ABILITIES.SLAY_DARK,
  },
  [WEAPONS.JINGLE_BLADE]: {
    displayName: 'JingleBlade',
    description: 'A lance-like sword with red-and-white stripes.\nPerfect for jousting.',
    stats: { attack: 7, defence: 1, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.FESTIVE,
  },
  [WEAPONS.SCARF_MARK]: {
    displayName: 'ScarfMark',
    description: 'A thin scarf with a deep sheen. Holy writing has\nbeen pressed into it, imbuing it with magic.',
    stats: { attack: 4, defence: 1, magic: 1 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.JUSTICE_AXE]: {
    displayName: 'JusticeAxe',
    description: 'It has no special powers. However, in order to\nattain this item, you became much stronger!',
    stats: { attack: 12, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.UNKNOWN_WEAPON,
  },
  [WEAPONS.WINGLADE]: {
    displayName: 'Winglade',
    description: 'A majestic sword with a white feathered hilt.\nSlightly increases money won.',
    stats: { attack: 8, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.MONEY_5_UP,
  },
  [WEAPONS.ABSORB_AX]: {
    displayName: 'AbsorbAx',
    description: 'A long, curved axe with an indent.\nScoop up HP when you attack.',
    stats: { attack: 8, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.VAMPIRE,
  },
  [WEAPONS.WOOD_BLADE_2]: {
    displayName: 'WoodBlade2',
    description: 'A sword that is arbitrarily stronger\nbecause it fits the setting of Chapter 5.',
    stats: { attack: 10, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SWORD,
    ability: EQUIPMENT_ABILITIES.COOLNESS,
  },
  [WEAPONS.THATCHET]: {
    displayName: 'Thatchet',
    description: 'An axe made of brambles. It\'s rumored its\nwickedness infects anything it touches.',
    stats: { attack: 10, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.AXE,
    ability: EQUIPMENT_ABILITIES.WICKED,
  },
  [WEAPONS.BLUE_SHOES]: {
    displayName: 'BlueShoes',
    description: 'Shoes from a prestigious dancer.\nRalsei\'s PACIFY costs 0% TP.',
    stats: { attack: 2, defence: 4, magic: 6 },
    icon: EQUIPMENT_ICONS.BLUE,
    ability: EQUIPMENT_ABILITIES.PACIFY_0_TP,
  },
  [WEAPONS.AQUA_KNIFE]: {
    displayName: 'AquaKnife',
    description: 'A mischievous blade. Attacks with this\nweapon are easier to make critical.',
    stats: { attack: 10, defence: 2, magic: 0 },
    icon: EQUIPMENT_ICONS.AQUA,
    ability: EQUIPMENT_ABILITIES.CRITICAL,
  },
  [WEAPONS.FLOWERY_SCARF]: {
    displayName: 'FloweryScarf',
    description: 'A scarf which says "I <3 Flowery" on it.\nIt\'s the perfect size for Ralsei.',
    stats: { attack: 70, defence: 70, magic: 70 },
    icon: EQUIPMENT_ICONS.SCARF,
    ability: EQUIPMENT_ABILITIES.THE_BEST,
  },
  [WEAPONS.BROKEN_SCARF]: {
    displayName: 'BrokenScarf',
    description: 'A scarf that was torn to pieces in the\nbattle, revealing it was all for show.',
    stats: { attack: 0, defence: 0, magic: 0 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
  [WEAPONS.GILDED_ROSE]: {
    displayName: 'GildedRose',
    description: 'Armour rings with a rose motif. Any thorns are\npointed outwards so you don\'t hurt yourself.',
    stats: { attack: 16, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.RING,
  },
  // Sets an ability icon (ARROW_UP_RIGHT) but a blank ability string
  [WEAPONS.MISTLE_WP]: {
    displayName: 'MistleWP',
    description: 'A parasitic ivy whip with a nature\'s power.\nOnly experts can use it as a scarf.',
    stats: { attack: 6, defence: 0, magic: 2 },
    icon: EQUIPMENT_ICONS.SCARF,
  },
};

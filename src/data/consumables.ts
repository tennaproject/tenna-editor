import type { BaseProperties } from '@types';
import type { WithOverrides } from '@types';

export const CONSUMABLES = {
  EMPTY: 0,
  DARK_CANDY: 1,
  REVIVEMINT: 2,
  GLOWSHARD: 3,
  MANUAL: 4,
  BROKENCAKE: 5,
  TOPCAKE: 6,
  SPINCAKE: 7,
  DARKBURGER: 8,
  LANCERCOOKIE: 9,
  GIGASALAD: 10,
  CLUBSSANDWICH: 11,
  HEARTSDONUT: 12,
  CHOCODIAMOND: 13,
  FAVSANDWICH: 14,
  ROUXLSROUX: 15,
  CD_BAGEL: 16,
  MANNEQUIN: 17,
  KRIS_TEA: 18,
  NOELLE_TEA: 19,
  RALSEI_TEA: 20,
  SUSIE_TEA: 21,
  DD_BURGER: 22,
  LIGHTCANDY: 23,
  BUTLERJUICE: 24,
  SPAGHETTICODE: 25,
  JAVACOOKIE: 26,
  TENSIONBIT: 27,
  TENSIONGEM: 28,
  TENSIONMAX: 29,
  REVIVEDUST: 30,
  REVIVEBRITE: 31,
  S_POISON: 32,
  DOGDOLLAR: 33,
  TVDINNER: 34,
  PIPIS: 35,
  FLATSODA: 36,
  TVSLOP: 37,
  EXECBUFFET: 38,
  DELUXEDINNER: 39,
  ANCIENTSWEET: 60,
  RHAPSOTEA: 61,
  SCARLIXIR: 62,
  BITTERTEAR: 63,
} as const;

export type ConsumableIndex = (typeof CONSUMABLES)[keyof typeof CONSUMABLES];
export type ConsumableName = keyof typeof CONSUMABLES;

interface ConsumableProperties
  extends BaseProperties,
    WithOverrides<ConsumableProperties> {}

export const CONSUMABLES_META: Record<ConsumableIndex, ConsumableProperties> = {
  [CONSUMABLES.EMPTY]: { displayName: 'Empty' },
  [CONSUMABLES.DARK_CANDY]: { displayName: 'Dark Candy' },
  [CONSUMABLES.REVIVEMINT]: { displayName: 'ReviveMint' },
  [CONSUMABLES.GLOWSHARD]: { displayName: 'Glowshard' },
  [CONSUMABLES.MANUAL]: { displayName: 'Manual' },
  [CONSUMABLES.BROKENCAKE]: { displayName: 'BrokenCake' },
  [CONSUMABLES.TOPCAKE]: { displayName: 'TopCake' },
  [CONSUMABLES.SPINCAKE]: { displayName: 'SpinCake' },
  [CONSUMABLES.DARKBURGER]: { displayName: 'Darkburger' },
  [CONSUMABLES.LANCERCOOKIE]: { displayName: 'LancerCookie' },
  [CONSUMABLES.GIGASALAD]: { displayName: 'GigaSalad' },
  [CONSUMABLES.CLUBSSANDWICH]: { displayName: 'ClubsSandwich' },
  [CONSUMABLES.HEARTSDONUT]: { displayName: 'HeartsDonut' },
  [CONSUMABLES.CHOCODIAMOND]: { displayName: 'ChocoDiamond' },
  [CONSUMABLES.FAVSANDWICH]: { displayName: 'FavSandwich' },
  [CONSUMABLES.ROUXLSROUX]: { displayName: 'RouxlsRoux' },
  [CONSUMABLES.CD_BAGEL]: { displayName: 'CD Bagel' },
  [CONSUMABLES.MANNEQUIN]: { displayName: 'Mannequin' },
  [CONSUMABLES.KRIS_TEA]: {
    displayName: 'Kris Tea',
    getOverrides: (save) => {
      if (save.chapter > 2) {
        return {
          displayName: 'Rotten Tea (Kris)',
          description: `A tea that has deteriorated after a short while due to its poor craftsmanship. +10HP

          This item used to be "Kris Tea" before reaching Chapter 3.
          `,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.NOELLE_TEA]: {
    displayName: 'Noelle Tea',
    getOverrides: (save) => {
      if (save.chapter > 2) {
        return {
          displayName: 'Rotten Tea (Noelle)',
          description: `A tea that has deteriorated after a short while due to its poor craftsmanship. +10HP

          This item used to be "Noelle Tea" before reaching Chapter 3.
          `,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.RALSEI_TEA]: {
    displayName: 'Ralsei Tea',
    getOverrides: (save) => {
      if (save.chapter > 2) {
        return {
          displayName: 'Rotten Tea (Ralsei)',
          description: `A tea that has deteriorated after a short while due to its poor craftsmanship. +10HP

          This item used to be "Ralsei Tea" before reaching Chapter 3.
          `,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.SUSIE_TEA]: {
    displayName: 'Susie Tea',
    getOverrides: (save) => {
      if (save.chapter > 2) {
        return {
          displayName: 'Rotten Tea (Susie)',
          description: `A tea that has deteriorated after a short while due to its poor craftsmanship. +10HP

          This item used to be "Susie Tea" before reaching Chapter 3.
          `,
        };
      }

      return {};
    },
  },
  [CONSUMABLES.DD_BURGER]: { displayName: 'DD-Burger' },
  [CONSUMABLES.LIGHTCANDY]: { displayName: 'LightCandy' },
  [CONSUMABLES.BUTLERJUICE]: { displayName: 'ButlerJuice' },
  [CONSUMABLES.SPAGHETTICODE]: { displayName: 'SpaghettiCode' },
  [CONSUMABLES.JAVACOOKIE]: { displayName: 'JavaCookie' },
  [CONSUMABLES.TENSIONBIT]: { displayName: 'TensionBit' },
  [CONSUMABLES.TENSIONGEM]: { displayName: 'TensionGem' },
  [CONSUMABLES.TENSIONMAX]: { displayName: 'TensionMax' },
  [CONSUMABLES.REVIVEDUST]: { displayName: 'ReviveDust' },
  [CONSUMABLES.REVIVEBRITE]: { displayName: 'ReviveBrite' },
  [CONSUMABLES.S_POISON]: { displayName: 'S. POISON' },
  [CONSUMABLES.DOGDOLLAR]: { displayName: 'DogDollar' },
  [CONSUMABLES.TVDINNER]: { displayName: 'TVDinner' },
  [CONSUMABLES.PIPIS]: { displayName: 'Pipis' },
  [CONSUMABLES.FLATSODA]: { displayName: 'FlatSoda' },
  [CONSUMABLES.TVSLOP]: { displayName: 'TVSlop' },
  [CONSUMABLES.EXECBUFFET]: { displayName: 'ExecBuffet' },
  [CONSUMABLES.DELUXEDINNER]: { displayName: 'DeluxeDinner' },
  [CONSUMABLES.ANCIENTSWEET]: { displayName: 'AncientSweet' },
  [CONSUMABLES.RHAPSOTEA]: { displayName: 'Rhapsotea' },
  [CONSUMABLES.SCARLIXIR]: { displayName: 'Scarlixir' },
  [CONSUMABLES.BITTERTEAR]: { displayName: 'BitterTear' },
};

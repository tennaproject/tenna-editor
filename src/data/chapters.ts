import type { BaseProperties } from '../types';
import { CONSUMABLES, type ConsumableIndex } from './consumables';

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
  consumables: Set<ConsumableIndex>;
}

const CH1_CONTENT = {
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
};

const CH2_CONTENT = {
  consumables: new Set([...CH1_CONTENT.consumables]),
};

const CH3_CONTENT = {
  consumables: new Set([...CH2_CONTENT.consumables]),
};

const CH4_CONTENT = {
  consumables: new Set([...CH3_CONTENT.consumables]),
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

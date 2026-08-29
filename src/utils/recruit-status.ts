export const RECRUIT_STATUS_COLORS = {
  recruited: {
    bg: 'bg-green',
    shadow: 'shadow-green',
    text: 'text-green',
  },
  lost: {
    bg: 'bg-red',
    shadow: 'shadow-red',
    text: 'text-red',
  },
  partial: {
    bg: 'bg-yellow',
    shadow: 'shadow-yellow',
    text: 'text-yellow',
  },
  none: {
    bg: 'bg-surface-3',
    shadow: 'shadow-surface-3',
    text: 'text-text-3',
  },
} as const;

export type RecruitStatusKey = keyof typeof RECRUIT_STATUS_COLORS;

export function getRecruitStatus(
  currentlyRecruited: number,
  recruitCount: number,
): { key: RecruitStatusKey; label: string; showGlow: boolean } {
  if (currentlyRecruited === -1) {
    return { key: 'lost', label: 'Lost', showGlow: true };
  }
  if (currentlyRecruited === recruitCount) {
    return { key: 'recruited', label: 'Recruited', showGlow: true };
  }
  if (currentlyRecruited > 0 && currentlyRecruited < recruitCount) {
    return {
      key: 'partial',
      label: `${currentlyRecruited} / ${recruitCount}`,
      showGlow: true,
    };
  }
  return { key: 'none', label: 'Not recruited', showGlow: false };
}

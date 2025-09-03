import { CHARACTERS, type CharacterIndex } from '@data';

const CHARACTER_COLORS: Record<
  CharacterIndex,
  { bg: string; shadow: string; text: string }
> = {
  [CHARACTERS.EMPTY]: {
    bg: 'bg-surface-1',
    shadow: 'shadow-surface-1',
    text: 'text-text-2',
  },
  [CHARACTERS.KRIS]: {
    bg: 'bg-blue',
    shadow: 'shadow-blue',
    text: 'text-blue',
  },
  [CHARACTERS.SUSIE]: {
    bg: 'bg-pink',
    shadow: 'shadow-pink',
    text: 'text-pink',
  },
  [CHARACTERS.RALSEI]: {
    bg: 'bg-green',
    shadow: 'shadow-green',
    text: 'text-green',
  },
  [CHARACTERS.NOELLE]: {
    bg: 'bg-yellow',
    shadow: 'shadow-yellow',
    text: 'text-yellow',
  },
} as const;

export function getCharacterColor(character: CharacterIndex) {
  if (CHARACTER_COLORS[character]) {
    return CHARACTER_COLORS[character];
  }

  return CHARACTER_COLORS[0];
}

import type { ComponentType, SVGProps } from 'react';
import KrisIcon from '@assets/deltarune/characters/kris.svg?react';
import SusieIcon from '@assets/deltarune/characters/susie.svg?react';
import RalseiIcon from '@assets/deltarune/characters/ralsei.svg?react';
import NoelleIcon from '@assets/deltarune/characters/noelle.svg?react';
import { CHARACTERS, type CharacterIndex } from '@data';
import { mergeClass } from '@utils/merge-class';

const BATTLE_ICONS: Partial<
  Record<CharacterIndex, ComponentType<SVGProps<SVGSVGElement>>>
> = {
  [CHARACTERS.KRIS]: KrisIcon,
  [CHARACTERS.SUSIE]: SusieIcon,
  [CHARACTERS.RALSEI]: RalseiIcon,
  [CHARACTERS.NOELLE]: NoelleIcon,
};

interface CharacterIconProps {
  character: CharacterIndex;
  className?: string;
}

export function CharacterIcon({ character, className }: CharacterIconProps) {
  const Icon = BATTLE_ICONS[character];
  if (!Icon) return null;

  return <Icon className={mergeClass('h-full w-full', className)} />;
}

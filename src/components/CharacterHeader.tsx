import { Heading, Section } from '@components';
import type { CharacterIndex } from '@data';
import { useCharacterOverrideInputs } from '@hooks';
import { characterHelpers } from '@utils/data-helpers';
import { getCharacterColor } from '@utils/get-character-color';
import { mergeClass } from '@utils/merge-class';
import type { ReactNode } from 'react';

interface CharacterHeaderProps {
  character: CharacterIndex;
  icon?: ReactNode;
}

export function CharacterHeader({ character, icon }: CharacterHeaderProps) {
  const { chapter, plot, flags, hasEgg, weapon, room } =
    useCharacterOverrideInputs(character);

  let characterMeta = characterHelpers.getById(character);

  const overrides = characterMeta?.getOverrides?.({
    chapter,
    plot,
    flags,
    hasEgg,
    weapon,
    room,
  });

  characterMeta = {
    ...characterMeta,
    ...(overrides ?? {}),
  };

  const color = getCharacterColor(character);
  return (
    <Section
      id="main-title"
      className="flex flex-col items-center border-b border-divider px-2 py-4"
    >
      {icon && (
        <div className="flex items-center justify-center" aria-hidden>
          {icon}
        </div>
      )}
      <div className="mb-1">
        <Heading level={2} className={mergeClass('uppercase', color.text)}>
          {characterMeta.displayName}
        </Heading>
      </div>
      <Heading level={5}>
        LV{characterMeta.lv} {characterMeta.title.name}
      </Heading>
      <p className="ui-prose-muted text-center">
        {characterMeta.title.description}
      </p>
    </Section>
  );
}

import { CharacterFlavorStats, GlowBar, Heading, Section } from '@components';
import type { CharacterIndex } from '@data';
import { useCharacterOverrideInputs } from '@hooks';
import { characterHelpers } from '@utils/data-helpers';
import { getCharacterColor } from '@utils/get-character-color';
import { mergeClass } from '@utils/merge-class';
import type { ReactNode } from 'react';
import {
  formatTranslation,
  getCharacterTitleTranslationKeyPrefix,
  getCharacterTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';

interface CharacterHeaderProps {
  character: CharacterIndex;
  icon?: ReactNode;
}

export function CharacterHeader({ character, icon }: CharacterHeaderProps) {
  const { t } = useTranslation();
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
  const translatedCharacter = translateMeta(
    getCharacterTranslationKeyPrefix(character),
    characterMeta,
    t,
  );
  const titleKeyPrefix = getCharacterTitleTranslationKeyPrefix(
    character,
    characterMeta.title,
  );
  const titleName = titleKeyPrefix
    ? t(`${titleKeyPrefix}.name`, characterMeta.title.name)
    : characterMeta.title.name;
  const titleDescription = titleKeyPrefix
    ? t(`${titleKeyPrefix}.description`, characterMeta.title.description)
    : characterMeta.title.description;

  return (
    <Section
      id="main-title"
      className="relative col-span-full flex flex-col items-center gap-4 border border-border shadow shadow-surface-1/50 px-6 py-4 lg:flex-row lg:gap-6 xl:grid xl:grid-cols-subgrid xl:gap-0 xl:px-0 short:py-2"
    >
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6 xl:col-span-2 xl:px-6">
        <div className="flex flex-col items-center lg:flex-row lg:gap-4">
          {icon && (
            <div className="flex items-center justify-center" aria-hidden>
              {icon}
            </div>
          )}
          <Heading
            level={2}
            className={mergeClass(
              'uppercase lg:text-[2.625rem] short:text-4xl',
              color.text,
            )}
          >
            {translatedCharacter.displayName}
          </Heading>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <Heading level={5} className="lg:text-xl">
            {formatTranslation(t('ui.party.level', 'LV{level}'), {
              level: characterMeta.lv,
            })}{' '}
            {titleName}
          </Heading>
          <p className="ui-prose-muted text-center lg:text-left short:hidden">
            {titleDescription}
          </p>
        </div>
      </div>
      <CharacterFlavorStats
        character={character}
        className="lg:ml-auto xl:ml-0 xl:border-l xl:border-transparent xl:px-6"
      />
      <div className="absolute inset-x-0 bottom-0">
        <GlowBar bg={color.bg} shadow={color.shadow} />
      </div>
    </Section>
  );
}

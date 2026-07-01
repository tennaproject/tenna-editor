import {
  Card,
  Checkbox,
  Heading,
  HelpTip,
  InlineGroup,
  Section,
  Select,
  GlowBar,
} from '@components';
import { CHARACTERS, type CharacterIndex } from '@data';
import { useCharacterOverrideInputs } from '@hooks';
import { useSave, useUi } from '@store';
import {
  chapterHelpers,
  characterHelpers,
  getPartySlotBaseOptions,
  mergeClass,
  getCharacterColor,
} from '@utils';
import type { ComponentType, SVGProps } from 'react';
import KrisIcon from '@assets/deltarune/characters/kris.svg?react';
import SusieIcon from '@assets/deltarune/characters/susie.svg?react';
import RalseiIcon from '@assets/deltarune/characters/ralsei.svg?react';
import NoelleIcon from '@assets/deltarune/characters/noelle.svg?react';
import {
  getCharacterTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';

const BATTLE_ICONS: Partial<
  Record<CharacterIndex, ComponentType<SVGProps<SVGSVGElement>>>
> = {
  [CHARACTERS.KRIS]: KrisIcon,
  [CHARACTERS.SUSIE]: SusieIcon,
  [CHARACTERS.RALSEI]: RalseiIcon,
  [CHARACTERS.NOELLE]: NoelleIcon,
};

interface CharacterCardProps {
  slot: number;
  character: CharacterIndex;
  allowNonStandardParty: boolean;
}

function CharacterCard({
  slot,
  character,
  allowNonStandardParty,
}: CharacterCardProps) {
  const { t } = useTranslation();
  const party = useSave((s) => s.save?.party) as CharacterIndex[] | undefined;
  const setField = useSave((s) => s.setSaveField);
  const { chapter, plot, flags, hasEgg, weapon, room } =
    useCharacterOverrideInputs(character);

  if (!party) return null;

  const chapterCharacters = chapterHelpers.getById(chapter).content
    .characters as Set<CharacterIndex>;
  let characterMeta = characterHelpers.getById(character);

  const isExisting = !!characterMeta;
  const isInChapter = chapterCharacters.has(character);
  const isValid = isExisting && isInChapter;

  if (!isExisting) {
    characterMeta = {
      allowedSlots: [],
      displayName: 'Unknown',
      title: {
        name: 'Unknown',
        description: 'This is unkown character',
      },
      lv: 0,
      allowedArmors: new Set([]),
      allowedWeapons: new Set([]),
      allowedSpells: new Set([]),
    };
  } else {
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
  }

  let selectItems = getPartySlotBaseOptions(
    chapter,
    slot,
    allowNonStandardParty,
  );

  if (!allowNonStandardParty) {
    const usedInOtherSlots = new Set(
      party.filter((partyMember, i) => {
        if (partyMember === 0) return false;
        return i !== slot;
      }),
    );
    selectItems = selectItems.filter(
      (item) =>
        item.value === character ||
        !usedInOtherSlots.has(item.value as CharacterIndex),
    );

    if (party[2] !== CHARACTERS.EMPTY && slot === 1) {
      selectItems = selectItems.slice(1);
    }
  }

  if (!isValid) {
    selectItems = [
      ...selectItems,
      {
        id: `${character}`,
        label: characterMeta.displayName,
        value: character,
        invalid: true,
      },
    ];
  }

  const selectedItem =
    selectItems.find((it) => parseInt(it.id, 10) === party[slot]) ?? null;

  const color = getCharacterColor(character);
  const Icon = BATTLE_ICONS[character];
  return (
    <Section
      id={`slot${slot}`}
      className="flex flex-col h-[450px] lg:h-full min-h-[450px] max-h-[900px] w-full"
    >
      <Card className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 py-6 lg:py-10 justify-between items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Heading level={1}>{slot + 1}</Heading>
            <Heading level={5}>{t('ui.party.member', 'MEMBER')}</Heading>
            {isExisting && isInChapter && Icon && (
              <span
                className={mergeClass(
                  'inline-flex h-24 w-24 shrink-0 items-center justify-center',
                  color.text,
                )}
                aria-hidden
              >
                <Icon className="h-full w-full" />
              </span>
            )}
            <Heading level={3} className={mergeClass('uppercase', color.text)}>
              {
                translateMeta(
                  getCharacterTranslationKeyPrefix(character),
                  characterMeta,
                  t,
                ).displayName
              }
            </Heading>
          </div>
          <div className="flex flex-col justify-between items-center">
            <Heading
              level={4}
              className={mergeClass(
                !character || !isExisting ? 'opacity-0' : '',
              )}
            >
              LV{characterMeta.lv} {characterMeta.title.name}
            </Heading>
            <p className="text-text-2 text-sm text-center max-w-xs">
              {characterMeta.title.description}
            </p>
          </div>

          <Select
            label={`Slot ${slot}`}
            items={selectItems}
            defaultSelectedItem={selectedItem}
            selectedItem={selectedItem}
            onSelectionChange={(item) => {
              if (!item) return;
              const newCharacter = item.value as CharacterIndex;
              const newParty: [CharacterIndex, CharacterIndex, CharacterIndex] =
                [party[0], party[1], party[2]];
              newParty[slot] = newCharacter;
              setField('party', newParty);
            }}
          />
        </div>
        <GlowBar bg={color.bg} shadow={color.shadow} />
      </Card>
    </Section>
  );
}

export function PartyOverview() {
  const { t } = useTranslation();
  const party = useSave((s) => s.save?.party) as CharacterIndex[] | undefined;
  const allowNonStandardParty = useUi((s) => s.ui.party.allowNonStandardParty);
  const updateUi = useUi((s) => s.updateUi);

  if (!party) return null;

  return (
    <div className="page lg:h-full">
      <InlineGroup>
        <Checkbox
          label={t(
            'ui.party.allowNonStandardParty',
            'Allow non-standard party combinations',
          )}
          checked={allowNonStandardParty}
          onChange={(state) =>
            updateUi((ui) => (ui.party.allowNonStandardParty = state))
          }
        />
        <HelpTip
          title={t(
            'ui.party.allowNonStandardParty',
            'Allow non-standard party combinations',
          )}
        >
          <p>
            {t(
              'ui.party.allowNonStandardPartyDescription',
              'Enabling this allows you to set every character at every slot.',
            )}
          </p>
          <p>
            The game isn't usually set up to handle this, so using it will
            usually lead to a lot of crashes.
          </p>
        </HelpTip>
      </InlineGroup>
      <div className="flex flex-col lg:flex-row gap-3 lg:h-[90%]">
        <CharacterCard
          slot={0}
          character={party[0]}
          allowNonStandardParty={allowNonStandardParty}
        />
        <CharacterCard
          slot={1}
          character={party[1]}
          allowNonStandardParty={allowNonStandardParty}
        />
        <CharacterCard
          slot={2}
          character={party[2]}
          allowNonStandardParty={allowNonStandardParty}
        />
      </div>
    </div>
  );
}

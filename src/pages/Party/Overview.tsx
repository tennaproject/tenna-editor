import {
  Card,
  CharacterIcon,
  Checkbox,
  EquipmentIcon,
  EquipmentTooltip,
  Heading,
  HelpTip,
  InlineGroup,
  Section,
  Select,
  GlowBar,
} from '@components';
import {
  CHAPTERS,
  CHARACTERS,
  type ArmorIndex,
  type CharacterIndex,
  type WeaponIndex,
} from '@data';
import { useCharacterOverrideInputs } from '@hooks';
import { useSave, useUi } from '@store';
import {
  armorHelpers,
  chapterHelpers,
  characterHelpers,
  getPartySlotBaseOptions,
  mergeClass,
  getCharacterColor,
  weaponHelpers,
} from '@utils';
import {
  formatTranslation,
  getArmorTranslationKeyPrefix,
  getCharacterTitleTranslationKeyPrefix,
  getCharacterTranslationKeyPrefix,
  getWeaponTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';

interface EquipmentRowProps {
  type: 'weapon' | 'armor';
  id: number;
}

function EquipmentRow({ type, id }: EquipmentRowProps) {
  const { t } = useTranslation();

  const meta =
    type === 'weapon'
      ? weaponHelpers.getById(id as WeaponIndex)
      : armorHelpers.getById(id as ArmorIndex);
  const keyPrefix =
    type === 'weapon'
      ? getWeaponTranslationKeyPrefix(id)
      : getArmorTranslationKeyPrefix(id);
  const displayName = translateMeta(
    keyPrefix,
    { displayName: meta?.displayName ?? t('ui.common.unknown', 'Unknown') },
    t,
  ).displayName;

  return (
    <EquipmentTooltip type={type} id={id}>
      <InlineGroup className="gap-1">
        {meta?.icon !== undefined && <EquipmentIcon icon={meta.icon} />}
        <span className="text-text-2 text-sm">{displayName}</span>
      </InlineGroup>
    </EquipmentTooltip>
  );
}

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
  const savedCharacter = useSave((s) => s.save?.characters[character]);
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
      displayName: t('ui.common.unknown', 'Unknown'),
      title: {
        name: t('ui.common.unknown', 'Unknown'),
        description: t(
          'ui.party.unknownCharacterDescription',
          'This is unknown character',
        ),
      },
      lv: 0,
      allowedArmors: new Set([]),
      allowedWeapons: new Set([]),
      allowedSpells: new Set([]),
      baseStats: {
        [CHAPTERS.CH1]: { maxHealth: 0, attack: 0, defence: 0, magic: 0 },
        [CHAPTERS.CH2]: { maxHealth: 0, attack: 0, defence: 0, magic: 0 },
        [CHAPTERS.CH3]: { maxHealth: 0, attack: 0, defence: 0, magic: 0 },
        [CHAPTERS.CH4]: { maxHealth: 0, attack: 0, defence: 0, magic: 0 },
        [CHAPTERS.CH5]: { maxHealth: 0, attack: 0, defence: 0, magic: 0 },
      },
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
  ).map((item) => ({
    ...item,
    label: translateMeta(
      getCharacterTranslationKeyPrefix(item.value as CharacterIndex),
      { displayName: item.label },
      t,
    ).displayName,
  }));

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
        label: translateMeta(
          getCharacterTranslationKeyPrefix(character),
          characterMeta,
          t,
        ).displayName,
        value: character,
        invalid: true,
      },
    ];
  }

  const selectedItem =
    selectItems.find((it) => parseInt(it.id, 10) === party[slot]) ?? null;

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
      id={`slot${slot}`}
      className="flex flex-col h-[450px] lg:h-full min-h-[450px] max-h-[900px] w-full"
    >
      <Card className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 py-6 lg:py-10 justify-between items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Heading level={1}>{slot + 1}</Heading>
            <Heading level={5}>{t('ui.party.member', 'MEMBER')}</Heading>
            {isExisting && isInChapter && (
              <span
                className={mergeClass(
                  'inline-flex h-24 w-24 shrink-0 items-center justify-center',
                  color.text,
                )}
                aria-hidden
              >
                <CharacterIcon character={character} />
              </span>
            )}
            <Heading level={3} className={mergeClass('uppercase', color.text)}>
              {translatedCharacter.displayName}
            </Heading>
          </div>
          <div className="flex flex-col justify-between items-center">
            <Heading
              level={4}
              className={mergeClass(
                !character || !isExisting ? 'opacity-0' : '',
              )}
            >
              {formatTranslation(t('ui.party.level', 'LV{level}'), {
                level: characterMeta.lv,
              })}{' '}
              {titleName}
            </Heading>
            <p className="text-text-2 text-sm text-center max-w-xs">
              {titleDescription}
            </p>
            <div
              className={mergeClass(
                'flex flex-col items-left mt-4',
                !character || !isExisting ? 'opacity-0' : '',
              )}
              aria-hidden={!character || !isExisting}
            >
              <EquipmentRow type="weapon" id={savedCharacter?.weapon ?? 0} />
              <EquipmentRow
                type="armor"
                id={savedCharacter?.primaryArmor ?? 0}
              />
              <EquipmentRow
                type="armor"
                id={savedCharacter?.secondaryArmor ?? 0}
              />
            </div>
          </div>

          <Select
            label={formatTranslation(t('ui.party.slot', 'Slot {slot}'), {
              slot: slot + 1,
            })}
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
            {t(
              'ui.party.allowNonStandardPartyCrashWarning',
              "The game isn't usually set up to handle this, so using it will usually lead to a lot of crashes.",
            )}
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

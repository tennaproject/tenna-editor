import {
  Card,
  Checkbox,
  Heading,
  HelpTip,
  InlineGroup,
  Section,
  Select,
  GlowBar,
  type SelectItem,
} from '@components';
import {
  CHARACTERS,
  FLAGS,
  KEYITEMS,
  ROOMS,
  type CharacterIndex,
  type WeaponIndex,
} from '@data';
import { useSaveFlag } from '@hooks';
import { useSave, useUi } from '@store';
import {
  chapterHelpers,
  characterHelpers,
  mergeClass,
  getCharacterColor,
} from '@utils';

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
  const party = useSave((s) => s.save?.party) as CharacterIndex[] | undefined;
  const setField = useSave((s) => s.setSaveField);
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const plot = useSave((s) => s.save?.plot) || 0;

  // Flags for overrides
  const flags = {
    inspectedBedsCh1: !!useSaveFlag(FLAGS.INSPECTED_BEDS_CH1),
    inspectedBedKris: !!useSaveFlag(FLAGS.INSPECTED_BED_KRIS),
    inspectedBedSusie: !!useSaveFlag(FLAGS.INSPECTED_BED_SUSIE),
    inspectedBedLancer: !!useSaveFlag(FLAGS.INSPECTED_BED_LANCER),
    inspectedBedClover: !!useSaveFlag(FLAGS.INSPECTED_BED_CLOVER),
    inspectedBedNoelle: !!useSaveFlag(FLAGS.INSPECTED_BED_NOELLE),
    inspectedBedsCh2: !!useSaveFlag(FLAGS.INSPECTED_BEDS_CH2),
    weirdRouteProgressCh2: useSaveFlag(FLAGS.WEIRDROUTE_PROGRESS_CH2) as number,
    weirdRouteFailed: !!useSaveFlag(FLAGS.WEIRDROUTE_FAILED),
    swordProgress: useSaveFlag(FLAGS.SWORD_PROGRESS) as number,
    gotMossCh1: !!useSaveFlag(FLAGS.GOT_MOSS_CH1),
    gotMossCh2: !!useSaveFlag(FLAGS.GOT_MOSS_CH2),
    gotMossCh3: !!useSaveFlag(FLAGS.GOT_MOSS_CH3),
    gotMossCh4: !!useSaveFlag(FLAGS.GOT_MOSS_CH4),
    gotMossWithSusie: !!useSaveFlag(FLAGS.GOT_MOSS_WITH_SUSIE),
    axeOfJusticeProgress: useSaveFlag(FLAGS.AXE_OF_JUSTICE_PROGRESS) as number,
    ralseiPhotoStatus: useSaveFlag(FLAGS.RALSEI_PHOTO_STATUS) as number,
    ralseiHorse: !!useSaveFlag(FLAGS.RALSEI_HORSE),
    gotMossWithNoelle: !!useSaveFlag(FLAGS.GOT_MOSS_WITH_NOELLE),
    noelleIceShockCount: useSaveFlag(FLAGS.NOELLE_ICE_SHOCK_COUNT) as number,
  };

  // Chapter 3 Egg check
  const keyItems = useSave((s) => s.save?.inventory.keyItems);
  const hasEgg = !!keyItems?.includes(KEYITEMS.EGG);

  // Weapon for Ralsei and Noelle title
  const characters = useSave((s) => s.save?.characters) || [];
  let weapon = 0 as WeaponIndex;
  // This is not pretty but fixes the edge case when there is a Chapter 1 save loaded with Noelle selected in whatever slot
  if (characters[character]) {
    weapon = characters[character].weapon;
  }

  // Room for Ralsei's title
  const room = useSave((s) => s.save?.room) || ROOMS.PLACE_DOG;

  if (!party) return null;

  const chapterCharacters = chapterHelpers.getById(chapter).content
    .characters as Set<CharacterIndex>;
  let characterMeta = characterHelpers.getById(character);

  const isExisting = !!characterMeta;
  const isInChapter = chapterCharacters.has(character);
  const isValid = isExisting && isInChapter;

  // If doesn't exist
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
    // Apply overrides
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

  let availableCharacters: CharacterIndex[] = [];
  for (const character of chapterCharacters.keys()) {
    const meta = characterHelpers.getById(character);
    for (const s of meta.allowedSlots) {
      if (slot === s) {
        availableCharacters.push(character as CharacterIndex);
      }
    }
  }

  if (allowNonStandardParty) {
    availableCharacters = Array.from(chapterCharacters);
  } else {
    const usedInOtherSlots = new Set(
      party.filter((character, i) => {
        if (character === 0) return false;
        return i !== slot;
      }),
    );
    availableCharacters = availableCharacters.filter(
      (c) => c === character || !usedInOtherSlots.has(c),
    );
  }

  availableCharacters.sort();

  if (party[2] !== CHARACTERS.EMPTY && !allowNonStandardParty && slot === 1) {
    availableCharacters.shift();
  }

  const selectItems: SelectItem[] = availableCharacters.map((c) => ({
    id: `${c}`,
    label: characterHelpers.getById(c).displayName,
    value: c,
  }));

  if (!isValid) {
    selectItems.push({
      id: `${character}`,
      label: characterMeta.displayName,
      value: character,
      invalid: true,
    });
  }

  const selectedItem =
    selectItems.find((it) => parseInt(it.id, 10) === party[slot]) ?? null;

  const color = getCharacterColor(character);
  return (
    <Section
      id={`slot${slot}`}
      className="flex flex-col h-[450px] lg:h-full min-h-[450px] max-h-[900px] w-full"
    >
      <Card className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 py-6 lg:py-10 justify-between items-center">
          <div className="flex flex-col justify-center items-center gap-1">
            <Heading level={1}>{slot + 1}</Heading>
            <Heading level={5}>MEMBER</Heading>
            <Heading level={3} className={mergeClass('uppercase', color.text)}>
              {characterMeta.displayName}
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
            <p className="text-text-2 text-sm">
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
  const party = useSave((s) => s.save?.party) as CharacterIndex[] | undefined;
  const allowNonStandardParty = useUi((s) => s.ui.party.allowNonStandardParty);
  const updateUi = useUi((s) => s.updateUi);

  if (!party) return null;

  return (
    <div className="page lg:h-full">
      <InlineGroup>
        <Checkbox
          label="Allow non-standard party combinations"
          checked={allowNonStandardParty}
          onChange={(state) =>
            updateUi((ui) => (ui.party.allowNonStandardParty = state))
          }
        />
        <HelpTip title="Allow non-standard party combinations">
          <p>Enabling this allows you to set every character at every slot.</p>
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

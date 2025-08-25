import { Heading, Section } from '@components';
import {
  FLAGS,
  KEYITEMS,
  ROOMS,
  type CharacterIndex,
  type WeaponIndex,
} from '@data';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import { characterHelpers, getCharacterColor, mergeClass } from '@utils';

interface TitleFieldProps {
  character: CharacterIndex;
}

export function TitleField({ character }: TitleFieldProps) {
  const chapter = useSave((s) => s.saveFile?.chapter) || 1;
  const plot = useSave((s) => s.saveFile?.plot) || 0;

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
  const keyItems = useSave((s) => s.saveFile?.inventory.keyItems);
  const hasEgg = !!keyItems?.includes(KEYITEMS.EGG);

  // Weapon for Ralsei and Noelle title
  const weapon =
    useSave((s) => s.saveFile?.characters[character].weapon) ||
    (0 as WeaponIndex);

  // Room for Ralsei's title
  const room = useSave((s) => s.saveFile?.room) || ROOMS.PLACE_DOG;
  let characterMeta = characterHelpers.getById(character);

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

  const color = getCharacterColor(character);
  return (
    <Section
      id="main-title"
      className="flex flex-col items-center border-b border-divider px-2 py-4"
    >
      <Heading level={2} className={mergeClass('uppercase mb-1', color.text)}>
        {characterMeta.displayName}
      </Heading>
      <Heading level={5}>
        LV{characterMeta.lv} {characterMeta.title.name}
      </Heading>
      <p className="text-text-2 text-sm">{characterMeta.title.description}</p>
    </Section>
  );
}

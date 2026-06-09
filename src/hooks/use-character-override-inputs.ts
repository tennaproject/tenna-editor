import {
  FLAGS,
  KEYITEMS,
  ROOMS,
  type CharacterIndex,
  type RoomIndex,
  type WeaponIndex,
} from '@data';
import { useSave } from '@store';
import { useSaveFlag } from './use-save-flag';

export function useCharacterOverrideInputs(character: CharacterIndex) {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const plot = useSave((s) => s.save?.plot) || 0;

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
    axeOfJusticeProgress: useSaveFlag(
      FLAGS.CHURCH_AXE_OF_JUSTICE_PROGRESS,
    ) as number,
    ralseiPhotoStatus: useSaveFlag(FLAGS.RALSEI_PHOTO_STATUS) as number,
    ralseiHorse: !!useSaveFlag(FLAGS.RALSEI_HORSE),
    gotMossWithNoelle: !!useSaveFlag(FLAGS.GOT_MOSS_WITH_NOELLE),
    noelleIceShockCount: useSaveFlag(FLAGS.NOELLE_ICE_SHOCK_COUNT) as number,
  };

  const hasEgg = useSave(
    (s) => s.save?.inventory.keyItems?.includes(KEYITEMS.EGG) ?? false,
  );

  const weapon = useSave(
    (s) => (s.save?.characters[character]?.weapon ?? 0) as WeaponIndex,
  );

  const room = useSave((s) => (s.save?.room ?? ROOMS.PLACE_DOG) as RoomIndex);

  return { chapter, plot, flags, hasEgg, weapon, room };
}
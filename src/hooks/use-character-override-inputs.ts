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
    inspectedBedKris: !!useSaveFlag(FLAGS.INSPECTED_KRIS_BED),
    inspectedBedSusie: !!useSaveFlag(FLAGS.INSPECTED_SUSIE_BED),
    inspectedBedLancer: !!useSaveFlag(FLAGS.INSPECTED_LANCER_BED),
    inspectedBedClover: !!useSaveFlag(FLAGS.INSPECTED_CLOVER_BED),
    inspectedBedNoelle: !!useSaveFlag(FLAGS.INSPECTED_NOELLE_BED),
    inspectedBedsCh2: !!useSaveFlag(FLAGS.BED_INSPECTOR_CH2),
    weirdRouteProgressCh2: useSaveFlag(
      FLAGS.SNOWGRAVE_ROUTE_PROGRESS,
    ) as number,
    weirdRouteFailed: !!useSaveFlag(FLAGS.SNOWGRAVE_FAIL),
    swordProgress: useSaveFlag(FLAGS.SWORD_ROUTE_PROGRESS) as number,
    gotMossCh1: !!useSaveFlag(FLAGS.ATE_MOSS_CH1),
    gotMossCh2: !!useSaveFlag(FLAGS.OBTAINED_MOSS_CH2),
    gotMossCh3: !!useSaveFlag(FLAGS.OBTAINED_MOSS_CH3),
    gotMossCh4: !!useSaveFlag(FLAGS.MOSS_OUTCOME_CH4),
    gotMossWithSusie: !!useSaveFlag(FLAGS.ATE_MOSS_WITH_SUSIE),
    axeOfJusticeProgress: useSaveFlag(FLAGS.JUSTICE_AXE_REWARD_STATE) as number,
    ralseiPhotoStatus: useSaveFlag(FLAGS.RALSEI_PHOTO_STATE) as number,
    ralseiHorse: !!useSaveFlag(FLAGS.HORSE_RALSEI),
    gotMossWithNoelle: !!useSaveFlag(FLAGS.ATE_MOSS_WITH_NOELLE),
    noelleIceShockCount: useSaveFlag(FLAGS.ICESHOCKS) as number,
    susieCanEquipRibbons: useSaveFlag(FLAGS.RIBBON_CHEST_STATE) > 0,
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

import EquipmentIcon0 from '@assets/deltarune/equipment/equipment-icon-0.png';
import EquipmentIcon1 from '@assets/deltarune/equipment/equipment-icon-1.png';
import EquipmentIcon2 from '@assets/deltarune/equipment/equipment-icon-2.png';
import EquipmentIcon3 from '@assets/deltarune/equipment/equipment-icon-3.png';
import EquipmentIcon4 from '@assets/deltarune/equipment/equipment-icon-4.png';
import EquipmentIcon5 from '@assets/deltarune/equipment/equipment-icon-5.png';
import EquipmentIcon6 from '@assets/deltarune/equipment/equipment-icon-6.png';
import EquipmentIcon7 from '@assets/deltarune/equipment/equipment-icon-7.png';
import EquipmentIcon8 from '@assets/deltarune/equipment/equipment-icon-8.png';
import EquipmentIcon9 from '@assets/deltarune/equipment/equipment-icon-9.png';
import EquipmentIcon10 from '@assets/deltarune/equipment/equipment-icon-10.png';
import EquipmentIcon11 from '@assets/deltarune/equipment/equipment-icon-11.png';
import EquipmentIcon12 from '@assets/deltarune/equipment/equipment-icon-12.png';
import EquipmentIcon13 from '@assets/deltarune/equipment/equipment-icon-13.png';
import EquipmentIcon14 from '@assets/deltarune/equipment/equipment-icon-14.png';
import EquipmentIcon15 from '@assets/deltarune/equipment/equipment-icon-15.png';
import EquipmentIcon16 from '@assets/deltarune/equipment/equipment-icon-16.png';
import EquipmentIcon17 from '@assets/deltarune/equipment/equipment-icon-17.png';
import EquipmentIcon18 from '@assets/deltarune/equipment/equipment-icon-18.png';
import EquipmentIcon19 from '@assets/deltarune/equipment/equipment-icon-19.png';
import EquipmentIcon20 from '@assets/deltarune/equipment/equipment-icon-20.png';
import EquipmentIcon21 from '@assets/deltarune/equipment/equipment-icon-21.png';
import EquipmentIcon22 from '@assets/deltarune/equipment/equipment-icon-22.png';
import EquipmentIcon23 from '@assets/deltarune/equipment/equipment-icon-23.png';
import EquipmentIcon24 from '@assets/deltarune/equipment/equipment-icon-24.png';
import EquipmentIcon25 from '@assets/deltarune/equipment/equipment-icon-25.png';
import EquipmentIcon26 from '@assets/deltarune/equipment/equipment-icon-26.png';
import EquipmentIcon27 from '@assets/deltarune/equipment/equipment-icon-27.png';
import EquipmentIcon28 from '@assets/deltarune/equipment/equipment-icon-28.png';
import EquipmentIcon29 from '@assets/deltarune/equipment/equipment-icon-29.png';
import EquipmentIcon30 from '@assets/deltarune/equipment/equipment-icon-30.png';
import EquipmentIcon31 from '@assets/deltarune/equipment/equipment-icon-31.png';
import EquipmentIcon32 from '@assets/deltarune/equipment/equipment-icon-32.png';
import EquipmentIcon33 from '@assets/deltarune/equipment/equipment-icon-33.png';
import EquipmentIcon34 from '@assets/deltarune/equipment/equipment-icon-34.png';
import EquipmentIcon35 from '@assets/deltarune/equipment/equipment-icon-35.png';
import EquipmentIcon36 from '@assets/deltarune/equipment/equipment-icon-36.png';
import EquipmentIcon37 from '@assets/deltarune/equipment/equipment-icon-37.png';
import EquipmentIcon38 from '@assets/deltarune/equipment/equipment-icon-38.png';
import MinusIcon from '@assets/icons/minus.svg?react';

import { EQUIPMENT_ICONS, type EquipmentIconIndex } from '@data';
import { mergeClass } from '@utils/merge-class';

// Keyed by sprite number rather than by EQUIPMENT_ICONS name so that renaming
// or remapping an icon cannot silently point it at the wrong file.
const EQUIPMENT_ICON_SOURCES: Record<EquipmentIconIndex, string> = {
  0: EquipmentIcon0,
  1: EquipmentIcon1,
  2: EquipmentIcon2,
  3: EquipmentIcon3,
  4: EquipmentIcon4,
  5: EquipmentIcon5,
  6: EquipmentIcon6,
  7: EquipmentIcon7,
  8: EquipmentIcon8,
  9: EquipmentIcon9,
  10: EquipmentIcon10,
  11: EquipmentIcon11,
  12: EquipmentIcon12,
  13: EquipmentIcon13,
  14: EquipmentIcon14,
  15: EquipmentIcon15,
  16: EquipmentIcon16,
  17: EquipmentIcon17,
  18: EquipmentIcon18,
  19: EquipmentIcon19,
  20: EquipmentIcon20,
  21: EquipmentIcon21,
  22: EquipmentIcon22,
  23: EquipmentIcon23,
  24: EquipmentIcon24,
  25: EquipmentIcon25,
  26: EquipmentIcon26,
  27: EquipmentIcon27,
  28: EquipmentIcon28,
  29: EquipmentIcon29,
  30: EquipmentIcon30,
  31: EquipmentIcon31,
  32: EquipmentIcon32,
  33: EquipmentIcon33,
  34: EquipmentIcon34,
  35: EquipmentIcon35,
  36: EquipmentIcon36,
  37: EquipmentIcon37,
  38: EquipmentIcon38,
};

interface EquipmentIconProps {
  icon: EquipmentIconIndex;
  className?: string;
}

// icons scaled up by 2x
export function EquipmentIcon({ icon, className }: EquipmentIconProps) {
  if (icon === EQUIPMENT_ICONS.EMPTY) {
    return (
      <span
        aria-hidden
        className={mergeClass(
          'inline-flex h-[24px] w-[20px] items-center justify-center -space-x-px',
          className,
        )}
      >
        <MinusIcon className="size-2.5" />
        <MinusIcon className="size-2.5" />
      </span>
    );
  }

  return (
    <img
      src={EQUIPMENT_ICON_SOURCES[icon]}
      alt=""
      draggable={false}
      className={mergeClass(
        'block h-[24px] w-[20px] [image-rendering:pixelated]',
        className,
      )}
    />
  );
}

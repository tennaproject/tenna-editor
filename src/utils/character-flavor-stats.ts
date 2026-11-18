import {
  CHARACTERS,
  EQUIPMENT_ICONS,
  FLAGS,
  WEAPONS,
  type CharacterIndex,
  type EquipmentIconIndex,
} from '@data';

export type FlavorLabel =
  | 'guts'
  | 'rudeness'
  | 'crudeness'
  | 'purple'
  | 'plucked'
  | 'healing'
  | 'kindness'
  | 'sweetness'
  | 'carried'
  | 'fluffiness'
  | 'coldness'
  | 'boldness'
  | 'jumps'
  | 'slashes'
  | 'slain'
  | 'purify';

type FlavorRow = 'guts' | 'upper' | 'lower';

const ROWS: FlavorRow[] = ['guts', 'upper', 'lower'];

export interface FlavorStat {
  row?: FlavorRow;
  label?: FlavorLabel;
  icon?: EquipmentIconIndex;
  asterisk?: boolean;
  value?: string;
  repeat?: number;
  unknown?: boolean;
}

interface FlavorStatInputs {
  character: CharacterIndex;
  chapter: number;
  plot: number;
  flags: unknown[];
  krisMagic: number;
  weapon: number;
}

const UNKNOWN: FlavorStat = { unknown: true };

function inRows(stats: FlavorStat[]): FlavorStat[] {
  return stats.map((stat, index) => ({ ...stat, row: ROWS[index] }));
}

const KRIS_GUTS = [1, 2, 2, 3, 3];
const SUSIE_GUTS = [2, 2, 3, 4, 4];

export function getCharacterFlavorStats({
  character,
  chapter,
  plot,
  flags,
  krisMagic,
  weapon,
}: FlavorStatInputs): FlavorStat[] {
  const flag = (id: number) => Number(flags[id] ?? 0);
  const guts = (repeat: number): FlavorStat => ({
    label: 'guts',
    icon: EQUIPMENT_ICONS.FLAME,
    repeat,
  });

  if (character === CHARACTERS.KRIS) {
    const rows = [guts(KRIS_GUTS[chapter - 1])];

    if (chapter === 3) {
      const kills = flag(FLAGS.SWORD_ROUTE_KILLS);
      rows.push(
        UNKNOWN,
        kills > 0
          ? { asterisk: true, value: `${Math.min(kills, 9999)}` }
          : UNKNOWN,
      );
    } else if (chapter === 4) {
      const purified = Math.max(0, flag(FLAGS.PURIFIED_COUNT));
      const slain = Math.max(0, flag(FLAGS.SLAIN_COUNT));
      rows.push(
        UNKNOWN,
        purified || slain
          ? slain < purified
            ? { label: 'purify', asterisk: true, value: `${purified}` }
            : { label: 'slain', asterisk: true, value: `${slain}` }
          : UNKNOWN,
      );
    } else if (chapter === 5 && flag(FLAGS.OBTAINED_PETAL_FEATHER)) {
      rows.push(
        {
          label: 'jumps',
          icon: EQUIPMENT_ICONS.ARROW_UP,
          value: `${flag(FLAGS.PLATMODE_JUMP_COUNT)}`,
        },
        {
          label: 'slashes',
          icon: EQUIPMENT_ICONS.SWORD,
          value: `${flag(FLAGS.PLATMODE_SWING_COUNT)}`,
        },
      );
    } else {
      rows.push(UNKNOWN, UNKNOWN);
    }

    return inRows(rows);
  }

  if (character === CHARACTERS.SUSIE) {
    let rudeness = 100;
    if (chapter === 1 && plot >= 154) rudeness = 99;
    if (chapter === 2) rudeness = 89;

    const rows: FlavorStat[] = [
      guts(SUSIE_GUTS[chapter - 1]),
      { label: 'rudeness', icon: EQUIPMENT_ICONS.RUDE, value: `${rudeness}` },
    ];

    if (chapter === 1) {
      rows.push({
        label: 'crudeness',
        icon: EQUIPMENT_ICONS.RUDE,
        value: flag(FLAGS.TEAM_NAME) === 1 ? '101' : '100',
      });
    } else if (chapter === 2) {
      rows.push({ label: 'purple', icon: EQUIPMENT_ICONS.RUDE });
    } else if (chapter === 3) {
      const plucked = flag(FLAGS.PLUCKED_GRASS_COUNT);
      rows.push(
        plucked > 0
          ? { label: 'plucked', value: `${Math.min(plucked, 99)}` }
          : UNKNOWN,
      );
    } else {
      // The game reads global.mag[1] here, which is Kris's magic.
      const practice = 2 * flag(FLAGS.SUSIE_HEAL_PRACTICE_COUNT);
      const healing =
        flag(FLAGS.DEFEATED_HAMMER_OF_JUSTICE) === 1
          ? krisMagic * 10 + practice
          : krisMagic * 5 + 15 + practice;
      rows.push(
        healing
          ? { label: 'healing', asterisk: true, value: `${healing}` }
          : UNKNOWN,
      );
    }

    return inRows(rows);
  }

  if (character === CHARACTERS.RALSEI) {
    const rows = [guts(chapter === 3 ? 1 : 0)];
    let fluff = 1;

    if (chapter === 1) {
      if (weapon === WEAPONS.DAINTY_SCARF) fluff += 1;
      rows.push({
        label: 'kindness',
        icon: EQUIPMENT_ICONS.SMILE,
        value: '100',
      });
    } else if (chapter === 2) {
      fluff += 1;
      rows.push({
        label: 'sweetness',
        icon: EQUIPMENT_ICONS.LOLIPOP,
        value: '97',
      });
    } else if (chapter === 3) {
      const carried = flag(FLAGS.CARRIED_RALSEI_COUNT);
      rows.push(
        carried === 0
          ? UNKNOWN
          : {
              label: 'carried',
              value: `${Math.min(Math.max(carried, 0), 99)}`,
            },
      );
    } else if (chapter === 4) {
      rows.push(UNKNOWN);
    }

    rows.push({
      label: 'fluffiness',
      icon: EQUIPMENT_ICONS.FLUFF,
      repeat: fluff,
    });

    return inRows(rows);
  }

  if (character === CHARACTERS.NOELLE) {
    const coldness = Math.min(
      Math.max(47 + flag(FLAGS.ICESHOCKS) * 7, 47),
      100,
    );
    const boldness = Math.min(-12 + (plot - 70) * 3, 100);

    return inRows([
      guts(0),
      {
        label: 'coldness',
        icon: EQUIPMENT_ICONS.SNOWFLAKE,
        value: `${coldness}`,
      },
      {
        label: 'boldness',
        icon: EQUIPMENT_ICONS.EXCLAMATION,
        value: `${boldness}`,
      },
    ]);
  }

  return [];
}

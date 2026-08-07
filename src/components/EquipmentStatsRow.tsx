import { EQUIPMENT_STAT_ICONS, EQUIPMENT_STAT_ORDER } from '@data';
import type { EquipmentStats } from '@types';
import { mergeClass } from '@utils/merge-class';
import { EquipmentIcon } from './EquipmentIcon';
import { InlineGroup } from './InlineGroup';

function getComparisonClass(delta: number) {
  if (delta > 0) return 'text-green';
  if (delta < 0) return 'text-red';
  return 'text-text-2';
}

interface EquipmentStatsRowProps {
  stats: EquipmentStats;
  className?: string;
  compareTo?: EquipmentStats;
}

export function EquipmentStatsRow({
  stats,
  className,
  compareTo,
}: EquipmentStatsRowProps) {
  return (
    <InlineGroup className={mergeClass('gap-3 text-sm', className)}>
      {EQUIPMENT_STAT_ORDER.map((stat) => {
        const value = stats[stat];
        const empty = value <= 0;
        const dimmed = !compareTo && empty;

        return (
          <InlineGroup key={stat} className="gap-1">
            <EquipmentIcon
              icon={EQUIPMENT_STAT_ICONS[stat]}
              className={dimmed ? 'opacity-30' : undefined}
            />
            <span
              className={
                compareTo
                  ? getComparisonClass(value - compareTo[stat])
                  : empty
                    ? 'text-text-3'
                    : 'text-text-2'
              }
            >
              {value}
            </span>
          </InlineGroup>
        );
      })}
    </InlineGroup>
  );
}

import { mergeClass } from '@utils/merge-class';

interface HealthBarProps {
  health: number;
  maxHealth: number;
  bg: string;
  className?: string;
}

export function HealthBar({
  health,
  maxHealth,
  bg,
  className,
}: HealthBarProps) {
  const current = Number(health);
  const max = Number(maxHealth);
  const percent = max > 0 ? Math.min(Math.max(current / max, 0), 1) * 100 : 0;

  return (
    <div className={mergeClass('h-2 bg-surface-3', className)}>
      <div
        className={mergeClass('h-full', bg)}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

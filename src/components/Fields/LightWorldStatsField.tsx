import { FieldWrapper, NumberInput } from '@components';
import { useSave } from '@store';

type LightWorldStatsType =
  | 'attack'
  | 'defence'
  | 'experience'
  | 'health'
  | 'maxHealth'
  | 'level';

const STATS_TITLES: Record<LightWorldStatsType, string> = {
  attack: 'Attack',
  defence: 'Defence',
  experience: 'Experience',
  health: 'Current HP',
  maxHealth: 'Max HP',
  level: 'Level',
} as const;

interface LightWorldStatsFieldProps {
  id?: string;
  type: LightWorldStatsType;
}

export function LightWorldStatsField({ id, type }: LightWorldStatsFieldProps) {
  const current =
    useSave((s) => {
      if (s.save) {
        return s.save.lightWorld[type];
      }
    }) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.lightWorld[type] = value;
    });
  }

  return (
    <FieldWrapper id={id} className="flex-1" title={STATS_TITLES[type]} label>
      <NumberInput
        value={current}
        placeholder={`Enter value...`}
        min={0}
        max={9999}
        onChange={onChange}
        fullWidth
      />
    </FieldWrapper>
  );
}

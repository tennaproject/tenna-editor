import { NumberInput, Section, TextLabel } from '@components';
import { useSave } from '@store';
import type { LightWorld } from '@types';

type StatKind =
  | 'attack'
  | 'defence'
  | 'experience'
  | 'level'
  | 'health'
  | 'maxHealth';

interface StatsAttackFieldProps {
  kind: StatKind;
  label: string;
  id: string;
}

export function StatField({ kind, label, id }: StatsAttackFieldProps) {
  const lightWorld = useSave((s) => s.saveFile?.lightWorld) as LightWorld;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.lightWorld[kind] = value;
    });
  }

  return (
    <Section id={id} className="flex-1">
      <TextLabel>{label}</TextLabel>
      <NumberInput
        value={lightWorld[kind]}
        placeholder={`Enter ${kind}...`}
        min={0}
        max={999}
        onChange={onChange}
        fullWidth
      />
    </Section>
  );
}

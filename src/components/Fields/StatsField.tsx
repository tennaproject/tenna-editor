import { FieldWrapper, NumberInput } from '@components';
import type { CharacterIndex } from '@data';
import { useSave } from '@store';

type StatsType = 'attack' | 'defence' | 'magic' | 'health' | 'maxHealth';

const STATS_TITLES: Record<StatsType, string> = {
  attack: 'Attack',
  defence: 'Defence',
  magic: 'Magic',
  health: 'Current HP',
  maxHealth: 'Max HP',
} as const;

interface StatFieldProps {
  id?: string;
  type: StatsType;
  character: CharacterIndex;
}

export function StatsField({ id, type, character }: StatFieldProps) {
  const current =
    useSave((s) => {
      if (s.save) {
        return s.save.characters[character][type];
      }
    }) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.characters[character][type] = value;
    });
  }

  return (
    <FieldWrapper id={id} className="flex-1" title={STATS_TITLES[type]} label>
      <NumberInput
        value={current}
        placeholder={`Enter value...`}
        min={0}
        max={999}
        onChange={onChange}
        fullWidth
      />
    </FieldWrapper>
  );
}

import { NumberInput, Section, TextLabel } from '@components';
import type { CharacterIndex } from '@data';
import { useSave } from '@store';

interface StatsAttackFieldProps {
  character: CharacterIndex;
}

export function StatsAttackField({ character }: StatsAttackFieldProps) {
  const attack = useSave((s) => s.saveFile?.characters[character].attack) || 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.characters[character].attack = value;
    });
  }
  return (
    <Section id="main-stats-attack" className="flex-1">
      <TextLabel>Attack</TextLabel>
      <NumberInput
        value={attack}
        placeholder="Enter attack..."
        min={0}
        max={999}
        onChange={onChange}
        fullWidth
      />
    </Section>
  );
}

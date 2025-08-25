import { NumberInput, Section, TextLabel } from '@components';
import type { CharacterIndex } from '@data';
import { useSave } from '@store';

interface StatsDefenceFieldProps {
  character: CharacterIndex;
}

export function StatsDefenceField({ character }: StatsDefenceFieldProps) {
  const defence =
    useSave((s) => s.saveFile?.characters[character].defence) || 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.characters[character].defence = value;
    });
  }
  return (
    <Section id="main-stats-defence" className="flex-1">
      <TextLabel>Defence</TextLabel>
      <NumberInput
        value={defence}
        placeholder="Enter defence..."
        min={0}
        max={999}
        onChange={onChange}
        fullWidth
      />
    </Section>
  );
}

import { NumberInput, Section, TextLabel } from '@components';
import type { CharacterIndex } from '@data';
import { useSave } from '@store';

interface StatsMagicFieldProps {
  character: CharacterIndex;
}

export function StatsMagicField({ character }: StatsMagicFieldProps) {
  const magic = useSave((s) => s.saveFile?.characters[character].magic) || 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.characters[character].magic = value;
    });
  }

  return (
    <Section id="main-stats-magic" className="flex-1">
      <TextLabel>Magic</TextLabel>
      <NumberInput
        value={magic}
        placeholder="Enter magic..."
        min={0}
        max={999}
        onChange={onChange}
        fullWidth
      />
    </Section>
  );
}

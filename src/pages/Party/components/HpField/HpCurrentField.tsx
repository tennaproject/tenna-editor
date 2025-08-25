import { NumberInput, Section, TextLabel } from '@components';
import type { CharacterIndex } from '@data';
import { useSave } from '@store';

interface HpCurrentFieldProps {
  character: CharacterIndex;
}

export function HpCurrentField({ character }: HpCurrentFieldProps) {
  const health = useSave((s) => s.saveFile?.characters[character].health) || 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.characters[character].health = value;
    });
  }
  return (
    <Section id="main-hp-current" className="flex-1">
      <TextLabel>Current HP</TextLabel>
      <NumberInput
        value={health}
        placeholder="Enter current HP..."
        min={0}
        max={999}
        onChange={onChange}
        fullWidth
      />
    </Section>
  );
}

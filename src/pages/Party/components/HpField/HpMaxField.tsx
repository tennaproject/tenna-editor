import { NumberInput, Section, TextLabel } from '@components';
import type { CharacterIndex } from '@data';
import { useSave } from '@store';

interface HpMaxFieldProps {
  character: CharacterIndex;
}

export function HpMaxField({ character }: HpMaxFieldProps) {
  const maxHealth =
    useSave((s) => s.saveFile?.characters[character].maxHealth) || 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => {
      save.characters[character].maxHealth = value;
    });
  }

  return (
    <Section id="main-hp-max" className="flex-1">
      <TextLabel>Max HP</TextLabel>
      <NumberInput
        value={maxHealth}
        placeholder="Enter max HP..."
        min={0}
        max={999}
        onChange={onChange}
        fullWidth
      />
    </Section>
  );
}

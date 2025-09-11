import { InlineGroup, Section, TextInput, TextLabel } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils';

interface CharacterNameFieldProps {
  id?: string;
  className?: string;
}

export function CharacterNameField({ id, className }: CharacterNameFieldProps) {
  const characterName = useSave((s) => s.save?.characterName) ?? '';
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: string) {
    updateSave((save) => (save.characterName = value));
  }

  return (
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <InlineGroup>
        <TextLabel>Name</TextLabel>
      </InlineGroup>
      <TextInput
        value={characterName}
        placeholder="Enter vessel name..."
        onChange={onChange}
      />
    </Section>
  );
}

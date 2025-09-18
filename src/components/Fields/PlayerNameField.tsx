import { TextInput, FieldWrapper } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils';

interface PlayerNameFieldProps {
  id?: string;
  className?: string;
}

export function PlayerNameField({ id, className }: PlayerNameFieldProps) {
  const playerName = useSave((s) => s.save?.playerName) ?? '';
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: string) {
    updateSave((save) => (save.playerName = value));
  }

  const description = `
  This name is chosen at the beginning of the game. It is referred to as "creator name."

  It's displayed in main menu and save point interface.
  `;

  return (
    <FieldWrapper
      id={id}
      className={mergeClass('flex flex-col gap-2', className)}
      title="Player Name"
      description={description}
      label
    >
      <TextInput
        value={playerName}
        placeholder="Enter player name..."
        onChange={onChange}
      />
    </FieldWrapper>
  );
}

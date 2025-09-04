import {
  InlineGroup,
  Section,
  TextInput,
  TextLabel,
  HelpTip,
} from '@components';
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

  return (
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <InlineGroup>
        <TextLabel>Player Name</TextLabel>
        <HelpTip title="Player Name">
          <p>
            This name is chosen at the beginning of the game. It is referred to
            as "creator name."
          </p>
          <p>It's displayed in main menu and save point interface.</p>
        </HelpTip>
      </InlineGroup>
      <TextInput
        value={playerName}
        placeholder="Enter player name..."
        onChange={onChange}
      />
    </Section>
  );
}

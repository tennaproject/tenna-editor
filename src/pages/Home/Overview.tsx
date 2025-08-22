import {
  Section,
  TextLabel,
  TextInput,
  NumberInput,
  Grid,
  Card,
  Heading,
  Checkbox,
  HelpTip,
  InlineGroup,
} from '@components';
import { useSave } from '@store';

export function PlayerNameField() {
  const value = useSave((s) => s.saveFile?.playerName) ?? '';
  const setField = useSave((s) => s.setSaveFileField);

  function onChange(v: string) {
    setField('playerName', v);
  }

  return (
    <Section id="player-name" className="space-y-2">
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
        value={value}
        placeholder="Enter player name..."
        onChange={onChange}
      />
    </Section>
  );
}

export function MoneyField() {
  const value = useSave((s) => s.saveFile?.money) ?? 0;
  const setField = useSave((s) => s.setSaveFileField);

  function onChange(v: number) {
    setField('money', v);
  }

  return (
    <Section id="money" className="space-y-2">
      <TextLabel>Money (Dark Dollars)</TextLabel>
      <NumberInput
        value={value}
        placeholder="Enter money amount..."
        suffix="D$"
        onChange={onChange}
      />
    </Section>
  );
});

export function InDarkWorldField() {
  const checked = useSave((s) => s.saveFile?.inDarkWorld) ?? false;
  const setField = useSave((s) => s.setSaveFileField);

  function onChange(state: boolean) {
    setField('inDarkWorld', state);
  }

  return (
    <Section id="in-dark-world">
      <InlineGroup>
        <Checkbox
          label="Currently in Dark World"
          checked={checked}
          onChange={onChange}
        />
        <HelpTip title="Currently in Dark World">
          <p>
            This internal flag is set to "true" when you are in the Dark World.
          </p>
          <p>For example, it changes how menus are rendered.</p>
        </HelpTip>
      </InlineGroup>
    </Section>
  );
});

export const Overview = memo(function Overview() {
  const isSaveFilePresent = useSave((s) => !!s.saveFile);

  if (!isSaveFilePresent) {
    return (
      <div className="page">
        <Section>
          <div className="flex items-center justify-center h-32 text-text-2">
            No save file loaded
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="page">
      <Heading level={3}>Save Overview</Heading>
      <Grid cols={2} className="gap-4">
        <Section id="base">
          <Card className="space-y-4">
            <PlayerNameField />
            <MoneyField />
            <InDarkWorldField />
          </Card>
        </Section>
      </Grid>
    </div>
  );
}

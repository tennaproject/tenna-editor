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
import { useSave } from '@contexts';

export function Overview() {
  const { saveFile, setSaveFileField, updateSave } = useSave();

  if (!saveFile) {
    return (
      <div className="page">
        <Section>
          <div className="flex items-center justify-center h-32 text-text-2">
            {!saveFile ? 'No save file loaded' : 'Unsupported save file format'}
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
            <Section id="player-name" className="space-y-2">
              <InlineGroup>
                <TextLabel>Player Name</TextLabel>
                <HelpTip title="Player Name">
                  <p>
                    This name is chosen at the beginning of the game. It is
                    reffered as "creator name."
                  </p>
                  <p>It's displayed in main menu and save point interface.</p>
                </HelpTip>
              </InlineGroup>
              <TextInput
                value={saveFile.playerName}
                placeholder="Enter player name..."
                onChange={(value) => {
                  updateSave((d) => {
                    d.playerName = value;
                  });
                }}
              />
            </Section>
            <Section id="money" className="space-y-2">
              <TextLabel>Money (Dark Dollars)</TextLabel>
              <NumberInput
                value={saveFile.money}
                placeholder="Enter money amount..."
                onChange={(value) => {
                  setSaveFileField('money', value);
                }}
              />
            </Section>

            <Section id="in-dark-world">
              <InlineGroup>
                <Checkbox
                  label="Currently in Dark World"
                  checked={saveFile.inDarkWorld}
                  onChange={(state) => {
                    setSaveFileField('inDarkWorld', state);
                  }}
                />
                <HelpTip title="Currently in Dark World">
                  <p>
                    This internal flag is set to "true" when you are in the Dark
                    World.
                  </p>
                  <p>For example, it changes how menus are rendered.</p>
                </HelpTip>
              </InlineGroup>
            </Section>
          </Card>
        </Section>
      </Grid>
    </div>
  );
}

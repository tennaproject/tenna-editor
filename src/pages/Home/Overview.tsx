import {
  Section,
  TextLabel,
  TextInput,
  NumberInput,
  Grid,
  Card,
  Heading,
  Checkbox,
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
        <Section id="basic-options">
          <Card className="space-y-4">
            <Heading level={4}>Basic save options</Heading>
            <Section id="basic-options-player-name">
              <TextLabel>Player Name</TextLabel>
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
            <Section id="basic-options-money">
              <TextLabel>Money</TextLabel>
              <NumberInput
                value={saveFile.money}
                placeholder="Enter money amount..."
                onChange={(value) => {
                  setSaveFileField('money', value);
                }}
              />
            </Section>
            <Checkbox
              label="Currently in Dark World"
              checked={saveFile.inDarkWorld}
              onChange={(state) => {
                setSaveFileField('inDarkWorld', state);
              }}
            />
          </Card>
        </Section>
      </Grid>
    </div>
  );
}

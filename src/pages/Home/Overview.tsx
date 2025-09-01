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
  Select,
} from '@components';
import { type RoomIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, roomHelpers } from '@utils';

export function ChapterField() {
  const value = useSave((s) => s.save?.meta.chapter) || 1;

  return (
    <Section id="chapter" className="space-y-2">
      <TextLabel>Chapter</TextLabel>
      <InlineGroup className="leading-none">
        <div className="w-8 h-8 bg-surface-3 flex justify-center items-center font-bold">
          <p>{value}</p>
        </div>
        <p>{chapterHelpers.getById(value).displayName}</p>
      </InlineGroup>
    </Section>
  );
}

export function PlayerNameField() {
  const value = useSave((s) => s.save?.playerName) ?? '';
  const setField = useSave((s) => s.setSaveField);

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
  const value = useSave((s) => s.save?.money) ?? 0;
  const setField = useSave((s) => s.setSaveField);

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
}

export function InDarkWorldField() {
  const checked = useSave((s) => s.save?.inDarkWorld) ?? false;
  const setField = useSave((s) => s.setSaveField);

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
}

export function RoomField() {
  const room = useSave((s) => s.save?.room) ?? 0;
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const setField = useSave((s) => s.setSaveField);

  function onChange(
    item: { id: string; label: string; value?: unknown } | null,
  ) {
    if (item?.value) {
      const roomId = parseInt(item.value as string, 10) as RoomIndex;
      setField('room', roomId);
    }
  }
  const roomsSource = chapterHelpers.getById(chapter).content
    .rooms as Set<RoomIndex>;
  const entries: Array<[string, number]> = Array.from(roomsSource).map(
    (rid) => {
      const id = Number(rid) as number;
      const meta = roomHelpers.getById(id as RoomIndex);
      const name = meta?.displayName || roomHelpers.getName(rid);
      return [name, id];
    },
  );

  const items = entries.map(([name, id]) => ({
    id: id.toString(),
    label: name,
    value: id.toString(),
  }));

  const selectedItem =
    items.find((item) => item.value === room.toString()) || null;

  return (
    <Section id="room" className="space-y-2">
      <InlineGroup>
        <TextLabel>Current Room</TextLabel>
        <HelpTip title="Current Room">
          <p>
            This sets which room the player is currently in when the save is
            loaded.
          </p>
        </HelpTip>
      </InlineGroup>
      <Select
        items={items}
        placeholder="Select a room..."
        label="tea tratsfds"
        defaultSelectedItem={selectedItem}
        onSelectionChange={onChange}
        className="w-60"
      />
    </Section>
  );
}

export function HomeOverview() {
  const isSavePresent = useSave((s) => !!s.save);

  if (!isSavePresent) {
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
      <Grid container spacing={2}>
        <Grid size={6}>
          <Section id="base">
            <Card className="space-y-4 p-6">
              <ChapterField />
              <PlayerNameField />
              <MoneyField />
              <InDarkWorldField />
              <RoomField />
            </Card>
          </Section>
        </Grid>
      </Grid>
    </div>
  );
}

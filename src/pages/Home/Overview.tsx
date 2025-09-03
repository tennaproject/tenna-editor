import { useRef, useState, useEffect } from 'react';
import {
  Section,
  TextLabel,
  TextInput,
  NumberInput,
  Card,
  Heading,
  Checkbox,
  HelpTip,
  InlineGroup,
  Select,
  Button,
  type SelectItem,
  Modal,
} from '@components';
import { type RoomIndex } from '@data';
import { useSave, useSaveStorage } from '@store';
import type { SaveSlot } from '@types';
import { chapterHelpers, roomHelpers } from '@utils';
import { toast } from '@services';

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
        selectedItem={selectedItem}
        onSelectionChange={onChange}
        className="w-60"
      />
    </Section>
  );
}

function NameField() {
  const name = useSave((s) => s.save?.meta.name) || 'Cool save';
  const updateSave = useSave((s) => s.updateSave);
  const { setStorageSave } = useSaveStorage();
  const [localValue, setLocalValue] = useState(name);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalValue(name);
  }, [name]);

  function onChange(value: string) {
    setLocalValue(value);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      if (!value.trim()) return;
      updateSave((save) => {
        save.meta.name = value.trim();
        setStorageSave(save.meta.id, save);
      });
    }, 1000);
  }

  return (
    <div>
      <TextLabel>Save name</TextLabel>
      <TextInput value={localValue} onChange={onChange} />
    </div>
  );
}

const SLOT_OPTIONS: SelectItem[] = [
  { id: '0', label: 'Slot 1' },
  { id: '1', label: 'Slot 2' },
  { id: '2', label: 'Slot 3' },
];

function SlotField() {
  const slot = useSave((s) => s.save?.meta.slot) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  function onSelectionChange(item: SelectItem | null) {
    if (item) {
      const newSlot = parseInt(item.id, 10) as SaveSlot;
      updateSave((save) => {
        save.meta.slot = newSlot;
      });
    }
  }

  return (
    <div>
      <TextLabel>In-game slot</TextLabel>
      <Select
        items={SLOT_OPTIONS}
        placeholder="Select slot"
        className="w-50"
        selectedItem={SLOT_OPTIONS[slot]}
        defaultSelectedItem={SLOT_OPTIONS[slot]}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
}

function CompletionSaveField() {
  const isCompletionSave =
    useSave((s) => s.save?.meta.isCompletionSave) ?? false;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(checked: boolean) {
    if (isCompletionSave === checked) return;
    updateSave((save) => {
      save.meta.isCompletionSave = checked;
    });
  }

  return (
    <div>
      <Checkbox
        label="Completion save"
        checked={isCompletionSave}
        onChange={onChange}
      />
    </div>
  );
}

function IdField() {
  const id = useSave((s) => s.save?.meta.id);

  return (
    <div className="text-text-2">
      <p>ID: {id}</p>
    </div>
  );
}

function TimestampField() {
  const createdAt = useSave((s) => s.save?.meta.createdAt) ?? 0;
  const modifiedAt = useSave((s) => s.save?.meta.modifiedAt) ?? 0;

  return (
    <div className="text-text-2">
      <p>Created at: {new Date(createdAt).toLocaleString()}</p>
      <p>Modified at: {new Date(modifiedAt).toLocaleString()}</p>
    </div>
  );
}

function DeleteSaveField() {
  const [isOpen, setIsOpen] = useState(false);
  const id = useSave((s) => s.save?.meta.id);
  const setSave = useSave((s) => s.setSave);
  const { getStorageKeys, getStorageSave, removeStorageSave } =
    useSaveStorage();

  async function onDelete() {
    if (!id) return;
    await removeStorageSave(id);

    const storageKeys = await getStorageKeys();
    // If it was the only save
    if (storageKeys.length === 0) {
      setSave(null);
    } else {
      const nextSave = await getStorageSave(storageKeys[0]);
      if (nextSave) {
        setSave(nextSave);
      } else {
        setSave(null);
      }
    }

    setIsOpen(false);
    toast('Save deleted.', 'success');
  }

  return (
    <div className="flex justify-end">
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Delete Save
      </Button>
      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <div className="flex flex-col flex-1 gap-4">
          <Heading level={3}>Delete Save</Heading>
          <div className="">
            <p className="text-text-2">
              Are you sure you want to delete current save from editor?
            </p>
            <p className="text-red font-bold">
              This action cannot be reversed!
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <Button onClick={() => onDelete()} variant="primary">
            Delete
          </Button>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
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
    <div className="page flex flex-col lg:flex-row">
      <Section id="general" className="flex-1">
        <Card className="space-y-4 p-6 h-full">
          <Heading level={3}>General</Heading>
          <ChapterField />
          <PlayerNameField />
          <MoneyField />
          <InDarkWorldField />
          <RoomField />
        </Card>
      </Section>
      <Section id="meta" className="flex-1">
        <Card className="space-y-4 p-6 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <Heading level={3}>Meta</Heading>
            </div>

            <NameField />
            <SlotField />
            <CompletionSaveField />
            <Section>
              <IdField />
              <TimestampField />
            </Section>
          </div>
          <DeleteSaveField />
        </Card>
      </Section>
    </div>
  );
}

import { useState } from 'react';
import {
  Section,
  TextLabel,
  Card,
  Heading,
  InlineGroup,
  Button,
  Modal,
  FlagField,
  TimeField,
  MoneyField,
  SaveSlotField,
  SaveNameField,
  InDarkWorldField,
  SaveIsCompletionSaveField,
  RoomField,
  PlotField,
  Checkbox,
  HelpTip,
} from '@components';
import { FLAGS } from '@data';
import { useSave, useUi } from '@store';
import { chapterHelpers } from '@utils';
import { saveStorage, toast } from '@services';
import { PlayerNameField } from '@components/Fields/PlayerNameField';

function Chapter() {
  const value = useSave((s) => s.save?.meta.chapter) || 1;
  return (
    <Section id="chapter" className="flex flex-col justify-center h-19 gap-2">
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

function SaveId() {
  const id = useSave((s) => s.save?.meta.id);
  return (
    <div className="text-text-2">
      <p>ID: {id}</p>
    </div>
  );
}

function SaveTimestamp() {
  const createdAt = useSave((s) => s.save?.meta.createdAt) ?? 0;
  const modifiedAt = useSave((s) => s.save?.meta.modifiedAt) ?? 0;

  return (
    <div className="text-text-2">
      <p>Created at: {new Date(createdAt).toLocaleString()}</p>
      <p>Modified at: {new Date(modifiedAt).toLocaleString()}</p>
    </div>
  );
}

function DeleteSave() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSaveId = useSave((s) => s.activeSaveId);
  const setSave = useSave((s) => s.setSave);
  const switchSave = useSave((s) => s.switchSave);

  async function onDelete() {
    if (!activeSaveId) return;
    await saveStorage.remove(activeSaveId);

    const storageKeys = await saveStorage.getKeys();
    // If it was the only save
    if (storageKeys.length === 0) {
      setSave(null);
    } else {
      const nextSave = await saveStorage.get(storageKeys[0]);
      if (nextSave) {
        switchSave(nextSave.meta.id);
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
  const allowAllSaves = useUi((s) => s.ui.home.allowAllSaves);
  const updateUi = useUi((s) => s.updateUi);

  if (!isSavePresent) {
    return (
      <div className="page">
        <Section>
          <div className="flex items-center justify-center h-32 text-text-2">
            No save loaded
          </div>
        </Section>
      </div>
    );
  }

  return (
    <article className="page flex flex-col">
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
        <InlineGroup>
          <Checkbox
            onChange={(checked) =>
              updateUi((ui) => (ui.home.allowAllSaves = checked))
            }
            checked={allowAllSaves}
            label={'Show rooms without save point'}
          />
          <HelpTip title="Show rooms without save point">
            <p>
              Rooms without a save point are not expected to be the starting
              point after loading save (or even being accessed at all), so
              issues may occur.
            </p>
          </HelpTip>
        </InlineGroup>
      </div>
      <Section id="general">
        <Card className="flex flex-col gap-3 p-6">
          <Heading level={3}>General</Heading>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex flex-col gap-3">
              <Chapter />
              <FlagField id="since-chapter" flag={FLAGS.SINCE_CHAPTER} />
              <PlayerNameField id="player-name" />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <MoneyField id="money" />
              <FlagField id="points" flag={FLAGS.CH3_POINTS} />
              <TimeField />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <RoomField id="room" allowAllElements={allowAllSaves} />
              <PlotField id="plot" />
              <InDarkWorldField id="in-dark-world" />
            </div>
          </div>
        </Card>
      </Section>
      <Section id="meta">
        <Card className="flex flex-col gap-3 p-6 justify-between">
          <Heading level={3}>Meta</Heading>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 flex flex-col gap-3">
              <SaveNameField id="save-field" />
              <SaveSlotField id="save-slot" />
              <SaveIsCompletionSaveField id="save-is-completion-save" />
            </div>
            <div className="flex-1 flex flex-col">
              <SaveId />
              <SaveTimestamp />
            </div>
            <div className="flex-1 flex flex-col gap-3"></div>
          </div>
          <DeleteSave />
        </Card>
      </Section>
    </article>
  );
}

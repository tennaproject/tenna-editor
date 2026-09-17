import { FieldWrapper, Select, type SelectItem } from '@components';
import type { RoomIndex } from '@data';
import { useGameData, useSave } from '@store';
import { getChapterRoomOptions } from '@utils/chapter-options';
import {
  getRoomTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';

interface RoomFieldProps {
  id?: string;
  className?: string;
  showNonSavepoint?: boolean;
  showDogcheckedRooms?: boolean;
}

export function RoomField({
  id,
  className,
  showNonSavepoint,
  showDogcheckedRooms,
}: RoomFieldProps) {
  const { t } = useTranslation();
  const room = useSave((s) => s.save?.room) ?? 0;
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const updateSave = useSave((s) => s.updateSave);
  const data = useGameData((state) => state.rooms);

  function onChange(item: SelectItem | null) {
    if (item?.value) {
      updateSave((save) => (save.room = item.value as RoomIndex));
    }
  }

  const items: SelectItem[] = getChapterRoomOptions(
    chapter,
    !!showNonSavepoint,
    !!showDogcheckedRooms,
    data.entries,
  ).map((item) => ({
    ...item,
    label: item.dataPack
      ? item.label
      : translateMeta(
          getRoomTranslationKeyPrefix(item.value as number),
          { displayName: item.label },
          t,
        ).displayName,
  }));

  const isCurrentRoomInList = items.some((item) => item.value === room);
  let selectItems: SelectItem[] = items;
  if (!isCurrentRoomInList && room) {
    const dataEntry = data.byId.get(room);
    const label = dataEntry?.displayName ?? `Unknown ${room}`;
    const translatedLabel = dataEntry?.dataPack
      ? dataEntry.displayName
      : translateMeta(
          getRoomTranslationKeyPrefix(room),
          { displayName: label },
          t,
        ).displayName;
    selectItems = [
      ...items,
      {
        id: room.toString(),
        label: translatedLabel,
        value: room,
        tooltip: dataEntry?.dataPack ? dataEntry.description : undefined,
        dataPack: dataEntry?.packName,
        invalidReasons:
          dataEntry?.dataPack && !dataEntry.overridesBuiltIn
            ? undefined
            : dataEntry
              ? ['notInChapter']
              : ['unknown', 'notInChapter'],
      },
    ];
  }

  const selectedItem = selectItems.find((item) => item.value === room) ?? null;

  const description = `
  This sets which room the player is currently in when the save is loaded.
  `;

  return (
    <FieldWrapper
      id={id}
      className={className}
      title={t('ui.field.currentRoom', 'Current Room')}
      description={description}
      label
    >
      <Select
        items={selectItems}
        placeholder={t('ui.field.selectRoom', 'Select a room...')}
        label={t('ui.field.currentRoom', 'Current Room')}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={onChange}
      />
    </FieldWrapper>
  );
}

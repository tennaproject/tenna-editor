import { FieldWrapper, Select, type SelectItem } from '@components';
import type { RoomIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, mergeClass, roomHelpers } from '@utils';

interface RoomFieldProps {
  id?: string;
  className?: string;
}

export function RoomField({ id, className }: RoomFieldProps) {
  const room = useSave((s) => s.save?.room) ?? 0;
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(item: SelectItem | null) {
    if (item?.value) {
      updateSave((save) => (save.room = item.value as RoomIndex));
    }
  }

  const roomsSource = chapterHelpers.getById(chapter).content
    .rooms as Set<RoomIndex>;
  const entries: Array<[string, number]> = Array.from(roomsSource).map(
    (roomId) => {
      const id = roomId;
      const meta = roomHelpers.getById(id as RoomIndex);
      const name = meta?.displayName || roomHelpers.getName(roomId);
      return [name, id];
    },
  );

  const items = entries.map(([name, id]) => ({
    id: id.toString(),
    label: name,
    value: id,
  }));

  const selectedItem = items.find((item) => item.value === room) ?? null;

  const description = `
  This sets which room the player is currently in when the save is loaded.
  `;

  return (
    <FieldWrapper
      id={id}
      className={mergeClass('flex flex-col gap-2', className)}
      title="Current Room"
      description={description}
      label
    >
      <Select
        items={items}
        placeholder="Select a room..."
        label="Current Room"
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={onChange}
      />
    </FieldWrapper>
  );
}

import { FieldWrapper, Select, type SelectItem } from '@components';
import type { RoomIndex } from '@data';
import { useSave } from '@store';
import { getChapterRoomOptions } from '@utils/chapter-options';
import { mergeClass } from '@utils/merge-class';

interface RoomFieldProps {
  id?: string;
  className?: string;
  allowAllElements?: boolean;
}

export function RoomField({ id, className, allowAllElements }: RoomFieldProps) {
  const room = useSave((s) => s.save?.room) ?? 0;
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(item: SelectItem | null) {
    if (item?.value) {
      updateSave((save) => (save.room = item.value as RoomIndex));
    }
  }

  const items = getChapterRoomOptions(chapter, !!allowAllElements);
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

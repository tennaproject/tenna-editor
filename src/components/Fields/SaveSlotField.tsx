import { FieldWrapper, Select, type SelectItem } from '@components';
import { useSave } from '@store';
import type { SaveSlot } from '@types';
import { mergeClass } from '@utils';

const SLOT_OPTIONS: SelectItem[] = [
  { id: '0', label: 'Slot 1' },
  { id: '1', label: 'Slot 2' },
  { id: '2', label: 'Slot 3' },
];

interface SaveSlotFieldProps {
  id?: string;
  className?: string;
}

export function SaveSlotField({ id, className }: SaveSlotFieldProps) {
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
    <FieldWrapper
      id={id}
      className={mergeClass('flex flex-col gap-2', className)}
      title="In-game slot"
      label
    >
      <Select
        items={SLOT_OPTIONS}
        placeholder="Select slot"
        selectedItem={SLOT_OPTIONS[slot]}
        defaultSelectedItem={SLOT_OPTIONS[slot]}
        onSelectionChange={onSelectionChange}
      />
    </FieldWrapper>
  );
}

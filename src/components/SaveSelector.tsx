import { saveStorage } from '@services';
import type { Save } from '@types';
import { useState, useEffect } from 'react';
import { type SelectItem, Select } from './Select';
import { useSave } from '@store';

export function SaveSelector() {
  const [saveSelectOptions, setSaveSelectOptions] = useState<SelectItem[]>([]);
  const activeSaveId = useSave((s) => s.activeSaveId);
  const saveName = useSave((s) => s.save?.meta.name);
  const switchSave = useSave((s) => s.switchSave);

  async function updateSelectOptions() {
    const storedSaves: Save[] = await saveStorage.getAll();

    storedSaves.sort(
      (a, b) =>
        new Date(a.meta.createdAt).getTime() -
        new Date(b.meta.createdAt).getTime(),
    );

    const selectOptions: SelectItem[] = [];
    for (let i = 0; i < storedSaves.length; i += 1) {
      selectOptions.push({
        id: storedSaves[i].meta.id,
        label: storedSaves[i].meta.name,
        value: storedSaves[i].meta.id,
      });
    }

    setSaveSelectOptions(selectOptions);
  }

  useEffect(() => {
    updateSelectOptions();
  }, [activeSaveId, saveName, setSaveSelectOptions]);

  const selectedItem = saveSelectOptions.find(
    (item) => item.value === activeSaveId,
  );

  return (
    <Select
      className="h-10 mr-[0.11rem] w-[100%] max-w-50"
      placeholder="No saves..."
      items={saveSelectOptions}
      selectedItem={selectedItem}
      onSelectionChange={(item) => {
        if (item) {
          switchSave(item.value as string);
        }
      }}
    ></Select>
  );
}

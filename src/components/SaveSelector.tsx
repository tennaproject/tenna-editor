import { toast } from '@services';
import { useSave, useSaveStorage } from '@store';
import type { DeltaruneSave } from '@types';
import { useState, useEffect } from 'react';
import { type SelectItem, Select } from './Select';

export function SaveSelector() {
  const [saveSelectOptions, setSaveSelectOptions] = useState<SelectItem[]>([]);
  const save = useSave((s) => s.save);
  const saveId = useSave((s) => s.save?.meta.id);
  const saveName = useSave((s) => s.save?.meta.name);
  const setSave = useSave((s) => s.setSave);
  const { getStorageKeys, getStorageSave, setStorageSave } = useSaveStorage();

  async function updateSelectOptions() {
    const keys = await getStorageKeys();

    const storedSaves: DeltaruneSave[] = [];
    for (let i = 0; i < keys.length; i += 1) {
      const storedSave = await getStorageSave(keys[i]);
      if (storedSave) {
        storedSaves.push(storedSave);
      }
    }

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
      });
    }

    setSaveSelectOptions(selectOptions);
  }

  async function switchSave(id: string) {
    // Save current save to storage
    if (!save) return;
    await setStorageSave(save.meta.id, save);

    // Switch to other save
    const newSave = await getStorageSave(id);
    if (newSave) {
      setSave(newSave);
      toast(`Switched to save "${newSave.meta.name}"`, 'success');
    }
  }

  useEffect(() => {
    updateSelectOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    saveId,
    saveName,
    getStorageKeys,
    getStorageSave,
    setStorageSave,
    setSaveSelectOptions,
  ]);

  const selectedItem = saveSelectOptions.find(
    (item) => item.id === save?.meta.id,
  );

  return (
    <Select
      className="h-10 mr-[0.11rem] w-[100%] max-w-50"
      placeholder="No saves..."
      items={saveSelectOptions}
      selectedItem={selectedItem}
      onSelectionChange={(item) => {
        if (item) {
          switchSave(item.id);
        }
      }}
    ></Select>
  );
}

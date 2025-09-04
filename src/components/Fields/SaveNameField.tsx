import { Section, TextInput, TextLabel } from '@components';
import { useSave, useSaveStorage } from '@store';
import { mergeClass } from '@utils';
import { useState, useRef, useEffect } from 'react';

interface SaveNameFieldProps {
  id?: string;
  className?: string;
}

export function SaveNameField({ id, className }: SaveNameFieldProps) {
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
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <TextLabel>Save name</TextLabel>
      <TextInput value={localValue} onChange={onChange} />
    </Section>
  );
}

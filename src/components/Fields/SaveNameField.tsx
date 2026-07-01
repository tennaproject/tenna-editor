import { Section, TextInput, TextLabel } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils/merge-class';
import { useState, useRef } from 'react';
import { useTranslation } from '../../i18n';

interface SaveNameFieldProps {
  id?: string;
  className?: string;
}

export function SaveNameField({ id, className }: SaveNameFieldProps) {
  const { t } = useTranslation();
  const name = useSave((s) => s.save?.meta.name) || 'Cool save';
  const updateSave = useSave((s) => s.updateSave);
  const [localValue, setLocalValue] = useState(name);
  const [prevName, setPrevName] = useState(name);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (name !== prevName) {
    setPrevName(name);
    setLocalValue(name);
  }

  function onChange(value: string) {
    setLocalValue(value);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      if (!value.trim()) return;
      updateSave((save) => {
        save.meta.name = value.trim();
      });
    }, 1000);
  }

  return (
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <TextLabel>{t('ui.field.saveName', 'Save name')}</TextLabel>
      <TextInput value={localValue} onChange={onChange} />
    </Section>
  );
}

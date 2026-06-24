import { FieldWrapper, TextInput } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils/merge-class';
import { formatTime, parseTime } from '@utils/time';
import { useRef, useEffect, useState } from 'react';

interface TimeFieldProps {
  id?: string;
  className?: string;
}

export function TimeField({ id, className }: TimeFieldProps) {
  const time = formatTime(useSave((s) => s.save?.time) ?? 0);
  const updateSave = useSave((s) => s.updateSave);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [internalValue, setInternalValue] = useState<string>(time);

  function onChange(value: string) {
    setInternalValue(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const timeRegex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    if (!timeRegex.test(value)) {
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      const seconds = parseTime(value);
      updateSave((save) => {
        if (save) {
          save.time = seconds;
        }
      });
    }, 500);
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <FieldWrapper
      id={id}
      className={mergeClass('flex flex-col gap-2', className)}
      title="Playtime"
      label
    >
      <TextInput
        value={internalValue}
        placeholder="00:00:00"
        onChange={onChange}
      />
    </FieldWrapper>
  );
}

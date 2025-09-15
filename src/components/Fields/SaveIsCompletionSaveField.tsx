import { Checkbox, FieldWrapper } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils';

interface SaveIsCompletionSaveFieldProps {
  id?: string;
  className?: string;
}

export function SaveIsCompletionSaveField({
  id,
  className,
}: SaveIsCompletionSaveFieldProps) {
  const isCompletionSave =
    useSave((s) => s.save?.meta.isCompletionSave) ?? false;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(checked: boolean) {
    if (isCompletionSave === checked) return;
    updateSave((save) => {
      save.meta.isCompletionSave = checked;
    });
  }

  return (
    <FieldWrapper
      id={id}
      className={mergeClass('flex flex-col gap-2', className)}
      inline
    >
      <Checkbox
        label="Completion save"
        checked={isCompletionSave}
        onChange={onChange}
      />
    </FieldWrapper>
  );
}

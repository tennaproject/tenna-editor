import { FieldWrapper, SaveSlotSelect } from '@components';
import { useSave } from '@store';
import { useTranslation } from '../../i18n';

interface SaveSlotFieldProps {
  id?: string;
  className?: string;
}

export function SaveSlotField({ id, className }: SaveSlotFieldProps) {
  const { t } = useTranslation();
  const slot = useSave((s) => s.save?.meta.slot) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  return (
    <FieldWrapper
      id={id}
      className={className}
      title={t('ui.field.inGameSlot', 'In-game slot')}
      label
    >
      <SaveSlotSelect
        value={slot}
        onChange={(newSlot) =>
          updateSave((save) => {
            save.meta.slot = newSlot;
          })
        }
      />
    </FieldWrapper>
  );
}

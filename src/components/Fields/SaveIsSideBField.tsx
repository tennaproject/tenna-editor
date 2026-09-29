import { Checkbox, FieldWrapper } from '@components';
import { useSave } from '@store';
import { isSideBActive } from '@utils';
import { useTranslation } from '../../i18n';

interface SaveIsSideBFieldProps {
  id?: string;
  className?: string;
}

export function SaveIsSideBField({ id, className }: SaveIsSideBFieldProps) {
  const { t } = useTranslation();
  const save = useSave((s) => s.save);
  const updateSave = useSave((s) => s.updateSave);

  if (!save || save.meta.chapter !== 5 || !save.meta.isCompletionSave) {
    return null;
  }

  const isSideB = save.meta.isSideB ?? isSideBActive(save);

  function onChange(checked: boolean) {
    updateSave((draft) => {
      draft.meta.isSideB = checked;
    });
  }

  return (
    <FieldWrapper id={id} className={className} inline>
      <Checkbox
        label={t('ui.field.sideB', 'Side B save')}
        checked={isSideB}
        onChange={onChange}
      />
    </FieldWrapper>
  );
}

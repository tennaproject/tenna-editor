import { FieldWrapper, NumberInput } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils/merge-class';
import { useTranslation } from '../../i18n';

interface MoneyFieldProps {
  id?: string;
  className?: string;
}

export function MoneyField({ id, className }: MoneyFieldProps) {
  const { t } = useTranslation();
  const money = useSave((s) => s.save?.money) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => (save.money = value));
  }

  return (
    <FieldWrapper
      id={id}
      className={mergeClass('flex flex-col gap-2', className)}
      title={t('ui.field.money', 'Money (D$)')}
      label
    >
      <NumberInput
        value={money}
        placeholder={t('ui.field.selectMoney', 'Enter money amount...')}
        onChange={onChange}
      />
    </FieldWrapper>
  );
}

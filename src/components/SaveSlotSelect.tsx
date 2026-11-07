import { useUi } from '@store';
import type { SaveSlot } from '@types';
import {
  isBetterSavesSlot,
  MAX_SAVE_SLOT,
  mergeClass,
  VANILLA_SLOT_COUNT,
} from '@utils';
import { useTranslation } from '../i18n';
import { NumberInput } from './NumberInput';
import { Select, type SelectItem } from './Select';

interface SaveSlotSelectProps {
  value: SaveSlot;
  onChange: (slot: SaveSlot) => void;
  className?: string;
  compact?: boolean;
}

export function SaveSlotSelect({
  value,
  onChange,
  className,
  compact = false,
}: SaveSlotSelectProps) {
  const { t } = useTranslation();
  const betterSaves = useUi((s) => s.ui.mods.betterSaves);

  if (!betterSaves && !isBetterSavesSlot(value)) {
    const options: SelectItem[] = Array.from(
      { length: VANILLA_SLOT_COUNT },
      (_, index) => ({
        id: String(index),
        label: `${t('ui.field.slot', 'Slot')} ${index + 1}`,
        value: index,
      }),
    );
    return (
      <Select
        items={options}
        placeholder={t('ui.field.selectSlot', 'Select slot')}
        className={mergeClass(compact && 'h-8 min-h-0', className)}
        selectedItem={options[value]}
        defaultSelectedItem={options[value]}
        onSelectionChange={(item) => {
          if (item) onChange(item.value as SaveSlot);
        }}
      />
    );
  }

  return (
    <NumberInput
      value={value + 1}
      min={1}
      max={MAX_SAVE_SLOT + 1}
      fullWidth
      className={mergeClass(compact && '[&_input]:h-8', className)}
      placeholder={t('ui.field.slot', 'Slot')}
      onChange={(slot) => onChange(slot - 1)}
    />
  );
}

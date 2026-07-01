import { FieldWrapper, Select, type SelectItem } from '@components';
import { useSave } from '@store';
import { getChapterPlotOptions, getPlotPointLabel } from '@utils';
import { mergeClass } from '@utils/merge-class';
import { useMemo } from 'react';
import { useTranslation } from '../../i18n';

interface PlotFieldProps {
  id?: string;
  className?: string;
}

export function PlotField({ id, className }: PlotFieldProps) {
  const { t } = useTranslation();
  const plot = useSave((s) => s.save?.plot) ?? 0;
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const updateSave = useSave((s) => s.updateSave);

  const items = useMemo(() => {
    const options = getChapterPlotOptions(chapter);
    if (options.some((item) => item.value === plot)) return options;

    return [
      ...options,
      {
        id: plot.toString(),
        label: getPlotPointLabel(chapter, plot),
        value: plot,
      },
    ];
  }, [chapter, plot]);

  function onChange(item: SelectItem | null) {
    if (item?.value !== undefined && item.value !== null) {
      updateSave((save) => (save.plot = item.value as number));
    }
  }

  const selectedItem = items.find((item) => item.value === plot) ?? null;

  const description = `
  Sets the current story progress point for this chapter.
  `;

  return (
    <FieldWrapper
      id={id}
      className={mergeClass('flex flex-col gap-2', className)}
      title={t('ui.field.plotPoint', 'Plot Point')}
      description={description}
      label
    >
      <Select
        items={items}
        placeholder={t('ui.field.selectPlotPoint', 'Select a plot point...')}
        label={t('ui.field.plotPoint', 'Plot Point')}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={onChange}
      />
    </FieldWrapper>
  );
}

import { NumberInput, Section, TextLabel } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils';

interface PlotFieldProps {
  id?: string;
  className?: string;
}

export function PlotField({ id, className }: PlotFieldProps) {
  const plot = useSave((s) => s.save?.plot) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: number) {
    updateSave((save) => (save.plot = value));
  }

  return (
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <TextLabel>Plot ID</TextLabel>
      <NumberInput
        value={plot}
        placeholder="Enter plot ID..."
        onChange={onChange}
      />
    </Section>
  );
}

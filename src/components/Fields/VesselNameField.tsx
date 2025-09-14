import { InlineGroup, Section, TextInput, TextLabel } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils';

interface VesselNameFieldProps {
  id?: string;
  className?: string;
}

export function VesselNameField({ id, className }: VesselNameFieldProps) {
  const vesselName = useSave((s) => s.save?.vesselName) ?? '';
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: string) {
    updateSave((save) => (save.vesselName = value));
  }

  return (
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <InlineGroup>
        <TextLabel>Name</TextLabel>
      </InlineGroup>
      <TextInput
        value={vesselName}
        placeholder="Enter vessel name..."
        onChange={onChange}
      />
    </Section>
  );
}

import { Checkbox, HelpTip, InlineGroup, Section } from '@components';
import { useSave } from '@store';
import { mergeClass } from '@utils';

interface InDarkWorldFieldProps {
  id?: string;
  className?: string;
}

export function InDarkWorldField({ id, className }: InDarkWorldFieldProps) {
  const checked = useSave((s) => s.save?.inDarkWorld) ?? false;
  const setField = useSave((s) => s.setSaveField);

  function onChange(state: boolean) {
    setField('inDarkWorld', state);
  }

  return (
    <Section id={id} className={mergeClass('flex flex-col gap-2', className)}>
      <InlineGroup>
        <Checkbox
          label="Currently in Dark World"
          checked={checked}
          onChange={onChange}
          fixedHeight
        />
        <HelpTip title="Currently in Dark World">
          <p>
            This internal flag is set to "true" when you are in the Dark World.
          </p>
          <p>For example, it changes how menus are rendered.</p>
        </HelpTip>
      </InlineGroup>
    </Section>
  );
}

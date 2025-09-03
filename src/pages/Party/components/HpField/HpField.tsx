import { Section } from '@components';
import DividerIcon from '@assets/icons/minus.svg';
import { HpCurrentField } from './HpCurrentField';
import { HpMaxField } from './HpMaxField';
import type { CharacterIndex } from '@data';

interface HpFieldProps {
  character: CharacterIndex;
}

export function HpField({ character }: HpFieldProps) {
  return (
    <Section id="main-hp" className="flex justify-between items-end w-full">
      <HpCurrentField character={character} />
      <span className="h-5 w-5 mb-3 mx-3 text-text-2">
        <DividerIcon />
      </span>
      <HpMaxField character={character} />
    </Section>
  );
}

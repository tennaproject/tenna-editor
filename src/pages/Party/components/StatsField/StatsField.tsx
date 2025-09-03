import { Section } from '@components';
import { StatsAttackField } from './StatsAttackField';
import { StatsDefenceField } from './StatsDefenceField';
import { StatsMagicField } from './StatsMagicField';
import type { CharacterIndex } from '@data';

interface StatsFieldProps {
  character: CharacterIndex;
}

export function StatsField({ character }: StatsFieldProps) {
  return (
    <Section
      id="main-stats"
      className="flex justify-between items-end w-full gap-3"
    >
      <StatsAttackField character={character} />
      <StatsDefenceField character={character} />
      <StatsMagicField character={character} />
    </Section>
  );
}

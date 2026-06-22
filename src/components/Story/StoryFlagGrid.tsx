import { FLAGS } from '@data';
import type { FlagName } from '@data';
import { StoryFlagField } from './StoryFlagField';

function flagNameToId(name: string): string {
  return name.toLowerCase().replace(/_/g, '-');
}

interface StoryFlagGridProps {
  flags: FlagName[];
}

export function StoryFlagGrid({ flags }: StoryFlagGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {flags.map((name) => (
        <StoryFlagField key={name} id={flagNameToId(name)} flag={FLAGS[name]} />
      ))}
    </div>
  );
}

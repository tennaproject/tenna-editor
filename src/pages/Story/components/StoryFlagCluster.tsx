import { Heading } from '@components';
import { FLAGS } from '@data';
import type { FlagName } from '@data';
import { StoryFlagField } from './StoryFlagField';

function flagNameToId(name: string): string {
  return name.toLowerCase().replace(/_/g, '-');
}

interface StoryFlagClusterProps {
  title: string;
  flags: FlagName[];
}

export function StoryFlagCluster({ title, flags }: StoryFlagClusterProps) {
  if (flags.length === 0) return null;

  return (
    <section className="border border-border bg-surface-2/50 p-4 flex flex-col gap-3">
      <Heading level={5} className="text-text-1 border-b border-border/50 pb-2">
        {title}
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {flags.map((name) => (
          <StoryFlagField
            key={name}
            id={flagNameToId(name)}
            flag={FLAGS[name]}
          />
        ))}
      </div>
    </section>
  );
}

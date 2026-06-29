import { Heading } from '@components';
import { FLAG_BITFIELDS, FLAGS } from '@data';
import type { StoryFieldName } from '@data';
import { StoryFlagField } from './StoryFlagField';

function flagNameToId(name: string): string {
  return name.toLowerCase().replace(/_/g, '-');
}

interface StoryFlagClusterProps {
  title: string;
  flags: StoryFieldName[];
}

export function StoryFlagCluster({ title, flags }: StoryFlagClusterProps) {
  if (flags.length === 0) return null;

  return (
    <section className="border border-border bg-surface-2/50 p-4 flex flex-col gap-3">
      <Heading level={5} className="text-text-1 border-b border-border/50 pb-2">
        {title}
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {flags.map((name) => {
          const id = flagNameToId(name);

          if (name in FLAGS) {
            return (
              <StoryFlagField
                key={name}
                id={id}
                flag={FLAGS[name as keyof typeof FLAGS]}
              />
            );
          }

          return (
            <StoryFlagField
              key={name}
              id={id}
              bitfield={FLAG_BITFIELDS[name as keyof typeof FLAG_BITFIELDS]}
            />
          );
        })}
      </div>
    </section>
  );
}

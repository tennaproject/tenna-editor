import { FLAG_BITFIELDS, FLAGS } from '@data';
import type { StoryFieldName } from '@data';
import { StoryFlagField } from './StoryFlagField';

function flagNameToId(name: string): string {
  return name.toLowerCase().replace(/_/g, '-');
}

interface StoryFlagGridProps {
  flags: StoryFieldName[];
}

export function StoryFlagGrid({ flags }: StoryFlagGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {flags.map((name) => (
        <StoryFlagField
          key={name}
          id={flagNameToId(name)}
          flag={name in FLAGS ? FLAGS[name as keyof typeof FLAGS] : undefined}
          bitfield={
            name in FLAG_BITFIELDS
              ? FLAG_BITFIELDS[name as keyof typeof FLAG_BITFIELDS]
              : undefined
          }
        />
      ))}
    </div>
  );
}

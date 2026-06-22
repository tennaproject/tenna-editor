import { FlagField } from '@components';
import type { FlagIndex } from '@data';

interface StoryFlagFieldProps {
  id?: string;
  flag: FlagIndex;
}

export function StoryFlagField({ id, flag }: StoryFlagFieldProps) {
  return <FlagField id={id} flag={flag} />;
}

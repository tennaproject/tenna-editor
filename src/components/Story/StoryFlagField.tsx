import { FlagField } from '@components';
import type { FlagBitfieldId, FlagIndex } from '@data';

interface StoryFlagFieldProps {
  id?: string;
  flag?: FlagIndex;
  bitfield?: FlagBitfieldId;
}

export function StoryFlagField({ id, flag, bitfield }: StoryFlagFieldProps) {
  if (flag !== undefined) return <FlagField id={id} flag={flag} />;
  if (bitfield !== undefined) return <FlagField id={id} bitfield={bitfield} />;

  return null;
}

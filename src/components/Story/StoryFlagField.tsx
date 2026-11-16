import type { ReactNode } from 'react';
import { FlagField } from '@components';
import type { FlagBitfieldId, FlagIndex } from '@data';

interface StoryFlagFieldProps {
  id?: string;
  flag?: FlagIndex;
  bitfield?: FlagBitfieldId;
  optionTooltip?: (value: number, label: string) => ReactNode;
  compactOptionTooltip?: boolean;
}

export function StoryFlagField({
  id,
  flag,
  bitfield,
  optionTooltip,
  compactOptionTooltip,
}: StoryFlagFieldProps) {
  if (flag !== undefined)
    return (
      <FlagField
        id={id}
        flag={flag}
        optionTooltip={optionTooltip}
        compactOptionTooltip={compactOptionTooltip}
      />
    );
  if (bitfield !== undefined) return <FlagField id={id} bitfield={bitfield} />;

  return null;
}

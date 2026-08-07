import type { EquipmentIconIndex } from '@data';
import { EquipmentIcon } from './EquipmentIcon';
import { InlineGroup } from './InlineGroup';

interface TooltipHeadingProps {
  icon?: EquipmentIconIndex;
  name: string;
  href: string;
  unknownArt?: boolean;
}

export function TooltipHeading({
  icon,
  name,
  href,
  unknownArt,
}: TooltipHeadingProps) {
  return (
    <InlineGroup className="min-w-0 gap-1">
      {icon !== undefined && (
        <EquipmentIcon icon={icon} unknownArt={unknownArt} />
      )}
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="min-w-0 flex-1 break-words text-sm text-text-1 underline hover:text-text-2"
      >
        {name}
      </a>
    </InlineGroup>
  );
}

import type { EquipmentIconIndex } from '@data';
import { EquipmentIcon } from './EquipmentIcon';
import { InlineGroup } from './InlineGroup';

interface TooltipHeadingProps {
  icon?: EquipmentIconIndex;
  name: string;
  href: string;
}

export function TooltipHeading({ icon, name, href }: TooltipHeadingProps) {
  return (
    <InlineGroup className="gap-1">
      {icon !== undefined && <EquipmentIcon icon={icon} />}
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-sm text-text-1 underline hover:text-text-2"
      >
        {name}
      </a>
    </InlineGroup>
  );
}

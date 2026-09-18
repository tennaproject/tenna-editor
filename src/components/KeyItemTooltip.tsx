import type { ReactNode } from 'react';
import { useGameData, useSave } from '@store';
import { resolveKeyItemEntry } from '@utils/resolve-game-data';
import { getWikiUrl } from '@utils/wiki-url';
import {
  formatTranslation,
  getItemTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { Tooltip } from './Tooltip';
import { TooltipHeading } from './TooltipHeading';

interface KeyItemTooltipContentProps {
  id: number;
}

interface KeyItemTooltipProps extends KeyItemTooltipContentProps {
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

export function KeyItemTooltipContent({ id }: KeyItemTooltipContentProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const plot = useSave((s) => s.save?.plot) ?? 0;
  const flags = useSave((s) => s.save?.flags) ?? [];

  const entry = useGameData((state) => state.keyItems.byId.get(id));
  if (!entry) return null;
  const meta = resolveKeyItemEntry(entry, { chapter, plot, flags });

  const translated = translateMeta(
    getItemTranslationKeyPrefix('keyItem', id),
    meta ?? entry,
    t,
  );

  const builtInDescription =
    translated.description && meta?.descriptionValues
      ? formatTranslation(translated.description, meta.descriptionValues)
      : translated.description;
  const description =
    entry.descriptionFromPack || (entry.dataPack && !entry.overridesBuiltIn)
      ? entry.description
      : builtInDescription;

  return (
    <div className="flex flex-col gap-2">
      <TooltipHeading
        name={entry.dataPack ? entry.displayName : translated.displayName}
        href={entry.dataPack ? undefined : getWikiUrl(entry.displayName)}
      />

      <p className="ui-prose-muted border-t border-divider pt-2 whitespace-pre-wrap">
        {description ?? t('ui.tooltip.noDescription', '(No description.)')}
      </p>
    </div>
  );
}

export function KeyItemTooltip({
  id,
  children,
  className,
  focusable,
}: KeyItemTooltipProps) {
  return (
    <Tooltip
      content={<KeyItemTooltipContent id={id} />}
      className={className}
      focusable={focusable}
    >
      {children}
    </Tooltip>
  );
}

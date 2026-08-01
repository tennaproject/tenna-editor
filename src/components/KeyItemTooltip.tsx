import type { ReactNode } from 'react';
import type { KeyItemIndex } from '@data';
import { useSave } from '@store';
import { keyItemHelpers, resolveChapterMeta } from '@utils/data-helpers';
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
  id: KeyItemIndex;
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

  const meta = resolveChapterMeta(keyItemHelpers.getById(id), {
    chapter,
    plot,
    flags,
  });

  if (!meta) return null;

  const translated = translateMeta(
    getItemTranslationKeyPrefix('keyItem', id),
    meta,
    t,
  );

  const description =
    translated.description && meta.descriptionValues
      ? formatTranslation(translated.description, meta.descriptionValues)
      : translated.description;

  return (
    <div className="flex flex-col gap-2">
      <TooltipHeading
        name={translated.displayName}
        href={getWikiUrl(meta.displayName)}
      />

      <p className="ui-prose-muted overflow-hidden border-t border-divider pt-2 whitespace-pre">
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

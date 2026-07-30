import type { ReactNode } from 'react';
import type { CharacterIndex, SpellIndex } from '@data';
import { useSave } from '@store';
import { spellHelpers } from '@utils/data-helpers';
import {
  getSpellTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { Tooltip } from './Tooltip';
import { getWikiUrl } from '@utils/wiki-url';
import { TooltipHeading } from './TooltipHeading';

interface SpellTooltipContentProps {
  spell: SpellIndex;
  character: CharacterIndex;
}

interface SpellTooltipProps extends SpellTooltipContentProps {
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

export function SpellTooltipContent({
  spell,
  character,
}: SpellTooltipContentProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const plot = useSave((s) => s.save?.plot) ?? 0;
  const flags = useSave((s) => s.save?.flags) ?? [];
  const weapon = useSave((s) => s.save?.characters[character]?.weapon) ?? 0;
  const primaryArmor =
    useSave((s) => s.save?.characters[character]?.primaryArmor) ?? 0;
  const secondaryArmor =
    useSave((s) => s.save?.characters[character]?.secondaryArmor) ?? 0;

  const base = spellHelpers.getById(spell);

  const meta = base
    ? {
        ...base,
        ...base.getOverrides?.({
          chapter,
          plot,
          flags,
          weapon,
          armors: [primaryArmor, secondaryArmor],
        }),
      }
    : undefined;

  const translated = meta
    ? translateMeta(getSpellTranslationKeyPrefix(spell), meta, t)
    : undefined;

  if (!meta || !translated) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start gap-3">
        <TooltipHeading
          name={translated.displayName}
          href={getWikiUrl(meta.displayName)}
        />

        {meta.tpCost !== undefined && (
          <span className="text-sm text-yellow whitespace-nowrap">
            {formatTpCost(meta.tpCost, t)}
          </span>
        )}
      </div>

      <p className="ui-prose-muted border-t border-divider pt-2 whitespace-pre-line">
        {translated.description ??
          t('ui.tooltip.noDescription', '(No description.)')}
      </p>
    </div>
  );
}

function formatTpCost(tpCost: number, t: (k: string, f: string) => string) {
  return `${t('ui.tooltip.tpCost', 'TP Cost')}: ${tpCost}%`;
}

export function SpellTooltip({
  spell,
  character,
  children,
  className,
  focusable,
}: SpellTooltipProps) {
  return (
    <Tooltip
      content={<SpellTooltipContent spell={spell} character={character} />}
      className={className}
      focusable={focusable}
    >
      {children}
    </Tooltip>
  );
}

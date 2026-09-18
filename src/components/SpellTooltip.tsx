import type { ReactNode } from 'react';
import type { CharacterIndex } from '@data';
import type { SpellEntry } from '@types';
import { useGameData, useSave } from '@store';
import { resolveSpellEntry } from '@utils/resolve-game-data';
import {
  getSpellTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { Tooltip } from './Tooltip';
import { getWikiUrl } from '@utils/wiki-url';
import { TooltipHeading } from './TooltipHeading';

interface SpellTooltipContentProps {
  entry: SpellEntry;
  character: CharacterIndex;
}

interface SpellTooltipProps {
  entry?: SpellEntry;
  spell?: number;
  character: CharacterIndex;
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

export function SpellTooltipContent({
  entry,
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

  const meta = resolveSpellEntry(entry, {
    chapter,
    plot,
    flags,
    weapon,
    armors: [primaryArmor, secondaryArmor],
  });

  const translated =
    meta &&
    (!entry.dataPack || (entry.overridesBuiltIn && !entry.descriptionFromPack))
      ? translateMeta(getSpellTranslationKeyPrefix(entry.id), meta, t)
      : undefined;

  const displayName = entry.dataPack
    ? entry.displayName
    : (translated?.displayName ?? meta.displayName);
  const description = entry.descriptionFromPack
    ? entry.description
    : (translated?.description ?? meta.description);
  const tpCost = meta.tpCost;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start gap-3">
        <TooltipHeading
          name={displayName}
          href={entry.dataPack ? undefined : getWikiUrl(entry.displayName)}
        />

        {tpCost !== undefined && (
          <span className="text-sm text-yellow whitespace-nowrap">
            {formatTpCost(tpCost, t)}
          </span>
        )}
      </div>

      <p className="ui-prose-muted border-t border-divider pt-2 whitespace-pre-line">
        {description ?? t('ui.tooltip.noDescription', '(No description.)')}
      </p>
    </div>
  );
}

function formatTpCost(tpCost: number, t: (k: string, f: string) => string) {
  return `${t('ui.tooltip.tpCost', 'TP Cost')}: ${tpCost}%`;
}

export function SpellTooltip({
  entry,
  spell,
  character,
  children,
  className,
  focusable,
}: SpellTooltipProps) {
  const storeEntry = useGameData((state) => state.spells.byId.get(spell ?? -1));
  const resolved = entry ?? storeEntry;

  return (
    <Tooltip
      content={
        resolved ? (
          <SpellTooltipContent entry={resolved} character={character} />
        ) : undefined
      }
      className={className}
      focusable={focusable}
    >
      {children}
    </Tooltip>
  );
}

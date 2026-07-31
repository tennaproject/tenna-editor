import type { ReactNode } from 'react';
import {
  PARTY_MEMBERS,
  type CharacterIndex,
  type ConsumableIndex,
} from '@data';
import { useSave } from '@store';
import {
  characterHelpers,
  consumableHelpers,
  resolveChapterMeta,
} from '@utils/data-helpers';
import { getCharacterColor } from '@utils/get-character-color';
import { getWikiUrl } from '@utils/wiki-url';
import { mergeClass } from '@utils/merge-class';
import {
  getItemTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { CharacterIcon } from './CharacterIcon';
import { InlineGroup } from './InlineGroup';
import { Tooltip } from './Tooltip';
import { TooltipHeading } from './TooltipHeading';

interface ConsumableTooltipContentProps {
  id: ConsumableIndex;
}

interface ConsumableTooltipProps extends ConsumableTooltipContentProps {
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

interface ExtraHeal {
  host: CharacterIndex;
  character: CharacterIndex;
  amount: number;
}

interface HealEntry {
  character: CharacterIndex;
  amount: string | undefined;
}

interface HealRowProps {
  entries: HealEntry[];
  extraHeal?: ExtraHeal;
  showAmounts: boolean;
}

// Exclusive to using Scarlixir on Noelle
function ExtraHealBadge({ extraHeal }: { extraHeal: ExtraHeal }) {
  const color = getCharacterColor(extraHeal.character).text;
  const name = characterHelpers.getById(extraHeal.character).displayName;

  return (
    <span
      title={name}
      className="absolute -right-3 -bottom-3 flex flex-col items-center"
    >
      <span
        className={mergeClass(
          'inline-flex h-4 w-4 shrink-0 items-center justify-center',
          color,
        )}
      >
        <CharacterIcon character={extraHeal.character} />
      </span>
      <span className={mergeClass('text-[0.6rem] leading-none', color)}>
        +{extraHeal.amount}
      </span>
    </span>
  );
}

function HealRow({ entries, extraHeal, showAmounts }: HealRowProps) {
  return (
    <InlineGroup className="gap-4 justify-center">
      {entries.map(({ character, amount }) => {
        const restoresNothing = !amount;
        const name = characterHelpers.getById(character).displayName;
        const color = getCharacterColor(character).text;

        return (
          <div
            key={character}
            title={name}
            className="flex flex-col items-center gap-0.5"
          >
            <span
              className={mergeClass(
                'relative inline-flex h-10 w-10 shrink-0 items-center justify-center',
                restoresNothing ? 'text-text-3 grayscale' : color,
              )}
            >
              <CharacterIcon character={character} />
              {extraHeal?.host === character && (
                <ExtraHealBadge extraHeal={extraHeal} />
              )}
            </span>
            {showAmounts && (
              <span
                className={mergeClass(
                  'text-sm',
                  restoresNothing ? 'text-text-3' : color,
                )}
              >
                {amount ?? 0}
              </span>
            )}
          </div>
        );
      })}
    </InlineGroup>
  );
}

export function ConsumableTooltipContent({
  id,
}: ConsumableTooltipContentProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const saveSlot = useSave((s) => s.save?.meta.slot) ?? 0;

  const meta = resolveChapterMeta(consumableHelpers.getById(id), {
    chapter,
    saveSlot,
  });

  const translated = meta
    ? translateMeta(getItemTranslationKeyPrefix('consumable', id), meta, t)
    : undefined;

  if (!meta || !translated) return null;

  const healEntries = PARTY_MEMBERS.map((character) => {
    const heal = meta.healByCharacter?.[character] ?? meta.heal;
    const amount =
      heal !== undefined
        ? heal >= 999
          ? 'MAX'
          : `${heal}`
        : meta.revivePercent !== undefined
          ? `${meta.revivePercent}%`
          : undefined;

    return { character, amount };
  });
  const restoresAnyone = healEntries.some((entry) => entry.amount);

  const heals = meta.heal !== undefined || !!meta.healByCharacter;
  const revives = meta.revivePercent !== undefined;
  const isUniform =
    healEntries.every((entry) => entry.amount === healEntries[0].amount) &&
    !meta.extraHeal &&
    !(heals && revives);

  const uniformLine =
    restoresAnyone && isUniform
      ? revives
        ? `${t('ui.tooltip.revives', 'Revives to')} ${meta.revivePercent}% HP`
        : healEntries[0].amount === 'MAX'
          ? `${t('ui.tooltip.heals', 'Heals')} MAX HP`
          : `${t('ui.tooltip.heals', 'Heals')} ${healEntries[0].amount}HP`
      : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start gap-3">
        <TooltipHeading
          name={translated.displayName}
          href={getWikiUrl(meta.displayName)}
        />

        {meta.tpGain !== undefined && (
          <span className="text-sm text-yellow whitespace-nowrap">
            {t('ui.tooltip.tpGain', 'TP')}: +{meta.tpGain}%
          </span>
        )}
      </div>

      {restoresAnyone && (
        <HealRow
          entries={healEntries}
          extraHeal={meta.extraHeal}
          showAmounts={!uniformLine}
        />
      )}

      {uniformLine && (
        <span className="text-sm text-green text-center">{uniformLine}</span>
      )}

      {!uniformLine && meta.revivePercent !== undefined && (
        <span className="text-sm text-green text-center">
          {t('ui.tooltip.revives', 'Revives to')} {meta.revivePercent}% HP
        </span>
      )}

      <p className="ui-prose-muted border-t border-divider pt-2 whitespace-pre-line">
        {translated.description ??
          t('ui.tooltip.noDescription', '(No description.)')}
      </p>
    </div>
  );
}

export function ConsumableTooltip({
  id,
  children,
  className,
  focusable,
}: ConsumableTooltipProps) {
  return (
    <Tooltip
      content={<ConsumableTooltipContent id={id} />}
      className={className}
      focusable={focusable}
    >
      {children}
    </Tooltip>
  );
}

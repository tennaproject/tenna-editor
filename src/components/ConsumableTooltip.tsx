import { Fragment, type ReactNode } from 'react';
import type { CharacterIndex, ConsumableIndex, HealAmounts } from '@data';
import { useSave } from '@store';
import {
  characterHelpers,
  consumableHelpers,
  getChapterPartyMembers,
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

interface HealContext {
  label: string;
  entries: HealEntry[];
}

interface HealGridProps {
  contexts: HealContext[];
  extraHeal?: ExtraHeal;
}

function HealGrid({ contexts, extraHeal }: HealGridProps) {
  const members = contexts[0].entries.map((entry) => entry.character);

  return (
    <div
      className="grid items-center justify-center gap-x-2 gap-y-1"
      style={{ gridTemplateColumns: `repeat(${members.length}, 2.75rem)` }}
    >
      {members.map((character) => (
        <span
          key={character}
          title={characterHelpers.getById(character).displayName}
          className={mergeClass(
            'relative inline-flex h-10 w-10 shrink-0 items-center justify-center justify-self-center',
            getCharacterColor(character).text,
          )}
        >
          <CharacterIcon character={character} />
          {extraHeal?.host === character && (
            <ExtraHealBadge extraHeal={extraHeal} />
          )}
        </span>
      ))}

      {contexts.map(({ label, entries }) => (
        <Fragment key={label}>
          <span
            className="pt-1 text-center text-sm text-text-1"
            style={{ gridColumn: `span ${members.length}` }}
          >
            {label}
          </span>
          {entries.map(({ character, amount }) => (
            <span
              key={character}
              className={mergeClass(
                'text-sm justify-self-center',
                amount ? getCharacterColor(character).text : 'text-text-3',
              )}
            >
              {amount ?? 0}
            </span>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

// Used for a few items when used on Noelle in the overworld
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

  const resolveAmount = (
    amounts: HealAmounts | undefined,
    character: CharacterIndex,
  ) => {
    if (!amounts) return undefined;

    const characterPercent = amounts.healPercentByCharacter?.[character];
    if (characterPercent !== undefined)
      return { value: characterPercent, percent: true };

    const characterFlat = amounts.healByCharacter?.[character];
    if (characterFlat !== undefined)
      return { value: characterFlat, percent: false };

    if (amounts.healPercent !== undefined)
      return { value: amounts.healPercent, percent: true };

    if (amounts.heal !== undefined)
      return { value: amounts.heal, percent: false };

    return undefined;
  };

  const format = (amount: ReturnType<typeof resolveAmount>) => {
    if (!amount)
      return meta.revivePercent !== undefined
        ? `${meta.revivePercent}%`
        : undefined;

    if (amount.percent) return `${amount.value}%`;

    return amount.value >= 999 ? 'MAX' : `${amount.value}`;
  };

  const members = getChapterPartyMembers(chapter);

  const healEntries = members.map((character) => ({
    character,
    amount: format(resolveAmount(meta, character)),
  }));

  const resolvedOverworld = meta.overworld
    ? members.map((character) => ({
        character,
        amount: format(
          resolveAmount(meta.overworld, character) ??
            resolveAmount(meta, character),
        ),
      }))
    : undefined;

  const overworldEntries = resolvedOverworld?.some(
    (entry, index) => entry.amount !== healEntries[index].amount,
  )
    ? resolvedOverworld
    : undefined;

  const contexts: HealContext[] = overworldEntries
    ? [
        {
          label: t('ui.tooltip.overworld', 'Overworld'),
          entries: overworldEntries,
        },
        { label: t('ui.tooltip.inBattle', 'In Battle'), entries: healEntries },
      ]
    : [{ label: '', entries: healEntries }];

  const restoresAnyone = contexts.some((context) =>
    context.entries.some((entry) => entry.amount),
  );

  const heals =
    meta.heal !== undefined ||
    !!meta.healByCharacter ||
    meta.healPercent !== undefined ||
    !!meta.healPercentByCharacter;
  const revives = meta.revivePercent !== undefined;
  // Uniform means every character gets the same value
  const isUniform =
    contexts.every((context) =>
      context.entries.every(
        (entry) => entry.amount === context.entries[0].amount,
      ),
    ) && !meta.extraHeal;

  const healsLabel = meta.healsParty
    ? t('ui.tooltip.healsTeam', 'Heals team')
    : t('ui.tooltip.heals', 'Heals');
  const revivesLabel = meta.healsParty
    ? t('ui.tooltip.revivesTeam', 'Revives team')
    : t('ui.tooltip.revives', 'Revives');

  const formatAmount = (amount: string | undefined) => {
    if (revives && !heals) return `${revivesLabel} ${meta.revivePercent}% HP`;

    if (amount === 'MAX') return `${healsLabel} MAX HP`;
    if (amount?.endsWith('%')) return `${healsLabel} ${amount} HP`;

    return `${healsLabel} ${amount}HP`;
  };

  const uniformLines =
    restoresAnyone && isUniform
      ? contexts.map(({ label, entries }) => ({
          key: label,
          label,
          text: formatAmount(entries[0].amount),
        }))
      : [];

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

      {restoresAnyone &&
        (overworldEntries && !uniformLines.length ? (
          <HealGrid contexts={contexts} extraHeal={meta.extraHeal} />
        ) : (
          <HealRow
            entries={healEntries}
            extraHeal={meta.extraHeal}
            showAmounts={!uniformLines.length}
          />
        ))}

      {uniformLines.map(({ key, label, text }) => (
        <div key={key} className="flex flex-col items-center">
          {label && <span className="text-xs text-text-2">{label}</span>}
          <span className="text-sm text-green">{text}</span>
        </div>
      ))}

      {revives && (heals || !uniformLines.length) && (
        <span className="text-sm text-green text-center">
          {revivesLabel} {meta.revivePercent}% HP
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

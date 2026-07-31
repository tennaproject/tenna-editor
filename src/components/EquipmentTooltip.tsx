import type { ReactNode } from 'react';
import {
  CHARACTERS,
  PARTY_MEMBERS,
  EQUIPMENT_ABILITIES_META,
  EQUIPMENT_STAT_ICONS,
  EQUIPMENT_STAT_ORDER,
  type ArmorIndex,
  type ChapterIndex,
  type CharacterIndex,
  type EquipmentAbilityIndex,
  type WeaponIndex,
} from '@data';
import type { AbilityValues, EquipmentStats } from '@types';
import { useCharacterOverrideInputs } from '@hooks';
import { useSave } from '@store';
import {
  armorHelpers,
  characterHelpers,
  weaponHelpers,
} from '@utils/data-helpers';
import { getCharacterColor } from '@utils/get-character-color';
import { WIKI_ABILITIES_URL, getWikiUrl } from '@utils/wiki-url';
import { mergeClass } from '@utils/merge-class';
import {
  formatTranslation,
  getArmorTranslationKeyPrefix,
  getEquipmentAbilityTranslationKeyPrefix,
  getWeaponTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { CharacterIcon } from './CharacterIcon';
import { EquipmentIcon } from './EquipmentIcon';
import { InlineGroup } from './InlineGroup';
import { Tooltip } from './Tooltip';
import { TooltipHeading } from './TooltipHeading';

type EquipmentType = 'weapon' | 'armor';

type Translate = (key: string, fallback: string) => string;

function useEquippableBy(type: EquipmentType, id: number) {
  const inputs: Record<
    number,
    ReturnType<typeof useCharacterOverrideInputs>
  > = {
    [CHARACTERS.KRIS]: useCharacterOverrideInputs(CHARACTERS.KRIS),
    [CHARACTERS.SUSIE]: useCharacterOverrideInputs(CHARACTERS.SUSIE),
    [CHARACTERS.RALSEI]: useCharacterOverrideInputs(CHARACTERS.RALSEI),
    [CHARACTERS.NOELLE]: useCharacterOverrideInputs(CHARACTERS.NOELLE),
  };

  return PARTY_MEMBERS.map((character) => {
    const meta = characterHelpers.getById(character);
    const overrides = meta.getOverrides?.(inputs[character]);
    const allowed =
      type === 'weapon'
        ? (overrides?.allowedWeapons ?? meta.allowedWeapons)
        : (overrides?.allowedArmors ?? meta.allowedArmors);

    return { character, canEquip: allowed.has(id as never) };
  });
}

interface EquippableRowProps {
  entries: { character: CharacterIndex; canEquip: boolean }[];
  t: Translate;
}

function EquippableRow({ entries, t }: EquippableRowProps) {
  return (
    <InlineGroup className="gap-2">
      {entries.map(({ character, canEquip }) => {
        const name = characterHelpers.getById(character).displayName;

        return (
          <span
            key={character}
            title={
              canEquip
                ? name
                : `${name} — ${t('ui.tooltip.cannotEquip', 'cannot equip')}`
            }
            className={mergeClass(
              'inline-flex h-7 w-7 shrink-0 items-center justify-center',
              canEquip
                ? getCharacterColor(character).text
                : 'text-text-3 grayscale',
            )}
          >
            <CharacterIcon character={character} />
          </span>
        );
      })}
    </InlineGroup>
  );
}

interface EquipmentTooltipContentProps {
  type: EquipmentType;
  id: number;
}

interface EquipmentTooltipProps extends EquipmentTooltipContentProps {
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

interface EquipmentAbilityTooltipProps {
  ability: EquipmentAbilityIndex | undefined;
  // Values from the item granting the ability; see resolveAbility.
  values?: AbilityValues;
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

function resolveAbility(
  ability: EquipmentAbilityIndex | undefined,
  chapter: ChapterIndex,
  t: Translate,
  // Supplied by whichever item granted the ability. Items sharing an ability at
  // different values can each fill the same {token} with their own number.
  values?: AbilityValues,
) {
  if (ability === undefined) return undefined;

  const base = EQUIPMENT_ABILITIES_META[ability];
  if (!base) return undefined;

  const meta = { ...base, ...base.getOverrides?.({ chapter }) };
  const translated = translateMeta(
    getEquipmentAbilityTranslationKeyPrefix(ability),
    meta,
    t,
  );

  return {
    meta,
    displayName: translated.displayName,
    // Interpolate after translating, so localised text keeps the same tokens.
    description:
      translated.description && values
        ? formatTranslation(translated.description, values)
        : translated.description,
  };
}

function renderDescription(description: string | undefined, t: Translate) {
  return (
    <p className="ui-prose-muted border-t border-divider pt-2 whitespace-pre-line">
      {description ?? t('ui.tooltip.noDescription', '(No description.)')}
    </p>
  );
}

export function EquipmentTooltipContent({
  type,
  id,
}: EquipmentTooltipContentProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;

  const baseMeta =
    type === 'weapon'
      ? weaponHelpers.getById(id as WeaponIndex)
      : armorHelpers.getById(id as ArmorIndex);

  // A chapter can override the stats and the description
  const meta = baseMeta
    ? { ...baseMeta, ...baseMeta.getOverrides?.({ chapter }) }
    : undefined;

  const translated = meta
    ? translateMeta(
        type === 'weapon'
          ? getWeaponTranslationKeyPrefix(id)
          : getArmorTranslationKeyPrefix(id),
        meta,
        t,
      )
    : undefined;

  const ability = resolveAbility(
    meta?.ability,
    chapter,
    t,
    meta?.abilityValues,
  );

  const equippableBy = useEquippableBy(type, id);

  if (!meta || !translated) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start gap-3">
        <div className="flex flex-col gap-2">
          <TooltipHeading
            icon={meta.icon}
            name={translated.displayName}
            href={getWikiUrl(meta.displayName)}
          />

          {ability ? (
            <InlineGroup className="gap-1">
              <EquipmentIcon icon={ability.meta.icon} />
              <span className="text-sm text-text-2">{ability.displayName}</span>
            </InlineGroup>
          ) : (
            <span className="text-sm text-text-3">
              {t('ui.tooltip.noAbility', '(No ability.)')}
            </span>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <EquippableRow entries={equippableBy} t={t} />
          <StatsRow stats={meta.stats} />
        </div>
      </div>

      {renderDescription(translated.description, t)}
    </div>
  );
}

interface StatsRowProps {
  stats: EquipmentStats;
}

function StatsRow({ stats }: StatsRowProps) {
  return (
    <InlineGroup className="gap-3">
      {EQUIPMENT_STAT_ORDER.map((stat) => {
        const noStats = stats[stat] <= 0;

        return (
          <InlineGroup key={stat} className="gap-1">
            <EquipmentIcon
              icon={EQUIPMENT_STAT_ICONS[stat]}
              className={noStats ? 'opacity-30' : undefined}
            />
            <span
              className={mergeClass(
                'text-sm',
                noStats ? 'text-text-3' : 'text-text-2',
              )}
            >
              {stats[stat]}
            </span>
          </InlineGroup>
        );
      })}
    </InlineGroup>
  );
}

export function EquipmentTooltip({
  type,
  id,
  children,
  className,
  focusable,
}: EquipmentTooltipProps) {
  return (
    <Tooltip
      content={<EquipmentTooltipContent type={type} id={id} />}
      className={className}
      focusable={focusable}
    >
      {children}
    </Tooltip>
  );
}

export function EquipmentAbilityTooltip({
  ability,
  values,
  children,
  className,
  focusable,
}: EquipmentAbilityTooltipProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const resolved = resolveAbility(ability, chapter, t, values);

  // No tooltips for abilities without description
  const content = resolved?.description ? (
    <div className="flex flex-col gap-2">
      <TooltipHeading
        icon={resolved.meta.icon}
        name={resolved.displayName}
        href={WIKI_ABILITIES_URL}
      />
      {renderDescription(resolved.description, t)}
    </div>
  ) : undefined;

  return (
    <Tooltip content={content} className={className} focusable={focusable}>
      {children}
    </Tooltip>
  );
}

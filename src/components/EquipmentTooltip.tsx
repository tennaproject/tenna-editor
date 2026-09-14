import { isDataEntryAvailable } from '@utils/resolve-game-data';
import type { ReactNode } from 'react';
import {
  CHARACTERS,
  EQUIPMENT_ABILITIES_META,
  type ChapterIndex,
  type CharacterIndex,
  type EquipmentAbilityIndex,
} from '@data';
import type { AbilityValues, EquipmentEntry, EquipmentStats } from '@types';
import { useCharacterOverrideInputs } from '@hooks';
import { useGameData, useSave } from '@store';
import {
  characterHelpers,
  getChapterPartyMembers,
  resolveChapterMeta,
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
import { EquipmentStatsRow } from './EquipmentStatsRow';
import { InlineGroup } from './InlineGroup';
import { Tooltip } from './Tooltip';
import { TooltipHeading } from './TooltipHeading';

type EquipmentType = 'weapon' | 'armor';

type Translate = (key: string, fallback: string) => string;

function useEquippableBy(
  type: EquipmentType,
  entry: EquipmentEntry,
  chapter: ChapterIndex,
) {
  const inputs: Record<
    number,
    ReturnType<typeof useCharacterOverrideInputs>
  > = {
    [CHARACTERS.KRIS]: useCharacterOverrideInputs(CHARACTERS.KRIS),
    [CHARACTERS.SUSIE]: useCharacterOverrideInputs(CHARACTERS.SUSIE),
    [CHARACTERS.RALSEI]: useCharacterOverrideInputs(CHARACTERS.RALSEI),
    [CHARACTERS.NOELLE]: useCharacterOverrideInputs(CHARACTERS.NOELLE),
  };

  return getChapterPartyMembers(chapter).map((character) => {
    const meta = characterHelpers.getById(character);
    const overrides = meta.getOverrides?.(inputs[character]);
    const allowed =
      type === 'weapon' ? overrides?.allowedWeapons : overrides?.allowedArmors;

    return {
      character,
      canEquip: isDataEntryAvailable(entry, character, allowed),
    };
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
              'inline-flex h-8 w-8 shrink-0 items-center justify-center',
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
  entry: EquipmentEntry;
  compareTo?: EquipmentStats;
}

interface EquipmentTooltipProps {
  type: EquipmentType;
  entry?: EquipmentEntry;
  id?: number;
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

interface EquipmentAbilityTooltipProps {
  ability: EquipmentAbilityIndex | undefined;
  values?: AbilityValues;
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

function resolveAbility(
  ability: EquipmentAbilityIndex | undefined,
  chapter: ChapterIndex,
  t: Translate,
  values?: AbilityValues,
) {
  if (ability === undefined) return undefined;

  const meta = resolveChapterMeta(EQUIPMENT_ABILITIES_META[ability], {
    chapter,
  });
  if (!meta) return undefined;

  const translated = translateMeta(
    getEquipmentAbilityTranslationKeyPrefix(ability),
    meta,
    t,
  );

  return {
    meta,
    displayName: translated.displayName,
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
  entry,
  compareTo,
}: EquipmentTooltipContentProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;

  const translated =
    !entry.dataPack || (entry.overridesBuiltIn && !entry.descriptionFromPack)
      ? translateMeta(
          type === 'weapon'
            ? getWeaponTranslationKeyPrefix(entry.id)
            : getArmorTranslationKeyPrefix(entry.id),
          {
            displayName: entry.displayName,
            description: entry.description,
          },
          t,
        )
      : undefined;

  const displayName = entry.dataPack
    ? entry.displayName
    : (translated?.displayName ?? entry.displayName);
  const description = entry.descriptionFromPack
    ? entry.description
    : (translated?.description ?? entry.description);

  const ability =
    entry.abilityIndex !== undefined
      ? resolveAbility(
          entry.abilityIndex as EquipmentAbilityIndex,
          chapter,
          t,
          entry.abilityValues,
        )
      : entry.ability
        ? {
            displayName: entry.ability,
            meta: undefined,
            description: undefined,
          }
        : undefined;

  const equippableBy = useEquippableBy(type, entry, chapter);
  const stats = entry.stats ?? { attack: 0, defence: 0, magic: 0 };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <TooltipHeading
            icon={entry.icon}
            name={displayName}
            href={entry.dataPack ? undefined : getWikiUrl(entry.displayName)}
            unknownArt={entry.id !== 0}
          />

          {ability ? (
            <InlineGroup className="gap-1">
              {ability.meta ? <EquipmentIcon icon={ability.meta.icon} /> : null}
              <span className="text-sm text-text-2">{ability.displayName}</span>
            </InlineGroup>
          ) : (
            <span className="text-sm text-text-3">
              {t('ui.tooltip.noAbility', '(No ability.)')}
            </span>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <EquippableRow entries={equippableBy} t={t} />
          <EquipmentStatsRow stats={stats} compareTo={compareTo} />
        </div>
      </div>

      {renderDescription(description, t)}
    </div>
  );
}

export function EquipmentTooltip({
  type,
  entry,
  id,
  children,
  className,
  focusable,
}: EquipmentTooltipProps) {
  const storeEntry = useGameData((state) =>
    type === 'weapon'
      ? state.weapons.byId.get(id ?? -1)
      : state.armors.byId.get(id ?? -1),
  );
  const resolved = entry ?? storeEntry;

  return (
    <Tooltip
      content={
        resolved ? (
          <EquipmentTooltipContent type={type} entry={resolved} />
        ) : undefined
      }
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

import type { ReactNode } from 'react';
import { useGameData, useSave } from '@store';
import { resolveLightWorldItemEntry } from '@utils/resolve-game-data';
import { getWikiUrl } from '@utils/wiki-url';
import {
  getArmorTranslationKeyPrefix,
  getItemTranslationKeyPrefix,
  getWeaponTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { EquipmentIcon } from './EquipmentIcon';
import { InlineGroup } from './InlineGroup';
import { Tooltip } from './Tooltip';
import { TooltipHeading } from './TooltipHeading';

interface LightWorldItemTooltipContentProps {
  id: number;
}

interface LightWorldItemTooltipProps extends LightWorldItemTooltipContentProps {
  children: ReactNode;
  className?: string;
  focusable?: boolean;
}

// Plainer text for themes and such
function formatStat(value: number, suffix: string) {
  return `${value >= 0 ? '+' : ''}${value}${suffix}`;
}

export function LightWorldItemTooltipContent({
  id,
}: LightWorldItemTooltipContentProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  // Some descriptions gain a line once a particular Dark World item exists
  const items = useSave((s) => s.save?.inventory.consumables) ?? [];

  const entry = useGameData((state) => state.lightWorldItems.byId.get(id));
  const weapons = useGameData((state) => state.weapons.byId);
  const armors = useGameData((state) => state.armors.byId);
  if (!entry) return null;
  const meta = resolveLightWorldItemEntry(entry, { chapter, items });
  const builtInTranslation = translateMeta(
    getItemTranslationKeyPrefix('lightWorldItem', id),
    meta,
    t,
  );
  const translated = {
    displayName: entry.dataPack
      ? meta.displayName
      : builtInTranslation.displayName,
    description:
      entry.descriptionFromPack || (entry.dataPack && !entry.overridesBuiltIn)
        ? meta.description
        : builtInTranslation.description,
  };

  const stats = [
    meta.attack !== undefined ? formatStat(meta.attack, 'AT') : undefined,
    meta.defence !== undefined ? formatStat(meta.defence, 'DF') : undefined,
  ].filter(Boolean);

  const darkWorldWeapon =
    meta.darkWorldWeapon !== undefined
      ? weapons.get(meta.darkWorldWeapon)
      : undefined;
  const darkWorldArmor =
    meta.darkWorldArmor !== undefined
      ? armors.get(meta.darkWorldArmor)
      : undefined;

  const darkWorldEquivalent = darkWorldWeapon
    ? {
        icon: darkWorldWeapon.icon,
        displayName: darkWorldWeapon.dataPack
          ? darkWorldWeapon.displayName
          : translateMeta(
              getWeaponTranslationKeyPrefix(meta.darkWorldWeapon as number),
              darkWorldWeapon,
              t,
            ).displayName,
      }
    : darkWorldArmor
      ? {
          icon: darkWorldArmor.icon,
          displayName: darkWorldArmor.dataPack
            ? darkWorldArmor.displayName
            : translateMeta(
                getArmorTranslationKeyPrefix(meta.darkWorldArmor as number),
                darkWorldArmor,
                t,
              ).displayName,
        }
      : undefined;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start gap-3">
        <TooltipHeading
          name={translated.displayName}
          href={entry.dataPack ? undefined : getWikiUrl(meta.displayName)}
        />

        {stats.length > 0 && (
          <span className="text-sm text-text-2 whitespace-nowrap">
            {stats.join(' ')}
          </span>
        )}
      </div>

      {meta.heal !== undefined && (
        <span className="text-sm text-green text-center">
          {t('ui.tooltip.heals', 'Heals')} {meta.heal}HP
        </span>
      )}

      <p className="ui-prose-muted border-t border-divider pt-2 whitespace-pre-line">
        {translated.description ??
          t('ui.tooltip.noDescription', '(No description.)')}
      </p>

      {darkWorldEquivalent && (
        <InlineGroup className="gap-1">
          <span className="text-sm text-text-3">
            {t('ui.tooltip.darkWorld', 'Dark World')}:
          </span>
          {darkWorldEquivalent.icon !== undefined && (
            <EquipmentIcon icon={darkWorldEquivalent.icon} />
          )}
          <span className="text-sm text-text-2">
            {darkWorldEquivalent.displayName}
          </span>
        </InlineGroup>
      )}
    </div>
  );
}

export function LightWorldItemTooltip({
  id,
  children,
  className,
  focusable,
}: LightWorldItemTooltipProps) {
  return (
    <Tooltip
      content={<LightWorldItemTooltipContent id={id} />}
      className={className}
      focusable={focusable}
    >
      {children}
    </Tooltip>
  );
}

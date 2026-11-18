import { EquipmentIcon } from '@components';
import { CHARACTERS, type CharacterIndex } from '@data';
import { useSave } from '@store';
import {
  getCharacterFlavorStats,
  type FlavorLabel,
} from '@utils/character-flavor-stats';
import { useTranslation } from '../i18n';

interface CharacterFlavorStatsProps {
  character: CharacterIndex;
  className?: string;
}

export function CharacterFlavorStats({
  character,
  className,
}: CharacterFlavorStatsProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const plot = useSave((s) => s.save?.plot) ?? 0;
  const flags = useSave((s) => s.save?.flags);
  const krisMagic =
    useSave((s) => s.save?.characters[CHARACTERS.KRIS].magic) ?? 0;
  const weapon = useSave((s) => s.save?.characters[character].weapon) ?? 0;

  if (!flags) return null;

  const labels: Record<FlavorLabel, string> = {
    guts: t('ui.party.flavor.guts', 'Guts'),
    rudeness: t('ui.party.flavor.rudeness', 'Rudeness'),
    crudeness: t('ui.party.flavor.crudeness', 'Crudeness'),
    purple: t('ui.party.flavor.purple', 'Purple'),
    plucked: t('ui.party.flavor.plucked', 'Plucked'),
    healing: t('ui.party.flavor.healing', 'Healing'),
    kindness: t('ui.party.flavor.kindness', 'Kindness'),
    sweetness: t('ui.party.flavor.sweetness', 'Sweetness'),
    carried: t('ui.party.flavor.carried', 'Carried'),
    fluffiness: t('ui.party.flavor.fluffiness', 'Fluffiness'),
    coldness: t('ui.party.flavor.coldness', 'Coldness'),
    boldness: t('ui.party.flavor.boldness', 'Boldness'),
    jumps: t('ui.party.flavor.jumps', 'Jumps'),
    slashes: t('ui.party.flavor.slashes', 'Slashes'),
    slain: t('ui.party.flavor.slain', 'Slain'),
    purify: t('ui.party.flavor.purify', 'Purify'),
  };

  const stats = getCharacterFlavorStats({
    character,
    chapter,
    plot: Number(plot),
    flags,
    krisMagic: Number(krisMagic),
    weapon,
  });

  return (
    <div className={className}>
      {stats.map((stat) => (
        <div
          key={stat.row}
          className="grid h-[1.375rem] grid-cols-[1.5rem_7rem_auto] items-center gap-x-2 text-[0.9375rem]"
        >
          <span className="flex justify-center text-text-2">
            {stat.icon !== undefined && <EquipmentIcon icon={stat.icon} />}
            {stat.asterisk && (
              <span className="inline-flex h-[24px] w-[20px] items-center justify-center pt-2 text-3xl leading-none text-text-1">
                *
              </span>
            )}
          </span>
          <span className={stat.unknown ? 'text-text-3' : 'text-text-2'}>
            {stat.unknown
              ? t('ui.party.flavor.unknown', '???')
              : stat.label && labels[stat.label]}
          </span>
          <span className="flex items-center gap-1 text-text-1">
            {stat.label === 'purple' ? t('ui.common.yes', 'Yes') : stat.value}
            {stat.icon !== undefined &&
              Array.from({ length: stat.repeat ?? 0 }, (_, i) => (
                <EquipmentIcon key={i} icon={stat.icon!} />
              ))}
          </span>
        </div>
      ))}
    </div>
  );
}

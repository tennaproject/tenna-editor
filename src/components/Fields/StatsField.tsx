import { EquipmentIcon, NumberField } from '@components';
import { EQUIPMENT_STAT_ICONS, type CharacterIndex } from '@data';
import { useSave } from '@store';
import { getEffectiveCharacterStats } from '@utils';
import { useTranslation } from '../../i18n';
import { compactBigInt, MAX_GAME_INTEGER, toBigInt } from '@utils/big-integer';

type StatsType = 'attack' | 'defence' | 'magic' | 'health' | 'maxHealth';

const STATS_TITLES: Record<StatsType, string> = {
  attack: 'Attack',
  defence: 'Defence',
  magic: 'Magic',
  health: 'Current HP',
  maxHealth: 'Max HP',
} as const;

const STATS_TITLE_KEYS: Record<StatsType, string> = {
  attack: 'ui.stats.attack',
  defence: 'ui.stats.defence',
  magic: 'ui.stats.magic',
  health: 'ui.stats.currentHp',
  maxHealth: 'ui.stats.maxHp',
};

interface StatFieldProps {
  id?: string;
  type: StatsType;
  character: CharacterIndex;
}

function isCoreStat(type: StatsType): type is 'attack' | 'defence' | 'magic' {
  return type === 'attack' || type === 'defence' || type === 'magic';
}

export function StatsField({ id, type, character }: StatFieldProps) {
  const { t } = useTranslation();
  const savedCharacter = useSave((s) => s.save?.characters[character]);
  const updateSave = useSave((s) => s.updateSave);
  const coreStat = isCoreStat(type);
  const equipmentBonus =
    savedCharacter && coreStat
      ? toBigInt(getEffectiveCharacterStats(savedCharacter)[type]) -
        toBigInt(savedCharacter[type])
      : 0n;
  const current = savedCharacter
    ? coreStat
      ? toBigInt(savedCharacter[type]) + equipmentBonus
      : toBigInt(savedCharacter[type])
    : 0n;

  function onChange(value: bigint) {
    updateSave((save) => {
      const savedCharacter = save.characters[character];

      if (isCoreStat(type)) {
        const equipmentBonus = savedCharacter.weaponStats
          .slice(0, 3)
          .reduce((total, stats) => total + BigInt(stats[type]), 0n);
        savedCharacter[type] = compactBigInt(value - equipmentBonus) as number;
      } else {
        savedCharacter[type] = compactBigInt(value) as number;
      }
    });
  }

  return (
    <NumberField
      id={id}
      className="flex-1"
      title={t(STATS_TITLE_KEYS[type], STATS_TITLES[type])}
      titleIcon={
        coreStat ? (
          <EquipmentIcon icon={EQUIPMENT_STAT_ICONS[type]} />
        ) : undefined
      }
      value={current}
      placeholder={t('ui.stats.enterValue', 'Enter value...')}
      min={coreStat ? equipmentBonus : 0n}
      max={MAX_GAME_INTEGER}
      onChange={onChange}
      fullWidth
    />
  );
}

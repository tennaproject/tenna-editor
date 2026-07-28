import { NumberField } from '@components';
import type { CharacterIndex } from '@data';
import { useSave } from '@store';
import { getEffectiveCharacterStats } from '@utils';
import { useTranslation } from '../../i18n';

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
      ? getEffectiveCharacterStats(savedCharacter)[type] - savedCharacter[type]
      : 0;
  const current = savedCharacter
    ? coreStat
      ? getEffectiveCharacterStats(savedCharacter)[type]
      : savedCharacter[type]
    : 0;

  function onChange(value: number) {
    updateSave((save) => {
      const savedCharacter = save.characters[character];

      if (isCoreStat(type)) {
        const equipmentBonus =
          getEffectiveCharacterStats(savedCharacter)[type] -
          savedCharacter[type];
        savedCharacter[type] = value - equipmentBonus;
      } else {
        savedCharacter[type] = value;
      }
    });
  }

  return (
    <NumberField
      id={id}
      className="flex-1"
      title={t(STATS_TITLE_KEYS[type], STATS_TITLES[type])}
      value={current}
      placeholder={t('ui.stats.enterValue', 'Enter value...')}
      min={coreStat ? equipmentBonus : 0}
      max={coreStat ? 9999 + equipmentBonus : 9999}
      onChange={onChange}
      fullWidth
    />
  );
}

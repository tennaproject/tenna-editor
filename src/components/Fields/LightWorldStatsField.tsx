import { NumberField } from '@components';
import { useSave } from '@store';
import { useTranslation } from '../../i18n';
import { compactBigInt, MAX_GAME_INTEGER, toBigInt } from '@utils/big-integer';

type LightWorldStatsType =
  'attack' | 'defence' | 'experience' | 'health' | 'maxHealth' | 'level';

const STATS_TITLES: Record<LightWorldStatsType, string> = {
  attack: 'Attack',
  defence: 'Defence',
  experience: 'Experience',
  health: 'Current HP',
  maxHealth: 'Max HP',
  level: 'Level',
} as const;

const STATS_TITLE_KEYS: Record<LightWorldStatsType, string> = {
  attack: 'ui.stats.attack',
  defence: 'ui.stats.defence',
  experience: 'ui.stats.experience',
  health: 'ui.stats.currentHp',
  maxHealth: 'ui.stats.maxHp',
  level: 'ui.stats.level',
};

interface LightWorldStatsFieldProps {
  id?: string;
  type: LightWorldStatsType;
}

export function LightWorldStatsField({ id, type }: LightWorldStatsFieldProps) {
  const { t } = useTranslation();
  const current =
    useSave((s) => {
      if (s.save) {
        return s.save.lightWorld[type];
      }
    }) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  function onChange(value: bigint) {
    updateSave((save) => {
      save.lightWorld[type] = compactBigInt(value) as number;
    });
  }

  return (
    <NumberField
      id={id}
      className="flex-1"
      title={t(STATS_TITLE_KEYS[type], STATS_TITLES[type])}
      value={toBigInt(current)}
      placeholder={t('ui.stats.enterValue', 'Enter value...')}
      min={0n}
      max={MAX_GAME_INTEGER}
      onChange={onChange}
      fullWidth
    />
  );
}

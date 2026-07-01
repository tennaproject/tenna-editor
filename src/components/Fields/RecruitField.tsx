import {
  Card,
  Checkbox,
  GlowBar,
  Heading,
  NumberInput,
  Section,
} from '@components';
import type { EnemyIndex, FlagIndex } from '@data';
import { useSaveFlag } from '@hooks';
import { useSave } from '@store';
import { enemyHelpers } from '@utils/data-helpers';
import { mergeClass } from '@utils/merge-class';
import {
  getEnemyTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';

interface RecruitFieldProps {
  id: string;
  enemy: EnemyIndex;
}

const STATUS_COLORS = {
  recruited: {
    bg: 'bg-green',
    shadow: 'shadow-green',
    text: 'text-green',
  },
  lost: {
    bg: 'bg-red',
    shadow: 'shadow-red',
    text: 'text-red',
  },
  partial: {
    bg: 'bg-yellow',
    shadow: 'shadow-yellow',
    text: 'text-yellow',
  },
  none: {
    bg: 'bg-surface-3',
    shadow: 'shadow-surface-3',
    text: 'text-text-3',
  },
} as const;

type RecruitStatusKey = keyof typeof STATUS_COLORS;

function getRecruitStatus(
  currentlyRecruited: number,
  recruitCount: number,
): { key: RecruitStatusKey; label: string; showGlow: boolean } {
  if (currentlyRecruited === -1) {
    return { key: 'lost', label: 'Lost', showGlow: true };
  }
  if (currentlyRecruited === recruitCount) {
    return { key: 'recruited', label: 'Recruited', showGlow: true };
  }
  if (currentlyRecruited > 0 && currentlyRecruited < recruitCount) {
    return {
      key: 'partial',
      label: `${currentlyRecruited} / ${recruitCount}`,
      showGlow: true,
    };
  }
  return { key: 'none', label: 'Not recruited', showGlow: false };
}

export function RecruitField({ id, enemy }: RecruitFieldProps) {
  const { t } = useTranslation();
  const updateSave = useSave((s) => s.updateSave);
  const meta = translateMeta(
    getEnemyTranslationKeyPrefix(enemy),
    enemyHelpers.getById(enemy),
    t,
  );
  const flag = useSaveFlag(meta.recruitFlag as FlagIndex) as number;

  /* Flag values:
    -1 for lost,
    0 when no one is recruited,
    1 when everyone is recruited,
    fractions of 1 when only some are recruited,
  */
  const recruitCount = meta.recruitCount ?? 1;
  let currentlyRecruited = flag;
  if (recruitCount > 1) {
    if (flag !== 0 && flag !== -1) {
      currentlyRecruited = flag * recruitCount;
    }
  }

  const status = getRecruitStatus(currentlyRecruited, recruitCount);
  const colors = STATUS_COLORS[status.key];
  const statusLabel =
    status.key === 'lost'
      ? t('ui.recruits.lost', status.label)
      : status.key === 'recruited'
        ? t('ui.recruits.recruited', status.label)
        : status.key === 'none'
          ? t('ui.recruits.notRecruited', status.label)
          : status.label;
  const countLabel =
    recruitCount > 1
      ? t('ui.field.recruitCount', 'Recruit count')
      : t('ui.field.status', 'Status');

  return (
    <Section id={id} className="flex flex-col">
      <Card
        className={mergeClass(
          'flex flex-col flex-1',
          !meta.recruitable && 'opacity-75',
        )}
      >
        <div className="flex flex-col gap-3 p-4 flex-1">
          <div className="flex flex-col gap-1 min-h-12">
            <Heading level={5} className={mergeClass('uppercase', colors.text)}>
              {meta.displayName}
            </Heading>
            <span className="text-xs uppercase tracking-wide text-text-3">
              {statusLabel}
              {!meta.recruitable && ` · ${t('ui.recruits.unused', 'Unused')}`}
            </span>
          </div>

          <Checkbox
            label={t('ui.field.recruited', 'Recruited')}
            checked={currentlyRecruited === recruitCount}
            onChange={(state) => {
              updateSave(
                (save) =>
                  (save.flags[meta.recruitFlag as FlagIndex] = state ? 1 : 0),
              );
            }}
          />

          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-2">{countLabel}</span>
            <NumberInput
              min={-1}
              max={recruitCount}
              value={currentlyRecruited}
              onChange={(value) => {
                let newValue = value;
                if (recruitCount > 1) {
                  if (newValue !== 0 && newValue !== -1) {
                    newValue = value / recruitCount;
                  }
                }

                updateSave(
                  (save) =>
                    (save.flags[meta.recruitFlag as FlagIndex] = newValue),
                );
              }}
              className="w-full"
              fullWidth
            />
          </div>
        </div>
        <GlowBar
          bg={colors.bg}
          shadow={colors.shadow}
          hidden={!status.showGlow}
        />
      </Card>
    </Section>
  );
}

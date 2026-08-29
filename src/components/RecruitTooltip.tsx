import type { EnemyIndex, FlagIndex } from '@data';
import { useSaveFlag } from '@hooks';
import { enemyHelpers } from '@utils/data-helpers';
import { getWikiUrl } from '@utils/wiki-url';
import { getRecruitStatus, RECRUIT_STATUS_COLORS } from '@utils/recruit-status';
import { mergeClass } from '@utils/merge-class';
import {
  getEnemyTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../i18n';
import { RecruitImage } from './RecruitSprite';
import { TooltipHeading } from './TooltipHeading';
import { getRecruitMediaSrc } from '@utils/recruit-media';

interface RecruitTooltipContentProps {
  enemy: EnemyIndex;
}

export function RecruitTooltipContent({ enemy }: RecruitTooltipContentProps) {
  const { t } = useTranslation();
  const enemyMeta = enemyHelpers.getById(enemy);
  const meta = translateMeta(getEnemyTranslationKeyPrefix(enemy), enemyMeta, t);
  const flag = useSaveFlag(meta.recruitFlag as FlagIndex | undefined);
  const recruitCount = meta.recruitCount ?? 1;
  let currentlyRecruited = flag;
  if (recruitCount > 1 && flag !== 0 && flag !== -1) {
    currentlyRecruited = flag * recruitCount;
  }

  const isRecruited = currentlyRecruited === recruitCount;
  const status = getRecruitStatus(currentlyRecruited, recruitCount);
  const colors = RECRUIT_STATUS_COLORS[status.key];
  const statusLabel =
    status.key === 'lost'
      ? t('ui.recruits.lost', status.label)
      : status.key === 'recruited'
        ? t('ui.recruits.recruited', status.label)
        : status.key === 'none'
          ? t('ui.recruits.notRecruited', status.label)
          : status.label;
  const mediaSrc = getRecruitMediaSrc(enemyHelpers.getName(enemy));

  return (
    <div className="flex flex-col gap-2">
      <TooltipHeading
        name={meta.displayName}
        href={getWikiUrl(enemyMeta.displayName)}
      />

      <div className="flex h-28 justify-center">
        {mediaSrc && (
          <RecruitImage src={mediaSrc} recruited={isRecruited} fit />
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-divider pt-2">
        <span className="text-xs uppercase tracking-wide text-text-3">
          {t('ui.field.status', 'Status')}
        </span>
        <span className={mergeClass('text-sm uppercase', colors.text)}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

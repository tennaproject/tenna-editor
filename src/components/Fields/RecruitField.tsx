import { useEffect, useRef, useState } from 'react';
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

const RECRUIT_MEDIA = import.meta.glob<string>(
  '../../assets/deltarune/recruits/*.{png,gif,jpg,jpeg,webp}',
  { eager: true, import: 'default', query: '?url' },
);

const RECRUIT_MEDIA_BY_NAME = new Map(
  Object.entries(RECRUIT_MEDIA).map(([path, src]) => {
    const file = path.slice(path.lastIndexOf('/') + 1);
    const stem = file.slice(0, file.lastIndexOf('.'));
    return [stem.toLowerCase(), src] as const;
  }),
);

function getRecruitMediaSrc(enemyName: string): string | undefined {
  return RECRUIT_MEDIA_BY_NAME.get(enemyName.toLowerCase());
}

interface RecruitImageProps {
  src: string;
  recruited: boolean;
}

function RecruitImage({ src, recruited }: RecruitImageProps) {
  const [scaledWidth, setScaledWidth] = useState<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /* Freeze regardless of the format. Small assets are inlined as data URIs in
     production builds, so the file extension is not reliable here. */
  const freezeFrame = !recruited;

  useEffect(() => {
    if (!freezeFrame) return;

    const image = new Image();
    image.onload = () => {
      setScaledWidth(image.naturalWidth);
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d')?.drawImage(image, 0, 0);
    };
    image.src = src;
  }, [src, freezeFrame]);

  const sharedProps = {
    style: scaledWidth ? { width: scaledWidth } : undefined,
    className: mergeClass(
      'max-w-none [image-rendering:pixelated]',
      !recruited && 'grayscale opacity-50',
    ),
  };

  return (
    <div className="flex min-w-0 flex-1 items-end justify-center">
      {freezeFrame ? (
        <canvas ref={canvasRef} aria-hidden {...sharedProps} />
      ) : (
        <img
          src={src}
          alt=""
          aria-hidden
          onLoad={(event) => {
            setScaledWidth(event.currentTarget.naturalWidth);
          }}
          {...sharedProps}
        />
      )}
    </div>
  );
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
  const mediaSrc = getRecruitMediaSrc(enemyHelpers.getName(enemy));

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

  const isRecruited = currentlyRecruited === recruitCount;
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
          <div className="flex h-28 gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 min-h-12">
                <Heading
                  level={5}
                  className={mergeClass('uppercase', colors.text)}
                >
                  {meta.displayName}
                </Heading>
                <span className="text-xs uppercase tracking-wide text-text-3">
                  {statusLabel}
                  {!meta.recruitable &&
                    ` · ${t('ui.recruits.unused', 'Unused')}`}
                </span>
              </div>

              <Checkbox
                label={t('ui.field.recruited', 'Recruited')}
                checked={isRecruited}
                onChange={(state) => {
                  updateSave(
                    (save) =>
                      (save.flags[meta.recruitFlag as FlagIndex] = state
                        ? 1
                        : 0),
                  );
                }}
              />
            </div>

            {mediaSrc && (
              <RecruitImage src={mediaSrc} recruited={isRecruited} />
            )}
          </div>

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

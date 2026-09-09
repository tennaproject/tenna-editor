import {
  FlagField,
  HelpTip,
  InlineGroup,
  RecruitImage,
  RecruitTooltipContent,
  Section,
  Select,
  TextLabel,
  type SelectItem,
} from '@components';
import type { EnemyIndex, FlagIndex } from '@data';
import { useGameData, useSave, useUi } from '@store';
import { useSaveFlag } from '@hooks';
import { enemyHelpers } from '@utils/data-helpers';
import { getRecruitStatus } from '@utils/recruit-status';
import { getRecruitMediaSrc } from '@utils/recruit-media';
import {
  getFlagTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';

interface CafeSeatFieldProps {
  id: string;
  flag: FlagIndex;
}

function isEnemyFullyRecruited(
  enemy: EnemyIndex,
  flags: readonly unknown[] | undefined,
): boolean {
  const meta = enemyHelpers.getById(enemy);
  if (!meta?.recruitFlag) return false;

  const flagValue = (flags?.[meta.recruitFlag] as number | undefined) ?? 0;
  const recruitCount = meta.recruitCount ?? 1;
  let currentlyRecruited = flagValue;
  if (recruitCount > 1 && flagValue !== 0 && flagValue !== -1) {
    currentlyRecruited = flagValue * recruitCount;
  }

  return getRecruitStatus(currentlyRecruited, recruitCount).key === 'recruited';
}

export function CafeSeatField({ id, flag }: CafeSeatFieldProps) {
  const { t } = useTranslation();
  const updateSave = useSave((s) => s.updateSave);
  const value = useSave((s) => s.save?.flags[flag] ?? 0) as number;
  const flags = useSave((s) => s.save?.flags);
  const showNonRecruitableEnemies = useUi(
    (s) => s.ui.recruits.showNonRecruitableEnemies,
  );
  const showNonRecruitedInCafe = useUi(
    (s) => s.ui.recruits.showNonRecruitedInCafe,
  );
  const entry = useGameData((state) => state.flags.byId.get(flag))!;
  const translated = translateMeta(getFlagTranslationKeyPrefix(flag), entry, t);

  const meta = entry.dataPack
    ? {
        ...entry,
        description:
          entry.descriptionFromPack || !entry.overridesBuiltIn
            ? entry.description
            : translated.description,
      }
    : translated;

  const flagTag = (
    <span className="ui-mono-sm font-normal text-text-3">
      <span className="select-none">#</span>
      <span className="select-all">{flag}</span>
    </span>
  );

  const selectItems: SelectItem[] = Object.entries(entry.valueRules?.map ?? {})
    .map(([itemValue, label]) => {
      const enemy = Number(itemValue) as EnemyIndex;

      return {
        id: itemValue,
        label: entry.dataPack
          ? label
          : t(`${getFlagTranslationKeyPrefix(flag)}.map.${itemValue}`, label),
        value: itemValue,
        unused: entry.valueRules?.unusedValues?.has(enemy),
        tooltip: enemyHelpers.getById(enemy) ? (
          <RecruitTooltipContent enemy={enemy} />
        ) : undefined,
      };
    })
    .filter((item) => {
      const enemy = Number(item.value) as EnemyIndex;
      if (enemy === value) return true;

      const enemyMeta = enemyHelpers.getById(enemy);
      if (entry.dataPack && !enemyMeta) return true;
      if (!showNonRecruitableEnemies && !enemyMeta?.recruitable) {
        return false;
      }

      if (!showNonRecruitedInCafe && !isEnemyFullyRecruited(enemy, flags)) {
        return false;
      }

      return true;
    })
    .sort((itemA, itemB) => Number(itemA.value) - Number(itemB.value));

  const selectedItem =
    selectItems.find((item) => Number(item.value) === value) ?? null;

  const currentMeta = enemyHelpers.getById(value as EnemyIndex);
  const currentMediaSrc = currentMeta
    ? getRecruitMediaSrc(enemyHelpers.getName(value as EnemyIndex))
    : undefined;
  const currentFlagValue = useSaveFlag(currentMeta?.recruitFlag);
  const currentRecruitCount = currentMeta?.recruitCount ?? 1;
  const currentStatus = getRecruitStatus(
    currentFlagValue === -1 ? -1 : currentFlagValue * currentRecruitCount,
    currentRecruitCount,
  );
  const isRecruited = currentStatus.key === 'recruited';

  if (entry.valueType !== 'map' || !entry.valueRules?.map)
    return <FlagField id={id} flag={flag} />;

  return (
    <Section id={id} className="gap-2">
      <div className="flex h-28 items-end justify-center pb-3">
        {currentMediaSrc && (
          <RecruitImage src={currentMediaSrc} recruited={isRecruited} fit />
        )}
      </div>
      <InlineGroup>
        <TextLabel htmlFor={id}>{meta.displayName}</TextLabel>
        <HelpTip title={meta.displayName} titleExtra={flagTag}>
          {meta.description}
        </HelpTip>
      </InlineGroup>
      <Select
        items={selectItems}
        placeholder={t('ui.flag.mapPlaceholder', 'Select value...')}
        label={meta.displayName}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          if (!item) return;
          const next = Number(item.value);
          if (Number.isFinite(next)) {
            updateSave((save) => {
              save.flags[flag] = next;
            });
          }
        }}
        className="w-full"
      />
    </Section>
  );
}

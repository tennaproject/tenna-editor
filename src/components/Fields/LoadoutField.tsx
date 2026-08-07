import {
  Select,
  type SelectItem,
  type InvalidReason,
  FieldWrapper,
  EquipmentIcon,
  EquipmentStatsRow,
  InlineGroup,
  EquipmentTooltipContent,
  EquipmentAbilityTooltip,
} from '@components';
import {
  EQUIPMENT_ABILITIES_META,
  type CharacterIndex,
  type WeaponIndex,
  type ArmorIndex,
} from '@data';
import { useCharacterOverrideInputs } from '@hooks';
import { useSave } from '@store';
import { getChapterLoadoutOptions } from '@utils/chapter-options';
import {
  armorHelpers,
  chapterHelpers,
  characterHelpers,
  resolveChapterMeta,
  weaponHelpers,
} from '@utils/data-helpers';
import {
  getArmorTranslationKeyPrefix,
  getEquipmentAbilityTranslationKeyPrefix,
  getWeaponTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';
import {
  getEquipmentStats,
  syncEquipmentStats as syncStoredEquipmentStats,
} from '@utils';

type LoadoutType = 'weapon' | 'primaryArmor' | 'secondaryArmor';

const LOADOUT_TITLES: Record<LoadoutType, string> = {
  weapon: 'Weapon',
  primaryArmor: 'Armor I',
  secondaryArmor: 'Armor II',
};

const LOADOUT_TITLE_KEYS: Record<LoadoutType, string> = {
  weapon: 'ui.field.weapon',
  primaryArmor: 'ui.field.armorI',
  secondaryArmor: 'ui.field.armorII',
};

interface LoadoutFieldProps {
  id?: string;
  type: LoadoutType;
  character: CharacterIndex;
  allowAllElements: boolean;
  recalculateStats: boolean;
}

export function LoadoutField({
  id,
  type,
  character,
  allowAllElements,
  recalculateStats,
}: LoadoutFieldProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const current = useSave((s) => s.save?.characters[character][type]) ?? 0;
  const updateSave = useSave((s) => s.updateSave);
  const characterMeta = characterHelpers.getById(character);
  const overrideInputs = useCharacterOverrideInputs(character);
  const overrides = characterMeta.getOverrides?.(overrideInputs);

  const optionType = type === 'weapon' ? 'weapon' : 'armor';
  const chapterSet = chapterHelpers.getById(chapter).content[
    optionType === 'weapon' ? 'weapons' : 'armors'
  ] as Set<number>;

  const getElementMeta = (value: number) =>
    optionType === 'weapon'
      ? weaponHelpers.getById(value as WeaponIndex)
      : armorHelpers.getById(value as ArmorIndex);

  const baseElementMeta = getElementMeta(current as number);
  const elementMeta = resolveChapterMeta(baseElementMeta, { chapter });
  const isExisting = !!(
    elementMeta && (elementMeta as { displayName?: string }).displayName
  );
  const isInChapter = chapterSet.has(current as number);
  const isValid = isExisting && isInChapter;

  const allowedElementsOverride =
    optionType === 'weapon'
      ? overrides?.allowedWeapons
      : overrides?.allowedArmors;

  const stats = getEquipmentStats(type, current as WeaponIndex, chapter);
  const equippedStats = stats ?? { attack: 0, defence: 0, magic: 0 };

  const baseItems = getChapterLoadoutOptions(
    chapter,
    optionType,
    character,
    allowAllElements,
    allowedElementsOverride,
  ).map((item) => {
    const icon = getElementMeta(item.value as number)?.icon;

    return {
      ...item,
      icon:
        icon !== undefined ? (
          <EquipmentIcon icon={icon} unknownArt={item.value !== 0} />
        ) : undefined,
      tooltip:
        item.value !== 0 ? (
          <EquipmentTooltipContent
            type={optionType}
            id={item.value as number}
            compareTo={equippedStats}
          />
        ) : undefined,
      label: translateMeta(
        optionType === 'weapon'
          ? getWeaponTranslationKeyPrefix(item.value as number)
          : getArmorTranslationKeyPrefix(item.value as number),
        { displayName: item.label },
        t,
      ).displayName,
    };
  });

  const isOffered = baseItems.some((item) => item.value === current);
  const invalidReasons: InvalidReason[] = [];
  if (!isExisting) invalidReasons.push('unknown');
  if (!isInChapter) invalidReasons.push('notInChapter');
  if (isExisting && isInChapter && !isOffered)
    invalidReasons.push('notAvailableTo');

  let selectItems: SelectItem[] = baseItems;
  if (!isValid || !isOffered) {
    selectItems = [
      ...baseItems,
      {
        id: `${current}`,
        icon:
          isExisting && elementMeta.icon !== undefined ? (
            <EquipmentIcon icon={elementMeta.icon} unknownArt={current !== 0} />
          ) : undefined,
        tooltip:
          isExisting && current !== 0 ? (
            <EquipmentTooltipContent
              type={optionType}
              id={current as number}
              compareTo={equippedStats}
            />
          ) : undefined,
        label: isExisting
          ? translateMeta(
              optionType === 'weapon'
                ? getWeaponTranslationKeyPrefix(current as number)
                : getArmorTranslationKeyPrefix(current as number),
              elementMeta,
              t,
            ).displayName
          : t('ui.common.unknown', 'Unknown'),
        value: current as number,
        invalidReasons,
        unused: isExisting ? elementMeta.unused : undefined,
      },
    ];
  }

  const selectedItem =
    selectItems.find((item) => item.value === (current as number)) ?? null;

  const label = t(LOADOUT_TITLE_KEYS[type], LOADOUT_TITLES[type]);
  const placeholderKey =
    optionType === 'weapon' ? 'ui.field.selectWeapon' : 'ui.field.selectArmor';
  const placeholderFallback =
    optionType === 'weapon' ? 'Select a weapon...' : 'Select an armor...';

  const abilityId = isExisting ? elementMeta.ability : undefined;
  const abilityBase =
    abilityId !== undefined ? EQUIPMENT_ABILITIES_META[abilityId] : undefined;
  // same with the tooltip, which resolves chapter overrides as well.
  const abilityMeta = resolveChapterMeta(abilityBase, { chapter });
  const abilityName = abilityMeta
    ? translateMeta(
        getEquipmentAbilityTranslationKeyPrefix(abilityId as number),
        abilityMeta,
        t,
      ).displayName
    : '';
  const abilityRow = abilityMeta ? (
    <EquipmentAbilityTooltip
      ability={abilityId}
      values={isExisting ? elementMeta.abilityValues : undefined}
    >
      <InlineGroup>
        <EquipmentIcon icon={abilityMeta.icon} />
        <span className="text-sm text-text-2">{abilityName}</span>
      </InlineGroup>
    </EquipmentAbilityTooltip>
  ) : (
    <InlineGroup>
      <span className="text-sm text-text-3">
        {t('ui.tooltip.noAbility', '(No ability.)')}
      </span>
    </InlineGroup>
  );

  const statsRow = stats ? (
    <EquipmentStatsRow stats={stats} className="ml-auto text-base" />
  ) : null;

  const detailsRow = (
    <InlineGroup className="gap-3">
      {abilityRow}
      {statsRow}
    </InlineGroup>
  );

  return (
    <FieldWrapper id={id} className="w-full" title={label} label>
      <Select
        placeholder={t(placeholderKey, placeholderFallback)}
        label={label}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            if (type === 'weapon') {
              save.characters[character].weapon = item.value as WeaponIndex;
            } else {
              save.characters[character][type] = item.value as ArmorIndex;
            }

            if (recalculateStats) {
              syncStoredEquipmentStats(
                save.characters[character],
                type,
                chapter,
              );
            }
          });
        }}
        items={selectItems}
        className="w-full"
        tooltip={
          isExisting && current !== 0 ? (
            <EquipmentTooltipContent type={optionType} id={current as number} />
          ) : undefined
        }
      />
      {detailsRow}
    </FieldWrapper>
  );
}

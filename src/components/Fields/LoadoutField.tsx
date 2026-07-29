import {
  Select,
  type SelectItem,
  FieldWrapper,
  EquipmentIcon,
  InlineGroup,
} from '@components';
import {
  EQUIPMENT_ABILITIES_META,
  EQUIPMENT_STAT_ICONS,
  type CharacterIndex,
  type WeaponIndex,
  type ArmorIndex,
  type EquipmentIconIndex,
} from '@data';
import { useCharacterOverrideInputs } from '@hooks';
import { useSave } from '@store';
import { getChapterLoadoutOptions } from '@utils/chapter-options';
import {
  armorHelpers,
  chapterHelpers,
  characterHelpers,
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
  mergeClass,
  syncEquipmentStats as syncStoredEquipmentStats,
} from '@utils';

type LoadoutType = 'weapon' | 'primaryArmor' | 'secondaryArmor';

const STAT_ORDER = ['attack', 'defence', 'magic'] as const;

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

function renderEquipmentIcon(icon: EquipmentIconIndex | undefined) {
  return icon !== undefined ? <EquipmentIcon icon={icon} /> : undefined;
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

  const elementMeta = getElementMeta(current as number);
  const isExisting = !!(
    elementMeta && (elementMeta as { displayName?: string }).displayName
  );
  const isInChapter = chapterSet.has(current as number);
  const isValid = isExisting && isInChapter;

  const allowedElementsOverride =
    optionType === 'weapon'
      ? overrides?.allowedWeapons
      : overrides?.allowedArmors;

  const baseItems = getChapterLoadoutOptions(
    chapter,
    optionType,
    character,
    allowAllElements,
    allowedElementsOverride,
  ).map((item) => ({
    ...item,
    icon: renderEquipmentIcon(getElementMeta(item.value as number)?.icon),
    label: translateMeta(
      optionType === 'weapon'
        ? getWeaponTranslationKeyPrefix(item.value as number)
        : getArmorTranslationKeyPrefix(item.value as number),
      { displayName: item.label },
      t,
    ).displayName,
  }));

  let selectItems: SelectItem[] = baseItems;
  if (!isValid || !baseItems.some((item) => item.value === current)) {
    selectItems = [
      ...baseItems,
      {
        id: `${current}`,
        icon: renderEquipmentIcon(isExisting ? elementMeta.icon : undefined),
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
        invalid: true,
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
  const abilityMeta =
    abilityId !== undefined ? EQUIPMENT_ABILITIES_META[abilityId] : undefined;
  const abilityName = abilityMeta
    ? translateMeta(
        getEquipmentAbilityTranslationKeyPrefix(abilityId as number),
        abilityMeta,
        t,
      ).displayName
    : '';
  const abilityRow = abilityMeta ? (
    <InlineGroup>
      <EquipmentIcon icon={abilityMeta.icon} />
      <span className="text-sm text-text-2">{abilityName}</span>
    </InlineGroup>
  ) : (
    <InlineGroup>
      <span className="text-sm text-text-3">(No ability.)</span>
    </InlineGroup>
  );

  const stats = getEquipmentStats(type, current as WeaponIndex, chapter);
  const statsRow = stats ? (
    <InlineGroup className="gap-3 ml-auto">
      {STAT_ORDER.map((stat) => {
        const noStats = stats[stat] <= 0;

        return (
          <InlineGroup key={stat} className="gap-1">
            <EquipmentIcon
              icon={EQUIPMENT_STAT_ICONS[stat]}
              className={noStats ? 'opacity-30' : undefined}
            />
            <span
              className={mergeClass(
                'text-base',
                noStats ? 'text-text-3' : 'text-text-2',
              )}
            >
              {stats[stat]}
            </span>
          </InlineGroup>
        );
      })}
    </InlineGroup>
  ) : null;

  const detailsRow =
    abilityRow || statsRow ? (
      <InlineGroup className="gap-3">
        {abilityRow}
        {statsRow}
      </InlineGroup>
    ) : null;

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
      />
      {detailsRow}
    </FieldWrapper>
  );
}

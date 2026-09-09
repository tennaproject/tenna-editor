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
  type EquipmentAbilityIndex,
} from '@data';
import type { EquipmentEntry } from '@types';
import { useCharacterOverrideInputs } from '@hooks';
import { useGameData, useSave } from '@store';
import { getChapterLoadoutOptions } from '@utils/chapter-options';
import {
  chapterHelpers,
  characterHelpers,
  resolveChapterMeta,
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

function isNewPackEntry(entry: EquipmentEntry | undefined) {
  return !!entry?.dataPack && !entry.overridesBuiltIn;
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
  const data = useGameData((state) =>
    optionType === 'weapon' ? state.weapons : state.armors,
  );
  const chapterSet = chapterHelpers.getById(chapter).content[
    optionType === 'weapon' ? 'weapons' : 'armors'
  ] as Set<number>;

  const dataEntry = data.byId.get(current as number);
  const isExisting = !!dataEntry;
  const isInChapter =
    chapterSet.has(current as number) || isNewPackEntry(dataEntry);
  const isValid = isExisting && isInChapter;

  const allowedElementsOverride =
    optionType === 'weapon'
      ? overrides?.allowedWeapons
      : overrides?.allowedArmors;

  const weapons = useGameData((state) => state.weapons.byId);
  const armors = useGameData((state) => state.armors.byId);
  const equipmentLookup = { weapons, armors };
  const stats = getEquipmentStats(
    type,
    current as WeaponIndex,
    equipmentLookup,
  );
  const equippedStats = stats ?? { attack: 0, defence: 0, magic: 0 };

  const baseItems = getChapterLoadoutOptions(
    chapter,
    optionType,
    character,
    allowAllElements,
    data.entries,
    allowedElementsOverride,
  ).map((item) => {
    const entry = data.byId.get(item.value as number);
    const icon = entry?.icon;

    return {
      ...item,
      icon:
        icon !== undefined ? (
          <EquipmentIcon icon={icon} unknownArt={item.value !== 0} />
        ) : undefined,
      tooltip:
        entry && item.value !== 0 ? (
          <EquipmentTooltipContent
            type={optionType}
            entry={entry}
            compareTo={equippedStats}
          />
        ) : undefined,
      label: entry?.dataPack
        ? entry.displayName
        : translateMeta(
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
          dataEntry?.icon !== undefined ? (
            <EquipmentIcon icon={dataEntry.icon} unknownArt={current !== 0} />
          ) : undefined,
        tooltip:
          dataEntry && current !== 0 ? (
            <EquipmentTooltipContent
              type={optionType}
              entry={dataEntry}
              compareTo={equippedStats}
            />
          ) : undefined,
        label: dataEntry?.dataPack
          ? dataEntry.displayName
          : dataEntry
            ? translateMeta(
                optionType === 'weapon'
                  ? getWeaponTranslationKeyPrefix(current as number)
                  : getArmorTranslationKeyPrefix(current as number),
                { displayName: dataEntry.displayName },
                t,
              ).displayName
            : t('ui.common.unknown', 'Unknown'),
        value: current as number,
        invalidReasons,
        unused: dataEntry?.unused,
        dataPack: dataEntry?.packName,
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

  const abilityIndex = dataEntry?.abilityIndex as
    EquipmentAbilityIndex | undefined;
  const abilityBase =
    abilityIndex !== undefined
      ? EQUIPMENT_ABILITIES_META[abilityIndex]
      : undefined;
  const abilityMeta = resolveChapterMeta(abilityBase, { chapter });
  const abilityName = abilityMeta
    ? translateMeta(
        getEquipmentAbilityTranslationKeyPrefix(abilityIndex as number),
        abilityMeta,
        t,
      ).displayName
    : (dataEntry?.ability ?? '');
  const abilityRow = abilityMeta ? (
    <EquipmentAbilityTooltip
      ability={abilityIndex}
      values={dataEntry?.abilityValues}
    >
      <InlineGroup>
        <EquipmentIcon icon={abilityMeta.icon} />
        <span className="text-sm text-text-2">{abilityName}</span>
      </InlineGroup>
    </EquipmentAbilityTooltip>
  ) : dataEntry?.ability ? (
    <InlineGroup>
      <span className="text-sm text-text-2">{dataEntry.ability}</span>
    </InlineGroup>
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
                equipmentLookup,
              );
            }
          });
        }}
        items={selectItems}
        className="w-full"
        tooltip={
          dataEntry && current !== 0 ? (
            <EquipmentTooltipContent type={optionType} entry={dataEntry} />
          ) : undefined
        }
      />
      {detailsRow}
    </FieldWrapper>
  );
}

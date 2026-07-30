import {
  Section,
  TextLabel,
  Select,
  type SelectItem,
  EquipmentIcon,
  EquipmentTooltipContent,
  InlineGroup,
} from '@components';
import {
  EQUIPMENT_STAT_ICONS,
  EQUIPMENT_STAT_ORDER,
  type ArmorIndex,
  type ChapterIndex,
  type ConsumableIndex,
  type EquipmentIconIndex,
  type KeyItemIndex,
  type LightWorldItemIndex,
  type PhoneContactIndex,
  type WeaponIndex,
} from '@data';
import { useSaveItemSlot } from '@hooks';
import { useSave } from '@store';
import { getChapterItemOptions } from '@utils/chapter-options';
import {
  getItemTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';
import {
  armorHelpers,
  chapterHelpers,
  consumableHelpers,
  formatItemLabel,
  keyItemHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
  weaponHelpers,
} from '@utils/data-helpers';
import { getEquipmentStats, mergeClass } from '@utils';

export type ItemType =
  | 'consumable'
  | 'keyItem'
  | 'weapon'
  | 'armor'
  | 'storage'
  | 'lightWorldItem'
  | 'phoneContact';

interface ItemFieldProps {
  type: ItemType;
  slot: number;
  label?: string;
}

function getDisplayName(type: ItemType, id: number): string {
  switch (type) {
    case 'consumable':
    case 'storage':
      return formatItemLabel(
        consumableHelpers.getById(id as ConsumableIndex),
        'Unknown',
      );
    case 'keyItem':
      return formatItemLabel(
        keyItemHelpers.getById(id as KeyItemIndex),
        'Unknown',
      );
    case 'weapon':
      return formatItemLabel(
        weaponHelpers.getById(id as WeaponIndex),
        'Unknown',
      );
    case 'armor':
      return formatItemLabel(armorHelpers.getById(id as ArmorIndex), 'Unknown');
    case 'lightWorldItem':
      return formatItemLabel(
        lightWorldItemHelpers.getById(id as LightWorldItemIndex),
        'Unknown',
      );
    case 'phoneContact':
      return formatItemLabel(
        phoneContactHelpers.getById(id as PhoneContactIndex),
        'Unknown',
      );
  }
}

function getTranslatedDisplayName(
  type: ItemType,
  id: number,
  fallback: string,
  t: (key: string, fallback: string) => string,
) {
  return translateMeta(
    getItemTranslationKeyPrefix(type, id),
    { displayName: fallback },
    t,
  ).displayName;
}

function getIcon(type: ItemType, id: number): EquipmentIconIndex | undefined {
  switch (type) {
    case 'weapon':
      return weaponHelpers.getById(id as WeaponIndex)?.icon;
    case 'armor':
      return armorHelpers.getById(id as ArmorIndex)?.icon;
    default:
      return undefined;
  }
}

function renderEquipmentIcon(icon: EquipmentIconIndex | undefined) {
  return icon !== undefined ? <EquipmentIcon icon={icon} /> : undefined;
}

function renderEquipmentStats(
  type: ItemType,
  id: number,
  chapter: ChapterIndex,
) {
  if (type !== 'weapon' && type !== 'armor') return undefined;

  const stats = getEquipmentStats(
    type === 'weapon' ? 'weapon' : 'primaryArmor',
    id as WeaponIndex,
    chapter,
  );
  if (!stats) return undefined;

  return (
    <InlineGroup className="gap-2">
      {EQUIPMENT_STAT_ORDER.map((stat) => {
        const noStats = stats[stat] <= 0;

        return (
          <InlineGroup key={stat} className="gap-1">
            <EquipmentIcon
              icon={EQUIPMENT_STAT_ICONS[stat]}
              className={noStats ? 'opacity-30' : undefined}
            />
            <span
              className={mergeClass(
                'text-sm',
                noStats ? 'text-text-3' : 'text-text-2',
              )}
            >
              {stats[stat]}
            </span>
          </InlineGroup>
        );
      })}
    </InlineGroup>
  );
}

function getPlaceholder(type: ItemType): string {
  switch (type) {
    case 'consumable':
      return 'Select a consumable...';
    case 'keyItem':
      return 'Select a key item...';
    case 'weapon':
      return 'Select a weapon...';
    case 'armor':
      return 'Select an armor...';
    case 'storage':
      return 'Select a storage item...';
    default:
      return 'Select an item...';
  }
}

function getPlaceholderKey(type: ItemType): string {
  switch (type) {
    case 'consumable':
      return 'ui.field.selectConsumable';
    case 'keyItem':
      return 'ui.field.selectKeyItem';
    case 'weapon':
      return 'ui.field.selectWeapon';
    case 'armor':
      return 'ui.field.selectArmor';
    case 'storage':
      return 'ui.field.selectStorageItem';
    default:
      return 'ui.field.selectItem';
  }
}

export function ItemField({ type, slot, label }: ItemFieldProps) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter ?? 1);
  const updateSave = useSave((s) => s.updateSave);
  const currentValue = useSaveItemSlot(type, slot);

  const selectLabel = label ?? t('ui.field.slot', 'Slot');
  const placeholder = t(getPlaceholderKey(type), getPlaceholder(type));
  const baseItems = getChapterItemOptions(chapter, type).map((item) => ({
    ...item,
    icon: renderEquipmentIcon(getIcon(type, item.value as number)),
    trailing: renderEquipmentStats(type, item.value as number, chapter),
    label: getTranslatedDisplayName(type, item.value as number, item.label, t),
  }));
  const chapterContent = chapterHelpers.getById(chapter).content;

  let availableSet: Set<number>;
  switch (type) {
    case 'consumable':
    case 'storage':
      availableSet = chapterContent.consumables as Set<number>;
      break;
    case 'keyItem':
      availableSet = chapterContent.keyItems as Set<number>;
      break;
    case 'weapon':
      availableSet = chapterContent.weapons as Set<number>;
      break;
    case 'armor':
      availableSet = chapterContent.armors as Set<number>;
      break;
    case 'lightWorldItem':
      availableSet = chapterContent.lightWorld.items as Set<number>;
      break;
    case 'phoneContact':
      availableSet = chapterContent.lightWorld.phoneContacts as Set<number>;
      break;
  }

  const metaDisplay = getTranslatedDisplayName(
    type,
    currentValue,
    getDisplayName(type, currentValue),
    t,
  );
  const isValid = !!metaDisplay && availableSet.has(currentValue);

  let selectItems: SelectItem[] = baseItems;
  if (!isValid || !availableSet.has(currentValue)) {
    selectItems = [
      ...baseItems,
      {
        id: `${currentValue}`,
        icon: renderEquipmentIcon(getIcon(type, currentValue)),
        trailing: renderEquipmentStats(type, currentValue, chapter),
        label: metaDisplay || t('ui.common.unknown', 'Unknown'),
        value: currentValue,
        invalid: true,
      },
    ];
  }

  const selectedItem =
    selectItems.find((item) => item.value === currentValue) ?? null;

  const equipmentMeta =
    currentValue === 0
      ? undefined
      : type === 'weapon'
        ? weaponHelpers.getById(currentValue as WeaponIndex)
        : type === 'armor'
          ? armorHelpers.getById(currentValue as ArmorIndex)
          : undefined;

  return (
    <Section id={`${type}s-slot${slot}`} className="w-full">
      <TextLabel>
        {selectLabel} {slot + 1}
      </TextLabel>
      <Select
        placeholder={placeholder}
        label={selectLabel}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            if (type === 'consumable') {
              save.inventory.consumables[slot] = item.value as ConsumableIndex;
            } else if (type === 'keyItem') {
              save.inventory.keyItems[slot] = item.value as KeyItemIndex;
            } else if (type === 'weapon') {
              save.inventory.weapons[slot] = item.value as WeaponIndex;
            } else if (type === 'armor') {
              save.inventory.armors[slot] = item.value as ArmorIndex;
            } else if (type === 'storage') {
              if ('storage' in save.inventory) {
                (save.inventory as { storage: ConsumableIndex[] }).storage[
                  slot
                ] = item.value as ConsumableIndex;
              }
            } else if (type === 'lightWorldItem') {
              save.lightWorld.items[slot] = item.value as LightWorldItemIndex;
            } else if (type === 'phoneContact') {
              save.lightWorld.phone[slot] = item.value as PhoneContactIndex;
            }
          });
        }}
        items={selectItems}
        className="w-full"
        tooltip={
          equipmentMeta?.displayName ? (
            <EquipmentTooltipContent
              type={type as 'weapon' | 'armor'}
              id={currentValue}
            />
          ) : undefined
        }
      />
    </Section>
  );
}

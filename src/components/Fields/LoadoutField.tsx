import { Select, type SelectItem, FieldWrapper } from '@components';
import { type CharacterIndex, type WeaponIndex, type ArmorIndex } from '@data';
import { useCharacterOverrideInputs } from '@hooks';
import { useSave } from '@store';
import { getChapterLoadoutOptions } from '@utils/chapter-options';
import {
  armorHelpers,
  chapterHelpers,
  characterHelpers,
  weaponHelpers,
} from '@utils/data-helpers';

type LoadoutType = 'weapon' | 'primaryArmor' | 'secondaryArmor';

const LOADOUT_TITLES: Record<LoadoutType, string> = {
  weapon: 'Weapon',
  primaryArmor: 'Armor I',
  secondaryArmor: 'Armor II',
};

interface LoadoutFieldProps {
  id?: string;
  type: LoadoutType;
  character: CharacterIndex;
  allowAllElements: boolean;
}

export function LoadoutField({
  id,
  type,
  character,
  allowAllElements,
}: LoadoutFieldProps) {
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

  const elementMeta =
    type === 'weapon'
      ? weaponHelpers.getById(current as WeaponIndex)
      : armorHelpers.getById(current as ArmorIndex);
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
  );

  let selectItems: SelectItem[] = baseItems;
  if (!isValid || !baseItems.some((item) => item.value === current)) {
    selectItems = [
      ...baseItems,
      {
        id: `${current}`,
        label: isExisting ? elementMeta.displayName : 'Unknown',
        value: current as number,
        invalid: true,
      },
    ];
  }

  const selectedItem =
    selectItems.find((item) => item.value === (current as number)) ?? null;

  const label = LOADOUT_TITLES[type];
  return (
    <FieldWrapper id={id} className="w-full" title={label} label>
      <Select
        placeholder={`Select a ${label.toLowerCase()}...`}
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
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </FieldWrapper>
  );
}

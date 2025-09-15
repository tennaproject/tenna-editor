import { Select, type SelectItem, FieldWrapper } from '@components';
import { type CharacterIndex, type WeaponIndex, type ArmorIndex } from '@data';
import { useSave } from '@store';
import {
  armorHelpers,
  chapterHelpers,
  characterHelpers,
  weaponHelpers,
} from '@utils';

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

  const chapterAllowedElements =
    chapterHelpers.getById(chapter).content[
      type === 'weapon' ? 'weapons' : 'armors'
    ];

  const characterAllowedElements =
    characterHelpers.getById(character)[
      type === 'weapon' ? 'allowedWeapons' : 'allowedArmors'
    ];

  const chapterSet = new Set<number>(chapterAllowedElements);
  const characterSet = new Set<number>(characterAllowedElements);

  const availableElements: Set<number> = allowAllElements
    ? chapterSet
    : new Set<number>([...chapterSet].filter((i) => characterSet.has(i)));

  const elementMeta =
    type === 'weapon'
      ? weaponHelpers.getById(current as WeaponIndex)
      : armorHelpers.getById(current as ArmorIndex);
  const isExisting = !!(
    elementMeta && (elementMeta as { displayName?: string }).displayName
  );
  const isInChapter = chapterSet.has(current as number);
  const isValid = isExisting && isInChapter;

  const selectItems: SelectItem[] = [...availableElements].map((value) => {
    const meta =
      type === 'weapon'
        ? weaponHelpers.getById(value as WeaponIndex)
        : armorHelpers.getById(value as ArmorIndex);
    return {
      id: `${value}`,
      label: (meta as { displayName: string }).displayName,
      value,
    };
  });

  if (!isValid || !availableElements.has(current as number)) {
    selectItems.push({
      id: `${current}`,
      label: isExisting
        ? (elementMeta as { displayName: string }).displayName
        : 'Unknown',
      value: current as number,
      invalid: true,
    });
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

import { Section, TextLabel, Select, type SelectItem } from '@components';
import { WEAPONS, type CharacterIndex, type WeaponIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, characterHelpers, weaponHelpers } from '@utils';

interface KitWeaponFieldProps {
  character: CharacterIndex;
  allowAllElements: boolean;
}

export function KitWeaponField({
  character,
  allowAllElements,
}: KitWeaponFieldProps) {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const weapon =
    useSave((s) => s.save?.characters[character].weapon) || WEAPONS.EMPTY;
  const updateSave = useSave((s) => s.updateSave);

  const chapterWeapons = chapterHelpers.getById(chapter).content.weapons;
  const characterAllowedWeapons =
    characterHelpers.getById(character).allowedWeapons;
  let weaponMeta = weaponHelpers.getById(weapon);

  const isExisting = !!weaponMeta;
  const isInChapter = chapterWeapons.has(weapon);
  const isValid = isExisting && isInChapter;

  if (!isExisting) {
    weaponMeta = {
      displayName: 'Unknown',
    };
  }

  let availableWeapons: Set<WeaponIndex> = chapterWeapons;
  if (!allowAllElements) {
    // Only include weapons that are both allowed for the character and present in the chapter
    availableWeapons = characterAllowedWeapons.intersection(chapterWeapons);
  }

  const selectItems: SelectItem[] = Array.from(availableWeapons).map(
    (weapon) => ({
      id: `${weapon}`,
      label: weaponHelpers.getById(weapon).displayName,
      value: weapon,
    }),
  );

  if (!isValid || !availableWeapons.has(weapon)) {
    selectItems.push({
      id: `${weapon}`,
      label: weaponMeta.displayName,
      value: weapon,
      invalid: true,
    });
  }

  const selectedItem =
    selectItems.find((item) => item.value === weapon) ?? null;

  return (
    <Section id="main-kit-weapon" className="w-full">
      <TextLabel>Weapon</TextLabel>
      <Select
        placeholder="Select a weapon..."
        label="Weapon"
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            save.characters[character].weapon = item.value as WeaponIndex;
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </Section>
  );
}

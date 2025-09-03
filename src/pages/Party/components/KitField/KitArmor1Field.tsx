import { Section, TextLabel, Select, type SelectItem } from '@components';
import { ARMORS, type ArmorIndex, type CharacterIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, characterHelpers, armorHelpers } from '@utils';

interface KitArmor1FieldProps {
  character: CharacterIndex;
  allowAllElements: boolean;
}

export function KitArmor1Field({
  character,
  allowAllElements,
}: KitArmor1FieldProps) {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const primaryArmor =
    useSave((s) => s.save?.characters[character].primaryArmor) || ARMORS.EMPTY;
  const updateSave = useSave((s) => s.updateSave);

  const chapterArmors = chapterHelpers.getById(chapter).content.armors;
  const characterAllowedArmors =
    characterHelpers.getById(character).allowedArmors;
  let armorMeta = armorHelpers.getById(primaryArmor);

  const isExisting = !!armorMeta;
  const isInChapter = chapterArmors.has(primaryArmor);
  const isValid = isExisting && isInChapter;

  if (!isExisting) {
    armorMeta = {
      displayName: 'Unknown',
    };
  }

  let availableArmors: Set<ArmorIndex> = chapterArmors;
  if (!allowAllElements) {
    // Only include armors that are both allowed for the character and present in the chapter
    availableArmors = characterAllowedArmors.intersection(chapterArmors);
  }

  const selectItems: SelectItem[] = Array.from(availableArmors).map(
    (armor) => ({
      id: `${armor}`,
      label: armorHelpers.getById(armor).displayName,
      value: armor,
    }),
  );

  if (!isValid || !availableArmors.has(primaryArmor)) {
    selectItems.push({
      id: `${primaryArmor}`,
      label: armorMeta.displayName,
      value: primaryArmor,
      invalid: true,
    });
  }

  const selectedItem =
    selectItems.find((item) => item.value === primaryArmor) ?? null;

  return (
    <Section id="main-kit-armor1" className="w-full">
      <TextLabel>Armor I</TextLabel>
      <Select
        placeholder="Select a primary armor..."
        label="Armor I"
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            save.characters[character].primaryArmor = item.value as ArmorIndex;
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </Section>
  );
}

import { Section, TextLabel, Select, type SelectItem } from '@components';
import { ARMORS, type ArmorIndex, type CharacterIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, characterHelpers, armorHelpers } from '@utils';

interface KitArmor2FieldProps {
  character: CharacterIndex;
  allowAllElements: boolean;
}

export function KitArmor2Field({
  character,
  allowAllElements,
}: KitArmor2FieldProps) {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const secondaryArmor =
    useSave((s) => s.save?.characters[character].secondaryArmor) ||
    ARMORS.EMPTY;
  const updateSave = useSave((s) => s.updateSave);

  const chapterArmors = chapterHelpers.getById(chapter).content.armors;
  const characterAllowedArmors =
    characterHelpers.getById(character).allowedArmors;
  let armorMeta = armorHelpers.getById(secondaryArmor);

  const isExisting = !!armorMeta;
  const isInChapter = chapterArmors.has(secondaryArmor);
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

  if (!isValid || !availableArmors.has(secondaryArmor)) {
    selectItems.push({
      id: `${secondaryArmor}`,
      label: armorMeta.displayName,
      value: secondaryArmor,
      invalid: true,
    });
  }

  const selectedItem =
    selectItems.find((item) => item.value === secondaryArmor) ?? null;

  return (
    <Section id="main-kit-armor2" className="w-full">
      <TextLabel>Armor II</TextLabel>
      <Select
        placeholder="Select a secondary armor..."
        label="Armor II"
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            save.characters[character].secondaryArmor =
              item.value as ArmorIndex;
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </Section>
  );
}

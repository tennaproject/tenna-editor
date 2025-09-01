import { Section, TextLabel, Select, type SelectItem } from '@components';
import { SPELLS, type SpellIndex, type CharacterIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, characterHelpers, spellHelpers } from '@utils';

interface SpellFieldProp {
  slot: number;
  character: CharacterIndex;
  allowAllItems: boolean;
}

export function SpellField({ slot, character, allowAllItems }: SpellFieldProp) {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const currentSpell =
    useSave((s) => s.save?.characters[character].spells?.[slot]) ||
    SPELLS.EMPTY;
  const updateSave = useSave((s) => s.updateSave);

  const chapterSpells = chapterHelpers.getById(chapter).content.spells;
  const characterAllowedSpells =
    characterHelpers.getById(character).allowedSpells;
  let spellMeta = spellHelpers.getById(currentSpell);

  const isExisting = !!spellMeta;
  const isInChapter = chapterSpells.has(currentSpell);
  const isValid = isExisting && isInChapter;

  if (!isExisting) {
    spellMeta = {
      displayName: 'Unknown',
    };
  }

  let availableSpells: Set<SpellIndex> = chapterSpells;
  if (!allowAllItems) {
    // Only include spells that are both allowed for the character and present in the chapter
    availableSpells = characterAllowedSpells.intersection(chapterSpells);
  }

  const selectItems: SelectItem[] = Array.from(availableSpells).map(
    (spell) => ({
      id: `${spell}`,
      label: spellHelpers.getById(spell).displayName,
      value: spell,
    }),
  );

  if (!isValid || !availableSpells.has(currentSpell)) {
    selectItems.push({
      id: `${currentSpell}`,
      label: spellMeta.displayName,
      value: currentSpell,
      invalid: true,
    });
  }

  const selectedItem =
    selectItems.find((item) => item.value === currentSpell) ?? null;

  return (
    <Section id={`spells-slot${slot}`} className="flex-1">
      <TextLabel>Spell {slot + 1}</TextLabel>
      <Select
        placeholder="Select a spell..."
        label={`Spell ${slot + 1}`}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            if (!save.characters[character].spells) {
              save.characters[character].spells = [];
            }
            save.characters[character].spells[slot] = item.value as SpellIndex;
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </Section>
  );
}

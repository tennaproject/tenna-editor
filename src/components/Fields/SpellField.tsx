import {
  Select,
  type SelectItem,
  type InvalidReason,
  FieldWrapper,
  SpellTooltipContent,
} from '@components';
import { SPELLS, type SpellIndex, type CharacterIndex } from '@data';
import { useSave } from '@store';
import { getChapterSpellOptions } from '@utils/chapter-options';
import {
  chapterHelpers,
  getSpellDisplayName,
  spellHelpers,
} from '@utils/data-helpers';
import {
  getSpellTranslationKeyPrefix,
  translateMeta,
  useTranslation,
} from '../../i18n';

interface SpellFieldProp {
  id?: string;
  slot: number;
  character: CharacterIndex;
  allowAllItems: boolean;
}

export function SpellField({
  id,
  slot,
  character,
  allowAllItems,
}: SpellFieldProp) {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const plot = useSave((s) => s.save?.plot) || 0;
  const currentSpell =
    useSave((s) => s.save?.characters[character].spells?.[slot]) ||
    SPELLS.EMPTY;
  const flags = useSave((s) => s.save?.flags) ?? [];
  const updateSave = useSave((s) => s.updateSave);

  const chapterSpells = chapterHelpers.getById(chapter).content.spells;
  const spellMeta = spellHelpers.getById(currentSpell);

  const isExisting = !!spellMeta;
  const isInChapter = chapterSpells.has(currentSpell);
  const isValid = isExisting && isInChapter;

  const baseItems = getChapterSpellOptions(
    chapter,
    character,
    allowAllItems,
  ).map((item) => {
    const label =
      item.value === SPELLS.SUSIE_HEAL
        ? getSpellDisplayName(item.value as SpellIndex, chapter, plot, flags)
        : item.label;

    return {
      ...item,
      tooltip:
        item.value !== SPELLS.EMPTY ? (
          <SpellTooltipContent
            spell={item.value as SpellIndex}
            character={character}
          />
        ) : undefined,
      label: translateMeta(
        getSpellTranslationKeyPrefix(item.value as number),
        { displayName: label },
        t,
      ).displayName,
    };
  });

  const isOffered = baseItems.some((item) => item.value === currentSpell);
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
        id: `${currentSpell}`,
        label: translateMeta(
          getSpellTranslationKeyPrefix(currentSpell),
          {
            displayName: getSpellDisplayName(
              currentSpell,
              chapter,
              plot,
              flags,
            ),
          },
          t,
        ).displayName,
        value: currentSpell,
        invalidReasons,
        unused: spellMeta?.unused,
      },
    ];
  }

  const selectedItem =
    selectItems.find((item) => item.value === currentSpell) ?? null;
  const label = `${t('ui.field.spell', 'Spell')} ${slot + 1}`;

  return (
    <FieldWrapper id={id} className="flex-1" title={label} label>
      <Select
        placeholder={t('ui.field.selectSpell', 'Select a spell...')}
        label={label}
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
        tooltip={
          isExisting && currentSpell !== SPELLS.EMPTY ? (
            <SpellTooltipContent spell={currentSpell} character={character} />
          ) : undefined
        }
      />
    </FieldWrapper>
  );
}

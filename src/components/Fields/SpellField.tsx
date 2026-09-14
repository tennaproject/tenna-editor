import {
  Select,
  type SelectItem,
  type InvalidReason,
  FieldWrapper,
  SpellTooltipContent,
} from '@components';
import { SPELLS, type SpellIndex, type CharacterIndex } from '@data';
import type { SpellEntry } from '@types';
import { useGameData, useSave } from '@store';
import { getChapterSpellOptions } from '@utils/chapter-options';
import { chapterHelpers } from '@utils/data-helpers';
import { resolveSpellEntry } from '@utils/resolve-game-data';
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

function isNewPackEntry(entry: SpellEntry | undefined) {
  return !!entry?.dataPack && !entry.overridesBuiltIn;
}

function spellLabel(
  entry: SpellEntry | undefined,
  value: number,
  fallback: string,
  t: (key: string, fallback: string) => string,
) {
  if (entry?.dataPack) return entry.displayName;

  return translateMeta(
    getSpellTranslationKeyPrefix(value),
    { displayName: entry?.displayName ?? fallback },
    t,
  ).displayName;
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
  const data = useGameData((state) => state.spells);

  const weapon = useSave((s) => s.save?.characters[character]?.weapon) ?? 0;
  const primaryArmor =
    useSave((s) => s.save?.characters[character]?.primaryArmor) ?? 0;
  const secondaryArmor =
    useSave((s) => s.save?.characters[character]?.secondaryArmor) ?? 0;
  const context = {
    chapter,
    plot,
    flags,
    weapon,
    armors: [primaryArmor, secondaryArmor],
  };
  const chapterSpells = chapterHelpers.getById(chapter).content.spells;
  const currentEntry = data.byId.get(currentSpell);
  const currentDataEntry = currentEntry
    ? resolveSpellEntry(currentEntry, context)
    : undefined;

  const isExisting = !!currentDataEntry;
  const isInChapter =
    chapterSpells.has(currentSpell) || isNewPackEntry(currentDataEntry);
  const isValid = isExisting && isInChapter;

  const offeredItems = getChapterSpellOptions(
    chapter,
    character,
    allowAllItems,
    data.entries,
  ).map((item) => {
    const baseEntry = data.byId.get(item.value as number)!;
    const entry = resolveSpellEntry(baseEntry, context);
    return {
      ...item,
      tooltip:
        entry && item.value !== SPELLS.EMPTY ? (
          <SpellTooltipContent entry={entry} character={character} />
        ) : undefined,
      label: spellLabel(entry, item.value as number, item.label, t),
    };
  });

  const isOffered = offeredItems.some((item) => item.value === currentSpell);
  const invalidReasons: InvalidReason[] = [];
  if (!isExisting) invalidReasons.push('unknown');
  if (!isInChapter) invalidReasons.push('notInChapter');
  if (isExisting && isInChapter && !isOffered)
    invalidReasons.push('notAvailableTo');

  let selectItems: SelectItem[] = offeredItems;
  if (!isValid || !isOffered) {
    selectItems = [
      ...offeredItems,
      {
        id: `${currentSpell}`,
        label: spellLabel(
          currentDataEntry,
          currentSpell,
          t('ui.common.unknown', 'Unknown'),
          t,
        ),
        value: currentSpell,
        invalidReasons,
        unused: currentDataEntry?.unused,
        dataPack: currentDataEntry?.packName,
        tooltip:
          currentDataEntry && currentSpell !== SPELLS.EMPTY ? (
            <SpellTooltipContent
              entry={currentDataEntry}
              character={character}
            />
          ) : undefined,
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
          currentDataEntry && currentSpell !== SPELLS.EMPTY ? (
            <SpellTooltipContent
              entry={currentDataEntry}
              character={character}
            />
          ) : undefined
        }
      />
    </FieldWrapper>
  );
}

import { Section, TextLabel, Select, type SelectItem } from '@components';
import { LIGHTWORLDITEMS, type LightWorldItemIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, lightWorldItemHelpers } from '@utils';

type LightWorldKitKind = 'weapon' | 'armor';

interface KitFieldProps {
  kind: LightWorldKitKind;
  label?: string;
  id: string;
}

export function KitField({ kind, label, id }: KitFieldProps) {
  const save = useSave((s) => s.save);
  const chapter = save?.meta.chapter || 1;
  const updateSave = useSave((s) => s.updateSave);

  let currentValue: number = 0;
  const selectLabel = label ?? 'Slot';
  let placeholder = 'Select an item...';

  const chapterContent = chapterHelpers.getById(chapter).content;

  if (kind === 'weapon') {
    currentValue =
      save?.lightWorld.weapon ?? (LIGHTWORLDITEMS.EMPTY as LightWorldItemIndex);
    placeholder = 'Select a weapon...';
  } else if (kind === 'armor') {
    currentValue =
      save?.lightWorld.armor ?? (LIGHTWORLDITEMS.EMPTY as LightWorldItemIndex);
    placeholder = 'Select an armor...';
  }

  const availableSet = new Set<number>(
    chapterContent.lightWorld.items as Set<number>,
  );

  // Remove items that are not weapon or armor
  availableSet.forEach((item) => {
    if (!lightWorldItemHelpers.getById(item)[kind]) {
      availableSet.delete(item);
    }
  });

  const getDisplayName = (id: number) =>
    lightWorldItemHelpers.getById(id as LightWorldItemIndex)?.displayName ??
    'Unknown';

  const metaDisplay = getDisplayName(currentValue);
  const isExisting = !!metaDisplay;
  const isInChapter = availableSet.has(currentValue);
  const isValid = isExisting && isInChapter;

  const selectItems: SelectItem[] = Array.from(availableSet).map((value) => ({
    id: `${value}`,
    label: getDisplayName(value),
    value,
  }));

  if (!isValid || !availableSet.has(currentValue)) {
    selectItems.push({
      id: `${currentValue}`,
      label: metaDisplay || 'Unknown',
      value: currentValue,
      invalid: true,
    });
  }

  const selectedItem =
    selectItems.find((item) => item.value === currentValue) ?? null;

  return (
    <Section id={id} className="w-full">
      <TextLabel>{selectLabel}</TextLabel>
      <Select
        placeholder={placeholder}
        label={selectLabel}
        defaultSelectedItem={selectedItem}
        selectedItem={selectedItem}
        onSelectionChange={(item) => {
          updateSave((save) => {
            if (!item) return;
            if (kind === 'weapon') {
              save.lightWorld.weapon = item.value as LightWorldItemIndex;
            } else if (kind === 'armor') {
              save.lightWorld.armor = item.value as LightWorldItemIndex;
            }
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </Section>
  );
}

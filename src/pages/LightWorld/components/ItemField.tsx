import { Section, TextLabel, Select, type SelectItem } from '@components';
import {
  LIGHTWORLDITEMS,
  PHONECONTACTS,
  type LightWorldItemIndex,
  type PhoneContactIndex,
} from '@data';
import { useSave } from '@store';
import {
  chapterHelpers,
  lightWorldItemHelpers,
  phoneContactHelpers,
} from '@utils';

type LightWorldItemKind = 'item' | 'phoneContact';

interface ItemFieldProps {
  kind: LightWorldItemKind;
  slot: number;
  label?: string;
  id: string;
}

export function ItemField({ kind, slot, label, id }: ItemFieldProps) {
  const save = useSave((s) => s.save);
  const chapter = save?.meta.chapter || 1;
  const updateSave = useSave((s) => s.updateSave);

  let currentValue: number = 0;
  const selectLabel = label ?? 'Slot';
  let placeholder = 'Select an item...';

  const chapterContent = chapterHelpers.getById(chapter).content;

  if (kind === 'item') {
    currentValue =
      save?.lightWorld.items[slot] ??
      (LIGHTWORLDITEMS.EMPTY as LightWorldItemIndex);
    placeholder = 'Select a item...';
  } else if (kind === 'phoneContact') {
    currentValue =
      save?.lightWorld.phone[slot] ??
      (PHONECONTACTS.EMPTY as PhoneContactIndex);
    placeholder = 'Select a phone contact...';
  }

  let availableSet: Set<number> = new Set<number>();
  // This may be considered hacky way to do it
  let getDisplayName: (id: number) => string = () => 'Unknown';

  if (kind === 'item') {
    availableSet = new Set<number>(
      chapterContent.lightWorld.items as Set<number>,
    );
    getDisplayName = (id: number) =>
      lightWorldItemHelpers.getById(id as LightWorldItemIndex)?.displayName ??
      'Unknown';
  } else if (kind === 'phoneContact') {
    availableSet = new Set<number>(
      chapterContent.lightWorld.phoneContacts as Set<number>,
    );
    getDisplayName = (id: number) =>
      phoneContactHelpers.getById(id as PhoneContactIndex)?.displayName ??
      'Unknown';
  }

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
            if (kind === 'item') {
              save.lightWorld.items[slot] = item.value as LightWorldItemIndex;
            } else if (kind === 'phoneContact') {
              save.lightWorld.phone[slot] = item.value as PhoneContactIndex;
            }
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </Section>
  );
}

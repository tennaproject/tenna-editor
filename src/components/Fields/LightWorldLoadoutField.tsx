import { Select, type SelectItem, FieldWrapper } from '@components';
import { type LightWorldItemIndex } from '@data';
import { useSave } from '@store';
import { chapterHelpers, lightWorldItemHelpers } from '@utils';

type LightWorldLoadoutType = 'weapon' | 'armor';

const LOADOUT_TITLES: Record<LightWorldLoadoutType, string> = {
  weapon: 'Weapon',
  armor: 'Armor',
};

interface LightWorldLoadoutFieldProps {
  id?: string;
  type: LightWorldLoadoutType;
}

export function LightWorldLoadoutField({
  id,
  type,
}: LightWorldLoadoutFieldProps) {
  const chapter = useSave((s) => s.save?.meta.chapter) ?? 1;
  const current = useSave((s) => s.save?.lightWorld[type]) ?? 0;
  const updateSave = useSave((s) => s.updateSave);

  const chapterAllowedElements =
    chapterHelpers.getById(chapter).content.lightWorld.items;
  const chapterSet = new Set<number>(chapterAllowedElements);
  const availableElements: Set<number> = chapterSet;

  const elementMeta = lightWorldItemHelpers.getById(
    current as LightWorldItemIndex,
  );
  const isExisting = !!(
    elementMeta && (elementMeta as { displayName?: string }).displayName
  );
  const isInChapter = chapterSet.has(current as number);
  const isValid = isExisting && isInChapter;

  const selectItems: SelectItem[] = [...availableElements].map((value) => {
    const meta = lightWorldItemHelpers.getById(value);
    return {
      id: `${value}`,
      label: meta.displayName,
      value,
    };
  });

  if (!isValid || !availableElements.has(current as number)) {
    selectItems.push({
      id: `${current}`,
      label: isExisting ? elementMeta.displayName : 'Unknown',
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
            save.lightWorld[type] = item.value as LightWorldItemIndex;
          });
        }}
        items={selectItems}
        className="w-full"
      />
    </FieldWrapper>
  );
}

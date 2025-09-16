import { InventoryPage } from '@components';
import { useSave } from '@store';
import { chapterHelpers } from '@utils';

export function InventoryWeapons() {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const slots = meta.weaponsSize;

  return (
    <div className="page flex-auto">
      <InventoryPage
        slots={slots}
        id="weapons"
        title="Weapons"
        type="weapon"
        cols={3}
      />
    </div>
  );
}

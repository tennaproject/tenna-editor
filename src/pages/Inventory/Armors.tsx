import { InventoryPage } from '@components';
import { useSave } from '@store';
import { chapterHelpers } from '@utils';

export function InventoryArmors() {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const slots = meta.armorsSize;

  return (
    <div className="page flex-auto">
      <InventoryPage
        slots={slots}
        id="armors"
        title="Armors"
        type="armor"
        cols={3}
      />
    </div>
  );
}

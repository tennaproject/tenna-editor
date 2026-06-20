import { useSave } from '@store';
import { chapterHelpers } from '@utils';
import { InventoryPage } from '@components';

export function InventoryConsumables() {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const consumableSlots = meta.consumablesSize;
  const storageSlots = meta.storagesSize;

  return (
    <div className="page flex-auto">
      <InventoryPage
        slots={consumableSlots}
        id="consumables"
        title="Consumables"
        type="consumable"
        cols={3}
      />
      {storageSlots > 0 && (
        <InventoryPage
          slots={storageSlots}
          id="storage"
          title="Storage"
          type="storage"
          cols={3}
        />
      )}
    </div>
  );
}

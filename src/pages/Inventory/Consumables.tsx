import { useSave } from '@store';
import { chapterHelpers } from '@utils';
import { ItemField, InventorySection, ItemGrid } from './components';

export const Consumables = () => {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const consumableSlots = meta.consumablesSize;
  const storageSlots = meta.storagesSize;

  return (
    <div className="page flex-auto">
      <InventorySection id="consumables" title="Consumables">
        <ItemGrid colsLg={3}>
          {Array.from({ length: consumableSlots }).map((_, i) => (
            <ItemField key={i} kind="consumable" slot={i} />
          ))}
        </ItemGrid>
      </InventorySection>

      {storageSlots > 0 && (
        <InventorySection id="storage" title="Storage">
          <ItemGrid colsLg={3}>
            {Array.from({ length: storageSlots }).map((_, i) => (
              <ItemField key={i} kind="storage" slot={i} />
            ))}
          </ItemGrid>
        </InventorySection>
      )}
    </div>
  );
};

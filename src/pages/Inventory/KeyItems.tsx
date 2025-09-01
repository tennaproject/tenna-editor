import { InventorySection, ItemGrid, ItemField } from './components';
import { useSave } from '@store';
import { chapterHelpers } from '@utils';

export const KeyItems = () => {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const slots = meta.keyItemsSize;

  return (
    <div className="page flex-auto">
      <InventorySection id="key-items" title="Key Items">
        <ItemGrid colsLg={3}>
          {Array.from({ length: slots }).map((_, i) => (
            <ItemField key={i} kind="keyItem" slot={i} />
          ))}
        </ItemGrid>
      </InventorySection>
    </div>
  );
};

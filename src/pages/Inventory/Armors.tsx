import { InventorySection, ItemGrid, ItemField } from './components';
import { useSave } from '@store';
import { chapterHelpers } from '@utils';

export const Armors = () => {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const slots = meta.armorsSize;

  return (
    <div className="page flex-auto">
      <InventorySection id="armors" title="Armors">
        <ItemGrid colsLg={3}>
          {Array.from({ length: slots }).map((_, i) => (
            <ItemField key={i} kind="armor" slot={i} />
          ))}
        </ItemGrid>
      </InventorySection>
    </div>
  );
};

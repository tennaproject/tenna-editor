import { InventorySection, ItemGrid, ItemField } from './components';
import { useSave } from '@store';
import { chapterHelpers } from '@utils';

export function InventoryWeapons() {
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const slots = meta.weaponsSize;

  return (
    <div className="page flex-auto">
      <InventorySection id="weapons" title="Weapons">
        <ItemGrid colsLg={3}>
          {Array.from({ length: slots }).map((_, i) => (
            <ItemField key={i} kind="weapon" slot={i} />
          ))}
        </ItemGrid>
      </InventorySection>
    </div>
  );
}

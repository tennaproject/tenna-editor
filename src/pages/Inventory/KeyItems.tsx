import { InventoryPage } from '@components';
import { useSave } from '@store';
import { chapterHelpers } from '@utils';
import { useTranslation } from '../../i18n';

export function InventoryKeyItems() {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const slots = meta.keyItemsSize;

  return (
    <div className="page flex-auto">
      <InventoryPage
        slots={slots}
        id="key-items"
        title={t('ui.nav.keyItems', 'Key Items')}
        type="keyItem"
        cols={3}
      />
    </div>
  );
}

import { InventoryPage } from '@components';
import { useSave } from '@store';
import { chapterHelpers } from '@utils';
import { useTranslation } from '../../i18n';

export function InventoryArmors() {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const slots = meta.armorsSize;

  return (
    <div className="page flex-auto">
      <InventoryPage
        slots={slots}
        id="armors"
        title={t('ui.nav.armors', 'Armors')}
        type="armor"
        cols={3}
      />
    </div>
  );
}

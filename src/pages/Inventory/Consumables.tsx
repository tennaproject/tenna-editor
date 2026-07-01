import { useSave } from '@store';
import { chapterHelpers } from '@utils';
import { InventoryPage } from '@components';
import { useTranslation } from '../../i18n';

export function InventoryConsumables() {
  const { t } = useTranslation();
  const chapter = useSave((s) => s.save?.meta.chapter) || 1;
  const meta = chapterHelpers.getById(chapter).content.meta;
  const consumableSlots = meta.consumablesSize;
  const storageSlots = meta.storagesSize;

  return (
    <div className="page flex-auto">
      <InventoryPage
        slots={consumableSlots}
        id="consumables"
        title={t('ui.nav.consumables', 'Consumables')}
        type="consumable"
        cols={3}
      />
      {storageSlots > 0 && (
        <InventoryPage
          slots={storageSlots}
          id="storage"
          title={t('ui.inventory.storage', 'Storage')}
          type="storage"
          cols={3}
        />
      )}
    </div>
  );
}

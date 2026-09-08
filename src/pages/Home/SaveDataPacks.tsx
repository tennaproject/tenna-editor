import DataPackIcon from '@assets/icons/file-plus.svg?react';
import { useState } from 'react';
import { Button, DataPackReferences, ModalLayout } from '@components';
import { useDataPacks, useSave } from '@store';
import { resolveDataPackReferences } from '@utils/data-packs';
import { useTranslation } from '../../i18n';

export function SaveDataPacks() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const references = useSave((state) => state.save?.meta.dataPacks);
  const packs = useDataPacks((state) => state.packs);
  const updateSave = useSave((state) => state.updateSave);
  const resolved = resolveDataPackReferences(packs, references);
  const needsAttention = resolved.references.some(
    (entry) => entry.missing || entry.conflict || entry.versionMismatch,
  );

  return (
    <>
      <Button
        variant="secondary"
        icon={<DataPackIcon />}
        className={needsAttention ? 'text-yellow' : undefined}
        onClick={() => setIsOpen(true)}
      >
        {t('ui.dataPacks.title', 'Data packs')}
      </Button>
      <ModalLayout
        isOpen={isOpen}
        setOpen={setIsOpen}
        title={t('ui.dataPacks.title', 'Data packs')}
        variant="compact"
        bodyClassName="gap-4"
      >
        <p className="text-sm text-text-2">
          {t(
            'ui.dataPacks.activationDescription',
            'Choose the packs used by this save. This changes catalog data without changing saved values.',
          )}
        </p>
        <DataPackReferences
          references={references}
          onChange={(next) =>
            updateSave((save) => {
              save.meta.dataPacks = next;
            })
          }
        />
      </ModalLayout>
    </>
  );
}

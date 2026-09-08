import UploadIcon from '@assets/icons/upload.svg?react';
import { Button, Card, Heading } from '@components';
import { toast } from '@services';
import { useDataPacks } from '@store';
import {
  DataPackError,
  DATA_PACK_MAX_FILE_BYTES,
  getDataPackEntryCount,
  parseDataPack,
} from '@utils';
import { useRef, type ChangeEvent } from 'react';
import { formatTranslation, useTranslation } from '../../i18n';

export function DataPacks() {
  const { t } = useTranslation();
  const packs = useDataPacks((state) => state.packs);
  const install = useDataPacks((state) => state.install);
  const remove = useDataPacks((state) => state.remove);
  const inputRef = useRef<HTMLInputElement>(null);

  async function importPack(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (file.size > DATA_PACK_MAX_FILE_BYTES) {
        toast(
          t(
            'ui.settings.dataPacks.errorFileSize',
            'Unable to import this pack. Files must be 1 MB or smaller.',
          ),
          'error',
        );
        return;
      }

      const pack = parseDataPack(await file.text());
      const replaced = packs.some((existing) => existing.id === pack.id);
      install(pack);
      toast(
        formatTranslation(
          t(
            replaced
              ? 'ui.settings.dataPacks.replaced'
              : 'ui.settings.dataPacks.imported',
            replaced
              ? 'Replaced {name}. Entries: {count}.'
              : 'Imported {name}. Entries: {count}.',
          ),
          { name: pack.name, count: getDataPackEntryCount(pack) },
        ),
        'success',
      );
    } catch (error) {
      toast(
        error instanceof DataPackError
          ? error.message
          : t(
              'ui.settings.dataPacks.errorGeneric',
              'Unable to import this data pack. Check the file and try again.',
            ),
        'error',
      );
    } finally {
      event.target.value = '';
    }
  }

  function removePack(packId: string) {
    remove(packId);
  }

  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Heading level={3}>
            {t('ui.settings.dataPacks.title', 'Mod data packs')}
          </Heading>
          <p className="max-w-3xl text-sm text-text-2">
            {t(
              'ui.settings.dataPacks.description',
              'Import packs here, then activate them on a save’s Overview page.',
            )}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<UploadIcon />}
          onClick={() => inputRef.current?.click()}
          className="self-start"
        >
          {t('ui.settings.dataPacks.import', 'Import data pack')}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={importPack}
        />
      </div>

      {packs.length === 0 ? (
        <p className="ui-panel-muted text-sm">
          {t('ui.settings.dataPacks.empty', 'No data packs imported.')}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {packs.map((pack) => (
            <li
              key={pack.id}
              className="flex min-h-12 flex-wrap items-center justify-between gap-3 border border-border bg-surface-3 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="break-words font-bold text-text-1">{pack.name}</p>
                <p className="text-xs text-text-2">
                  {formatTranslation(
                    t('ui.settings.dataPacks.count', 'Entries: {count}'),
                    { count: getDataPackEntryCount(pack) },
                  )}
                  {pack.modVersion
                    ? ` · ${formatTranslation(
                        t(
                          'ui.settings.dataPacks.modVersion',
                          'Mod version: {version}',
                        ),
                        { version: pack.modVersion },
                      )}`
                    : ''}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePack(pack.id)}
              >
                {t('ui.settings.dataPacks.remove', 'Remove pack')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

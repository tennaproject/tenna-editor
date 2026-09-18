import type { DataPackReference } from '@types';
import { useDataPacks } from '@store';
import { resolveDataPackReferences } from '@utils/data-packs';
import { toast } from '@services';
import { formatTranslation, useTranslation } from '../i18n';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

interface DataPackReferencesProps {
  references?: readonly DataPackReference[];
  onChange?: (references: DataPackReference[]) => void;
}

export function DataPackReferences({
  references = [],
  onChange,
}: DataPackReferencesProps) {
  const { t } = useTranslation();
  const packs = useDataPacks((state) => state.packs);
  const resolved = resolveDataPackReferences(packs, references);
  const rows = [
    ...resolved.references,
    ...(onChange
      ? packs
          .filter(
            (pack) => !references.some((reference) => reference.id === pack.id),
          )
          .map((pack) => ({
            reference: { id: pack.id, modVersion: pack.modVersion },
            pack,
            missing: false,
            conflict: false,
            versionMismatch: false,
          }))
      : []),
  ];

  function activate(reference: DataPackReference, checked: boolean) {
    const next = checked
      ? [...references, reference]
      : references.filter((entry) => entry.id !== reference.id);
    const conflicts = resolveDataPackReferences(packs, next).references.filter(
      (entry) => entry.conflict,
    );
    if (checked && conflicts.length) {
      toast(
        formatTranslation(
          t(
            'ui.dataPacks.activationConflict',
            'These packs define the same IDs: {packs}. Deactivate a conflicting pack first.',
          ),
          { packs: conflicts.map((entry) => entry.pack!.name).join(', ') },
        ),
        'error',
      );
      return;
    }
    onChange?.(next);
  }

  if (!rows.length)
    return onChange ? (
      <p className="text-sm text-text-2">
        {t(
          'ui.dataPacks.noneInstalled',
          'Import packs in Settings, then activate them for this save.',
        )}
      </p>
    ) : null;

  return (
    <ul className="flex flex-col gap-3">
      {rows.map(({ reference, pack, missing, conflict, versionMismatch }) => (
        <li key={reference.id} className="flex flex-col gap-2 min-w-0">
          {onChange ? (
            <Checkbox
              label={pack?.name ?? reference.id}
              checked={references.some((entry) => entry.id === reference.id)}
              onChange={(checked) => activate(reference, checked)}
            />
          ) : (
            <p className="font-bold break-words">
              {pack?.name ?? reference.id}
            </p>
          )}
          <p className="text-xs text-text-3 break-words">
            {reference.id}
            {reference.modVersion ? ` (${reference.modVersion})` : ''}
          </p>
          {missing && (
            <p className="text-sm text-text-2">
              {t(
                'ui.dataPacks.missing',
                'Pack missing. Import it in Settings to restore its catalog data.',
              )}
            </p>
          )}
          {conflict && (
            <p className="text-sm text-text-2">
              {t(
                'ui.dataPacks.conflict',
                'Pack inactive because its IDs conflict with another selected pack. Deactivate a conflicting pack to resolve this.',
              )}
            </p>
          )}
          {versionMismatch && (
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-text-2">
                {formatTranslation(
                  t(
                    'ui.dataPacks.versionMismatch',
                    'Version differs. Referenced: {expected}. Installed: {installed}.',
                  ),
                  {
                    expected:
                      reference.modVersion ??
                      t('ui.dataPacks.unspecifiedVersion', 'Unspecified'),
                    installed:
                      pack?.modVersion ??
                      t('ui.dataPacks.unspecifiedVersion', 'Unspecified'),
                  },
                )}
              </p>
              {onChange && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    onChange(
                      references.map((entry) =>
                        entry.id === reference.id
                          ? {
                              id: reference.id,
                              ...(pack?.modVersion === undefined
                                ? {}
                                : { modVersion: pack.modVersion }),
                            }
                          : entry,
                      ),
                    )
                  }
                >
                  {t('ui.dataPacks.acceptVersion', 'Accept installed version')}
                </Button>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

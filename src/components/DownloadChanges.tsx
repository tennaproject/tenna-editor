import { useMemo } from 'react';
import { formatLocalDateTime } from '@utils/format-date';
import { extractGamePayload } from '@utils/save-baseline';
import { computeSaveDiff } from '@utils/save-diff';
import { useSave } from '@store';
import { mergeClass } from '@utils/merge-class';

interface DownloadChangesProps {
  className?: string;
}

function DiffRow({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 ui-divider-row text-sm">
      <span className="text-text-1 min-w-0" title={label}>
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs shrink-0">
        <span className="text-text-2 line-through decoration-text-2/50">
          {before}
        </span>
        <span className="text-text-2">→</span>
        <span className="text-success">{after}</span>
      </div>
    </div>
  );
}

export function DownloadChanges({ className }: DownloadChangesProps) {
  const save = useSave((s) => s.save);
  const baseline = useSave((s) => s.save?.meta.baseline);

  const diff = useMemo(() => {
    if (!save || !baseline) return null;
    return computeSaveDiff(
      extractGamePayload(save),
      baseline,
      save.meta.chapter,
    );
  }, [save, baseline]);

  if (!baseline) {
    return (
      <div className="ui-panel-muted">
        No baseline yet. Upload or download this save once to start tracking
        changes.
      </div>
    );
  }

  const capturedAt = formatLocalDateTime(baseline.capturedAt);
  const sourceLabel = baseline.source === 'upload' ? 'upload' : 'download';

  if (!diff || diff.totalChanges === 0) {
    return (
      <div className="flex flex-col gap-2">
        <p className="ui-prose-muted">
          No changes since last {sourceLabel} on {capturedAt}.
        </p>
      </div>
    );
  }

  return (
    <div className={mergeClass('flex flex-col gap-2 min-h-0', className)}>
      <p className="ui-prose-muted shrink-0">
        {diff.totalChanges} change{diff.totalChanges === 1 ? '' : 's'} since
        last {sourceLabel} on {capturedAt}
      </p>
      <div
        className={mergeClass(
          'ui-panel overflow-y-auto min-h-[6rem] flex-1 divide-y divide-divider',
        )}
      >
        {diff.groups.map((group) => (
          <section key={group.id} className="px-3 py-2">
            <h4 className="ui-section-label mb-1">
              {group.title}
              <span className="ml-1.5 font-normal tabular-nums normal-case">
                ({group.entries.length})
              </span>
            </h4>
            <div>
              {group.entries.map((entry) => (
                <DiffRow
                  key={entry.path}
                  label={entry.label}
                  before={entry.before}
                  after={entry.after}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

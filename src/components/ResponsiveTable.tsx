import type { ReactNode } from 'react';
import { mergeClass } from '@utils/merge-class';
import ChevronDownIcon from '@assets/icons/chevron-down.svg?react';

export type ResponsiveTableSortDirection = 'asc' | 'desc';

export interface ResponsiveTableSort {
  columnId: string;
  direction: ResponsiveTableSortDirection;
}

interface ResponsiveTableProps {
  layout: 'import-review' | 'export-selection';
  headers: ResponsiveTableHeader[];
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  sort?: ResponsiveTableSort | null;
  onSortChange?: (sort: ResponsiveTableSort) => void;
}

interface ResponsiveTableHeader {
  id: string;
  content?: ReactNode;
  sortable?: boolean;
  align?: 'start' | 'center';
}

interface ResponsiveTableRowProps {
  children: ReactNode;
  className?: string;
}

interface ResponsiveTableFieldsProps {
  children: ReactNode;
  className?: string;
}

interface ResponsiveTableMobileLabelProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveTable({
  layout,
  headers,
  children,
  className,
  ariaLabel,
  sort,
  onSortChange,
}: ResponsiveTableProps) {
  return (
    <div
      role="table"
      aria-label={ariaLabel}
      data-layout={layout}
      className={mergeClass(
        'responsive-table min-h-0 overflow-auto border border-border bg-surface-2',
        className,
      )}
    >
      <div
        role="row"
        className="responsive-table-header ui-section-label sticky top-0 z-10 hidden items-center gap-3 border-b border-border bg-surface-3 px-4 py-2 md:grid"
      >
        {headers.map((header) => {
          const isSorted = sort?.columnId === header.id;
          const ariaSort = isSorted ? sort.direction : undefined;
          return (
            <div
              role="columnheader"
              aria-sort={
                ariaSort === 'asc'
                  ? 'ascending'
                  : ariaSort === 'desc'
                    ? 'descending'
                    : undefined
              }
              key={header.id}
            >
              {header.sortable && onSortChange ? (
                <button
                  type="button"
                  className={mergeClass(
                    'group flex w-full items-center gap-1 text-left text-inherit hover:text-text-1 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-1',
                    header.align === 'center' && 'justify-center text-center',
                  )}
                  onClick={() =>
                    onSortChange({
                      columnId: header.id,
                      direction:
                        isSorted && sort.direction === 'asc' ? 'desc' : 'asc',
                    })
                  }
                >
                  <span className="min-w-0">{header.content}</span>
                  <ChevronDownIcon
                    aria-hidden
                    className={mergeClass(
                      'h-3 w-3 shrink-0 transition-[transform,opacity] motion-reduce:transition-none',
                      isSorted
                        ? 'text-text-1 opacity-100'
                        : 'opacity-30 group-hover:opacity-70',
                      isSorted && sort.direction === 'asc' && 'rotate-180',
                    )}
                  />
                </button>
              ) : (
                header.content
              )}
            </div>
          );
        })}
      </div>
      <div role="rowgroup">{children}</div>
    </div>
  );
}

export function ResponsiveTableRow({
  children,
  className,
}: ResponsiveTableRowProps) {
  return (
    <div
      role="row"
      className={mergeClass(
        'responsive-table-row relative grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-3/40 focus-within:bg-surface-3/40',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveTableFields({
  children,
  className,
}: ResponsiveTableFieldsProps) {
  return (
    <div
      className={mergeClass(
        'responsive-table-fields flex min-w-0 flex-col gap-2 md:grid md:items-center md:gap-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveTableMobileLabel({
  children,
  className,
}: ResponsiveTableMobileLabelProps) {
  return (
    <span
      className={mergeClass(
        'ui-section-label w-16 shrink-0 md:hidden',
        className,
      )}
    >
      {children}:
    </span>
  );
}

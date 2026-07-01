import { useCallback, useMemo, useState } from 'react';
import { Card, Heading, Page, Section, Select, TextInput } from '@components';
import type { ChapterIndex, FlagIndex } from '@data';
import type { SelectItem } from '@components';
import { useDebouncedValue } from '@hooks';
import { useSave } from '@store';
import { chapterHelpers, prepareFlagData, type PreparedFlag } from '@utils';
import { FlagRow } from './FlagRow';
import { ManualFlagEditor } from './ManualFlagEditor';
import { getFlagTranslationKeyPrefix, translateMeta, useTranslation } from '../../i18n';

const ITEMS_PER_PAGE_OPTIONS: SelectItem[] = [
  { id: '25', label: '25', value: 25 },
  { id: '50', label: '50', value: 50 },
  { id: '100', label: '100', value: 100 },
  { id: '200', label: '200', value: 200 },
];

const CHAPTER_FLAG_LISTS = new Map<ChapterIndex, PreparedFlag[]>();
function getChapterFlagList(chapter: ChapterIndex): PreparedFlag[] {
  const cached = CHAPTER_FLAG_LISTS.get(chapter);
  if (cached) return cached;

  const chapterFlags = chapterHelpers.getById(chapter).content.flags;
  const list = Array.from(chapterFlags).map(prepareFlagData);
  CHAPTER_FLAG_LISTS.set(chapter, list);
  return list;
}

export function FlagsRoot() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    ITEMS_PER_PAGE_OPTIONS[0].value as number,
  );
  const [expandedFlag, setExpandedFlag] = useState<FlagIndex | null>(null);

  const hasSave = useSave((s) => !!s.save);
  const chapter = useSave((s) => s.save?.meta.chapter ?? 1) as ChapterIndex;

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 200);
  const [prevSearchQuery, setPrevSearchQuery] = useState(debouncedSearchQuery);

  if (debouncedSearchQuery !== prevSearchQuery) {
    setPrevSearchQuery(debouncedSearchQuery);
    setCurrentPage(1);
  }

  const allFlags = useMemo(
    () =>
      getChapterFlagList(chapter).map((flag) => {
        const translatedMeta = translateMeta(
          getFlagTranslationKeyPrefix(flag.index),
          {
            displayName: flag.name,
            description: flag.description,
            valueRules: { map: flag.knownValues },
          },
          t,
        );
        const knownValueEntries = translatedMeta.valueRules?.map
          ? Object.entries(translatedMeta.valueRules.map).sort(
              ([a], [b]) => Number(a) - Number(b),
            )
          : undefined;

        return {
          ...flag,
          description: translatedMeta.description ?? '',
          knownValues: translatedMeta.valueRules?.map,
          knownValueEntries,
          searchText:
            `${flag.name} ${flag.index} ${translatedMeta.displayName} ${translatedMeta.description ?? ''}`.toLowerCase(),
        };
      }),
    [chapter, t],
  );
  const normalizedSearchQuery = useMemo(
    () => debouncedSearchQuery.toLowerCase().trim(),
    [debouncedSearchQuery],
  );

  const filteredFlags = useMemo(() => {
    if (!normalizedSearchQuery) return allFlags;

    return allFlags.filter((flag) =>
      flag.searchText.includes(normalizedSearchQuery),
    );
  }, [allFlags, normalizedSearchQuery]);

  const totalPages = Math.ceil(filteredFlags.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFlags = useMemo(
    () => filteredFlags.slice(startIndex, endIndex),
    [filteredFlags, startIndex, endIndex],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleItemsPerPageChange = useCallback((item: SelectItem | null) => {
    if (!item) return;
    setItemsPerPage(item.value as number);
    setCurrentPage(1);
  }, []);

  const handleToggleExpandedFlag = useCallback((flagIndex: FlagIndex) => {
    setExpandedFlag((current) => (current === flagIndex ? null : flagIndex));
  }, []);

  const selectedItemsPerPage =
    ITEMS_PER_PAGE_OPTIONS.find((o) => o.value === itemsPerPage) ??
    ITEMS_PER_PAGE_OPTIONS[0];

  if (!hasSave) return null;

  const paginationNav =
    totalPages > 1 ? (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="text-text-2 hover:text-text-1 disabled:opacity-30 px-1"
          title={t('ui.flags.paginationFirst', 'First page')}
        >
          ««
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="text-text-2 hover:text-text-1 disabled:opacity-30 px-1"
          title={t('ui.flags.paginationPrevious', 'Previous page')}
        >
          «
        </button>
        <span className="text-text-2 font-mono text-xs min-w-16 text-center">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="text-text-2 hover:text-text-1 disabled:opacity-30 px-1"
          title={t('ui.flags.paginationNext', 'Next page')}
        >
          »
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="text-text-2 hover:text-text-1 disabled:opacity-30 px-1"
          title={t('ui.flags.paginationLast', 'Last page')}
        >
          »»
        </button>
      </div>
    ) : null;

  return (
    <Page>
      <Page.TopBar title={t('ui.nav.flags', 'Flags')} />
      <Page.Content>
        <div className="page">
          <>
            <Section id="warning" className="mb-4">
              <Card className="p-6 flex flex-col gap-3">
                <Heading level={3}>{t('ui.nav.flags', 'Flags')}</Heading>
                <div className="text-text-2">
                  <p>
                    {t(
                      'ui.flags.advancedWarning',
                      'This feature is intended for advanced users only who want more control over specific flags.',
                    )}
                  </p>
                  <p>
                    {t(
                      'ui.flags.alreadyCoveredWarning',
                      'Some of the flags are already covered by other parts of the editor.',
                    )}
                  </p>

                  <p className="text-red font-bold mt-2">
                    {t(
                      'ui.flags.corruptionWarning',
                      'Modifying flags incorrectly may corrupt your save file.',
                    )}
                  </p>
                  <p className="text-xs">
                    {t(
                      'ui.flags.namesWorkInProgress',
                      'NOTE: Flag names are work in progress and may be changed with future updates.',
                    )}
                  </p>
                </div>
              </Card>
            </Section>

            <Section id="manual-edit" className="mb-4">
              <Card className="p-4 flex flex-col gap-4">
                <Heading level={3}>{t('ui.flags.manualEdit', 'Manual edit')}</Heading>
                <ManualFlagEditor />
              </Card>
            </Section>

            <Section id="flags">
              <Card className="p-4 mb-4">
                <div className="flex w-full flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <TextInput
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={t('ui.flags.searchPlaceholder', 'Search flags...')}
                    fullWidth
                    className="sm:min-w-0 sm:flex-1"
                  />
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="text-text-3 text-sm">
                      {t('ui.flags.flagsPerPage', 'Flags per page')}
                    </span>
                    <Select
                      label={t('ui.flags.flagsPerPage', 'Flags per page')}
                      items={ITEMS_PER_PAGE_OPTIONS}
                      selectedItem={selectedItemsPerPage}
                      defaultSelectedItem={selectedItemsPerPage}
                      onSelectionChange={handleItemsPerPageChange}
                      className="w-20"
                    />
                    <span className="text-text-3 text-sm">
                      {t('ui.flags.flagsTotal', '{count} flags total').replace(
                        '{count}',
                        String(filteredFlags.length),
                      )}
                    </span>
                  </div>
                </div>
              </Card>
              <Card>
                {paginatedFlags.length === 0 ? (
                  <p className="text-text-2 py-12 text-center">
                    {t('ui.flags.noFlagsFound', 'No flags found.')}
                  </p>
                ) : (
                  <form
                    className="divide-y divide-border"
                    autoComplete="off"
                    noValidate
                  >
                    <div className="ui-section-label grid grid-cols-[3.5rem_minmax(0,1fr)_7rem_1.25rem] sm:grid-cols-[3.5rem_minmax(9rem,16rem)_minmax(0,1fr)_7rem_1.25rem] items-center gap-4 bg-surface-2 px-4 py-2">
                      <span>{t('ui.flags.idColumn', 'Id')}</span>
                      <span>{t('ui.flags.flagColumn', 'Flag')}</span>
                      <span className="hidden sm:block">
                        {t('ui.flags.descriptionColumn', 'Description')}
                      </span>
                      <span className="w-28">
                        {t('ui.flags.valueColumn', 'Value')}
                      </span>
                      <span className="w-5" aria-hidden />
                    </div>
                    {paginatedFlags.map((flag) => (
                      <FlagRow
                        key={flag.index}
                        flagIndex={flag.index}
                        name={flag.name}
                        description={flag.description}
                        knownValues={flag.knownValues}
                        knownValueEntries={flag.knownValueEntries}
                        isExpanded={expandedFlag === flag.index}
                        onToggleExpand={handleToggleExpandedFlag}
                      />
                    ))}
                  </form>
                )}
              </Card>
              {paginationNav && (
                <div className="flex justify-center pt-4">{paginationNav}</div>
              )}
            </Section>
          </>
        </div>
      </Page.Content>
    </Page>
  );
}

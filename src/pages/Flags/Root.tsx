import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Heading, Page, Section, Select, TextInput } from '@components';
import { FLAGS } from '@data';
import type { ChapterIndex, FlagIndex } from '@data';
import type { SelectItem } from '@components';
import { useDebouncedValue } from '@hooks';
import { useSave } from '@store';
import { chapterHelpers, flagHelpers } from '@utils';
import { FlagRow } from './FlagRow';

const ITEMS_PER_PAGE_OPTIONS: SelectItem[] = [
  { id: '25', label: '25', value: 25 },
  { id: '50', label: '50', value: 50 },
  { id: '100', label: '100', value: 100 },
  { id: '200', label: '200', value: 200 },
];

const FLAG_NAMES = Object.fromEntries(
  Object.entries(FLAGS).map(([name, index]) => [index, name]),
) as Record<FlagIndex, string>;

interface PreparedFlag {
  name: string;
  index: FlagIndex;
  description: string;
  knownValues?: Record<number, string>;
  knownValueEntries?: readonly [string, string][];
  searchText: string;
}

function prepareFlagData(index: FlagIndex): PreparedFlag {
  const name = FLAG_NAMES[index] || `FLAG_${index}`;
  const meta = flagHelpers.getById(index);
  const description = meta?.description?.trim() ?? '';
  return {
    name,
    index,
    description,
    knownValues: meta?.valueRules?.map,
    knownValueEntries: meta?.valueRules?.map
      ? Object.entries(meta.valueRules.map).sort(
          ([a], [b]) => Number(a) - Number(b),
        )
      : undefined,
    searchText:
      `${name} ${meta?.displayName ?? ''} ${description}`.toLowerCase(),
  };
}

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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    ITEMS_PER_PAGE_OPTIONS[0].value as number,
  );
  const [expandedFlag, setExpandedFlag] = useState<FlagIndex | null>(null);

  const hasSave = useSave((s) => !!s.save);
  const chapter = useSave((s) => s.save?.meta.chapter ?? 1) as ChapterIndex;

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 200);
  const allFlags = useMemo(() => getChapterFlagList(chapter), [chapter]);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

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

  return (
    <Page>
      <Page.TopBar title="Flags" />
      <Page.Content>
        <div className="page">
          <>
            <Section id="warning" className="mb-4">
              <Card className="p-6 flex flex-col gap-3">
                <Heading level={3}>Flags</Heading>
                <div className="text-text-2">
                  <p>
                    This feature is intended for advanced users only who want
                    more control over specific flags.
                  </p>
                  <p>
                    Some of the flags are already covered by other parts of the
                    editor.
                  </p>

                  <p className="text-red font-bold mt-2">
                    Modifying flags incorrectly may corrupt your save file.
                  </p>
                  <p className="text-xs">
                    NOTE: Flag names are work in progress and may be changed
                    with future updates.
                  </p>
                </div>
              </Card>
            </Section>

            <Section id="controls" className="mb-4">
              <Card className="p-4">
                <div className="flex w-full flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <TextInput
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search flags..."
                    fullWidth
                    className="sm:min-w-0 sm:flex-1"
                  />
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="text-text-3 text-sm">Flags per page</span>
                    <Select
                      label="Flags per page"
                      items={ITEMS_PER_PAGE_OPTIONS}
                      selectedItem={selectedItemsPerPage}
                      defaultSelectedItem={selectedItemsPerPage}
                      onSelectionChange={handleItemsPerPageChange}
                      className="w-20"
                    />
                    <span className="text-text-3 text-sm">
                      {filteredFlags.length} flags total
                    </span>
                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          className="text-text-2 hover:text-text-1 disabled:opacity-30 disabled:cursor-not-allowed px-1"
                          title="First page"
                        >
                          ««
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="text-text-2 hover:text-text-1 disabled:opacity-30 disabled:cursor-not-allowed px-1"
                          title="Previous page"
                        >
                          «
                        </button>
                        <span className="text-text-2 font-mono text-xs min-w-16 text-center">
                          {currentPage} / {totalPages}
                        </span>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="text-text-2 hover:text-text-1 disabled:opacity-30 disabled:cursor-not-allowed px-1"
                          title="Next page"
                        >
                          »
                        </button>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className="text-text-2 hover:text-text-1 disabled:opacity-30 disabled:cursor-not-allowed px-1"
                          title="Last page"
                        >
                          »»
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Section>

            <Section id="flags">
              <Card>
                {paginatedFlags.length === 0 ? (
                  <p className="text-text-2 py-12 text-center">
                    No flags found.
                  </p>
                ) : (
                  <form
                    className="divide-y divide-border"
                    autoComplete="off"
                    noValidate
                  >
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
            </Section>
          </>
        </div>
      </Page.Content>
    </Page>
  );
}

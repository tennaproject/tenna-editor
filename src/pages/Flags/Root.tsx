import { useState } from 'react';
import { Card, Heading, Page, Section, TextInput } from '@components';
import { FLAGS } from '@data';
import type { FlagIndex, FlagProperties } from '@data';
import { useSave } from '@store';
import { chapterHelpers, flagHelpers, mergeClass } from '@utils';

import ChevronDownIcon from '@assets/icons/chevron-down.svg?react';

const ITEMS_PER_PAGE = 25;

const FLAG_NAMES = Object.fromEntries(
  Object.entries(FLAGS).map(([name, index]) => [index, name]),
) as Record<FlagIndex, string>;

function prepareFlagData(index: FlagIndex) {
  const name = FLAG_NAMES[index] || `FLAG_${index}`;
  const meta = flagHelpers.getById(index);
  const description = meta?.description?.trim() ?? '';
  return {
    name,
    index,
    meta,
    description,
    searchText:
      `${name} ${meta?.displayName ?? ''} ${description}`.toLowerCase(),
  };
}

export function FlagsRoot() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFlag, setExpandedFlag] = useState<FlagIndex | null>(null);

  const save = useSave((s) => s.save);
  const updateSave = useSave((s) => s.updateSave);
  const chapter = save?.meta.chapter || 1;

  const chapterFlags = chapterHelpers.getById(chapter).content.flags;
  const allFlags = Array.from(chapterFlags).map(prepareFlagData);

  const filteredFlags = !searchQuery.trim()
    ? allFlags
    : allFlags.filter((flag) =>
        flag.searchText.includes(searchQuery.toLowerCase().trim()),
      );

  const totalPages = Math.ceil(filteredFlags.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFlags = filteredFlags.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFlagChange = (flagIndex: FlagIndex, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateSave((save) => {
        save.flags[flagIndex] = numValue;
      });
    }
  };

  if (!save) return null;

  return (
    <Page>
      <Page.TopBar title="Flags" />
      <Page.Content>
        <div className="page">
          <Section id="warning" className="mb-4">
            <Card className="p-6 flex flex-col gap-3">
              <Heading level={3}>Flags</Heading>
              <div className="text-text-2">
                <p>
                  This feature is intended for advanced users only who want more
                  control over specific flags.
                </p>
                <p>
                  Some of the flags are already covered by other parts of the
                  editor.
                </p>

                <p className="text-red font-bold mt-2">
                  Modifying flags incorrectly may corrupt your save file.
                </p>
                <p className="text-xs">
                  NOTE: Flag names are work in progress and may be changed with
                  future updates.
                </p>
              </div>
            </Card>
          </Section>

          <Section id="controls" className="mb-4">
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <TextInput
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search flags..."
                  className="sm:w-80"
                />
                <div className="flex items-center gap-4">
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
                      <span className="text-text-2 text-sm font-mono min-w-16 text-center">
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
                <p className="text-text-2 py-12 text-center">No flags found.</p>
              ) : (
                <div className="divide-y divide-border">
                  {paginatedFlags.map((flag) => {
                    const meta = flag.meta as FlagProperties | undefined;
                    const knownValues = meta?.valueRules?.map;
                    const hasDetails = knownValues;
                    const isExpanded = expandedFlag === flag.index;
                    const value = Number(save.flags[flag.index]) || 0;

                    return (
                      <div key={flag.index} className="hover:bg-surface-2/50">
                        <div className="flex items-center gap-4 px-4 py-3">
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <code className="text-text-1 text-sm">
                              {flag.name}
                            </code>
                            {flag.description && (
                              <span className="text-text-2 text-xs">
                                {flag.description}
                              </span>
                            )}
                          </div>
                          <div className="w-28 shrink-0">
                            <TextInput
                              defaultValue={String(value)}
                              onCommit={(v) => handleFlagChange(flag.index, v)}
                              placeholder="Enter flag value..."
                              size="small"
                              fullWidth
                            />
                          </div>
                          <div className="w-5 shrink-0 flex items-center justify-center">
                            {hasDetails && (
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedFlag(
                                    isExpanded ? null : flag.index,
                                  )
                                }
                                className="w-5 h-5 flex items-center justify-center text-text-2"
                              >
                                <ChevronDownIcon />
                              </button>
                            )}
                          </div>
                        </div>
                        <div
                          className={mergeClass(
                            'grid transition-[grid-template-rows] duration-200',
                            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                          )}
                        >
                          <div className="overflow-hidden">
                            {knownValues && (
                              <div className="px-4 pb-3 text-xs">
                                <p className="text-text-2 mb-1.5">
                                  Known values:
                                </p>
                                <div className="flex flex-col gap-0.5 pl-2">
                                  {Object.entries(knownValues)
                                    .sort(([a], [b]) => Number(a) - Number(b))
                                    .map(([val, label]) => (
                                      <span
                                        key={val}
                                        className={mergeClass(
                                          'font-mono',
                                          Number(val) === value
                                            ? 'text-accent-1'
                                            : 'text-text-2',
                                        )}
                                      >
                                        {val} - {label}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </Section>
        </div>
      </Page.Content>
    </Page>
  );
}

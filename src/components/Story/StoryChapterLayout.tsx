import { TextInput } from '@components';
import { ChapterFlagsContext } from '@contexts/ChapterFlagsContext';
import { FieldSearchContext } from '@contexts/FieldSearchContext';
import type { ChapterIndex } from '@data';
import { useDebouncedValue } from '@hooks';
import { useSave } from '@store';
import { getChapterFlagSet } from '@utils';
import { useState, type ReactNode } from 'react';

interface StoryChapterLayoutProps {
  children: ReactNode;
  chapter: number;
}

export function StoryChapterLayout(props: StoryChapterLayoutProps) {
  const { children } = props;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 200);
  const saveChapter = useSave((s) => s.save?.meta.chapter ?? 1) as ChapterIndex;
  const chapterFlagSet = getChapterFlagSet(saveChapter);

  return (
    <ChapterFlagsContext.Provider value={chapterFlagSet}>
      <FieldSearchContext.Provider value={debouncedSearch}>
        <article className="page flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <TextInput
              value={search}
              onChange={setSearch}
              placeholder="Search story fields..."
              type="search"
              fullWidth
              aria-label="Search fields"
            />
          </div>
          <div className="flex flex-col gap-4">{children}</div>
        </article>
      </FieldSearchContext.Provider>
    </ChapterFlagsContext.Provider>
  );
}

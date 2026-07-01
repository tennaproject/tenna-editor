import { TextInput } from '@components';
import { ChapterFlagsContext } from '@contexts/ChapterFlagsContext';
import { FieldSearchContext } from '@contexts/FieldSearchContext';
import type { ChapterIndex } from '@data';
import { useDebouncedValue } from '@hooks';
import { getChapterFlagSet } from '@utils';
import { useState, type ReactNode } from 'react';
import { useTranslation } from '../../i18n';

interface StoryChapterLayoutProps {
  children: ReactNode;
  chapter: number;
}

export function StoryChapterLayout(props: StoryChapterLayoutProps) {
  const { t } = useTranslation();
  const { children, chapter } = props;
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 200);
  const chapterFlagSet = getChapterFlagSet(chapter as ChapterIndex);

  return (
    <ChapterFlagsContext value={chapterFlagSet}>
      <FieldSearchContext value={debouncedSearch}>
        <article className="page flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <TextInput
              value={search}
              onChange={setSearch}
              placeholder={t('ui.story.searchPlaceholder', 'Search story fields...')}
              type="search"
              fullWidth
              aria-label={t('ui.story.searchFields', 'Search fields')}
            />
          </div>
          <div className="flex flex-col gap-4">{children}</div>
        </article>
      </FieldSearchContext>
    </ChapterFlagsContext>
  );
}

import { ProgressiveMount } from '@components/ProgressiveMount';
import { useFieldSearch } from '@contexts';
import { STORY_SECTIONS, type StoryChapterNumber } from '@data/story-sections';
import type { FlagName } from '@data';
import { flagHelpers } from '@utils';
import { StoryFlagCluster } from './StoryFlagCluster';
import { StorySection } from './StorySection';

interface StoryChapterSectionsProps {
  chapter: StoryChapterNumber;
}

function flagMatchesQuery(flag: FlagName, query: string): boolean {
  const meta = flagHelpers.getByName(flag);
  const haystack = `${flag} ${meta?.displayName ?? ''} ${meta?.description ?? ''}`;
  return haystack.toLowerCase().includes(query);
}

export function StoryChapterSections({ chapter }: StoryChapterSectionsProps) {
  const sections = STORY_SECTIONS[chapter];
  const query = useFieldSearch()?.trim().toLowerCase();

  const filteredSections = query
    ? sections
        .map((section) => ({
          ...section,
          clusters: section.clusters
            .map((cluster) => ({
              ...cluster,
              flags: cluster.flags.filter((flag) =>
                flagMatchesQuery(flag, query),
              ),
            }))
            .filter((cluster) => cluster.flags.length > 0),
        }))
        .filter((section) => section.clusters.length > 0)
    : sections;

  if (query && filteredSections.length === 0) {
    return (
      <p className="text-text-2 italic px-1 py-4">
        No story fields match &ldquo;{query}&rdquo;.
      </p>
    );
  }

  return (
    <>
      {filteredSections.map((section, index) => (
        <ProgressiveMount key={section.id} delayMs={index * 20}>
          <StorySection id={section.id} title={section.title}>
            <div className="flex flex-col gap-5">
              {section.clusters.map((cluster) => (
                <StoryFlagCluster
                  key={cluster.id}
                  title={cluster.title}
                  flags={[...cluster.flags]}
                />
              ))}
            </div>
          </StorySection>
        </ProgressiveMount>
      ))}
    </>
  );
}

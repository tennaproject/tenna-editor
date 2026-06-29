import { ProgressiveMount } from '@components/ProgressiveMount';
import { useFieldSearch } from '@contexts';
import { FLAG_BITFIELDS, FLAG_BITFIELDS_META, type FlagName } from '@data';
import {
  STORY_SECTIONS,
  type StoryChapterNumber,
  type StoryFieldName,
} from '@data/story-sections';
import { flagHelpers } from '@utils';
import { StoryFlagCluster } from './StoryFlagCluster';
import { StoryFlagGrid } from './StoryFlagGrid';
import { StorySection } from './StorySection';

interface StoryChapterSectionsProps {
  chapter: StoryChapterNumber;
}

function flagMatchesQuery(flag: StoryFieldName, query: string): boolean {
  const meta =
    flag in FLAG_BITFIELDS
      ? FLAG_BITFIELDS_META[FLAG_BITFIELDS[flag as keyof typeof FLAG_BITFIELDS]]
      : flagHelpers.getByName(flag as FlagName);
  const haystack = `${flag} ${meta?.displayName ?? ''} ${meta?.description ?? ''}`;
  return haystack.toLowerCase().includes(query);
}

function filterSection(
  section: (typeof STORY_SECTIONS)[StoryChapterNumber][number],
  query: string,
) {
  if ('flags' in section) {
    const flags = section.flags.filter((flag) => flagMatchesQuery(flag, query));
    return flags.length > 0 ? { ...section, flags } : null;
  }

  const clusters = section.clusters
    .map((cluster) => ({
      ...cluster,
      flags: cluster.flags.filter((flag) => flagMatchesQuery(flag, query)),
    }))
    .filter((cluster) => cluster.flags.length > 0);

  return clusters.length > 0 ? { ...section, clusters } : null;
}

export function StoryChapterSections({ chapter }: StoryChapterSectionsProps) {
  const sections = STORY_SECTIONS[chapter];
  const query = useFieldSearch()?.trim().toLowerCase();

  const filteredSections = query
    ? sections.flatMap((section) => {
        const filteredSection = filterSection(section, query);
        return filteredSection ? [filteredSection] : [];
      })
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
            {'flags' in section ? (
              <StoryFlagGrid flags={[...section.flags]} />
            ) : (
              <div className="flex flex-col gap-5">
                {section.clusters.map((cluster) => (
                  <StoryFlagCluster
                    key={cluster.id}
                    title={cluster.title}
                    flags={[...cluster.flags]}
                  />
                ))}
              </div>
            )}
          </StorySection>
        </ProgressiveMount>
      ))}
    </>
  );
}

import { ProgressiveMount } from '@components/ProgressiveMount';
import { STORY_SECTIONS, type StoryChapterNumber } from '@data/story-sections';
import { StoryFlagCluster } from './StoryFlagCluster';
import { StorySection } from './StorySection';

interface StoryChapterSectionsProps {
  chapter: StoryChapterNumber;
}

export function StoryChapterSections({ chapter }: StoryChapterSectionsProps) {
  const sections = STORY_SECTIONS[chapter];

  return (
    <>
      {sections.map((section, index) => (
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

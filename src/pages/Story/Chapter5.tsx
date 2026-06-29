import {
  Card,
  Heading,
  Section,
  StoryChapterLayout,
  StoryChapterSections,
  StoryFlagField,
  ThrashFit,
  type ThrashFitHairIndex,
  type ThrashFitHatIndex,
  type ThrashFitPantsIndex,
  type ThrashFitShirtIndex,
  type ThrashFitShoesIndex,
} from '@components';
import { FLAGS } from '@data';
import { useSaveFlag } from '@hooks';

const THRASH_FIT_FIELDS = [
  ['thrash-fit-hair', FLAGS.THRASH_FIT_HAIR],
  ['thrash-fit-shirt', FLAGS.THRASH_FIT_SHIRT],
  ['thrash-fit-pants', FLAGS.THRASH_FIT_PANTS],
  ['thrash-fit-hat', FLAGS.THRASH_FIT_HAT],
  ['thrash-fit-shoes', FLAGS.THRASH_FIT_SHOES],
] as const;

function Chapter5Notice() {
  return (
    <Card className="flex flex-col gap-3 p-6">
      <Heading level={3}>Chapter 5</Heading>
      <p className="text-text-2">
        Chapter 5 support is a work in progress.{' '}
        <span className="text-red font-bold">
          For now, all flag fields are uncategorized, descriptions may be
          incomplete, and everything here is subject to change.
        </span>
      </p>
    </Card>
  );
}

function ThrashFitSection() {
  const hair = useSaveFlag(FLAGS.THRASH_FIT_HAIR) as ThrashFitHairIndex;
  const shirt = useSaveFlag(FLAGS.THRASH_FIT_SHIRT) as ThrashFitShirtIndex;
  const pants = useSaveFlag(FLAGS.THRASH_FIT_PANTS) as ThrashFitPantsIndex;
  const hat = useSaveFlag(FLAGS.THRASH_FIT_HAT) as ThrashFitHatIndex;
  const shoes = useSaveFlag(FLAGS.THRASH_FIT_SHOES) as ThrashFitShoesIndex;

  return (
    <Section id="creations">
      <Card className="flex flex-col gap-4 p-6">
        <Heading level={3}>Thrash Fit</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(180px,240px)_minmax(0,1fr)] gap-5">
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex items-center justify-center">
              <ThrashFit
                id="thrash-fit-preview"
                hair={hair}
                shirt={shirt}
                pants={pants}
                hat={hat}
                shoes={shoes}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 content-start">
            {THRASH_FIT_FIELDS.map(([id, flag]) => (
              <StoryFlagField key={id} id={id} flag={flag} />
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
}

export function StoryChapter5() {
  return (
    <StoryChapterLayout chapter={5}>
      <Chapter5Notice />
      <ThrashFitSection />
      <StoryChapterSections chapter={5} />
    </StoryChapterLayout>
  );
}

import {
  Card,
  FlagField,
  Heading,
  Section,
  StoryChapterLayout,
  StoryFlagField,
  ThrashFit,
  type ThrashFitHairIndex,
  type ThrashFitHatIndex,
  type ThrashFitPantsIndex,
  type ThrashFitShirtIndex,
  type ThrashFitShoesIndex,
} from '@components';
import { FLAG_BITFIELDS, FLAGS } from '@data';
import { useSaveFlag } from '@hooks';

function Chapter5Notice() {
  return (
    <Card className="flex flex-col gap-4 p-6">
      <Heading level={2}>Chapter 5</Heading>
      <p className="text-text-2">
        Story flag editing for Chapter 5 is still being expanded.
      </p>
      <div className="ui-panel-muted border-yellow/40 bg-yellow-soft text-text-1 flex flex-col gap-3 p-4">
        <p>Chapter 5 support is available in Tenna Editor.</p>
        <p className="flex items-start gap-1">
          <span className="text-green font-bold shrink-0">[NEW]</span>
          <span>
            Basic features like recruits, rooms, items, weapons, and armors are
            in place.
          </span>
        </p>
        <p>More flags and plot points will come later.</p>
      </div>
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
    <Section className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Thrash Fit</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-center w-50 pt-1">
              <ThrashFit
                id="thrash-fit-preview"
                hair={hair}
                shirt={shirt}
                pants={pants}
                hat={hat}
                shoes={shoes}
              />
            </div>
            <StoryFlagField id="thrash-fit-hair" flag={FLAGS.THRASH_FIT_HAIR} />
            <StoryFlagField
              id="thrash-fit-shirt"
              flag={FLAGS.THRASH_FIT_SHIRT}
            />
            <StoryFlagField
              id="thrash-fit-pants"
              flag={FLAGS.THRASH_FIT_PANTS}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <StoryFlagField id="thrash-fit-hat" flag={FLAGS.THRASH_FIT_HAT} />
            <StoryFlagField
              id="thrash-fit-shoes"
              flag={FLAGS.THRASH_FIT_SHOES}
            />
          </div>
        </div>
      </Card>
    </Section>
  );
}

function HopChefSection() {
  return (
    <Section>
      <Card className="flex flex-col gap-3 p-6">
        <Heading level={3}>Hop Chef</Heading>
        <FlagField
          id="hopchef-progress"
          bitfield={FLAG_BITFIELDS.HOPSCHEF_PROGRESS}
        />
      </Card>
    </Section>
  );
}

function ScissorsPuzzleSection() {
  return (
    <Section>
      <Card className="flex flex-col gap-3 p-6">
        <Heading level={3}>Scissors Puzzle</Heading>
        <FlagField
          id="scissors-puzzle-shaped-bush-cut"
          bitfield={FLAG_BITFIELDS.SCISSORS_PUZZLE_SHAPED_BUSH_CUT}
        />
        <FlagField
          id="scissors-puzzle-flowery-face-path-cut"
          bitfield={FLAG_BITFIELDS.SCISSORS_PUZZLE_FLOWERY_FACE_PATH_CUT}
        />
        <FlagField
          id="ralsei-hold-z-hint"
          bitfield={FLAG_BITFIELDS.RALSEI_HOLD_Z_HINT}
        />
      </Card>
    </Section>
  );
}

export function StoryChapter5() {
  return (
    <StoryChapterLayout chapter={5}>
      <Chapter5Notice />
      <HopChefSection />
      <ScissorsPuzzleSection />
      <Section id="creations" className="flex flex-col lg:flex-row gap-3">
        <ThrashFitSection />
        <ThrashFitSection />
      </Section>
    </StoryChapterLayout>
  );
}

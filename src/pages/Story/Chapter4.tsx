import { Section, Card, Heading, FlagField } from '@components';
import { FLAGS } from '@data';

function DarkWorldSection() {
  return (
    <Section id="dark-world" className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Dark World</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="got-moss" flag={FLAGS.GOT_MOSS_CH4} />
            <FlagField id="got-egg" flag={FLAGS.EGG_CH4} />
            <FlagField
              id="talked-king-knight"
              flag={FLAGS.TALKED_KING_KNIGHT}
            />
            <FlagField
              id="saw-tenna-king-scene"
              flag={FLAGS.SAW_TENNA_KING_SCENE}
            />
            <FlagField
              id="defeated-hammer-of-justice"
              flag={FLAGS.AXE_OF_JUSTICE_PROGRESS}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="susie-heal-count" flag={FLAGS.SUSIE_HEAL_COUNT} />
            <FlagField
              id="donation-fountain-count"
              flag={FLAGS.DONATION_FOUNTAIN_COUNT}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3"></div>
          <div className="flex-1 flex flex-col gap-3"></div>
        </div>
      </Card>
    </Section>
  );
}

function LightWorldSection() {
  return (
    <Section id="light-world" className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Light World</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="got-susie-prize" flag={FLAGS.GOT_SUSIE_PRIZE} />
            <FlagField
              id="cleaned-up-blood-stain"
              flag={FLAGS.CLEANED_UP_BLOOD_STAIN}
            />
            <FlagField
              id="showed-family-photo-to-susie"
              flag={FLAGS.SHOWED_FAMILY_PHOTO_TO_SUSIE}
            />
            <FlagField
              id="showed-asriel-photo-to-susie"
              flag={FLAGS.SHOWED_ASRIEL_PHOTO_TO_SUSIE}
            />
            <FlagField
              id="talked-napstablook-undyne"
              flag={FLAGS.TALKED_NAPSTABLOOK_UNDYNE}
            />
            <FlagField
              id="talked-napstablook-shelter"
              flag={FLAGS.TALKED_NAPSTABLOOK_SHELTER}
            />
            <FlagField
              id="talked-asgore-outfit"
              flag={FLAGS.TALKED_ASGORE_OUTFIT}
            />
            <FlagField
              id="talked-asgore-wellbeing"
              flag={FLAGS.TALKED_ASGORE_WELLBEING}
            />
            <FlagField
              id="inspected-glass-with-noelle"
              flag={FLAGS.INSPECTED_GLASS_WITH_NOELLE}
            />
            <FlagField
              id="weirdroute-failed"
              flag={FLAGS.WEIRDROUTE_FAILED_CH4}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField
              id="talked-mettaton-tenna"
              flag={FLAGS.TALKED_METTATON_TENNA}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3"></div>
          <div className="flex-1 flex flex-col gap-3"></div>
        </div>
      </Card>
    </Section>
  );
}

export function StoryChapter4() {
  return (
    <article className="page flex flex-col gap-3">
      <Section id="progress" className="flex flex-col gap-3">
        <DarkWorldSection />
        <LightWorldSection />
      </Section>
    </article>
  );
}

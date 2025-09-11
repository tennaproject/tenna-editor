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
            <FlagField id="gave-tenna" flag={FLAGS.GAVE_TENNA} />
            <FlagField id="got-susie-prize" flag={FLAGS.GOT_SUSIE_PRIZE} />
          </div>
          <div className="flex-1 flex flex-col gap-3"></div>
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

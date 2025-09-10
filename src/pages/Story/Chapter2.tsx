import { Card, FlagField, Heading, Section } from '@components';
import { FLAGS } from '@data';

function DarkWorldSection() {
  return (
    <Section id="dark-world" className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Dark World</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <FlagField
              id="inspected-bed-kris"
              flag={FLAGS.INSPECTED_BED_KRIS}
            />
            <FlagField
              id="inspected-bed-susie"
              flag={FLAGS.INSPECTED_BED_SUSIE}
            />
            <FlagField
              id="inspected-bed-lancer"
              flag={FLAGS.INSPECTED_BED_LANCER}
            />
            <FlagField
              id="inspected-bed-clover"
              flag={FLAGS.INSPECTED_BED_CLOVER}
            />
            <FlagField
              id="inspected-bed-noelle"
              flag={FLAGS.INSPECTED_BED_NOELLE}
            />
            <FlagField
              id="got-bed-inspector-title"
              flag={FLAGS.INSPECTED_BEDS_CH2}
            />
            <FlagField id="weirdroute-failed" flag={FLAGS.WEIRDROUTE_FAILED} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="can-party-act" flag={FLAGS.CAN_PARTY_ACT} />
            <FlagField id="hugged-dummy" flag={FLAGS.HUGGED_DUMMY} />
            <FlagField id="recruited-hacker" flag={FLAGS.RECRUITED_HACKER} />
            <FlagField id="got-moss" flag={FLAGS.GOT_MOSS_CH2} />
            <FlagField
              id="got-moss-with-noelle"
              flag={FLAGS.GOT_MOSS_WITH_NOELLE}
            />
            <FlagField
              id="got-moss-with-susie"
              flag={FLAGS.GOT_MOSS_WITH_SUSIE}
            />
            <FlagField id="berdly-broken-arm" flag={FLAGS.BERDLY_BROKEN_ARM} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="carnival-gift" flag={FLAGS.CARNIVAL_GIFT} />
            <FlagField id="spamton-progress" flag={FLAGS.SPAMTON_PROGRESS} />
            <FlagField
              id="ralsei-photo-status"
              flag={FLAGS.RALSEI_PHOTO_STATUS}
            />
            <FlagField id="egg-room" flag={FLAGS.EGG_ROOM_CH2} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="weirdroute-progress" flag={FLAGS.CARNIVAL_GIFT} />
            <FlagField
              id="noelle-ice-shock-count"
              flag={FLAGS.NOELLE_ICE_SHOCK_COUNT}
            />
            <FlagField id="cars-hit-count" flag={FLAGS.CARS_HIT_COUNT} />
          </div>
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
            <FlagField id="took-asriel-money" flag={FLAGS.TOOK_ASRIEL_MONEY} />
            <FlagField id="talked-mettaton" flag={FLAGS.TALKED_METTATON} />
            <FlagField id="onion" flag={FLAGS.ONION_CH2} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="onion-missed" flag={FLAGS.ONION_MISSED} />
          </div>
          <div className="flex-1 flex flex-col gap-3"></div>
          <div className="flex-1 flex flex-col gap-3"></div>
        </div>
      </Card>
    </Section>
  );
}

export function StoryChapter2() {
  return (
    <article className="page flex flex-col gap-3">
      <Section id="progress" className="flex flex-col gap-3">
        <DarkWorldSection />
        <LightWorldSection />
      </Section>
    </article>
  );
}

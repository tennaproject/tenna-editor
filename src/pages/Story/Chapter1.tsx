import {
  Card,
  CharacterNameField,
  FlagField,
  Heading,
  Section,
  ThrashMachine,
  Vessel,
  type ThrashMachineBodyIndex,
  type ThrashMachineHeadIndex,
  type ThrashMachineShoeIndex,
  type VesselBodyIndex,
  type VesselHeadIndex,
  type VesselLegsIndex,
} from '@components';
import { FLAGS } from '@data';
import { useSaveFlag } from '@hooks';

function VesselSection() {
  const vesselHead = useSaveFlag(FLAGS.VESSEL_HEAD) as VesselHeadIndex;
  const vesselBody = useSaveFlag(FLAGS.VESSEL_BODY) as VesselBodyIndex;
  const vesselLegs = useSaveFlag(FLAGS.VESSEL_LEGS) as VesselLegsIndex;

  return (
    <Section className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Vessel</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <CharacterNameField id="vessel-name" />
            <div className="flex items-center justify-center w-50 pt-1">
              <Vessel
                id="vessel-preview"
                head={vesselHead}
                body={vesselBody}
                legs={vesselLegs}
              />
            </div>

            <FlagField id="vessel-head" flag={FLAGS.VESSEL_HEAD} />
            <FlagField id="vessel-body" flag={FLAGS.VESSEL_BODY} />
            <FlagField id="vessel-legs" flag={FLAGS.VESSEL_LEGS} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField id="vessel-food" flag={FLAGS.VESSEL_FOOD} />
            <FlagField id="vessel-blood-type" flag={FLAGS.VESSEL_BLOOD_TYPE} />
            <FlagField id="vessel-color" flag={FLAGS.VESSEL_COLOR} />
            <FlagField id="vessel-gift" flag={FLAGS.VESSEL_GIFT} />
            <FlagField id="vessel-feeling" flag={FLAGS.VESSEL_FEELING} />
            <FlagField id="vessel-honesty" flag={FLAGS.VESSEL_HONESTY} />
            <FlagField
              id="vessel-pain-seizure"
              flag={FLAGS.VESSEL_PAIN_SEIZURE}
            />
          </div>
        </div>
      </Card>
    </Section>
  );
}

function ThrashMachineSection() {
  const head = useSaveFlag(FLAGS.THRASH_MACHINE_HEAD) as ThrashMachineHeadIndex;
  const body = useSaveFlag(FLAGS.THRASH_MACHINE_BODY) as ThrashMachineBodyIndex;
  const shoe = useSaveFlag(FLAGS.THRASH_MACHINE_SHOE) as ThrashMachineShoeIndex;

  const headColor = useSaveFlag(FLAGS.THRASH_MACHINE_HEAD_COLOR);
  const bodyColor = useSaveFlag(FLAGS.THRASH_MACHINE_BODY_COLOR);
  const shoeColor = useSaveFlag(FLAGS.THRASH_MACHINE_SHOE_COLOR);

  return (
    <Section className="flex-1 flex">
      <Card className="flex-1 flex flex-col gap-3 p-6">
        <Heading level={3}>Thrash Machine</Heading>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-3">
            <ThrashMachine
              id="thrash-machine-preview"
              head={head}
              body={body}
              shoe={shoe}
              headColor={headColor}
              bodyColor={bodyColor}
              shoeColor={shoeColor}
            />
            <FlagField
              id="thrash-machine-head"
              flag={FLAGS.THRASH_MACHINE_HEAD}
            />
            <FlagField
              id="thrash-machine-body"
              flag={FLAGS.THRASH_MACHINE_BODY}
            />
            <FlagField
              id="thrash-machine-shoe"
              flag={FLAGS.THRASH_MACHINE_SHOE}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <FlagField
              id="thrash-machine-head-color"
              flag={FLAGS.THRASH_MACHINE_HEAD_COLOR}
            />
            <FlagField
              id="thrash-machine-body-color"
              flag={FLAGS.THRASH_MACHINE_BODY_COLOR}
            />
            <FlagField
              id="thrash-machine-shoe-color"
              flag={FLAGS.THRASH_MACHINE_SHOE_COLOR}
            />
          </div>
        </div>
      </Card>
    </Section>
  );
}

export function StoryChapter1() {
  return (
    <article className="page flex flex-col gap-3">
      <Section id="creations" className="flex flex-col lg:flex-row gap-3">
        <VesselSection />
        <ThrashMachineSection />
      </Section>
      <Section>
        <Card className="flex-1 flex flex-col gap-3 p-6">
          <Heading level={3}>Progress</Heading>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex flex-col gap-3">
              <FlagField id="got-moss" flag={FLAGS.GOT_MOSS_CH1} />
              <FlagField id="starwalker" flag={FLAGS.STARWALKER} />
              <FlagField id="inspected-beds" flag={FLAGS.INSPECTED_BEDS_CH1} />
            </div>
            <div className="flex-1 flex flex-col gap-3"></div>
          </div>
        </Card>
      </Section>
    </article>
  );
}

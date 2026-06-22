import {
  Section,
  Card,
  Heading,
  Vessel,
  ThrashMachine,
  VesselNameField,
  type VesselHeadIndex,
  type VesselBodyIndex,
  type VesselLegsIndex,
  type ThrashMachineHeadIndex,
  type ThrashMachineBodyIndex,
  type ThrashMachineShoeIndex,
  StoryChapterLayout,
  StoryChapterSections,
  StoryFlagField,
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
            <VesselNameField id="vessel-name" />
            <div className="flex items-center justify-center w-50 pt-1">
              <Vessel
                id="vessel-preview"
                head={vesselHead}
                body={vesselBody}
                legs={vesselLegs}
              />
            </div>

            <StoryFlagField id="vessel-head" flag={FLAGS.VESSEL_HEAD} />
            <StoryFlagField id="vessel-body" flag={FLAGS.VESSEL_BODY} />
            <StoryFlagField id="vessel-legs" flag={FLAGS.VESSEL_LEGS} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <StoryFlagField id="vessel-food" flag={FLAGS.VESSEL_FOOD} />
            <StoryFlagField id="vessel-blood" flag={FLAGS.VESSEL_BLOOD} />
            <StoryFlagField id="vessel-color" flag={FLAGS.VESSEL_COLOR} />
            <StoryFlagField id="vessel-gift" flag={FLAGS.VESSEL_GIFT} />
            <StoryFlagField id="vessel-feeling" flag={FLAGS.VESSEL_FEELING} />
            <StoryFlagField id="vessel-honest" flag={FLAGS.VESSEL_HONEST} />
            <StoryFlagField id="vessel-seizure" flag={FLAGS.VESSEL_SEIZURE} />
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
            <StoryFlagField
              id="thrash-machine-head"
              flag={FLAGS.THRASH_MACHINE_HEAD}
            />
            <StoryFlagField
              id="thrash-machine-body"
              flag={FLAGS.THRASH_MACHINE_BODY}
            />
            <StoryFlagField
              id="thrash-machine-shoe"
              flag={FLAGS.THRASH_MACHINE_SHOE}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <StoryFlagField
              id="thrash-machine-head-color"
              flag={FLAGS.THRASH_MACHINE_HEAD_COLOR}
            />
            <StoryFlagField
              id="thrash-machine-body-color"
              flag={FLAGS.THRASH_MACHINE_BODY_COLOR}
            />
            <StoryFlagField
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
    <StoryChapterLayout chapter={1}>
      <Section id="creations" className="flex flex-col lg:flex-row gap-3">
        <VesselSection />
        <ThrashMachineSection />
      </Section>
      <StoryChapterSections chapter={1} />
    </StoryChapterLayout>
  );
}

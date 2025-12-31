import VesselHead0 from '@assets/deltarune/vessel/vessel-head-0.png';
import VesselHead1 from '@assets/deltarune/vessel/vessel-head-1.png';
import VesselHead2 from '@assets/deltarune/vessel/vessel-head-2.png';
import VesselHead3 from '@assets/deltarune/vessel/vessel-head-3.png';
import VesselHead4 from '@assets/deltarune/vessel/vessel-head-4.png';
import VesselHead5 from '@assets/deltarune/vessel/vessel-head-5.png';
import VesselHead6 from '@assets/deltarune/vessel/vessel-head-6.png';
import VesselHead7 from '@assets/deltarune/vessel/vessel-head-7.png';
import VesselBody0 from '@assets/deltarune/vessel/vessel-body-0.png';
import VesselBody1 from '@assets/deltarune/vessel/vessel-body-1.png';
import VesselBody2 from '@assets/deltarune/vessel/vessel-body-2.png';
import VesselBody3 from '@assets/deltarune/vessel/vessel-body-3.png';
import VesselBody4 from '@assets/deltarune/vessel/vessel-body-4.png';
import VesselBody5 from '@assets/deltarune/vessel/vessel-body-5.png';
import VesselLegs0 from '@assets/deltarune/vessel/vessel-legs-0.png';
import VesselLegs1 from '@assets/deltarune/vessel/vessel-legs-1.png';
import { Section } from '@components';
import { mergeClass } from '@utils';

const VESSEL_SOURCES = {
  head: [
    VesselHead0,
    VesselHead1,
    VesselHead2,
    VesselHead3,
    VesselHead4,
    VesselHead5,
    VesselHead6,
    VesselHead7,
  ],
  body: [
    VesselBody0,
    VesselBody1,
    VesselBody2,
    VesselBody3,
    VesselBody4,
    VesselBody5,
  ],
  legs: [VesselLegs1, VesselLegs1, VesselLegs1, VesselLegs1, VesselLegs0],
} as const;

export type VesselHeadIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type VesselBodyIndex = 0 | 1 | 2 | 3 | 4 | 5;
export type VesselLegsIndex = 0 | 1 | 2 | 3 | 4;

interface VesselProps {
  id?: string;
  className?: string;
  head: VesselHeadIndex;
  body: VesselBodyIndex;
  legs: VesselLegsIndex;
}

export function Vessel({ id, className, head, body, legs }: VesselProps) {
  const headSource = VESSEL_SOURCES.head[head];
  const bodySource = VESSEL_SOURCES.body[body];
  const legsSource = VESSEL_SOURCES.legs[legs];

  return (
    <Section id={id} className={mergeClass('relative h-40 w-22', className)}>
      <img
        src={headSource}
        alt="Vessel head"
        draggable={false}
        className="absolute z-10 bottom-18 left-0 max-w-22"
        style={{ width: 'auto', height: 'auto' }}
      />
      <img
        src={bodySource}
        alt="Vessel body"
        draggable={false}
        className="absolute z-20 bottom-7 left-0 max-w-22"
        style={{ width: 'auto', height: 'auto' }}
      />
      <img
        src={legsSource}
        alt="Vessel legs"
        draggable={false}
        className="absolute z-30 bottom-0 left-0 max-w-22"
        style={{ width: 'auto', height: 'auto' }}
      />
    </Section>
  );
}

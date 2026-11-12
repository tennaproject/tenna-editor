import { Section } from '@components';
import { mergeClass } from '@utils/merge-class';
import { VESSEL_SOURCES } from '@utils/vessel-sprites';

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
    <Section
      id={id}
      className={mergeClass('relative isolate h-40 w-22', className)}
    >
      <img
        src={headSource}
        alt="Vessel head"
        draggable={false}
        className="absolute z-[1] bottom-18 left-0 max-w-22"
        style={{ width: 'auto', height: 'auto' }}
      />
      <img
        src={bodySource}
        alt="Vessel body"
        draggable={false}
        className="absolute z-[2] bottom-7 left-0 max-w-22"
        style={{ width: 'auto', height: 'auto' }}
      />
      <img
        src={legsSource}
        alt="Vessel legs"
        draggable={false}
        className="absolute z-[3] bottom-0 left-0 max-w-22"
        style={{ width: 'auto', height: 'auto' }}
      />
    </Section>
  );
}

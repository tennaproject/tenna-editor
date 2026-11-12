import { CroppedSprite } from './CroppedSprite';
import { TooltipHeading } from './TooltipHeading';
import { VESSEL_SOURCES } from '@utils/vessel-sprites';

// opaque pixels of every variant of a part
const CROPS = {
  head: [0, 32, 672, 704],
  body: [32, 32, 672, 480],
  legs: [128, 32, 576, 288],
} as const;

const CANVAS_WIDTH = 672;
// legs are scaled up so the narrow sprite is as wide as the head
const SCALES = { head: 0.125, body: 0.125, legs: 0.1875 } as const;

interface VesselPartTooltipProps {
  part: keyof typeof VESSEL_SOURCES;
  index: number;
  name: string;
}

export function VesselPartTooltip({
  part,
  index,
  name,
}: VesselPartTooltipProps) {
  const sources: readonly string[] = VESSEL_SOURCES[part];

  return (
    <div className="flex flex-col">
      <TooltipHeading name={name} />
      <div className="p-3">
        <CroppedSprite
          src={sources[index]}
          canvasWidth={CANVAS_WIDTH}
          crop={CROPS[part]}
          scale={SCALES[part]}
        />
      </div>
    </div>
  );
}

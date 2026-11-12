import { CroppedSprite } from './CroppedSprite';
import { TooltipHeading } from './TooltipHeading';
import { THRASH_FIT_SOURCES } from '@utils/thrash-fit-sprites';

// opaque pixels of every variant of a part
const CROPS = {
  hair: [0, 0, 330, 270],
  shirt: [40, 170, 320, 460],
  pants: [80, 290, 270, 470],
  shoes: [50, 400, 290, 510],
  hat: [30, 10, 310, 190],
} as const;

const CANVAS_WIDTH = 330;
// narrow parts are scaled up so they are not lost in the panel
const SCALES = {
  hair: 0.3,
  shirt: 0.3,
  pants: 0.4,
  shoes: 0.4,
  hat: 0.3,
} as const;

interface ThrashFitPartTooltipProps {
  part: keyof typeof THRASH_FIT_SOURCES;
  index: number;
  name: string;
}

export function ThrashFitPartTooltip({
  part,
  index,
  name,
}: ThrashFitPartTooltipProps) {
  const sources: readonly string[] = THRASH_FIT_SOURCES[part];

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

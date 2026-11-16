import { FLAGS } from '@data';
import { useSaveFlag } from '@hooks';
import { getGameColor } from '@utils/get-game-color';
import { TooltipHeading } from './TooltipHeading';
import { THRASH_MACHINE_SOURCES } from '@utils/thrash-machine-sprites';

const HEAD_UNITS = [25, 27, 26, 23];
const BODY_UNITS = 42;
const SHOE_UNITS = 34;
// opaque width and height of each shoe variant inside its viewBox
const SHOE_ART = [
  [16, 7],
  [11, 10],
  [34, 11],
  [10, 8],
] as const;
const SHOE_PAIR_OFFSET = 11;
const UNIT_PX = 3;

const COLOR_FLAGS = {
  head: FLAGS.THRASH_MACHINE_HEAD_COLOR,
  body: FLAGS.THRASH_MACHINE_BODY_COLOR,
  shoe: FLAGS.THRASH_MACHINE_SHOE_COLOR,
} as const;

interface ThrashMachinePartTooltipProps {
  part: keyof typeof THRASH_MACHINE_SOURCES;
  index: number;
  name: string;
}

export function ThrashMachinePartTooltip({
  part,
  index,
  name,
}: ThrashMachinePartTooltipProps) {
  const colorIndex = useSaveFlag(COLOR_FLAGS[part]);
  const color = getGameColor(colorIndex);

  return (
    <div className="flex flex-col">
      <TooltipHeading name={name} />
      <div className="flex justify-center p-3">
        {part === 'head' && (
          <ThrashMachineHeadSprite index={index} color={color} />
        )}
        {part === 'body' && (
          <ThrashMachineBodySprite index={index} color={color} />
        )}
        {part === 'shoe' && (
          <ThrashMachineShoeSprites index={index} color={color} />
        )}
      </div>
    </div>
  );
}

interface SpriteProps {
  index: number;
  color: string;
}

function ThrashMachineHeadSprite({ index, color }: SpriteProps) {
  const Head = THRASH_MACHINE_SOURCES.head[index];
  return <Head style={{ width: HEAD_UNITS[index] * UNIT_PX }} color={color} />;
}

function ThrashMachineBodySprite({ index, color }: SpriteProps) {
  const Body = THRASH_MACHINE_SOURCES.body[index];
  return <Body style={{ width: BODY_UNITS * UNIT_PX }} color={color} />;
}

function ThrashMachineShoeSprites({ index, color }: SpriteProps) {
  const shoes = THRASH_MACHINE_SOURCES.shoe[index];
  const width = SHOE_UNITS * UNIT_PX;
  const offset = SHOE_PAIR_OFFSET * UNIT_PX;
  const [artWidth, artHeight] = SHOE_ART[index];

  return (
    <div
      className="relative"
      style={{
        width: artWidth * UNIT_PX + (shoes.length - 1) * offset,
        height: artHeight * UNIT_PX,
      }}
    >
      {shoes.map((Shoe, i) => (
        <Shoe
          key={i}
          className="absolute top-0"
          style={{ width, left: i * offset }}
          color={color}
        />
      ))}
    </div>
  );
}

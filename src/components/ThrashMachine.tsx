import ThrashMachineHead0 from '@assets/deltarune/thrash-machine-head-0.svg?react';
import ThrashMachineHead1 from '@assets/deltarune/thrash-machine-head-1.svg?react';
import ThrashMachineHead2 from '@assets/deltarune/thrash-machine-head-2.svg?react';
import ThrashMachineHead3 from '@assets/deltarune/thrash-machine-head-3.svg?react';
import ThrashMachineBody0 from '@assets/deltarune/thrash-machine-body-0.svg?react';
import ThrashMachineBody1 from '@assets/deltarune/thrash-machine-body-1.svg?react';
import ThrashMachineBody2 from '@assets/deltarune/thrash-machine-body-2.svg?react';
import ThrashMachineBody3 from '@assets/deltarune/thrash-machine-body-3.svg?react';
import ThrashMachineShoe0 from '@assets/deltarune/thrash-machine-shoe-0.svg?react';
import ThrashMachineShoe1 from '@assets/deltarune/thrash-machine-shoe-1.svg?react';
import ThrashMachineShoe2 from '@assets/deltarune/thrash-machine-shoe-2.svg?react';
import ThrashMachineShoe3 from '@assets/deltarune/thrash-machine-shoe-3.svg?react';
import ThrashMachineShoe4 from '@assets/deltarune/thrash-machine-shoe-4.svg?react';

import { Section } from '@components';
import { mergeClass } from '@utils';
import convert from 'color-convert';

function getThrashColor(color: number) {
  // GameMaker uses 8-bit HSV values https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/Drawing/Colour_And_Alpha/make_colour_hsv.htm
  const raw = convert.hsv.hex([(color * 8 * 360) / 255, 100, 100]);
  return `#${raw}`;
}

export type ThrashMachineHeadIndex = 0 | 1 | 2 | 3;
export type ThrashMachineBodyIndex = 0 | 1 | 2 | 3;
export type ThrashMachineShoeIndex = 0 | 1 | 2 | 3;

interface ThrashMachineHeadProps {
  index: ThrashMachineHeadIndex;
  colorIndex: number;
}

function ThrashMachineHead({ index, colorIndex }: ThrashMachineHeadProps) {
  const baseClasses = 'absolute z-30';
  const color = getThrashColor(colorIndex);
  return (
    <>
      {index === 0 && (
        <ThrashMachineHead0
          className={mergeClass(baseClasses, 'bottom-19 left-0 w-32')}
          color={color}
        />
      )}
      {index === 1 && (
        <ThrashMachineHead1
          className={mergeClass(baseClasses, 'bottom-19 left-0 w-32')}
          color={color}
        />
      )}
      {index === 2 && (
        <ThrashMachineHead2
          className={mergeClass(baseClasses, 'bottom-19 left-3 w-32')}
          color={color}
        />
      )}
      {index === 3 && (
        <ThrashMachineHead3
          className={mergeClass(baseClasses, 'bottom-18 left-5 w-29')}
          color={color}
        />
      )}
    </>
  );
}

interface ThrashMachineBodyProps {
  index: ThrashMachineBodyIndex;
  colorIndex: number;
}

function ThrashMachineBody({ index, colorIndex }: ThrashMachineBodyProps) {
  const baseClasses = 'absolute z-20 w-53';
  const color = getThrashColor(colorIndex);
  return (
    <>
      {index === 0 && (
        <ThrashMachineBody0
          className={mergeClass(baseClasses, 'bottom-5')}
          color={color}
        />
      )}
      {index === 1 && (
        <ThrashMachineBody1
          className={mergeClass(baseClasses, 'bottom-5')}
          color={color}
        />
      )}
      {index === 2 && (
        <ThrashMachineBody2
          className={mergeClass(baseClasses, 'bottom-5 ')}
          color={color}
        />
      )}
      {index === 3 && (
        <ThrashMachineBody3
          className={mergeClass(baseClasses, 'bottom-4 -left-1')}
          color={color}
        />
      )}
    </>
  );
}

interface ThrashMachineShoeProps {
  index: ThrashMachineShoeIndex;
  colorIndex: number;
}

function ThrashMachineShoe({ index, colorIndex }: ThrashMachineShoeProps) {
  const baseClasses = 'absolute w-43';
  const color = getThrashColor(colorIndex);
  return (
    <>
      {index === 0 && (
        <>
          <ThrashMachineShoe0
            className={mergeClass(baseClasses, 'z-30 -bottom-5 left-33')}
            color={color}
          />
          <ThrashMachineShoe0
            className={mergeClass(baseClasses, 'z-10 -bottom-5 left-19')}
            color={color}
          />
        </>
      )}
      {index === 1 && (
        <>
          <ThrashMachineShoe1
            className={mergeClass(baseClasses, 'z-30 -bottom-1 left-37')}
            color={color}
          />
          <ThrashMachineShoe1
            className={mergeClass(baseClasses, 'z-10 -bottom-1 left-23')}
            color={color}
          />
        </>
      )}
      {index === 2 && (
        <ThrashMachineShoe2
          className={mergeClass(baseClasses, 'z-30 bottom-0 left-15')}
          color={color}
        />
      )}
      {index === 3 && (
        <>
          <ThrashMachineShoe3
            className={mergeClass(baseClasses, 'z-30 -bottom-4 left-37')}
            color={color}
          />
          <ThrashMachineShoe4
            className={mergeClass(baseClasses, 'z-10 -bottom-4 left-23')}
            color={color}
          />
        </>
      )}
    </>
  );
}

interface ThrashMachineProps {
  id?: string;
  className?: string;
  head: ThrashMachineHeadIndex;
  body: ThrashMachineBodyIndex;
  shoe: ThrashMachineShoeIndex;
  headColor: number;
  bodyColor: number;
  shoeColor: number;
}

export function ThrashMachine({
  id,
  className,
  head,
  body,
  shoe,
  headColor,
  bodyColor,
  shoeColor,
}: ThrashMachineProps) {
  return (
    <Section id={id} className={mergeClass('relative h-45 w-60', className)}>
      <ThrashMachineHead index={head} colorIndex={headColor} />
      <ThrashMachineBody index={body} colorIndex={bodyColor} />
      <ThrashMachineShoe index={shoe} colorIndex={shoeColor} />
    </Section>
  );
}

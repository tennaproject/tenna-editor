import ThrashFitHair0 from '@assets/deltarune/thrash-fit/thrash-fit-hair-0.png';
import ThrashFitHair1 from '@assets/deltarune/thrash-fit/thrash-fit-hair-1.png';
import ThrashFitHair2 from '@assets/deltarune/thrash-fit/thrash-fit-hair-2.png';
import ThrashFitHair3 from '@assets/deltarune/thrash-fit/thrash-fit-hair-3.png';
import ThrashFitHair4 from '@assets/deltarune/thrash-fit/thrash-fit-hair-4.png';
import ThrashFitHair5 from '@assets/deltarune/thrash-fit/thrash-fit-hair-5.png';
import ThrashFitShirt0 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-0.png';
import ThrashFitShirt1 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-1.png';
import ThrashFitShirt2 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-2.png';
import ThrashFitShirt3 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-3.png';
import ThrashFitShirt4 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-4.png';
import ThrashFitShirt5 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-5.png';
import ThrashFitShirt6 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-6.png';
import ThrashFitShirt7 from '@assets/deltarune/thrash-fit/thrash-fit-shirt-7.png';
import ThrashFitPants0 from '@assets/deltarune/thrash-fit/thrash-fit-pants-0.png';
import ThrashFitPants1 from '@assets/deltarune/thrash-fit/thrash-fit-pants-1.png';
import ThrashFitPants2 from '@assets/deltarune/thrash-fit/thrash-fit-pants-2.png';
import ThrashFitPants3 from '@assets/deltarune/thrash-fit/thrash-fit-pants-3.png';
import ThrashFitPants4 from '@assets/deltarune/thrash-fit/thrash-fit-pants-4.png';
import ThrashFitPants5 from '@assets/deltarune/thrash-fit/thrash-fit-pants-5.png';
import ThrashFitPants6 from '@assets/deltarune/thrash-fit/thrash-fit-pants-6.png';
import ThrashFitFeet0 from '@assets/deltarune/thrash-fit/thrash-fit-feet-0.png';
import ThrashFitFeet1 from '@assets/deltarune/thrash-fit/thrash-fit-feet-1.png';
import ThrashFitFeet2 from '@assets/deltarune/thrash-fit/thrash-fit-feet-2.png';
import ThrashFitFeet3 from '@assets/deltarune/thrash-fit/thrash-fit-feet-3.png';
import ThrashFitFeet4 from '@assets/deltarune/thrash-fit/thrash-fit-feet-4.png';
import ThrashFitFeet5 from '@assets/deltarune/thrash-fit/thrash-fit-feet-5.png';
import ThrashFitFeet6 from '@assets/deltarune/thrash-fit/thrash-fit-feet-6.png';
import ThrashFitAccessory0 from '@assets/deltarune/thrash-fit/thrash-fit-accessory-0.png';
import ThrashFitAccessory1 from '@assets/deltarune/thrash-fit/thrash-fit-accessory-1.png';
import ThrashFitAccessory2 from '@assets/deltarune/thrash-fit/thrash-fit-accessory-2.png';
import ThrashFitAccessory3 from '@assets/deltarune/thrash-fit/thrash-fit-accessory-3.png';
import ThrashFitAccessory4 from '@assets/deltarune/thrash-fit/thrash-fit-accessory-4.png';

import { Section } from '@components';
import { mergeClass } from '@utils/merge-class';

const THRASH_FIT_SOURCES = {
  hair: [
    ThrashFitHair0,
    ThrashFitHair1,
    ThrashFitHair2,
    ThrashFitHair3,
    ThrashFitHair4,
    ThrashFitHair5,
  ],
  shirt: [
    ThrashFitShirt0,
    ThrashFitShirt1,
    ThrashFitShirt2,
    ThrashFitShirt3,
    ThrashFitShirt4,
    ThrashFitShirt5,
    ThrashFitShirt6,
    ThrashFitShirt7,
  ],
  pants: [
    ThrashFitPants0,
    ThrashFitPants1,
    ThrashFitPants2,
    ThrashFitPants3,
    ThrashFitPants4,
    ThrashFitPants5,
    ThrashFitPants6,
  ],
  shoes: [
    ThrashFitFeet0,
    ThrashFitFeet1,
    ThrashFitFeet2,
    ThrashFitFeet3,
    ThrashFitFeet4,
    ThrashFitFeet5,
    ThrashFitFeet6,
  ],
  hat: [
    ThrashFitAccessory0,
    ThrashFitAccessory1,
    ThrashFitAccessory2,
    ThrashFitAccessory3,
    ThrashFitAccessory4,
  ],
} as const;

export type ThrashFitHairIndex = 0 | 1 | 2 | 3 | 4 | 5;
export type ThrashFitShirtIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ThrashFitPantsIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type ThrashFitHatIndex = 0 | 1 | 2 | 3 | 4;
export type ThrashFitShoesIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const LAYER_CLASS =
  'absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none';

function clampIndex(value: number, max: number) {
  return Math.max(0, Math.min(value, max));
}

interface ThrashFitLayerProps {
  src: string;
  alt: string;
  className?: string;
}

function ThrashFitLayer({ src, alt, className }: ThrashFitLayerProps) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={mergeClass(LAYER_CLASS, className)}
    />
  );
}

interface ThrashFitHairProps {
  index: ThrashFitHairIndex;
}

function ThrashFitHair({ index }: ThrashFitHairProps) {
  return (
    <ThrashFitLayer
      src={THRASH_FIT_SOURCES.hair[index]}
      alt="Thrash Fit hair"
      className="z-4"
    />
  );
}

interface ThrashFitHatProps {
  index: ThrashFitHatIndex;
}

function ThrashFitHat({ index }: ThrashFitHatProps) {
  if (index === 0) return null;

  return (
    <img
      src={THRASH_FIT_SOURCES.hat[index]}
      alt="Thrash Fit hat"
      draggable={false}
      className="absolute bottom-0 left-0 z-5 w-full pointer-events-none"
      style={{ height: 'calc(100% * 560 / 510)' }}
    />
  );
}

interface ThrashFitProps {
  id?: string;
  className?: string;
  hair: ThrashFitHairIndex;
  shirt: ThrashFitShirtIndex;
  pants: ThrashFitPantsIndex;
  hat: ThrashFitHatIndex;
  shoes: ThrashFitShoesIndex;
}

export function ThrashFit({
  id,
  className,
  hair,
  shirt,
  pants,
  hat,
  shoes,
}: ThrashFitProps) {
  const hairIndex = clampIndex(hair, THRASH_FIT_SOURCES.hair.length - 1);
  const shirtIndex = clampIndex(shirt, THRASH_FIT_SOURCES.shirt.length - 1);
  const pantsIndex = clampIndex(pants, THRASH_FIT_SOURCES.pants.length - 1);
  const hatIndex = clampIndex(hat, THRASH_FIT_SOURCES.hat.length - 1);
  const shoesIndex = clampIndex(shoes, THRASH_FIT_SOURCES.shoes.length - 1);

  return (
    <Section
      id={id}
      className={mergeClass('relative h-[210px] w-[136px]', className)}
    >
      <ThrashFitLayer
        src={THRASH_FIT_SOURCES.shirt[shirtIndex]}
        alt="Thrash Fit shirt"
        className="z-1"
      />
      <ThrashFitLayer
        src={THRASH_FIT_SOURCES.shoes[shoesIndex]}
        alt="Thrash Fit shoes"
        className="z-2"
      />
      <ThrashFitLayer
        src={THRASH_FIT_SOURCES.pants[pantsIndex]}
        alt="Thrash Fit pants"
        className="z-3"
      />
      <ThrashFitHair index={hairIndex as ThrashFitHairIndex} />
      <ThrashFitHat index={hatIndex as ThrashFitHatIndex} />
    </Section>
  );
}

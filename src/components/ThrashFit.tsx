import { Section } from '@components';
import { mergeClass } from '@utils/merge-class';
import { THRASH_FIT_SOURCES } from '@utils/thrash-fit-sprites';

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

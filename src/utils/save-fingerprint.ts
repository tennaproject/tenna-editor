import type { ChapterIndex } from '../data/chapters';
import type { Save } from '../types';
import { serializeSave } from './save-serializer';
import { seededRandom } from './random';

export const FINGERPRINT_PALETTE = [
  'blue',
  'pink',
  'green',
  'yellow',
  'red',
] as const;

export type FingerprintColor = (typeof FINGERPRINT_PALETTE)[number];

export const FINGERPRINT_WIDTH = 64;
export const FINGERPRINT_HEIGHT = 128;
export const FINGERPRINT_ASPECT = 'aspect-[1/2]';

const COMPLETION_FILL: FingerprintColor = 'yellow';
const CENTER_X = FINGERPRINT_WIDTH / 2;
const CENTER_Y = FINGERPRINT_HEIGHT / 2;

type Range = [base: number, spread: number];

export const SETTINGS = {
  ridge: {
    spacing: [4.2, 0.7] as Range,
    chapterTightening: 0.2,
    spacingByCoreCount: { 1: 0.55, 2: 1, 3: 1.45 },
    thickness: [0.4, 0.1] as Range,
  },
  cores: {
    single: 0.22,
    triple: 0.86,
    stretch: [0.8, 0.45] as Range,
    tilt: 0.9,
    x: [0.3, 0.6] as Range,
    yJitter: [0.12, 0.76] as Range,
    weight: [0.7, 0.6] as Range,
  },
  waves: {
    count: [4, 2] as Range,
    frequency: [0.1, 0.22] as Range,
    amplitude: [0.7, 0.7] as Range,
  },
  swirl: { amount: 0.1, bias: 0.35 },
  color: {
    hues: [4, 2] as Range,
    zone: [4, 3] as Range,
    goldEvery: [6, 4] as Range,
  },
  fieldFloor: 28,
};

export interface FingerprintInput {
  seed: string;
  chapter: ChapterIndex;
  isCompletion: boolean;
}

export interface FingerprintLayer {
  ink: number;
  fill: FingerprintColor;
  path: string;
}

export interface FingerprintGraphic {
  width: number;
  height: number;
  pixels: Int8Array;
  fills: FingerprintColor[];
  layers: FingerprintLayer[];
}

const EMPTY_INPUT: FingerprintInput = {
  seed: '',
  chapter: 1,
  isCompletion: false,
};

export function getFingerprintInput(save: Save): FingerprintInput {
  return {
    seed: serializeSave(save),
    chapter: save.meta.chapter,
    isCompletion: save.meta.isCompletionSave,
  };
}

export function generateFingerprint(
  input: FingerprintInput = EMPTY_INPUT,
): FingerprintGraphic {
  const rng = seededRandom(input.seed);
  const hues = pickHues(input.seed);
  const spec = sampleSpec(input.chapter, rng);

  const pixels = rasterize(spec, {
    hueCount: hues.length,
    goldInk: input.isCompletion ? hues.length + 1 : 0,
    zone: sampleInt(rng, SETTINGS.color.zone),
    goldEvery: sampleInt(rng, SETTINGS.color.goldEvery),
  });

  const fills = [...hues, COMPLETION_FILL];
  return {
    width: FINGERPRINT_WIDTH,
    height: FINGERPRINT_HEIGHT,
    pixels,
    fills,
    layers: traceLayers(pixels, fills),
  };
}

function pickHues(seed: string): FingerprintColor[] {
  const pool: FingerprintColor[] = [...FINGERPRINT_PALETTE];
  const rng = seededRandom(`${seed}\u0000hues`);

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(
    0,
    Math.min(pool.length, sampleInt(rng, SETTINGS.color.hues)),
  );
}

interface Point {
  x: number;
  y: number;
}

interface Core {
  x: number;
  y: number;
  weight: number;
  stretchX: number;
  stretchY: number;
  cos: number;
  sin: number;
}

interface Wave {
  frequencyX: number;
  frequencyY: number;
  phase: number;
  amplitude: number;
}

interface FingerprintSpec {
  cores: Core[];
  waves: Wave[];
  swirl: number;
  spacing: number;
  thickness: number;
}

function sampleSpec(chapter: ChapterIndex, rng: () => number): FingerprintSpec {
  const count = sampleCoreCount(rng);
  return {
    cores: placeCores(rng, count),
    waves: placeWaves(rng),
    swirl: (rng() - SETTINGS.swirl.bias) * SETTINGS.swirl.amount,
    spacing:
      (sample(rng, SETTINGS.ridge.spacing) -
        chapter * SETTINGS.ridge.chapterTightening) *
      SETTINGS.ridge.spacingByCoreCount[count],
    thickness: sample(rng, SETTINGS.ridge.thickness),
  };
}

function sampleCoreCount(rng: () => number): 1 | 2 | 3 {
  const roll = rng();
  if (roll < SETTINGS.cores.single) return 1;
  if (roll > SETTINGS.cores.triple) return 3;
  return 2;
}

function placeCores(rng: () => number, count: number): Core[] {
  const cores: Core[] = [];

  for (let i = 0; i < count; i += 1) {
    const stretch = sample(rng, SETTINGS.cores.stretch);
    const angle = rng() * Math.PI * SETTINGS.cores.tilt;
    cores.push({
      x: FINGERPRINT_WIDTH * sample(rng, SETTINGS.cores.x),
      y:
        FINGERPRINT_HEIGHT *
        ((i + sample(rng, SETTINGS.cores.yJitter)) / count),
      weight: sample(rng, SETTINGS.cores.weight),
      stretchX: stretch,
      stretchY: 1 / stretch,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
    });
  }

  return cores;
}

function placeWaves(rng: () => number): Wave[] {
  const count = sampleInt(rng, SETTINGS.waves.count);
  const waves: Wave[] = [];

  for (let i = 0; i < count; i += 1) {
    waves.push({
      frequencyX: sample(rng, SETTINGS.waves.frequency),
      frequencyY: sample(rng, SETTINGS.waves.frequency),
      phase: rng() * Math.PI * 2,
      amplitude: sample(rng, SETTINGS.waves.amplitude),
    });
  }

  return waves;
}

function fieldAt(x: number, y: number, spec: FingerprintSpec): number {
  const point = swirlPoint(x, y, spec.swirl);
  let field = SETTINGS.fieldFloor;
  for (const core of spec.cores) field += coreDistance(point, core);
  return field + waveOffset(point, spec.waves);
}

function swirlPoint(x: number, y: number, amount: number): Point {
  const dx = x - CENTER_X;
  const dy = y - CENTER_Y;
  const angle = amount * Math.hypot(dx, dy);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: CENTER_X + dx * cos - dy * sin,
    y: CENTER_Y + dx * sin + dy * cos,
  };
}

function coreDistance(point: Point, core: Core) {
  const dx = point.x - core.x;
  const dy = point.y - core.y;
  const along = dx * core.cos + dy * core.sin;
  const across = dy * core.cos - dx * core.sin;
  return (
    Math.hypot(along * core.stretchX, across * core.stretchY) * core.weight
  );
}

function waveOffset(point: Point, waves: Wave[]) {
  let total = 0;
  for (const wave of waves) {
    total +=
      wave.amplitude *
      Math.sin(
        point.x * wave.frequencyX + point.y * wave.frequencyY + wave.phase,
      );
  }
  return total;
}

function rasterize(
  spec: FingerprintSpec,
  color: { hueCount: number; goldInk: number; zone: number; goldEvery: number },
): Int8Array {
  const pixels = new Int8Array(FINGERPRINT_WIDTH * FINGERPRINT_HEIGHT);

  for (let y = 0; y < FINGERPRINT_HEIGHT; y += 1) {
    for (let x = 0; x < FINGERPRINT_WIDTH; x += 1) {
      const along = fieldAt(x, y, spec) / spec.spacing;
      const ridge = Math.floor(along);
      if (along - ridge > spec.thickness) continue;

      const ink =
        color.goldInk && ridge % color.goldEvery === 0
          ? color.goldInk
          : (Math.floor(ridge / color.zone) % color.hueCount) + 1;

      pixels[y * FINGERPRINT_WIDTH + x] = ink;
    }
  }

  return pixels;
}

function traceLayers(
  pixels: Int8Array,
  fills: FingerprintColor[],
): FingerprintLayer[] {
  const pathByInk = new Map<number, string>();

  for (let y = 0; y < FINGERPRINT_HEIGHT; y += 1) {
    const row = y * FINGERPRINT_WIDTH;
    let x = 0;

    while (x < FINGERPRINT_WIDTH) {
      const ink = pixels[row + x];
      if (!ink) {
        x += 1;
        continue;
      }

      let run = 1;
      while (x + run < FINGERPRINT_WIDTH && pixels[row + x + run] === ink) {
        run += 1;
      }

      pathByInk.set(
        ink,
        `${pathByInk.get(ink) ?? ''}M${x} ${y}h${run}v1h${-run}z`,
      );
      x += run;
    }
  }

  const layers: FingerprintLayer[] = [];
  for (const [ink, path] of pathByInk) {
    const fill = fills[ink - 1];
    if (fill) layers.push({ ink, fill, path });
  }
  return layers;
}

function sample(rng: () => number, [base, spread]: Range) {
  return base + rng() * spread;
}

function sampleInt(rng: () => number, [base, spread]: Range) {
  return base + Math.floor(rng() * spread);
}

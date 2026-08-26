import { joaat } from './joaat';

// https://stackoverflow.com/a/47593316
// sfc32
export function seededRandom(seed: string) {
  let a = joaat(seed);
  let b = joaat(`${seed}\u0001`);
  let c = joaat(`${seed}\u0002`);
  let d = joaat(`${seed}\u0003`);

  const next = () => {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;

    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;

    return (t >>> 0) / 4294967296;
  };

  for (let step = 0; step < 12; step += 1) next();

  return next;
}

export function randomInt(maxInclusive: number): number {
  return Math.floor(Math.random() * (maxInclusive + 1));
}

export type IntegerValue = number | string;

export const MAX_GAME_INTEGER = (1n << 64n) - 1n;

export function toBigInt(value: unknown): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number' && Number.isFinite(value)) {
    return BigInt(Math.trunc(value));
  }
  if (typeof value === 'string' && /^-?\d+$/.test(value.trim())) {
    return BigInt(value.trim());
  }
  return 0n;
}

export function compactBigInt(value: bigint): IntegerValue {
  if (
    value >= BigInt(Number.MIN_SAFE_INTEGER) &&
    value <= BigInt(Number.MAX_SAFE_INTEGER)
  ) {
    return Number(value);
  }
  return value.toString();
}

export function parseInteger(value: string): IntegerValue | null {
  const trimmed = value.trim();
  if (!/^-?\d+$/.test(trimmed)) return null;
  return compactBigInt(BigInt(trimmed));
}

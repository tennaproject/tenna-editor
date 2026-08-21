// https://en.wikipedia.org/wiki/Jenkins_hash_function
export function joaat(value: string): number {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash + value.charCodeAt(i)) >>> 0;
    hash = (hash + (hash << 10)) >>> 0;
    hash ^= hash >>> 6;
  }

  hash = (hash + (hash << 3)) >>> 0;
  hash ^= hash >>> 11;
  hash = (hash + (hash << 15)) >>> 0;

  return hash >>> 0;
}
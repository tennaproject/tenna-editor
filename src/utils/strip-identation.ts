export function stripIdentation(string: string): string {
  return string
    .split('\n')
    .map((line) => line.trim())
    .join('\n');
}

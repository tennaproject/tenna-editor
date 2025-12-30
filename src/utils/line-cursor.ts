export class LineCursor {
  private lines: string[];
  private position = 0;

  constructor(content: string) {
    this.lines = content.trim().split(/\r?\n/);
  }

  get totalLines(): number {
    return this.lines.length;
  }

  get currentPosition(): number {
    return this.position;
  }

  get isAtEnd(): boolean {
    return this.position >= this.lines.length;
  }

  skip(count: number): void {
    this.position = Math.min(this.position + count, this.lines.length);
  }

  reset(): void {
    this.position = 0;
  }

  nextString(): string {
    return this.nextLine();
  }

  nextNumber(): number {
    const line = this.nextLine();

    const trimmed = line.trim().toLowerCase();
    if (
      trimmed === '' ||
      trimmed === 'null' ||
      trimmed === 'undefined' ||
      trimmed === 'nan'
    ) {
      return 0;
    }

    const parsed = Number(line);
    if (isNaN(parsed)) {
      throw new Error(
        `Failed to parse number from line ${this.position}: "${line}"`,
      );
    }
    return parsed;
  }

  private nextLine(): string {
    if (this.isAtEnd) {
      throw new Error(`Unexpected end of file at line ${this.position + 1}`);
    }

    const line = this.lines[this.position];
    this.position += 1;
    return line;
  }
}

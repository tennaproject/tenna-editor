import { parseSave } from './save-parser';
import type { Save } from '@types';
import type { ChapterIndex } from '@data';
import { normalizeLegacyRoomId } from './room-id';

const FILECH_PATTERN = /^filech(\d+)_(\d+)(?:_b)?$/;
const DS_LIST_HEADER = '2F010000';
const DS_LIST_HEADERS = new Set(['2E010000', DS_LIST_HEADER]);

interface SwitchSaveLayout {
  chapter: number;
  characters: number;
  weaponStatFields: number;
  flagCount: number;
  inventoryMode: 1 | 2;
}

export interface SwitchSaveEntry {
  key: string;
  chapter: number;
  slot: number;
  isCompletionSave: boolean;
  lineCount: number;
}

export interface SwitchSaveContainer {
  entries: SwitchSaveEntry[];
  files: Record<string, string>;
}

class SwitchLineCursor {
  private position = 0;
  private readonly lines: string[];

  constructor(lines: string[]) {
    this.lines = lines;
  }

  take(): string {
    if (this.position >= this.lines.length) {
      throw new Error(
        `Unexpected end of switch save at line ${this.position + 1}`,
      );
    }
    const value = this.lines[this.position];
    this.position += 1;
    return value;
  }

  takeMany(count: number): string[] {
    return Array.from({ length: count }, () => this.take());
  }

  get remaining(): number {
    return this.lines.length - this.position;
  }
}

function normalizeContainerText(content: string): string {
  const trimmed = content.replace(/\0+$/g, '');
  const end = trimmed.lastIndexOf('}');
  if (end < 0) return trimmed;
  return trimmed.slice(0, end + 1);
}

function splitSaveLines(text: string): string[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  if (lines.at(-1) === '') lines.pop();
  return lines;
}

function splitPcSaveLinesForSwitch(text: string): string[] {
  return splitSaveLines(text).map((line, index) => {
    return index <= 6 ? line : line.trim();
  });
}

function joinPcLines(lines: string[]): string {
  return `${lines.join('\n')}\n`;
}

function joinSwitchLines(lines: string[]): string {
  return lines.join('\r\n');
}

function detectLayout(key: string): SwitchSaveLayout {
  const match = key.toLowerCase().match(FILECH_PATTERN);
  if (!match) {
    throw new Error(`Invalid switch save key: ${key}`);
  }

  const chapter = Number(match[1]);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > 5) {
    throw new Error(`Unsupported Switch save chapter: ${chapter}`);
  }
  if (chapter === 1) {
    return {
      chapter,
      characters: 4,
      weaponStatFields: 8,
      flagCount: 9999,
      inventoryMode: 1,
    };
  }

  return {
    chapter,
    characters: 5,
    weaponStatFields: 10,
    flagCount: 2500,
    inventoryMode: 2,
  };
}

function readUint32(bytes: Uint8Array, offset: number): number {
  return new DataView(
    bytes.buffer,
    bytes.byteOffset,
    bytes.byteLength,
  ).getUint32(offset, true);
}

function readFloat64(bytes: Uint8Array, offset: number): number {
  return new DataView(
    bytes.buffer,
    bytes.byteOffset,
    bytes.byteLength,
  ).getFloat64(offset, true);
}

function writeUint32(bytes: number[], value: number): void {
  const buffer = new ArrayBuffer(4);
  new DataView(buffer).setUint32(0, value, true);
  bytes.push(...new Uint8Array(buffer));
}

function writeFloat64(bytes: number[], value: number): void {
  const buffer = new ArrayBuffer(8);
  new DataView(buffer).setFloat64(0, value, true);
  bytes.push(...new Uint8Array(buffer));
}

function bytesToHex(bytes: number[]): string {
  return bytes
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

function hexToBytes(hex: string): Uint8Array {
  const cleaned = hex.trim();
  if (cleaned.length % 2 !== 0) throw new Error('Invalid DS-list hex length');
  if (!/^[0-9a-f]*$/i.test(cleaned)) {
    throw new Error('DS-list contains non-hexadecimal characters');
  }

  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleaned.slice(i, i + 2), 16);
  }
  return bytes;
}

function normalizeNumber(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return String(value);
}

function parseSaveNumber(value: string): number {
  const normalized = value.trim().toLowerCase();
  if (
    normalized === '' ||
    normalized === 'nan' ||
    normalized === 'null' ||
    normalized === 'undefined'
  ) {
    return 0;
  }
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) throw new Error(`Invalid number: ${value}`);
  return parsed;
}

function decodeDsList(hex: string): string[] {
  const bytes = hexToBytes(hex);
  const header = bytesToHex(Array.from(bytes.slice(0, 4)));
  if (!DS_LIST_HEADERS.has(header)) {
    throw new Error('Invalid DS-list header');
  }

  if (bytes.length < 8) throw new Error('Truncated DS-list header');

  let position = 4;
  const count = readUint32(bytes, position);
  position += 4;
  const values: string[] = [];
  const decoder = new TextDecoder();

  for (let i = 0; i < count; i += 1) {
    if (position + 4 > bytes.length) {
      throw new Error(`Truncated DS-list item ${i}`);
    }
    const tag = readUint32(bytes, position);
    position += 4;

    if (tag === 0 || tag === 10 || tag === 13) {
      if (position + 8 > bytes.length) {
        throw new Error(`Truncated DS-list real at item ${i}`);
      }
      values.push(normalizeNumber(readFloat64(bytes, position)));
      position += 8;
    } else if (tag === 1) {
      if (position + 4 > bytes.length) {
        throw new Error(`Truncated DS-list string length at item ${i}`);
      }
      const length = readUint32(bytes, position);
      position += 4;
      if (position + length > bytes.length) {
        throw new Error(`Truncated DS-list string at item ${i}`);
      }
      values.push(decoder.decode(bytes.slice(position, position + length)));
      position += length;
    } else {
      throw new Error(`Unsupported DS-list tag ${tag} at item ${i}`);
    }
  }

  if (position !== bytes.length) {
    throw new Error('DS-list has trailing bytes');
  }

  return values;
}

function encodeDsList(values: string[], forceStrings = false): string {
  const bytes = Array.from(hexToBytes(DS_LIST_HEADER));
  const encoder = new TextEncoder();
  writeUint32(bytes, values.length);

  for (const value of values) {
    let numericValue: number | null = null;
    if (!forceStrings) {
      try {
        numericValue = parseSaveNumber(value);
      } catch {
        numericValue = null;
      }
    }

    if (numericValue !== null) {
      writeUint32(bytes, 0);
      writeFloat64(bytes, numericValue);
    } else {
      const encoded = encoder.encode(value);
      writeUint32(bytes, 1);
      writeUint32(bytes, encoded.length);
      bytes.push(...encoded);
    }
  }

  return bytesToHex(bytes);
}

function valueAt(values: string[], index: number): string {
  return values[index] ?? '0';
}

export function parseSwitchSaveContainer(
  content: string,
): SwitchSaveContainer | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(normalizeContainerText(content));
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return null;
  }

  const files: Record<string, string> = {};
  const entries: SwitchSaveEntry[] = [];

  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value !== 'string') continue;
    files[key.toLowerCase()] = value;

    const match = key.toLowerCase().match(FILECH_PATTERN);
    if (!match) continue;

    const rawSlot = Number(match[2]);
    entries.push({
      key: key.toLowerCase(),
      chapter: Number(match[1]),
      slot: rawSlot >= 3 && rawSlot <= 5 ? rawSlot - 3 : rawSlot,
      isCompletionSave: rawSlot >= 3 && rawSlot <= 5,
      lineCount: splitSaveLines(value).length,
    });
  }

  if (entries.length === 0) return null;
  entries.sort((a, b) => a.key.localeCompare(b.key));
  return { files, entries };
}

export function switchEntryToPcSaveText(key: string, entry: string): string {
  const layout = detectLayout(key);
  const src = new SwitchLineCursor(splitSaveLines(entry));
  const out: string[] = [];

  out.push(src.take());
  out.push(...decodeDsList(src.take()));
  out.push(...src.takeMany(9));

  const statLists = Array.from({ length: 10 }, () => decodeDsList(src.take()));
  for (let i = 0; i < layout.characters; i += 1) {
    for (const values of statLists) out.push(valueAt(values, i));
    out.push(...src.takeMany(4 * layout.weaponStatFields));
    out.push(...src.takeMany(12));
  }

  out.push(...src.takeMany(3));

  if (layout.inventoryMode === 1) {
    const items = decodeDsList(src.take());
    const keyItems = decodeDsList(src.take());
    const weapons = decodeDsList(src.take());
    const armors = decodeDsList(src.take());
    for (let i = 0; i < 13; i += 1) {
      out.push(valueAt(items, i));
      out.push(valueAt(keyItems, i));
      out.push(valueAt(weapons, i));
      out.push(valueAt(armors, i));
    }
  } else {
    const items = decodeDsList(src.take());
    const keyItems = decodeDsList(src.take());
    const weapons = decodeDsList(src.take());
    const armors = decodeDsList(src.take());
    const storage = decodeDsList(src.take());
    for (let i = 0; i < 13; i += 1) {
      out.push(valueAt(items, i));
      out.push(valueAt(keyItems, i));
    }
    for (let i = 0; i < 48; i += 1) {
      out.push(valueAt(weapons, i));
      out.push(valueAt(armors, i));
    }
    for (let i = 0; i < 72; i += 1) out.push(valueAt(storage, i));
  }

  out.push(...src.takeMany(13));

  const lightItems = decodeDsList(src.take());
  const phones = decodeDsList(src.take());
  const flags = decodeDsList(src.take());
  for (let i = 0; i < 8; i += 1) {
    out.push(valueAt(lightItems, i));
    out.push(valueAt(phones, i));
  }
  for (let i = 0; i < layout.flagCount; i += 1) {
    out.push(valueAt(flags, i));
  }

  out.push(src.take());
  out.push(src.take());
  out.push(src.take());
  if (src.remaining > 0) {
    throw new Error(`Switch save had ${src.remaining} unread lines`);
  }

  return joinPcLines(out);
}

export function pcSaveTextToSwitchEntry(key: string, text: string): string {
  const layout = detectLayout(key);
  const src = new SwitchLineCursor(splitPcSaveLinesForSwitch(text));
  const out: string[] = [];

  out.push(src.take());
  out.push(encodeDsList(src.takeMany(6), true));
  out.push(...src.takeMany(9));

  const statLists = Array.from({ length: 10 }, () => [] as string[]);
  const characterTails: string[][] = [];
  for (let i = 0; i < layout.characters; i += 1) {
    for (const values of statLists) values.push(src.take());
    characterTails.push([
      ...src.takeMany(4 * layout.weaponStatFields),
      ...src.takeMany(12),
    ]);
  }

  for (let i = 0; i < statLists.length; i += 1) {
    out.push(encodeDsList(statLists[i], layout.chapter === 1 && i === 9));
  }
  for (const tail of characterTails) out.push(...tail);

  out.push(...src.takeMany(3));

  if (layout.inventoryMode === 1) {
    const items: string[] = [];
    const keyItems: string[] = [];
    const weapons: string[] = [];
    const armors: string[] = [];
    for (let i = 0; i < 13; i += 1) {
      items.push(src.take());
      keyItems.push(src.take());
      weapons.push(src.take());
      armors.push(src.take());
    }
    out.push(
      encodeDsList(items),
      encodeDsList(keyItems),
      encodeDsList(weapons),
      encodeDsList(armors),
    );
  } else {
    const items: string[] = [];
    const keyItems: string[] = [];
    for (let i = 0; i < 13; i += 1) {
      items.push(src.take());
      keyItems.push(src.take());
    }

    const weapons: string[] = [];
    const armors: string[] = [];
    for (let i = 0; i < 48; i += 1) {
      weapons.push(src.take());
      armors.push(src.take());
    }
    out.push(
      encodeDsList(items),
      encodeDsList(keyItems),
      encodeDsList(weapons),
      encodeDsList(armors),
      encodeDsList(src.takeMany(72)),
    );
  }

  out.push(...src.takeMany(13));

  const lightItems: string[] = [];
  const phones: string[] = [];
  for (let i = 0; i < 8; i += 1) {
    lightItems.push(src.take());
    phones.push(src.take());
  }
  out.push(
    encodeDsList(lightItems),
    encodeDsList(phones),
    encodeDsList(src.takeMany(layout.flagCount)),
  );

  out.push(...src.takeMany(3));
  if (src.remaining > 0) {
    throw new Error(`PC save had ${src.remaining} unread lines`);
  }

  return joinSwitchLines(out);
}

export function parseSwitchSaveEntry(
  container: SwitchSaveContainer,
  entryKey: string,
): Save {
  const entry = container.files[entryKey];
  if (typeof entry !== 'string') {
    throw new Error(`Switch container does not include ${entryKey}`);
  }
  const save = parseSave(switchEntryToPcSaveText(entryKey, entry));
  save.room = normalizeLegacyRoomId(
    save.room,
    detectLayout(entryKey).chapter as ChapterIndex,
    save.flags,
  );
  return save;
}

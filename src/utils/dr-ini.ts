import type { ChapterIndex } from '@data';
import type { Save } from '@types';
import {
  getIniSectionName,
  type RawSaveSlot,
  type SaveExportCell,
} from './save-export-targets';
import { isSideBActive } from './side-b';

const GAME_MAKER_DATE_UNIX_EPOCH = 25569;
const MS_PER_DAY = 86400000;

type IniValue = string | number;
type IniSection = Map<string, string>;

const SLOT_FIELDS = [
  'Name',
  'Level',
  'Love',
  'Time',
  'Date',
  'Room',
  'InitLang',
  'UraBoss',
  'Version',
  'SideB',
  'Ch4Boss',
  'Microphone',
  'right_click_mic',
  'Mic Sensitivity',
];

function getGameMakerDate(date = new Date()): number {
  return GAME_MAKER_DATE_UNIX_EPOCH + date.getTime() / MS_PER_DAY;
}

function formatReal(value: number): string {
  return `"${value.toFixed(6)}"`;
}

function formatString(value: string): string {
  return `"${value.replace(/\r?\n/g, ' ').replace(/"/g, '\\"')}"`;
}

function formatIniValue(value: IniValue): string {
  return typeof value === 'number' ? formatReal(value) : formatString(value);
}

function parseIniValue(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseIni(content: string): Map<string, IniSection> {
  const sections = new Map<string, IniSection>();
  let currentSection: IniSection | null = null;

  for (const rawLine of content.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      currentSection =
        sections.get(sectionMatch[1]) ?? new Map<string, string>();
      sections.set(sectionMatch[1], currentSection);
      continue;
    }

    if (!currentSection) continue;
    const separatorIndex = line.indexOf('=');
    if (separatorIndex < 0) continue;

    currentSection.set(
      line.slice(0, separatorIndex).trim(),
      line.slice(separatorIndex + 1).trim(),
    );
  }

  return sections;
}

function getSectionValue(
  sections: Map<string, IniSection>,
  sectionName: string,
  key: string,
): string | null {
  return parseIniValue(sections.get(sectionName)?.get(key));
}

function getInitLang(save: Save): number {
  return Number(save.flags[912]) || 0;
}

export function getUraBoss(
  save: Pick<Save, 'flags'>,
  chapter: ChapterIndex,
): number {
  if (chapter === 1) {
    const jevilFlag = Number(save.flags[241]) || 0;
    if (jevilFlag === 6) return 1;
    if (jevilFlag === 7) return 2;
    return 0;
  }

  if (chapter === 2) {
    const spamtonFlag = Number(save.flags[571]) || 0;
    if (spamtonFlag === 1) return 1;
    if (spamtonFlag === 2) return 2;
    return 0;
  }

  const secretBossFlags: Partial<Record<ChapterIndex, number>> = {
    3: 1047,
    4: 852,
    5: 1908,
  };
  return Number(save.flags[secretBossFlags[chapter] ?? 0]) || 0;
}

export function getImportedUraBoss(save: Save): number | undefined {
  if (save.meta.importedUraBoss !== undefined) return save.meta.importedUraBoss;
  if (save.meta.baseline?.source === 'upload') {
    return getUraBoss(save.meta.baseline.payload, save.meta.chapter);
  }
  const source = getOriginalSlot(save);
  if (!source) return undefined;
  const value = getSectionValue(
    parseIni(source.ini),
    getIniSectionName(source),
    'UraBoss',
  );
  return value !== null && [0, 1, 2, 3].includes(Number(value))
    ? Number(value)
    : undefined;
}

function wasUraBossEdited(save: Save, chapter: ChapterIndex): boolean {
  const original = getImportedUraBoss(save);
  return original !== undefined && original !== getUraBoss(save, chapter);
}

function sectionEntries(values: Record<string, IniValue>): IniSection {
  const section = new Map<string, string>();
  for (const [key, value] of Object.entries(values)) {
    section.set(key, formatIniValue(value));
  }
  return section;
}

function getExistingNumber(
  sections: Map<string, IniSection>,
  sectionName: string,
  key: string,
  fallback: number,
): number {
  const value = Number(getSectionValue(sections, sectionName, key));
  return Number.isFinite(value) ? value : fallback;
}

function getExistingVersion(
  sections: Map<string, IniSection>,
  sectionName: string,
): string {
  return getSectionValue(sections, sectionName, 'Version') ?? '0';
}

function buildSaveSection(
  cell: SaveExportCell,
  baseSections: Map<string, IniSection>,
  date: Date,
): IniSection {
  if (!cell.save) return buildEmptySection(cell.chapter);

  const sectionName = getIniSectionName(cell);
  const values: Record<string, IniValue> = {
    Name: cell.save.playerName,
    Level: cell.save.lv,
    Love: cell.save.lightWorld.level,
    Time: cell.save.time,
    Date: getGameMakerDate(date),
    Room: cell.save.room,
    InitLang: getInitLang(cell.save),
    UraBoss: getUraBoss(cell.save, cell.chapter),
    Version: getExistingVersion(baseSections, sectionName),
  };

  if (cell.rawSlot >= 3) {
    values.SideB = isSideBActive(cell.save) ? 1 : 0;
  } else if (baseSections.get(sectionName)?.has('SideB')) {
    values.SideB = getExistingNumber(baseSections, sectionName, 'SideB', 0);
  }

  if (cell.chapter === 4) {
    values.Ch4Boss = getExistingNumber(baseSections, sectionName, 'Ch4Boss', 0);
    values.Microphone = getExistingNumber(
      baseSections,
      sectionName,
      'Microphone',
      0,
    );
    values.right_click_mic = getExistingNumber(
      baseSections,
      sectionName,
      'right_click_mic',
      0,
    );
    values['Mic Sensitivity'] = getExistingNumber(
      baseSections,
      sectionName,
      'Mic Sensitivity',
      0.5,
    );
  }

  return sectionEntries(values);
}

function buildEmptySection(chapter: ChapterIndex): IniSection {
  const values: Record<string, IniValue> = {
    Name: '[EMPTY]',
    Level: 0,
    Love: 0,
    Time: 0,
    Room: 0,
    Date: 0,
    UraBoss: 0,
    Version: '0',
  };

  if (chapter >= 3) values.SideB = 0;
  if (chapter === 4) values.Ch4Boss = 0;

  return sectionEntries(values);
}

export function getExportUraHistory(
  cells: SaveExportCell[],
  baseIni = '',
): Record<string, number> {
  const baseSections = parseIni(baseIni);
  const ura = baseSections.get('URA');
  const results: Record<string, number> = {};
  const imported = new Set<string>();
  if (ura) {
    for (const [key, rawValue] of ura.entries()) {
      const parsed = parseIniValue(rawValue);
      const previous = parsed === null ? null : Number(parsed);
      if (previous !== null && [0, 1, 2, 3].includes(previous)) {
        results[key] = previous;
        imported.add(key);
      }
    }
  }
  for (const cell of cells) {
    if (!cell.save) continue;
    const key = `${cell.chapter}_${cell.rawSlot % 3}`;
    if (!imported.has(key)) {
      results[key] = (results[key] ?? 0) | getUraBoss(cell.save, cell.chapter);
    }
  }

  const sourceGroups = new Map<
    string,
    {
      source: NonNullable<ReturnType<typeof getOriginalSlot>>;
      entries: Array<{ rawSlot: RawSaveSlot; destination: string; save: Save }>;
    }
  >();
  for (const cell of cells) {
    if (!cell.save) continue;
    const source = getOriginalSlot(cell.save);
    if (!source || !source.ini || source.chapter !== cell.chapter) continue;
    const sourceKey = JSON.stringify([
      source.ini,
      source.chapter,
      source.rawSlot % 3,
    ]);
    const group = sourceGroups.get(sourceKey) ?? { source, entries: [] };
    group.entries.push({
      rawSlot: source.rawSlot,
      destination: `${cell.chapter}_${cell.rawSlot % 3}`,
      save: cell.save,
    });
    sourceGroups.set(sourceKey, group);
  }

  const contributions = new Map<string, number>();
  const movedSources = new Set<string>();
  for (const { source, entries } of sourceGroups.values()) {
    const sourceSections = parseIni(source.ini);
    const slot = (source.rawSlot % 3) as RawSaveSlot;
    const from = `${source.chapter}_${slot}`;
    const rawHistory = getSectionValue(sourceSections, 'URA', from);
    const history =
      rawHistory !== null && [0, 1, 2, 3].includes(Number(rawHistory))
        ? Number(rawHistory)
        : entries.reduce(
            (value, entry) => value | getUraBoss(entry.save, source.chapter),
            0,
          );
    const expectedSlots = ([slot, slot + 3] as RawSaveSlot[]).filter(
      (rawSlot) => {
        const name = getSectionValue(
          sourceSections,
          getIniSectionName({ chapter: source.chapter, rawSlot }),
          'Name',
        );
        return name !== null && name !== '[EMPTY]';
      },
    );
    const sourceSlots = entries.map((entry) => entry.rawSlot);
    const destinations = new Set(entries.map((entry) => entry.destination));
    const movesWholeSlot =
      destinations.size === 1 &&
      expectedSlots.length > 0 &&
      expectedSlots.length === sourceSlots.length &&
      expectedSlots.every(
        (rawSlot) =>
          sourceSlots.filter((sourceSlot) => sourceSlot === rawSlot).length ===
          1,
      );

    if (!movesWholeSlot) {
      contributions.set(from, (contributions.get(from) ?? 0) | history);
      continue;
    }

    const to = entries[0].destination;
    if (from !== to && source.ini === baseIni) {
      movedSources.add(from);
    }
    contributions.set(to, (contributions.get(to) ?? 0) | history);
  }

  for (const from of movedSources) results[from] = 0;
  for (const [destination, value] of contributions)
    results[destination] = value;

  const editedDestinations = new Set(
    cells
      .filter(
        (cell): cell is SaveExportCell & { save: Save } =>
          cell.save !== null && wasUraBossEdited(cell.save, cell.chapter),
      )
      .map((cell) => `${cell.chapter}_${cell.rawSlot % 3}`),
  );
  for (const destination of editedDestinations) results[destination] = 0;
  for (const cell of cells) {
    if (!cell.save) continue;
    const destination = `${cell.chapter}_${cell.rawSlot % 3}`;
    if (editedDestinations.has(destination)) {
      results[destination] |= getUraBoss(cell.save, cell.chapter);
    }
  }
  return results;
}

function getOriginalSlot(save: Save) {
  const source = save.meta.source;
  const fileName =
    source?.platform === 'switch' ? source.key : source?.fileName;
  const match = fileName?.match(/(?:^|[/\\])filech([1-5])_([0-5])(?:_b)?$/i);
  if (!match) return null;
  const content =
    source?.platform === 'switch'
      ? Object.entries(source.container).find(
          ([key]) => key.toLowerCase() === 'dr.ini',
        )?.[1]
      : source?.drIni?.content;
  return {
    chapter: Number(match[1]) as ChapterIndex,
    rawSlot: Number(match[2]) as RawSaveSlot,
    ini: content ?? '',
  };
}

function serializeIni(sections: Map<string, IniSection>): string {
  const output: string[] = [];
  for (const [sectionName, values] of sections.entries()) {
    output.push(`[${sectionName}]`);
    for (const [key, value] of values.entries()) {
      output.push(`${key}=${value}`);
    }
  }

  return `${output.join('\n')}\n`;
}

export function generateDrIni(
  cells: SaveExportCell[],
  baseIni = '',
  date = new Date(),
  history?: Record<string, number>,
): string {
  const sections = parseIni(baseIni);

  for (const cell of cells) {
    const sectionName = getIniSectionName(cell);
    const existingSection = sections.get(sectionName);
    const nextSection = buildSaveSection(cell, sections, date);

    // Don't create new empty sections for unused slots
    if (!cell.save && !existingSection) continue;

    if (existingSection) {
      for (const key of SLOT_FIELDS) existingSection.delete(key);
      for (const [key, value] of nextSection.entries()) {
        existingSection.set(key, value);
      }
    } else {
      sections.set(sectionName, nextSection);
    }
  }

  const ura = sections.get('URA') ?? new Map<string, string>();
  for (const [key, value] of Object.entries(
    history ?? getExportUraHistory(cells, baseIni),
  )) {
    ura.set(key, formatReal(value));
  }
  sections.set('URA', ura);
  return serializeIni(sections);
}

export function getAllDrIniCells(): SaveExportCell[] {
  const cells: SaveExportCell[] = [];
  for (let chapter = 1 as ChapterIndex; chapter <= 5; chapter += 1) {
    for (let rawSlot = 0 as RawSaveSlot; rawSlot <= 5; rawSlot += 1) {
      cells.push({ chapter, rawSlot, save: null });
    }
  }
  return cells;
}

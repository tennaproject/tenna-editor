import type { ChapterIndex } from '@data';
import type { PcDrIniSource, Save, SaveSlot } from '@types';
import { detectChapter } from './detection';
import { parseSave } from './save-parser';
import {
  parseSwitchSaveContainer,
  parseSwitchSaveEntry,
  type SwitchSaveContainer,
} from './switch-save-container';
import { strFromU8, unzip, type Unzipped } from 'fflate';

export const MAX_IMPORT_ENTRIES = 1_000;
export const MAX_IMPORT_EXPANDED_SIZE = 256 * 1024 * 1024;
export const MAX_ARCHIVE_ENTRIES = MAX_IMPORT_ENTRIES;
export const MAX_ARCHIVE_EXPANDED_SIZE = MAX_IMPORT_EXPANDED_SIZE;

const PC_SAVE_FILE_PATTERN = /^filech([1-5])_([0-5]|9)(?:_b)?$/i;
const ZIP_FILE_PATTERN = /\.zip$/i;

export interface CollectedUploadFile {
  file: File;
  relativePath: string;
  sourceLabel: string;
  sourceKind: 'file' | 'folder';
}

export interface SwitchImportSource {
  fileName: string;
  entryKey: string;
  container: SwitchSaveContainer;
}

export interface ImportCandidate {
  id: string;
  order: number;
  selected: boolean;
  sourceLabel: string;
  sourcePath: string;
  displayKey: string;
  defaultName: string;
  name: string;
  nameEdited: boolean;
  save: Save | null;
  error: string | null;
  chapter: ChapterIndex;
  slot: SaveSlot;
  isCompletionSave: boolean;
  isTemporarySource: boolean;
  platform: 'pc' | 'switch';
  pcDrIni?: PcDrIniSource;
  switchSource?: SwitchImportSource;
}

export interface ImportDiscoveryResult {
  candidates: ImportCandidate[];
  ignoredFiles: number;
  sawDrIni: boolean;
  sourceErrors: string[];
}

export function getTrimmedSwitchContainer(
  candidate: ImportCandidate,
): Record<string, string> {
  const source = candidate.switchSource;
  if (!source) return {};
  const files: Record<string, string> = {};
  const drIniKey = Object.keys(source.container.files).find(
    (key) => key.toLowerCase() === 'dr.ini',
  );
  const drIni = drIniKey ? source.container.files[drIniKey] : undefined;
  const entry = source.container.files[source.entryKey];
  if (typeof drIni === 'string') files['dr.ini'] = drIni;
  if (typeof entry === 'string') files[source.entryKey] = entry;
  return files;
}

interface VirtualUploadFile {
  content: Uint8Array;
  sourceLabel: string;
  sourcePath: string;
  displayKey: string;
  order: number;
  pcDrIni?: PcDrIniSource;
}

interface ExpandedArchive {
  files: VirtualUploadFile[];
  ignoredFiles: number;
  sawDrIni: boolean;
  sourceErrors: string[];
  entryCount: number;
  expandedSize: number;
}

interface ImportBudget {
  remainingEntries: number;
  remainingExpandedSize: number;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/').replace(/^\.\//, '');
}

function basename(path: string): string {
  return normalizePath(path).split('/').filter(Boolean).at(-1) ?? path;
}

function dirname(path: string): string {
  const normalized = normalizePath(path);
  const separator = normalized.lastIndexOf('/');
  return separator < 0 ? '' : normalized.slice(0, separator);
}

function findMatchingDrIni(
  sourcePath: string,
  drIniFiles: PcDrIniSource[],
): PcDrIniSource | undefined {
  const sourceDirectory = dirname(sourcePath);
  const nestedMatch = drIniFiles
    .filter((drIni) => {
      const drIniDirectory = dirname(drIni.fileName);
      return (
        sourceDirectory === drIniDirectory ||
        (drIniDirectory !== '' &&
          sourceDirectory.startsWith(`${drIniDirectory}/`))
      );
    })
    .sort(
      (left, right) =>
        dirname(right.fileName).length - dirname(left.fileName).length,
    )[0];

  return nestedMatch ?? (drIniFiles.length === 1 ? drIniFiles[0] : undefined);
}

function stripExtension(name: string): string {
  return name.replace(/\.[^.]+$/, '');
}

function isSafeRelativePath(path: string): boolean {
  const normalized = normalizePath(path);
  if (
    !normalized ||
    normalized.startsWith('/') ||
    /^[a-z]:\//i.test(normalized)
  ) {
    return false;
  }
  return normalized.split('/').every((part) => part !== '..');
}

function isSupportedDiscoveredFile(path: string): boolean {
  const name = basename(path);
  return (
    PC_SAVE_FILE_PATTERN.test(name) || name.toLowerCase() === 'deltarune.sav'
  );
}

function getSlotMetadata(key: string): {
  slot: SaveSlot;
  isCompletionSave: boolean;
  isTemporarySource: boolean;
} {
  const match = basename(key).match(PC_SAVE_FILE_PATTERN);
  if (!match) {
    return {
      slot: 0,
      isCompletionSave: false,
      isTemporarySource: false,
    };
  }
  const rawSlot = Number(match[2]);
  if (rawSlot === 9) {
    return { slot: 0, isCompletionSave: false, isTemporarySource: true };
  }
  return rawSlot >= 3
    ? {
        slot: (rawSlot - 3) as SaveSlot,
        isCompletionSave: true,
        isTemporarySource: false,
      }
    : {
        slot: rawSlot as SaveSlot,
        isCompletionSave: false,
        isTemporarySource: false,
      };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error';
}

function getGeneratedSaveName(
  chapter: ChapterIndex,
  slot: SaveSlot,
  isCompletionSave: boolean,
  isTemporarySource = false,
): string {
  if (isTemporarySource) return `CH${chapter} Temporary Save`;
  return `CH${chapter} Slot ${slot + 1}${isCompletionSave ? ' (Completion)' : ''}`;
}

function createCandidate(
  file: VirtualUploadFile,
  save: Save | null,
  error: string | null,
  options?: {
    displayKey?: string;
    switchSource?: SwitchImportSource;
  },
): ImportCandidate {
  const displayKey = options?.displayKey ?? file.displayKey;
  const slot = getSlotMetadata(displayKey);
  const detection = save ? detectChapter(save, displayKey) : null;
  const detectionError =
    save && detection && !detection.supported
      ? 'Unsupported chapter or save format detected.'
      : null;
  const finalError = error ?? detectionError;
  const chapter = detection?.chapter ?? save?.meta.chapter ?? 1;
  const defaultName = save
    ? getGeneratedSaveName(
        chapter,
        slot.slot,
        slot.isCompletionSave,
        slot.isTemporarySource,
      )
    : displayKey;

  return {
    id: `${file.order}:${file.sourcePath}:${displayKey}`,
    order: file.order,
    selected: finalError === null,
    sourceLabel: file.sourceLabel,
    sourcePath: file.sourcePath,
    displayKey,
    defaultName,
    name: defaultName,
    nameEdited: false,
    save,
    error: finalError,
    chapter,
    slot: slot.slot,
    isCompletionSave: slot.isCompletionSave,
    isTemporarySource: slot.isTemporarySource,
    platform: options?.switchSource ? 'switch' : 'pc',
    pcDrIni: options?.switchSource ? undefined : file.pcDrIni,
    switchSource: options?.switchSource,
  };
}

async function unzipArchive(
  input: CollectedUploadFile,
  order: number,
  budget: ImportBudget,
): Promise<ExpandedArchive> {
  const archiveName = stripExtension(input.file.name);
  if (input.file.size > MAX_IMPORT_EXPANDED_SIZE) {
    throw new Error('Archive exceeds the 256 MiB safety limit.');
  }
  if (budget.remainingEntries <= 0) {
    throw new Error('The import already reached the 1,000-entry safety limit.');
  }
  if (budget.remainingExpandedSize <= 0) {
    throw new Error('The import already reached the 256 MiB safety limit.');
  }
  const bytes = new Uint8Array(await input.file.arrayBuffer());
  let entryCount = 0;
  let expandedSize = 0;
  let limitError: string | null = null;
  let ignoredFiles = 0;
  let sawDrIni = false;
  const unsafePaths: string[] = [];

  const unzipped = await new Promise<Unzipped>((resolve, reject) => {
    unzip(
      bytes,
      {
        filter(file) {
          entryCount += 1;
          expandedSize += file.originalSize;
          if (entryCount > MAX_ARCHIVE_ENTRIES) {
            limitError = `Archive contains more than ${MAX_ARCHIVE_ENTRIES.toLocaleString()} entries.`;
            return false;
          }
          if (entryCount > budget.remainingEntries) {
            limitError = `Archive would exceed the ${MAX_IMPORT_ENTRIES.toLocaleString()}-entry import safety limit.`;
            return false;
          }
          if (expandedSize > MAX_ARCHIVE_EXPANDED_SIZE) {
            limitError = 'Archive expands beyond the 256 MiB safety limit.';
            return false;
          }
          if (expandedSize > budget.remainingExpandedSize) {
            limitError =
              'Archive would exceed the 256 MiB expanded import safety limit.';
            return false;
          }

          const path = normalizePath(file.name);
          if (!isSafeRelativePath(path)) {
            unsafePaths.push(file.name);
            return false;
          }
          if (path.endsWith('/')) return false;
          const name = basename(path).toLowerCase();
          if (name === 'dr.ini') {
            sawDrIni = true;
            return true;
          }
          if (!isSupportedDiscoveredFile(path)) {
            ignoredFiles += 1;
            return false;
          }
          return true;
        },
      },
      (error, data) => {
        if (error) reject(error);
        else resolve(data);
      },
    );
  });

  if (limitError) throw new Error(limitError);

  const sourceErrors = unsafePaths.map(
    (path) => `${input.file.name}: ignored unsafe archive path “${path}”.`,
  );
  const drIniFiles = Object.entries(unzipped)
    .filter(([path]) => basename(path).toLowerCase() === 'dr.ini')
    .map<PcDrIniSource>(([path, content]) => ({
      fileName: `${input.relativePath}/${normalizePath(path)}`,
      content: strFromU8(content),
    }));
  const files = Object.entries(unzipped)
    .filter(([path]) => basename(path).toLowerCase() !== 'dr.ini')
    .sort(([left], [right]) => left.localeCompare(right))
    .map<VirtualUploadFile>(([path, content], index) => {
      const sourcePath = `${input.relativePath}/${normalizePath(path)}`;
      return {
        content,
        sourceLabel: archiveName,
        sourcePath,
        displayKey: basename(path),
        order: order + index / 10_000,
        pcDrIni: findMatchingDrIni(sourcePath, drIniFiles),
      };
    });

  return {
    files,
    ignoredFiles,
    sawDrIni,
    sourceErrors,
    entryCount,
    expandedSize,
  };
}

function ensureUniqueNames(
  candidates: ImportCandidate[],
  reservedNames: Iterable<string> = [],
): void {
  const usedNames = new Set(
    Array.from(reservedNames, (name) => name.trim().toLocaleLowerCase()).filter(
      Boolean,
    ),
  );
  const groups = new Map<string, ImportCandidate[]>();
  for (const candidate of candidates) {
    const groupKey = candidate.defaultName.toLocaleLowerCase();
    const group = groups.get(groupKey) ?? [];
    group.push(candidate);
    groups.set(groupKey, group);
  }

  for (const group of groups.values()) {
    const baseName = group[0].defaultName;
    const hasConflict =
      group.length > 1 || usedNames.has(baseName.toLocaleLowerCase());

    if (!hasConflict) {
      usedNames.add(baseName.toLocaleLowerCase());
      continue;
    }

    for (const [index, candidate] of group.entries()) {
      const qualifierBase =
        candidate.save?.playerName.trim() || `Save ${index + 1}`;
      let qualifier = qualifierBase;
      let suffix = 2;
      let name = `${baseName} (${qualifier})`;
      while (usedNames.has(name.toLocaleLowerCase())) {
        qualifier = `${qualifierBase} ${suffix}`;
        name = `${baseName} (${qualifier})`;
        suffix += 1;
      }
      usedNames.add(name.toLocaleLowerCase());
      candidate.defaultName = name;
      if (!candidate.nameEdited) candidate.name = name;
    }
  }
}

export function refreshImportCandidateNames(
  candidates: ImportCandidate[],
  reservedNames: Iterable<string> = [],
): ImportCandidate[] {
  const refreshed = candidates.map((candidate) => {
    const defaultName = candidate.save
      ? getGeneratedSaveName(
          candidate.chapter,
          candidate.slot,
          candidate.isCompletionSave,
          candidate.isTemporarySource,
        )
      : candidate.displayKey;
    return {
      ...candidate,
      defaultName,
      name: candidate.nameEdited ? candidate.name : defaultName,
    };
  });
  const manuallyAssignedNames = refreshed
    .filter((candidate) => candidate.nameEdited && candidate.name.trim())
    .map((candidate) => candidate.name);
  const candidatesUsingDefaults = refreshed.filter(
    (candidate) =>
      candidate.save && (!candidate.nameEdited || !candidate.name.trim()),
  );

  ensureUniqueNames(candidatesUsingDefaults, [
    ...reservedNames,
    ...manuallyAssignedNames,
  ]);
  return refreshed;
}

function parseVirtualFile(file: VirtualUploadFile): ImportCandidate[] {
  const text = strFromU8(file.content);
  const container = parseSwitchSaveContainer(text);
  if (container) {
    return container.entries.map((entry, index) => {
      const switchSource: SwitchImportSource = {
        fileName: file.sourcePath,
        entryKey: entry.key,
        container,
      };
      if (!PC_SAVE_FILE_PATTERN.test(entry.key)) {
        return createCandidate(
          { ...file, order: file.order + index / 100_000 },
          null,
          `Unsupported Switch save entry name: ${entry.key}`,
          { displayKey: entry.key, switchSource },
        );
      }
      try {
        return createCandidate(
          { ...file, order: file.order + index / 100_000 },
          parseSwitchSaveEntry(container, entry.key),
          null,
          { displayKey: entry.key, switchSource },
        );
      } catch (error) {
        return createCandidate(
          { ...file, order: file.order + index / 100_000 },
          null,
          errorMessage(error),
          { displayKey: entry.key, switchSource },
        );
      }
    });
  }

  try {
    return [createCandidate(file, parseSave(text), null)];
  } catch (error) {
    return [createCandidate(file, null, errorMessage(error))];
  }
}

export async function discoverImportCandidates(
  inputs: CollectedUploadFile[],
  reservedNames: Iterable<string> = [],
): Promise<ImportDiscoveryResult> {
  const virtualFiles: VirtualUploadFile[] = [];
  const sourceErrors: string[] = [];
  let ignoredFiles = 0;
  let sawDrIni = false;
  let importedEntryCount = 0;
  let importedExpandedSize = 0;
  const limitedInputs = inputs.slice(0, MAX_IMPORT_ENTRIES);
  if (inputs.length > MAX_IMPORT_ENTRIES) {
    sourceErrors.push(
      `Only the first ${MAX_IMPORT_ENTRIES.toLocaleString()} selected files were inspected.`,
    );
  }

  const safeInputs = limitedInputs.flatMap((input, index) => {
    if (isSafeRelativePath(input.relativePath)) return [{ input, index }];
    sourceErrors.push(
      `${input.relativePath || input.file.name}: ignored unsafe input path.`,
    );
    return [];
  });
  const acceptedDrIniInputs = new Set<CollectedUploadFile>();
  const looseDrIniFiles: Array<{
    sourceKind: CollectedUploadFile['sourceKind'];
    sourceLabel: string;
    drIni: PcDrIniSource;
  }> = [];
  for (const { input } of safeInputs) {
    if (
      !ZIP_FILE_PATTERN.test(input.file.name) &&
      basename(input.relativePath).toLowerCase() === 'dr.ini'
    ) {
      if (importedEntryCount >= MAX_IMPORT_ENTRIES) {
        sourceErrors.push(
          `${input.relativePath}: skipped because the import reached the ${MAX_IMPORT_ENTRIES.toLocaleString()}-entry safety limit.`,
        );
        continue;
      }
      if (importedExpandedSize + input.file.size > MAX_IMPORT_EXPANDED_SIZE) {
        sourceErrors.push(
          `${input.relativePath}: skipped because selected data exceeds the 256 MiB safety limit.`,
        );
        continue;
      }
      looseDrIniFiles.push({
        sourceKind: input.sourceKind,
        sourceLabel: input.sourceLabel,
        drIni: {
          fileName: normalizePath(input.relativePath),
          content: await input.file.text(),
        },
      });
      acceptedDrIniInputs.add(input);
      importedEntryCount += 1;
      importedExpandedSize += input.file.size;
    }
  }

  for (const { input, index: inputIndex } of safeInputs) {
    const order = inputIndex * 10_000;
    if (ZIP_FILE_PATTERN.test(input.file.name)) {
      try {
        const expanded = await unzipArchive(input, order, {
          remainingEntries: MAX_IMPORT_ENTRIES - importedEntryCount,
          remainingExpandedSize:
            MAX_IMPORT_EXPANDED_SIZE - importedExpandedSize,
        });
        virtualFiles.push(...expanded.files);
        ignoredFiles += expanded.ignoredFiles;
        sawDrIni ||= expanded.sawDrIni;
        sourceErrors.push(...expanded.sourceErrors);
        importedEntryCount += expanded.entryCount;
        importedExpandedSize += expanded.expandedSize;
      } catch (error) {
        sourceErrors.push(`${input.file.name}: ${errorMessage(error)}`);
      }
      continue;
    }

    const normalizedPath = normalizePath(input.relativePath);
    const name = basename(normalizedPath).toLowerCase();
    if (name === 'dr.ini') {
      sawDrIni ||= acceptedDrIniInputs.has(input);
      continue;
    }
    if (input.sourceKind === 'folder' && !isSupportedDiscoveredFile(name)) {
      ignoredFiles += 1;
      continue;
    }
    if (importedEntryCount >= MAX_IMPORT_ENTRIES) {
      sourceErrors.push(
        `${input.relativePath}: skipped because the import reached the ${MAX_IMPORT_ENTRIES.toLocaleString()}-entry safety limit.`,
      );
      continue;
    }
    if (importedExpandedSize + input.file.size > MAX_IMPORT_EXPANDED_SIZE) {
      sourceErrors.push(
        `${input.relativePath}: skipped because selected data exceeds the 256 MiB safety limit.`,
      );
      continue;
    }
    importedEntryCount += 1;
    importedExpandedSize += input.file.size;

    virtualFiles.push({
      content: new Uint8Array(await input.file.arrayBuffer()),
      sourceLabel: input.sourceLabel,
      sourcePath: normalizedPath,
      displayKey: basename(normalizedPath),
      order,
      pcDrIni: findMatchingDrIni(
        normalizedPath,
        looseDrIniFiles
          .filter(
            (entry) =>
              entry.sourceKind === input.sourceKind &&
              (input.sourceKind === 'file' ||
                entry.sourceLabel === input.sourceLabel),
          )
          .map((entry) => entry.drIni),
      ),
    });
  }

  const parsedCandidates = virtualFiles
    .sort(
      (left, right) =>
        left.order - right.order ||
        left.sourcePath.localeCompare(right.sourcePath),
    )
    .flatMap(parseVirtualFile)
    .sort(
      (left, right) =>
        left.order - right.order ||
        left.sourcePath.localeCompare(right.sourcePath),
    );
  const candidates = refreshImportCandidateNames(
    parsedCandidates,
    reservedNames,
  );

  sawDrIni ||= candidates.some((candidate) =>
    Object.keys(candidate.switchSource?.container.files ?? {}).some(
      (key) => key.toLowerCase() === 'dr.ini',
    ),
  );

  return { candidates, ignoredFiles, sawDrIni, sourceErrors };
}

import { Button } from './Button';
import { mergeClass } from '@utils/merge-class';
import {
  MAX_IMPORT_ENTRIES,
  type CollectedUploadFile,
} from '@utils/save-import';
import { useTranslation } from '../i18n';
import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';

interface FileInputProps {
  onFilesSelect?: (files: CollectedUploadFile[]) => void;
  onInputError?: (message: string) => void;
  className?: string;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/').replace(/^\/+/, '');
}

function getSourceLabel(path: string, fallback: string): string {
  return normalizePath(path).split('/').filter(Boolean)[0] ?? fallback;
}

class FileCollectionLimitError extends Error {}

interface FileCollectionState {
  entryCount: number;
}

function readFileEntry(entry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => entry.file(resolve, reject));
}

async function readDirectoryEntries(
  entry: FileSystemDirectoryEntry,
  state: FileCollectionState,
): Promise<FileSystemEntry[]> {
  const reader = entry.createReader();
  const entries: FileSystemEntry[] = [];

  while (true) {
    const batch = await new Promise<FileSystemEntry[]>((resolve, reject) =>
      reader.readEntries(resolve, reject),
    );
    if (batch.length === 0) return entries;
    state.entryCount += batch.length;
    if (state.entryCount > MAX_IMPORT_ENTRIES) {
      throw new FileCollectionLimitError();
    }
    entries.push(...batch);
  }
}

async function collectEntryFiles(
  entry: FileSystemEntry,
  rootLabel: string,
  state: FileCollectionState,
  parentPath = '',
): Promise<CollectedUploadFile[]> {
  const relativePath = normalizePath(
    parentPath ? `${parentPath}/${entry.name}` : entry.name,
  );

  if (entry.isFile) {
    const file = await readFileEntry(entry as FileSystemFileEntry);
    return [
      {
        file,
        relativePath,
        sourceLabel: rootLabel,
        sourceKind: parentPath ? 'folder' : 'file',
      },
    ];
  }

  if (!entry.isDirectory) return [];
  const children = await readDirectoryEntries(
    entry as FileSystemDirectoryEntry,
    state,
  );
  const nested: CollectedUploadFile[] = [];
  for (const child of children) {
    nested.push(
      ...(await collectEntryFiles(child, rootLabel, state, relativePath)),
    );
  }
  return nested.sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath),
  );
}

function fromInputFiles(files: FileList, isFolder: boolean) {
  if (files.length > MAX_IMPORT_ENTRIES) {
    throw new FileCollectionLimitError();
  }
  const collected = Array.from(files).map<CollectedUploadFile>((file) => {
    const relativePath = normalizePath(
      isFolder && file.webkitRelativePath ? file.webkitRelativePath : file.name,
    );
    return {
      file,
      relativePath,
      sourceLabel: isFolder
        ? getSourceLabel(relativePath, file.name)
        : file.name,
      sourceKind: isFolder ? 'folder' : 'file',
    };
  });
  return isFolder
    ? collected.sort((left, right) =>
        left.relativePath.localeCompare(right.relativePath),
      )
    : collected;
}

export function FileInput({
  onFilesSelect,
  onInputError,
  className,
}: FileInputProps) {
  const { t } = useTranslation();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const reportFileLimit = () => {
    onInputError?.(
      t(
        'ui.upload.tooManyFolderFiles',
        'The selected folder contains more than {count} files or folders. Choose a smaller folder or ZIP only the saves you want to import.',
      ).replace('{count}', MAX_IMPORT_ENTRIES.toLocaleString()),
    );
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);

    try {
      const items = Array.from(event.dataTransfer.items);
      const entries = items
        .map((item) =>
          typeof item.webkitGetAsEntry === 'function'
            ? item.webkitGetAsEntry()
            : null,
        )
        .filter((entry): entry is FileSystemEntry => entry !== null);

      if (entries.length > 0) {
        if (entries.length > MAX_IMPORT_ENTRIES) {
          throw new FileCollectionLimitError();
        }
        const state: FileCollectionState = { entryCount: entries.length };
        const files: CollectedUploadFile[] = [];
        for (const entry of entries) {
          files.push(...(await collectEntryFiles(entry, entry.name, state)));
        }
        onFilesSelect?.(files);
        return;
      }

      const files = fromInputFiles(event.dataTransfer.files, false);
      if (files.length > 0) {
        onFilesSelect?.(files);
      } else {
        onInputError?.(
          t(
            'ui.upload.folderDropUnsupported',
            'This browser could not read the dropped folder. Use Choose folder or upload a ZIP archive instead.',
          ),
        );
      }
    } catch (error) {
      if (error instanceof FileCollectionLimitError) {
        reportFileLimit();
        return;
      }
      onInputError?.(
        error instanceof Error
          ? error.message
          : t(
              'ui.upload.readInputFailed',
              'Could not read the selected files.',
            ),
      );
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    isFolder: boolean,
  ) => {
    try {
      if (event.target.files?.length) {
        onFilesSelect?.(fromInputFiles(event.target.files, isFolder));
      }
    } catch (error) {
      if (error instanceof FileCollectionLimitError) reportFileLimit();
      else {
        onInputError?.(
          error instanceof Error
            ? error.message
            : t(
                'ui.upload.readInputFailed',
                'Could not read the selected files.',
              ),
        );
      }
    }
    event.target.value = '';
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(event) => void handleDrop(event)}
      role="group"
      aria-label={t('ui.common.uploadFile', 'Upload file')}
      className={mergeClass(
        'w-full mx-auto min-h-0 h-full flex flex-col items-center justify-center gap-4 border-2 motion-reduce:transition-none transition-all duration-200 select-none text-text-1 px-6 py-8 sm:px-10',
        isDragActive
          ? 'border-border bg-surface-3'
          : 'border-dashed border-border bg-surface-3 hover:bg-surface-3-hover',
        className,
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(event) => handleInputChange(event, false)}
        tabIndex={-1}
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(event) => handleInputChange(event, true)}
        tabIndex={-1}
        {...{ webkitdirectory: '' }}
      />
      <div className="font-bold text-text-1 text-2xl sm:text-3xl text-center">
        {isDragActive
          ? t('ui.common.dropFileHere', 'Drop your files here!')
          : t(
              'ui.upload.dragDropFilesFolders',
              'Drag & drop saves, folders, or ZIP archives here',
            )}
      </div>
      <div className="text-lg sm:text-xl text-text-2 text-center">
        {t('ui.upload.chooseInputInstead', 'or choose what to import')}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => fileInputRef.current?.click()}
        >
          {t('ui.upload.chooseFilesArchives', 'Choose files or archives')}
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => folderInputRef.current?.click()}
        >
          {t('ui.upload.chooseFolder', 'Choose folder')}
        </Button>
      </div>
    </div>
  );
}

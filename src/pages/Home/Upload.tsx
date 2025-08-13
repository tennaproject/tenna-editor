import { FileInput } from '@components';
import { detectChapter, parseSaveFile } from '@utils';
import type { ChapterIndex } from '@/data';
import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';

export const Upload = () => {
  const { setSaveFile } = useApp();
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (!content) {
        return;
      }

      const save = parseSaveFile(content);

      if (save) {
        const detection = detectChapter(save);
        if (!detection.supported) {
          console.error('Unsupported chapter detected');
          setUploadError(
            `Unsupported chapter. Please upload a save file from Chapter 1-4.`,
          );
          setUploadStatus('error');
          return;
        }

        save.chapter = detection.chapter as ChapterIndex;
        setUploadStatus('success');
        setSaveFile(save);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col mx-auto max-w-5xl py-8 px-8 w-full flex-none min-w-0 gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-3">Welcome</h2>
        <p>Tenna Editor is a powerful tool for editing DELTARUNE save files.</p>
        <p>
          To get started, simply drag and drop your save file into the area
          below or click to select a file from your device.
        </p>
      </div>

      <div>
        <FileInput onFileSelect={handleFileSelect} />
        {uploadStatus === 'success' && (
          <p className="text-sm text-green">Upload successful!</p>
        )}
        {uploadStatus === 'error' && uploadError && (
          <p className="text-sm text-red">{uploadError}</p>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-3">Where to find saves?</h2>
        <p>
          Your DELTARUNE save files are typically located in the following
          directories:
        </p>
        <ul className="list-disc pl-5">
          <li>
            Windows:{' '}
            <span className="font-mono">
              C:\Users\your-user-name\AppData\Local\DELTARUNE
            </span>
          </li>
          <li>
            Mac:{' '}
            <span className="font-mono">
              ~/Library/Application Support/com.tobyfox.deltarune/
            </span>
          </li>
          <li>
            Linux:{' '}
            <span className="font-mono">
              ~/.steam/steam/steamapps/compatdata/1690940/pfx/drive_c/users/steamuser/Local
              Settings/Application Data/DELTARUNE/
            </span>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-3">Compatibility</h2>
        <p>
          Tenna Editor is compatible with DELTARUNE Chapter 1-4 save files from
          the following platforms:
        </p>
        <ul className="list-disc pl-5">
          <li>PC (Windows)</li>
          <li>Mac</li>
          <li>Linux (through Steam Proton)</li>
        </ul>
        <p>
          Console and demo versions <strong>are not supported</strong> at the
          moment.
        </p>
      </div>
    </div>
  );
};

import { Upload } from '@components';
import { useState } from 'react';

export function HomeWelcome() {
  const [isUploadOpen, setUploadOpen] = useState(false);

  return (
    <div className="page max-w-7xl">
      <div>
        <h2 className="text-2xl font-bold mb-3">Welcome</h2>
        <p>Tenna Editor is a powerful tool for editing DELTARUNE save files.</p>
        <p>
          To get started, click the area below or click the upload button in far
          right corner.
        </p>
      </div>

      <div>
        <button
          className="h-45 w-full border-border bg-surface-3 hover:bg-surface-3-hover transition-colors duration-200"
          onClick={() => setUploadOpen(true)}
        >
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-lg md:text-xl">
              Click here to upload save
            </h1>
            <p className="text-text-2">
              or click upload button in right corner
            </p>
          </div>
        </button>
        <Upload isOpen={isUploadOpen} setOpen={setUploadOpen} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-3">Where to find saves?</h2>
        <p>
          Your DELTARUNE save files are typically located in the following
          directories:
        </p>
        <ul className="list-disc pl-5 break-words">
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
}

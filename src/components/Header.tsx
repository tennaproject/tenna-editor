import { useSave, useUi } from '@store';
import SidebarVisibilityIcon from '@assets/icons/menu.svg';
import SidebarRetractionIcon from '@assets/icons/layout-sidebar-left.svg';
import DownloadIcon from '@assets/icons/download.svg';
import UploadIcon from '@assets/icons/upload.svg';
import { serializeSaveFile } from '@utils';
import { useState } from 'react';
import { Upload } from './Upload';

export function Header() {
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isDownloadOpen, setDownloadOpen] = useState(false);

  return (
    <header className="w-full h-14 flex-shrink-0 bg-surface-1 relative select-none">
      <div className="flex items-center justify-between h-full px-2">
        <div className="flex items-center gap-4">
          {/* sidebar visibility button */}
          <button
            onClick={() => {
              const { isSidebarOpen, setSidebarOpen } = useUi.getState();
              setSidebarOpen(!isSidebarOpen);
            }}
            className="p-1.5 lg:hidden transition-colors hover:bg-surface-1-hover"
            aria-label="Toggle sidebar"
          >
            <div className="h-9 w-9 flex leading-none justify-center items-center">
              <div className="w-6 h-6 text-text-2">
                <SidebarVisibilityIcon />
              </div>
            </div>
          </button>

          {/* sidebar retraction button */}
          <button
            onClick={() => {
              const { isSidebarRetracted, setSidebarRetraction } =
                useUi.getState();
              setSidebarRetraction(!isSidebarRetracted);
            }}
            className="p-1.5 hidden lg:inline transition-colors hover:bg-surface-1-hover"
            aria-label="Toggle sidebar retraction"
          >
            <div className="h-9 w-9 flex leading-none justify-center items-center">
              <div className="w-6 h-6 text-text-2">
                <SidebarRetractionIcon />
              </div>
            </div>
          </button>

          <div className="w-8 h-8 bg-red flex-shrink-0" />
          <div className="flex flex-col">
            <h1 className="text-text-1 text-2xl font-bold leading-none">
              TENNA EDITOR
            </h1>
            <p className="text-text-2 font-bold leading-none hidden xl:block">
              AN UNOFFICIAL DELTARUNE SAVE EDITOR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="text-green bg-surface-3 hover:bg-surface-3-hover transition-colors p-2 cursor-pointer"
            onClick={() => {
              const save = useSave.getState().saveFile;
              if (!save) {
                console.warn('No save file to download');
                return;
              }

              const serializedSaveFile = serializeSaveFile(save);
              const blob = new Blob([serializedSaveFile], {
                type: 'application/octet-stream',
              });

              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `filech3_4`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <div className="w-6 h-6">
              <DownloadIcon />
            </div>
          </button>
          <button
            className="text-blue bg-surface-3 hover:bg-surface-3-hover transition-colors p-2 cursor-pointer"
            onClick={() => setUploadOpen(true)}
          >
            <div className="w-6 h-6">
              <UploadIcon />
            </div>
          </button>
            <Upload isOpen={isUploadOpen} setOpen={setUploadOpen} />
        </div>
      </div>
    </header>
  );
}

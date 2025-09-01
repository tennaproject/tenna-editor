import { useUi } from '@store';
import SidebarVisibilityIcon from '@assets/icons/menu.svg';
import SidebarRetractionIcon from '@assets/icons/layout-sidebar-left.svg';
import DownloadIcon from '@assets/icons/download.svg';
import UploadIcon from '@assets/icons/upload.svg';
import { useState } from 'react';
import { Upload } from './Upload';
import { Download } from './Download';
import { InlineGroup } from './InlineGroup';
import { SaveSelector } from './SaveSelector';

export function Header() {
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isDownloadOpen, setDownloadOpen] = useState(false);

  return (
    <header className="w-full h-14 flex-shrink-0 bg-surface-1 relative select-none">
      <div className="flex items-center justify-between h-full px-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* sidebar visibility button */}
          <button
            onClick={() => {
              const { isSidebarOpen, setSidebarOpen } = useUi.getState();
              setSidebarOpen(!isSidebarOpen);
            }}
            className="p-1 sm:p-1.5 lg:hidden transition-colors hover:bg-surface-1-hover"
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
            <h1 className="text-text-1 text-2xl font-bold leading-none hidden sm:block text-nowrap">
              TENNA EDITOR
            </h1>
            <p className="text-text-2 font-bold leading-none hidden lg:block text-nowrap">
              AN UNOFFICIAL DELTARUNE SAVE EDITOR
            </p>
          </div>
        </div>

        <InlineGroup className="w-full flex justify-end">
          <SaveSelector />
          <button
            className="text-green bg-surface-3 hover:bg-surface-3-hover transition-colors p-2 cursor-pointer"
            onClick={() => {
              setDownloadOpen(true);
            }}
          >
            <div className="w-6 h-6">
              <DownloadIcon />
            </div>
          </button>
          <Download isOpen={isDownloadOpen} setOpen={setDownloadOpen} />
          <button
            className="text-blue bg-surface-3 hover:bg-surface-3-hover transition-colors p-2 cursor-pointer"
            onClick={() => setUploadOpen(true)}
          >
            <div className="w-6 h-6">
              <UploadIcon />
            </div>
          </button>
          <Upload isOpen={isUploadOpen} setOpen={setUploadOpen} />
        </InlineGroup>
      </div>
    </header>
  );
}

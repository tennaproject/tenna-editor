import { useUi, useSave } from '@contexts';
import SidebarVisibilityIcon from '@assets/icons/menu.svg';
import SidebarRetractionIcon from '@assets/icons/layout-sidebar-left.svg';
import DownloadIcon from '@assets/icons/download.svg';
import UploadIcon from '@assets/icons/upload.svg';
import { serializeSaveFile } from '@utils';

export function Header() {
  const {
    isSidebarOpen,
    setSidebarOpen,
    isSidebarRetracted,
    setSidebarRetraction,
  } = useUi();

  const { saveFile } = useSave();

  return (
    <header className="w-full h-14 flex-shrink-0 bg-surface-1 relative select-none">
      <div className="flex items-center justify-between h-full px-3">
        <div className="flex items-center gap-4">
          {/* sidebar visibility button */}
          <button
            onClick={() => {
              setSidebarOpen(!isSidebarOpen);
            }}
            className="p-1.5 lg:hidden transition-colors hover:bg-surface-1-hover"
            aria-label="Toggle sidebar"
          >
            <div className="w-6 h-6 text-text-2">
              <SidebarVisibilityIcon />
            </div>
          </button>

          {/* sidebar retraction button */}
          <button
            onClick={() => {
              setSidebarRetraction(!isSidebarRetracted);
            }}
            className="p-1.5 hidden lg:inline transition-colors hover:bg-surface-1-hover"
            aria-label="Toggle sidebar retraction"
          >
            <div className="w-6 h-6 text-text-2">
              <SidebarRetractionIcon />
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
              if (!saveFile) {
                console.warn('No save file to download');
                return;
              }

              const serializedSaveFile = serializeSaveFile(saveFile);
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
          <button className="text-blue bg-surface-3 hover:bg-surface-4-hover transition-colors p-2 cursor-pointer">
            <div className="w-6 h-6">
              <UploadIcon />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

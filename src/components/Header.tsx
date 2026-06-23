import { useUi, useSave, useHistory } from '@store';
import SidebarVisibilityIcon from '@assets/icons/menu.svg?react';
import SidebarRetractionIcon from '@assets/icons/layout-sidebar-left.svg?react';
import DownloadIcon from '@assets/icons/download.svg?react';
import UploadIcon from '@assets/icons/upload.svg?react';
import UndoIcon from '@assets/icons/undo.svg?react';
import RedoIcon from '@assets/icons/redo.svg?react';
import { lazy, Suspense, useMemo, useState } from 'react';
import { Chapter5Notice } from './Chapter5Notice';
import { IconButton } from './IconButton';
import { InlineGroup } from './InlineGroup';
import { SaveSelector } from './SaveSelector';
import Tenna from '@assets/tenna.svg?react';
import { useKeyboardShortcuts } from '@hooks';

const Upload = lazy(() =>
  import('./Upload').then((module) => ({ default: module.Upload })),
);
const Download = lazy(() =>
  import('./Download').then((module) => ({ default: module.Download })),
);

export function Header() {
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isDownloadOpen, setDownloadOpen] = useState(false);

  const isSidebarOpen = useUi((s) => s.ui.sidebar.open);
  const isSidebarRetracted = useUi((s) => s.ui.sidebar.retracted);
  const updateUi = useUi((s) => s.updateUi);

  const hasSave = useSave((s) => s.save !== null);
  const undo = useSave((s) => s.undo);
  const redo = useSave((s) => s.redo);
  const canUndo = useHistory((s) => s.canUndo);
  const canRedo = useHistory((s) => s.canRedo);

  const shortcutHandlers = useMemo(
    () => ({
      onUpload: () => setUploadOpen(true),
      onDownload: () => {
        if (useSave.getState().save !== null) setDownloadOpen(true);
      },
      onUndo: () => {
        if (useSave.getState().save !== null && useHistory.getState().canUndo) {
          useSave.getState().undo();
        }
      },
      onRedo: () => {
        if (useSave.getState().save !== null && useHistory.getState().canRedo) {
          useSave.getState().redo();
        }
      },
    }),
    [],
  );

  useKeyboardShortcuts(shortcutHandlers);

  return (
    <header className="w-full h-15 flex-shrink-0 bg-surface-1 relative select-none">
      <div className="flex items-center justify-between h-full px-2">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* sidebar visibility button */}
          <button
            onClick={() => {
              updateUi((ui) => (ui.sidebar.open = !isSidebarOpen));
            }}
            className="p-1 sm:p-1.5 lg:hidden motion-reduce:transition-none transition-colors hover:bg-surface-1-hover"
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
              updateUi((ui) => (ui.sidebar.retracted = !isSidebarRetracted));
            }}
            className="p-1.5 hidden lg:inline motion-reduce:transition-none transition-colors hover:bg-surface-1-hover"
            aria-label="Toggle sidebar retraction"
          >
            <div className="h-9 w-9 flex leading-none justify-center items-center">
              <div className="w-6 h-6 text-text-2">
                <SidebarRetractionIcon />
              </div>
            </div>
          </button>

          {/* <div className="w-8 h-8 bg-red flex-shrink-0" /> */}
          <InlineGroup className="hidden sm:flex">
            <div className="flex leading-none justify-center items-center">
              <div className="w-12 h-12 text-text-2">
                <Tenna />
              </div>
            </div>
            <div className="flex flex-col m-1">
              <h1 className="text-text-1 text-2xl font-bold leading-none hidden sm:block text-nowrap">
                TENNA EDITOR
              </h1>
              {/* <p className="text-text-2 font-bold leading-none hidden lg:block text-nowrap">
                AN UNOFFICIAL DELTARUNE SAVE EDITOR
              </p> */}
            </div>
          </InlineGroup>
        </div>

        <InlineGroup className="w-full flex justify-end min-w-0">
          <Chapter5Notice />
          <SaveSelector />
          {hasSave && (
            <>
              <IconButton
                accent="neutral"
                label="Undo"
                icon={<UndoIcon />}
                disabled={!canUndo}
                onClick={undo}
              />
              <IconButton
                accent="neutral"
                label="Redo"
                icon={<RedoIcon />}
                disabled={!canRedo}
                onClick={redo}
              />
            </>
          )}
          <IconButton
            accent="green"
            label="Download save"
            icon={<DownloadIcon />}
            onClick={() => setDownloadOpen(true)}
          />
          {isDownloadOpen && (
            <Suspense fallback={null}>
              <Download isOpen={isDownloadOpen} setOpen={setDownloadOpen} />
            </Suspense>
          )}
          <IconButton
            accent="blue"
            label="Upload save"
            icon={<UploadIcon />}
            onClick={() => setUploadOpen(true)}
          />
          {isUploadOpen && (
            <Suspense fallback={null}>
              <Upload isOpen={isUploadOpen} setOpen={setUploadOpen} />
            </Suspense>
          )}
        </InlineGroup>
      </div>
    </header>
  );
}

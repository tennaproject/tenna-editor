import { Button } from '@/components';
import { useEditor } from '../Editor';
import SidebarVisibilityIcon from '@assets/icons/menu.svg';
import SidebarRetractionIcon from '@assets/icons/layout-sidebar-left.svg';

export const Header = () => {
  const {
    isSidebarOpen,
    setSidebarOpen,
    isSidebarRetracted,
    setSidebarRetraction,
  } = useEditor();

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

        <div className="flex items-center gap-2"></div>
      </div>
    </header>
  );
};

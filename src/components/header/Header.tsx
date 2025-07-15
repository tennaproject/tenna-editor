import tenna3 from '../../assets/placeholders/tennahear.webp';
import { Button } from '../Button';

export interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex-shrink-0 select-none h-14">
      <div className="flex items-center justify-between h-full max-w-full mx-auto">
        <div className="flex items-center gap-3 h-full">
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="lg:hidden p-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <img src={tenna3} className="w-8 h-8" alt="logo" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white leading-tight">
              TENNA EDITOR
            </h1>
            <p className="text-xs text-gray-400 leading-tight">
              AN UNOFFICIAL DELTARUNE SAVE EDITOR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="sm">
            <a
              href="https://deltarune.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              BUY DELTARUNE
            </a>
          </Button>
          <Button variant="primary">LOAD ANOTHER SAVE</Button>
        </div>
      </div>
    </header>
  );
};

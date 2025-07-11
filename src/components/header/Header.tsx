import tenna3 from '../../assets/placeholders/tennahear.webp';
import { Button } from '../Button';

export interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 flex-shrink-0 select-none">
      <div className="flex items-center justify-between max-w-full mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
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

          <img src={tenna3} className="w-10 h-10 " alt="logo" />
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-white">TENNA EDITOR</h1>
            <p className="text-sm text-gray-400">
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
}

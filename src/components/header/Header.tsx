export interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="w-full h-14 flex-shrink-0 bg-base relative select-none">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary flex-shrink-0" />

          <div className="flex flex-col">
            <h1 className="text-main text-2xl font-bold leading-none">
              TENNA EDITOR
            </h1>
            <p className="text-subtle font-bold leading-none hidden xl:block">
              AN UNOFFICIAL DELTARUNE SAVE EDITOR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
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
        </div>
      </div>
    </header>
  );
};

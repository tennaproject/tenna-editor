interface SidebarItemProps {
  title: string;
  tabKey: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
  icon?: string; // Optional icon for top-level items
  isTopLevel?: boolean; // Whether this is a top-level navigation item
}

export const SidebarItem = ({
  title,
  tabKey,
  activeTab,
  setActiveTab,
  setSidebarOpen,
  icon,
  isTopLevel = false,
}: SidebarItemProps) => {
  const handleClick = () => {
    setActiveTab(tabKey);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors -sm ${
        isTopLevel ? '' : 'text-sm'
      } ${
        activeTab === tabKey
          ? isTopLevel
            ? 'bg-[#393552] text-main'
            : 'bg-cyan-600 text-main'
          : isTopLevel
            ? 'text-main hover:bg-[#393552]/50 hover:text-main'
            : 'text-main hover:bg-[#393552]/50 hover:text-main'
      }`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className={activeTab === tabKey ? 'font-bold' : 'font-normal'}>
        {title}
      </span>
    </button>
  );
};

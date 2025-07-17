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
      className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
        isTopLevel ? '' : 'text-sm'
      } ${
        activeTab === tabKey
          ? isTopLevel
            ? 'bg-blue-600 text-white'
            : 'bg-cyan-600 text-white'
          : isTopLevel
            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className={isTopLevel ? 'font-medium' : ''}>{title}</span>
    </button>
  );
};

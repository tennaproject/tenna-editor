interface SidebarItemProps {
  title: string;
  tabKey: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const SidebarItem = ({
  title,
  tabKey,
  activeTab,
  setActiveTab,
  setSidebarOpen,
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
      className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors text-sm ${
        activeTab === tabKey
          ? 'bg-cyan-600 text-white'
          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <span>{title}</span>
    </button>
  );
};

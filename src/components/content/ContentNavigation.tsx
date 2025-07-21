export interface Tab<T extends string = string> {
  id: T;
  label: string;
}

interface ContentNavigationProps<T extends string> {
  tabs: Array<Tab<T>>;
  activeTab: T;
  onTabChange: (tabId: T) => void;
}

export function ContentNavigation<T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: ContentNavigationProps<T>) {
  return (
    <nav className="flex gap-1 bg-base border border-surface p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            onTabChange(tab.id);
          }}
          className={`px-3 py-1 font-semibold transition-colors duration-200 ${
            activeTab === tab.id
              ? 'bg-surface text-main'
              : 'bg-transparent text-subtle hover:text-main hover:bg-surface/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

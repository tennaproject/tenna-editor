import type { ReactNode } from 'react';
import { ContentNavigation, type Tab } from './ContentNavigation';

interface ContentProps<T extends string> {
  title: string;
  tabs: Array<Tab<T>>;
  activeTab: T;
  onTabChange: (tabId: T) => void;
  children: ReactNode;
}

export function Content<T extends string>({
  title,
  tabs,
  activeTab,
  onTabChange,
  children,
}: ContentProps<T>) {
  return (
    <div className="bg-surface h-full flex flex-col">
      <div className="border-b border-base mb-4">
        <div className="flex items-center gap-3 py-2 px-4">
          <h2 className="text-main text-xl font-bold">{title}</h2>
          <ContentNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

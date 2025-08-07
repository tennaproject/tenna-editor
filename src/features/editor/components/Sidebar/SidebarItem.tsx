import { type ReactNode } from 'react';
import { useEditor } from '../../Editor';

export interface SidebarItemProps {
  id: string;
  title: string;
  icon?: ReactNode;
}

export const SidebarItem = ({ id, title, icon }: SidebarItemProps) => {
  const { activeTabId, setActiveTabId } = useEditor();
  const isActive = activeTabId === id;

  const baseClasses =
    'w-full flex items-center gap-3 px-3 py-2 text-left text-base transition-colors';
  const activeClasses = 'bg-main/8 text-main font-bold';
  const inactiveClasses = 'text-main hover:bg-main/5';

  return (
    <button
      onClick={() => setActiveTabId(id)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon && (
        <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      )}
      <span>{title}</span>
    </button>
  );
};

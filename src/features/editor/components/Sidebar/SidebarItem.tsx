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
    'w-full flex items-center text-sm gap-2 px-3 py-2 leading-none text-base transition-colors';
  const activeClasses = 'bg-surface-1-active text-text-1';
  const inactiveClasses = 'text-text-2 hover:bg-surface-1-hover';

  return (
    <button
      onClick={() => setActiveTabId(id)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon && <div className="w-5 h-5">{icon}</div>}
      <div>{title}</div>
    </button>
  );
};

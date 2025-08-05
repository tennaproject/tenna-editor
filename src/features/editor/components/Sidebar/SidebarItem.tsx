import { useContext, type ReactNode } from 'react';
import { SidebarContext } from './Sidebar';

// A custom hook to make using the context cleaner and safer
const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export interface SidebarItemProps {
  id: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const SidebarItem = ({ id, icon, children }: SidebarItemProps) => {
  const { activeItem, setActiveItem } = useSidebar();
  const isActive = activeItem === id;

  const handleClick = () => {
    setActiveItem(id);
  };

  const baseClasses =
    'w-full flex items-center gap-3 px-3 py-2 text-left text-base transition-colors';
  const activeClasses = 'bg-main/8 text-main font-bold';
  const inactiveClasses = 'text-main hover:bg-main/5';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon && (
        <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};

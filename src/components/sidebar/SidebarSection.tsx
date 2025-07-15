import type { ReactNode } from 'react';

export interface SidebarSectionProps {
  icon: string;
  title: string;
  children: ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const SidebarSection = ({
  icon,
  title,
  children,
  isExpanded = true,
  onToggle,
}: SidebarSectionProps) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white "
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <span className="font-medium">{title}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {isExpanded && <div className="ml-4 mt-1 space-y-1">{children}</div>}
    </div>
  );
};

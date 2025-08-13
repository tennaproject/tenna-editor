import { useApp } from '@/contexts/AppContext';
import type { FC } from 'react';

export const SidebarOverlay: FC = () => {
  const { isSidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 top-14 bg-overlay backdrop-blur-[1px] z-40"
        />
      )}
    </>
  );
};

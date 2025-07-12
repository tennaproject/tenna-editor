import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex min-h-0 relative">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab="none"
          setActiveTab={() => null}
        />
        <main className="flex-1 p-6 overflow-y-auto">main</main>
      </div>
    </div>
  );
};

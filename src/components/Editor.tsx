import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { PartyCharacters } from './PartyCharacters';

export const Editor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('none');

  const renderMainContent = () => {
    switch (activeTab) {
      case 'inventory':
        return (
          <div className="p-6 text-main rounded">
            <h1 className="text-2xl font-bold mb-4 rounded">Inventory</h1>
          </div>
        );
      case 'rooms':
        return (
          <div className="p-6 text-main rounded">
            <h1 className="text-2xl font-bold mb-4 rounded">Rooms</h1>
          </div>
        );
      case 'flags':
        return (
          <div className="p-6 text-main rounded">
            <h1 className="text-2xl font-bold mb-4 rounded">Flags</h1>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-white rounded">
            <h1 className="text-2xl font-bold mb-4 rounded">Settings</h1>
          </div>
        );
      case 'about':
        return (
          <div className="p-6 text-main rounded">
            <h1 className="text-2xl font-bold mb-4 rounded">About</h1>
          </div>
        );
    }
  };

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex min-h-0 relative rounded">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab !== 'none' ? (
          <div className="flex-1 overflow-y-auto bg-surface rounded">
            {renderMainContent()}
          </div>
        ) : (
          <main className="flex-1 overflow-y-auto bg-surface rounded mr-3 mb-3">
            placeholder
          </main>
        )}
      </div>
    </>
  );
};

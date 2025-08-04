import { useState } from 'react';
import { Header, Sidebar } from './components';
import { PartyCharacters } from './views';

export const Editor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('none');

  const renderMainContent = () => {
    switch (activeTab) {
      case 'inventory':
        return (
          <div className="p-6 text-main ">
            <h1 className="text-2xl font-bold mb-4 ">Inventory</h1>
          </div>
        );
      case 'rooms':
        return (
          <div className="p-6 text-main ">
            <h1 className="text-2xl font-bold mb-4 ">Rooms</h1>
          </div>
        );
      case 'flags':
        return (
          <div className="p-6 text-main ">
            <h1 className="text-2xl font-bold mb-4 ">Flags</h1>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 text-white ">
            <h1 className="text-2xl font-bold mb-4 ">Settings</h1>
          </div>
        );
      case 'about':
        return (
          <div className="p-6 text-main ">
            <h1 className="text-2xl font-bold mb-4">About</h1>
          </div>
        );
      case 'party':
        return <PartyCharacters />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-grow flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab !== 'none' ? (
          <div className="flex-1 overflow-y-auto bg-surface">
            {renderMainContent()}
          </div>
        ) : (
          <main className="flex-1 overflow-y-auto bg-surface ">
            placeholder
          </main>
        )}
      </div>
    </div>
  );
};

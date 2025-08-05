import { useState } from 'react';
import { Header, Sidebar } from './components';
import { PartyCharacters } from './views';

export const Editor = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('inventory');

  const renderMainContent = () => {
    switch (activeItem) {
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
      default:
        return (
          <main className="flex-1 overflow-y-auto bg-surface ">
            placeholder
          </main>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-grow flex">
        <Sidebar onActiveItemChange={setActiveItem}>
          <Sidebar.Header>Categories</Sidebar.Header>
          <Sidebar.Item id="inventory">Inventory</Sidebar.Item>
          <Sidebar.Item id="rooms">Rooms</Sidebar.Item>
          <Sidebar.Item id="flags">Flags</Sidebar.Item>
          <Sidebar.Item id="party">Party</Sidebar.Item>

          <Sidebar.Header>App</Sidebar.Header>
          <Sidebar.Item id="settings">Settings</Sidebar.Item>
          <Sidebar.Item id="about">About</Sidebar.Item>
        </Sidebar>

        <div className="flex-1 overflow-y-auto bg-surface">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

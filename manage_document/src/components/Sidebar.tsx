import React from 'react';

interface SidebarProps {
  active: 'document' | 'detail';
  onSelect: (page: 'document' | 'detail') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  return (
    <div className="h-screen w-60 bg-gray-800 text-white flex flex-col py-8 px-4">
      <div className="text-2xl font-bold mb-8 text-center">Menu</div>
      <nav className="flex flex-col gap-2">
        <button
          className={`rounded px-4 py-2 font-semibold text-left ${
            active === 'document'
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          onClick={() => onSelect('document')}
        >
          Manage Document
        </button>
        <button
          className={`rounded px-4 py-2 text-left ${
            active === 'detail'
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          onClick={() => onSelect('detail')}
        >
          Manage Document Detail
        </button>
      </nav>
    </div>
  );
};

export default Sidebar; 
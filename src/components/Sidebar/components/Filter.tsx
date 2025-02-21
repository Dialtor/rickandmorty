import React, { useState } from 'react';

interface FilterProps {
  onFilter: (filters: { character: string; species: string }) => void;
  setShowFilter: (show: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter, setShowFilter }) => {
  const [characterFilter, setCharacterFilter] = useState('All');
  const [speciesFilter, setSpeciesFilter] = useState('All');

  const handleFilterClick = () => {
    onFilter({ character: characterFilter, species: speciesFilter });
    setShowFilter(false)
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded ">
      <div className="mb-4">
        <h3 className="text-gray-700 font-bold mb-2">Character</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              characterFilter === 'All' ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setCharacterFilter('All')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              characterFilter === 'Starred' ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setCharacterFilter('Starred')}
          >
            Starred
          </button>
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              characterFilter === 'Others' ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setCharacterFilter('Others')}
          >
            Others
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-gray-700 font-bold mb-2">Species</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              speciesFilter === 'All' ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setSpeciesFilter('All')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              speciesFilter === 'Human' ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setSpeciesFilter('Human')}
          >
            Human
          </button>
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              speciesFilter === 'Alien' ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setSpeciesFilter('Alien')}
          >
            Alien
          </button>
        </div>
      </div>

      <button
        className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleFilterClick}
      >
        Filter
      </button>
    </div>
  );
};

export default Filter;
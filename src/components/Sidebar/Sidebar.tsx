import { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react";
import Filter from "./components/Filter";
import { FavoritesComponent } from "./components/FavoritesComponent";
import { CharacterComponent } from "./components/CharacterComponent";


export const Sidebar = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ character: 'All', species: 'All' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  }

  const handleFilter = useCallback((newFilters: { character: string; species: string }) => {
    setFilters(newFilters);
    setShowFilter(false);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      id="menu"
      className={`
          ${isMobile ? 'w-full' : 'min-w-fit'} 
          lg:w-[450px] 
          flex flex-col 
          h-screen 
        `}
    >
      <div className="h-[40%]">
        <div className="my-4 px-6">
          <h1 className="flex items-center text-lg text-[#1F2937] md:text-2xl mt-5">
            <span>Rick and Morty list</span>
          </h1>
        </div>

        <div className="px-2 py-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-200 block w-full pl-10 p-2.5 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white"
              style={{ color: '#4B5563' }}
              placeholder="Search or filter results"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              onClick={handleFilterClick}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-9 ml-1 rounded-lg cursor-pointer transition duration-200 hover:bg-[#eae2f8] hover:text-white dark:hover:text-white"
            >
              <Icon icon="lets-icons:filter" width="24" height="24" style={{ color: '8055C6', position: 'relative' }} />
            </button>
            {showFilter && (
              <div className="absolute w-full z-20 bg-white transition-opacity duration-300 ease-in-out">
                <Filter onFilter={handleFilter} setShowFilter={setShowFilter} />
              </div>
            )}
          </div>
        </div>

        <FavoritesComponent />
      </div>
      <div className="flex-grow overflow-auto h-[60%]">
        <CharacterComponent searchTerm={searchTerm} filters={filters} />
      </div>
    </div>
  )
}
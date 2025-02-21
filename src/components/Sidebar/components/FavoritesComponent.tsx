import { useFavoriteStore } from '../../../store/useFavoriteStore';
import { Character } from '.';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

export const FavoritesComponent = () => {

    const {favorites, deleteCharacter} = useFavoriteStore()
  
    const handleFavoriteClick = (character: Character) => {
      const isFavorite = favorites.some((fav) => fav.id === character.id);
      if (isFavorite) {
        deleteCharacter(character);
      }
    };


  return (
    <div className="ml-5 min-w-[371px]">
    <h1 className="flex items-center uppercase text-xs text-[#8F939F] font-bold mr-2 mb-2">
      <span>{`Starred Characters (${favorites.length}) `}</span>
    </h1>
    <div className="h-[180px] overflow-y-auto">
      <ul>
        {favorites.map((character) => {
          const isFavorite = favorites.some((fav) => fav.id === character.id);
          return (
            <li key={character.id}
              className="flex items-center py-2 px-3 cursor-pointer transition duration-200 hover:bg-[#EFE2FF]">
              <Link to={`/${character.id}?fav=${isFavorite}`} className="flex">
                <img
                  src={character.image}
                  className="rounded-full bg-gray-500 w-8 h-8 mr-3"
                  alt={character.name}
                />
                <div>
                  <h3 className="font-medium text-black">{character.name}</h3>
                  <p className="text-sm text-gray-600">{character.species}</p>
                </div>
              </Link>
              <button className="ml-auto bg-white rounded-2xl p-1" onClick={() => handleFavoriteClick(character)}>
                <Icon className="w-6 h-6 " icon="tdesign:heart-filled" style={{ color: '#65D839' }} />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
  )
}

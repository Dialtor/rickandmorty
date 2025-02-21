import { useQuery } from "@apollo/client";

import GET_CHARACTERS from "../../../api/GET_CHARACTERS";
import { useFavoriteStore } from "../../../store/useFavoriteStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { Character, CharactersData } from ".";
import { useCharacterFilter } from "../hook/useCharacterFilter";


interface CharacterComponentProps {
  searchTerm: string;
  filters: { character: string; species: string };
}



export const CharacterComponent = ({searchTerm, filters }: CharacterComponentProps) => {
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);
  const { favorites, addCharacter } = useFavoriteStore()

  const filteredData = useCharacterFilter(data, loading, error, {
    searchTerm,
    character: filters.character,
    species: filters.species,
    favorites,
  });




  const handleFavoriteClick = (character: Character) => {
    const isFavorite = favorites.find((fav) => fav.id === character.id);

    if (!isFavorite) {
      addCharacter(character);
    }
  };



  return (
    <div className="flex flex-col h-full ml-5">
      <h1 className="flex items-center text-xs text-[#8F939F] font-bold mr-2 mb-2">
        <span>{`CHARACTERS (${filteredData.length}) `}</span>
      </h1>
      <div className="flex-grow overflow-y-auto">
        <ul>
          {filteredData.map((character) => (
            <li key={character.id}
              className="flex items-center py-2 px-3 cursor-pointer transition duration-200 hover:bg-[#EFE2FF] border-t border-b border-[#c2c4c7c2]">
              <Link to={`/${character.id}`} className="flex">
                <img
                  src={character.image}
                  className="rounded-full bg-gray-500 w-8 h-8 mr-2"
                  alt={character.name}
                />
                <div>
                  <h3 className="font-medium text-black">{character.name}</h3>
                  <p className="text-sm text-gray-600">{character.species}</p>
                </div>
              </Link>
              <button className="ml-auto" onClick={() => handleFavoriteClick(character)}>
                {
                  favorites.find((fav) => fav.id === character.id)
                    ?
                    <Icon
                      className="w-6 h-6"
                      icon="tdesign:heart-filled"
                      style={{ color: '#65D839' }}
                    />
                    :
                    <Icon
                      className="w-6 h-6"
                      icon="tdesign:heart"
                      style={{ color: '#D1D5DB' }}
                    />

                }
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

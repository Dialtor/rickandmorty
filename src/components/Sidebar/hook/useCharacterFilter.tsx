import { useMemo } from "react";
import { Character, CharactersData } from "../components/index";

interface Filters {
  searchTerm: string;
  character: string;
  species: string;
  favorites: Character[];
}

export const useCharacterFilter = (
  data: CharactersData | undefined,
  loading: boolean,
  error: any,
  filters: Filters
) => {
  return useMemo(() => {
    if (loading || error || !data?.characters?.results) {
      return [];
    }

    let result = data.characters.results.filter(
      (character) => !filters.favorites.find((fav) => fav.id === character.id)
    );

    if (filters.character !== "All") {
      result = result.filter((character) => {
        if (filters.character === "Starred") return character.episode.length > 3;
        if (filters.character === "Others") return character.episode.length <= 3;
        return true;
      });
    }

    if (filters.species !== "All") {
      result = result.filter((character) => character.species === filters.species);
    }

    if (filters.searchTerm) {
      const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
      result = result.filter((character) => {
        const lowerCaseName = character.name.toLowerCase();
        const lowerCaseSpecies = character.species.toLowerCase();
        return (
          lowerCaseName.includes(lowerCaseSearchTerm) ||
          lowerCaseSpecies.includes(lowerCaseSearchTerm)
        );
      });
    }

    return result;
  }, [data, loading, error, filters]);
};
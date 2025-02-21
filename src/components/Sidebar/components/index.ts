interface Episode {
  id: string;
  name: string;
  episode: string;
}


export interface Character {
  id: string;
  name: string;
  species: string;
  status: string;
  image: string;
  episode: Episode[];
}

export interface CharactersData {
  characters: {
    results: Character[];
  };
}
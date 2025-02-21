import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        species
        status
        image
        episode {
          id
          name
          episode
        }
      }
    }
  }
`;

export default GET_CHARACTERS;
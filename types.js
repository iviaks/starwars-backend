import { gql } from 'apollo-server';

export const queryTypes = `

  type IMDBRating {
    Source: String
    Value: String
  }

  type IMDB {
    Title: String
    Year: String
    Rated: String
    Released: String
    Runtime: String
    Genre: String
    Director: String
    Writer: String
    Actors: String
    Plot: String
    Language: String
    Country: String
    Awards: String
    Poster: String
    Ratings: [IMDBRating]
    Metascore: String
    Imdbrating: String
    Imdbvotes: String
    Imdbid: String
    Type: String
    Dvd: String
    Boxoffice: String
    Production: String
    Website: String
  }

  type Movie {
    id: ID!
    name: String
    description: String
    image: String
    characters: [Character]
    imdb: IMDB
  }

  type Character {
    id: ID!
    name: String
    nickname: String
    image: String
    movies: [Movie]
  }
`;

export const inputTypes = `
  input MovieInput {
    name: String
    description: String
    image: String
  }

  input CharacterInput {
    name: String
    nickname: String
    image: String
  }
`;

export const mutationTypes = `
  type AssignMutationType {
    ok: Boolean!
    error: String
    movie: Movie
    character: Character
  }

  type CharacterMutationType {
    ok: Boolean!
    error: String
    character: Character
  }

  type MovieMutationType {
    ok: Boolean!
    error: String
    movie: Movie
  }
`;

export const query = `
  type Query {
    character (id: ID!): Character
    characters (first: Int, last: Int): [Character]

    movie (id: ID!): Movie
    movies (first: Int, last: Int): [Movie]
  }
`;

export const mutation = `
  type Mutation {
    assign (characterId: ID!, movieId: ID!): AssignMutationType
    unassign (characterId: ID!, movieId: ID!): AssignMutationType

    createCharacter (name: String!, nickname: String, image: String): CharacterMutationType
    deleteCharacter (id: ID!): CharacterMutationType
    updateCharacter (id: ID!, params: CharacterInput): CharacterMutationType

    createMovie (name: String!, description: String, image: String): MovieMutationType
    deleteMovie (id: ID!): MovieMutationType
    updateMovie (id: ID!, params: MovieInput): MovieMutationType
  }
`;

export default gql`
  ${queryTypes}
  ${mutationTypes}
  ${inputTypes}
  ${query}
  ${mutation}
`;

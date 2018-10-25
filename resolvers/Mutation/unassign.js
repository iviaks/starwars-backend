import { ObjectId } from 'mongodb';
import { database } from '../../database';

export default async (root, { characterId, movieId }, context, info) => {
  let character = await database.findOne('characters', {
    _id: ObjectId(characterId)
  });

  if (character === null) {
    return {
      ok: false,
      error: `Character with '${characterId}' is not defined`
    };
  }

  let movie = await database.findOne('movies', { _id: ObjectId(movieId) });

  if (movie === null) {
    return {
      ok: false,
      error: `Movie with '${movieId}' is not defined`
    };
  }

  if (character.movies === undefined) {
    character.movies = [];
  }

  if (movie.characters === undefined) {
    movie.characters = [];
  }

  character.movies = character.movies.filter(e => e !== movie.name);
  movie.characters = movie.characters.filter(e => e !== character.name);

  await database.update(
    'characters',
    { _id: ObjectId(characterId) },
    { movies: character.movies }
  );

  await database.update(
    'movies',
    { _id: ObjectId(movieId) },
    { characters: movie.characters }
  );

  character = { ...character, id: character._id.toString() };
  movie = { ...movie, id: movie._id.toString() };

  return {
    ok: true,
    error: null,
    character,
    movie
  };
};

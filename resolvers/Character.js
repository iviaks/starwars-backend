import { ObjectId } from 'mongodb';
import { database } from '../database';

export default {
  movies: async ({ movies = [] }) =>
    movies.length
      ? await database.find('movies', {
          $or: movies.map(name => ({ name }))
        })
      : null
};

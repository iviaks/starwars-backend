import { ObjectId } from 'mongodb';
import { database } from '../database';

export default {
  characters: async (root, { first, last }, context, info) => {
    const data = await database.find('characters');

    if (first !== undefined) {
      return data.slice(0, first);
    } else if (last !== undefined) {
      return data.slice(data.length - last);
    }

    return data;
  },
  movies: async (root, { first, last }, context, info) => {
    const data = await database.find('movies');

    if (first !== undefined) {
      return data.slice(0, first);
    } else if (last !== undefined) {
      return data.slice(data.length - last);
    }

    return data;
  },
  character: async (root, { id }, context, info) =>
    await database.findOne('characters', { _id: ObjectId(id) }),
  movie: async (root, { id }, context, info) =>
    await database.findOne('movies', { _id: ObjectId(id) })
};

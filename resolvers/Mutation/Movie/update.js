import { ObjectId } from 'mongodb';
import { database } from '../../../database';

export default async (root, { id, params = {} }, context, info) => {
  let movie = await database.findOne('movies', { _id: ObjectId(id) });

  for (let key in params) {
    movie[key] = params[key];
  }

  await database.update('movies', { _id: ObjectId(id) }, movie);

  movie = { ...movie, id: movie._id.toString() };

  return {
    ok: true,
    error: null,
    movie
  };
};

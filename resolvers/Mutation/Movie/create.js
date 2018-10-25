import { ObjectId } from 'mongodb';
import { database } from '../../../database';

export default async (root, { name, description, image }, context, info) => {
  const { ops } = await database.insert('movies', {
    name,
    description,
    image
  });

  const movie = { ...ops[0], id: ops[0]._id.toString() };

  return {
    ok: true,
    error: null,
    movie
  };
};

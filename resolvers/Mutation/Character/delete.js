import { ObjectId } from 'mongodb';
import { database } from '../../../database';

export default async (root, { id }, context, info) => {
  await database.delete('characters', { _id: ObjectId(id) });

  return {
    ok: true,
    error: null
  };
};

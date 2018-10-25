import { ObjectId } from 'mongodb';
import { database } from '../../../database';

export default async (root, { name, nickname, image }, context, info) => {
  const { ops } = await database.insert('characters', {
    name,
    nickname,
    image
  });

  const character = { ...ops[0], id: ops[0]._id.toString() };

  return {
    ok: true,
    error: null,
    character
  };
};

import { ObjectId } from 'mongodb';
import { database } from '../../../database';

export default async (root, { id, params = {} }, context, info) => {
  let character = await database.findOne('characters', { _id: ObjectId(id) });

  for (let key in params) {
    character[key] = params[key];
  }

  await database.update('characters', { _id: ObjectId(id) }, character);

  character = { ...character, id: character._id.toString() };

  return {
    ok: true,
    error: null,
    character
  };
};

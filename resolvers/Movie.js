import { ObjectId } from 'mongodb';
import { database } from '../database';

import request from 'request-promise-native';

export default {
  characters: async ({ characters = [] }) =>
    characters.length
      ? await database.find('characters', {
          $or: characters.map(name => ({ name }))
        })
      : null,
  imdb: async ({ name }) => {
    const data = JSON.parse(
      await request(
        `http://www.omdbapi.com/?t=${name}&apikey=${process.env.IMDB_API_KEY}`
      )
    );

    if (data.Error) {
      return null;
    }

    return data;
  }
};

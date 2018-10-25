import { MongoClient } from 'mongodb';

const url = `mongodb://${process.env.DATABASE_HOST}:${
  process.env.DATABASE_PORT
}`;

class MongoDBDatabase {
  constructor() {
    this.client = null;
    this.db = null;
  }

  get database() {
    return this.client.db(process.env.DATABASE_NAME);
  }

  connect = async () => {
    this.client = new MongoClient(url, { useNewUrlParser: true });
    await this.client.connect();
    return this.client;
  };

  insert = async (collection, data = {}) => {
    if (Array.isArray(data)) {
      return await this.database.collection(collection).insertMany(data);
    } else {
      return await this.database.collection(collection).insertOne(data);
    }
  };

  update = async (collection, query, data, many = false) => {
    if (many) {
      return await this.database
        .collection(collection)
        .updateMany(query, { $set: data });
    } else {
      return await this.database
        .collection(collection)
        .updateOne(query, { $set: data });
    }
  };

  delete = async (collection, query, many = false) => {
    if (many) {
      return await this.database.collection(collection).deleteMany(query);
    } else {
      return await this.database.collection(collection).deleteOne(query);
    }
  };

  dropCollection = async collection => {
    const collectionExists = await this.database
      .listCollections({ name: collection })
      .next();

    if (collectionExists !== null) {
      return await this.database.collection(collection).drop();
    }
  };

  findOne = async (collection, query = {}) =>
    await this.database.collection(collection).findOne(query);

  find = async (collection, query = {}) => {
    const data = await this.database
      .collection(collection)
      .find(query)
      .toArray();
    return data.map(e => ({ ...e, id: e._id.toString() }));
  };

  close = () => {
    this.client.close();
    this.client = null;
  };

  restore = async () => {
    const fs = require('fs');

    const restoreCharacters = () =>
      new Promise((resolve, reject) => {
        fs.readFile('./characters.json', (err, data) => {
          if (err) {
            reject(err);
          }

          this.dropCollection('characters')
            .then(() => this.insert('characters', JSON.parse(data)))
            .then(resolve)
            .catch(reject);
        });
      });

    const restoreMovies = () =>
      new Promise((resolve, reject) => {
        fs.readFile('./movies.json', (err, data) => {
          if (err) {
            reject(err);
          }

          this.dropCollection('movies')
            .then(() => this.insert('movies', JSON.parse(data)))
            .then(resolve)
            .catch(reject);
        });
      });

    return Promise.all([restoreCharacters(), restoreMovies()]);
  };
}

export const database = new MongoDBDatabase();

export default MongoDBDatabase;

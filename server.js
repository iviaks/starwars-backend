import { ApolloServer, gql } from 'apollo-server';

import typeDefs from './types';
import resolvers from './resolvers';

import { database } from './database';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

database
  .connect()
  .then(() => database.restore())
  .then(() => server.listen())
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

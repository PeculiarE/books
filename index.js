import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import config from './config';
import { typeDefs, resolvers, schemaDirectives } from './app/graphql';
import { AuthService, BookServices } from './app/services';
import { helpers } from './app/utils';

const { appConfig, logger } = config;

const { booksDataLoader } = BookServices;

global.logger = logger;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req }) => ({
    req: AuthService(req),
    loaders: {
      booksLoader: booksDataLoader(),
    },
  }),
  formatError: (e) => helpers.ResponseHelpers.errorResolver(e),
});

appConfig(app, server);

export default app;

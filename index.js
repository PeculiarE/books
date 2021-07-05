import express, { json } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import config from './config';
import { typeDefs, resolvers, schemaDirectives } from './app/graphql';
import { AuthService } from './app/services';
import { helpers } from './app/utils';

const { PORT, DATABASE_URL, logger } = config;

const app = express();

app.use(morgan('combined', { stream: logger.stream }));
app.use(json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req }) => AuthService(req),
  formatError: (e) => helpers.ResponseHelpers.authErrorResolver(e),
});

server.applyMiddleware({ app, path: '/graphql' });

const port = PORT || 4000;

app.get('/', (req, res) => {
  res
    .status(200)
    .json('Hola! New Project here...');
});

mongoose.set('debug', true);

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => logger.info(`Server ready at http://localhost:${port}${server.graphqlPath}`));
    logger.info('Connected to the db');
  })
  .catch((error) => {
    logger.error(error.message);
  });

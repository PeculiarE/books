import { json } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import envConfig from './env';

const { PORT, DATABASE_URL } = envConfig;

const appConfig = async (app, server) => {
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(json());

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
};

export default appConfig;

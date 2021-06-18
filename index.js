import express, { json } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const port = config.PORT || 4000;

app.use(morgan('combined', { stream: config.logger.stream }));
app.use(json());

app.get('/', (req, res) => {
  res
    .status(200)
    .json('Hola! New Project here...');
});

mongoose
  .connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => config.logger.info(`Server ready on port ${port}`));
    config.logger.info('Connected to the db');
  })
  .catch((error) => {
    config.logger.error(error.message);
  });

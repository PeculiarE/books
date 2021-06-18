import 'dotenv/config';
import development from './development';

const { PORT } = process.env;

export default {
  ...development,
  PORT,
};

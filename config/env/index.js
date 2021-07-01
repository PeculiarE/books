import 'dotenv/config';
import development from './development';

const { PORT, SECRET } = process.env;

export default {
  ...development,
  PORT,
  SECRET,
};

import 'dotenv/config';
import development from './development';
import test from './test';

const { PORT, SECRET, NODE_ENV } = process.env;

const currentEnv = {
  development,
  test,
}[NODE_ENV || 'development'];

export default {
  ...currentEnv,
  PORT,
  SECRET,
};

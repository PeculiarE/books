import envConfig from './env';
import logger from './winston';

export default {
  ...envConfig,
  logger,
};

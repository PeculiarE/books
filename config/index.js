import envConfig from './env';
import logger from './winston';
import appConfig from './app';

export default {
  ...envConfig,
  logger,
  appConfig,
};

import { httpStatusCodes, apiMessages } from '../constants';
import config from '../../../config';

const { logger } = config;
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = httpStatusCodes;
const { DEFAULT_ERROR_MSG, DUPLICATED_ENTITY } = apiMessages;

export const sendGraphQLResponse = (status, message, data) => ({
  status,
  message,
  data,
});

export const moduleErrLogMessager = (status, message, error) => (error.name ? logger.error(`${status} - ${message} - ${error.name} - ${error.message}`)
  : logger.error(`${status} - ${message} - ${error.message}`));

export const errorResolver = (error, message) => {
  switch (error.code) {
    case 11000 || 11001:
      moduleErrLogMessager(BAD_REQUEST, message, error);
      return sendGraphQLResponse(BAD_REQUEST, DUPLICATED_ENTITY('Email'), null);

    default:
      moduleErrLogMessager(INTERNAL_SERVER_ERROR, message, error);
      return sendGraphQLResponse(INTERNAL_SERVER_ERROR, DEFAULT_ERROR_MSG, null);
  }
};

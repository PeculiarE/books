import { httpStatusCodes, apiMessages } from '../constants';
import config from '../../../config';

const { logger } = config;
const {
  INTERNAL_SERVER_ERROR, BAD_REQUEST, UNAUTHORIZED, CONFLICT,
} = httpStatusCodes;
const {
  DEFAULT_ERROR_MSG, DUPLICATED_ENTITY, AUTH_REQUIRED, AUTH_ERROR,
  INPUT_ERROR, INVALID_INPUT,
} = apiMessages;

export const sendGraphQLResponse = (status, message, data) => ({
  status,
  message,
  data,
});

export const moduleErrLogMessager = (status, message, error) => (error.name ? logger.error(`${status} - ${message} - ${error.name} - ${error.message}`)
  : logger.error(`${status} - ${message} - ${error.message}`));

export const errorResolver = (error, message) => {
  switch (error.code) {
    case 11000:
      moduleErrLogMessager(CONFLICT, message, error);
      return sendGraphQLResponse(CONFLICT, DUPLICATED_ENTITY('Email'), null);
    default:
      moduleErrLogMessager(INTERNAL_SERVER_ERROR, message, error);
      return sendGraphQLResponse(INTERNAL_SERVER_ERROR, DEFAULT_ERROR_MSG, null);
  }
};

export const authErrorResolver = (error) => {
  switch (error.extensions.code) {
    case 'BAD_USER_INPUT':
      moduleErrLogMessager(BAD_REQUEST, INPUT_ERROR, error);
      return sendGraphQLResponse(BAD_REQUEST, INVALID_INPUT, null);
    default:
      moduleErrLogMessager(UNAUTHORIZED, AUTH_ERROR, error);
      return sendGraphQLResponse(UNAUTHORIZED, AUTH_REQUIRED, null);
  }
};

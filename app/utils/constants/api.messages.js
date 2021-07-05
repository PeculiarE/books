export default {
  SUCCESS: 'success',
  SUCCESS_RESPONSE: 'Request was successfully processed',
  FAIL: 'fail',
  SIGN_UP_SUCCESS: 'Sign up successful',
  DUPLICATED_ENTITY: (entity) => `${entity} already exists. Please provide a different one`,
  RESOURCE_CREATED_OK: (resource) => `${resource} created successfully`,
  RESOURCE_ADDED_OK: (resource) => `${resource} added successfully`,
  DEFAULT_ERROR_MSG: 'Error while processing request, it\'s not you, it\'s us',
  RESOURCE_FETCHED_OK: (resource) => `${resource} fetched successfully`,
  UPDATE_SUCCESS: 'Update successful',
  UPDATE_FAIL: 'Error during update, it\'s not you, it\'s us',
  UPDATE_FAIL_STATUS: (entity) => `${entity.toUpperCase()}_UPDATE_FAIL`,
  AUTH_REQUIRED: 'Access denied, a valid access token is required',
  AUTH_ERROR: 'AUTHORIZATION_ERROR',
  INVALID_CREDENTIALS: 'Incorrect login details',
  RESOURCE_CREATE_ERROR: (entity) => `${entity.toUpperCase()}_CREATE_ERROR`,
  RESOURCE_FETCH_ERROR: (entity) => `${entity.toUpperCase()}_FETCH_ERROR`,
  ACCOUNT_SIGNIN_ERROR: 'ACCOUNT_SIGNIN_ERROR',
  LOGIN_SUCCESS: 'Login successful',
  ERROR_CREATING_RESOURCE: 'Error creating resource',
  INVALID_AUTHORIZATION: 'You are not allowed to perform this action',
  INPUT_ERROR: 'USER_INPUT_ERROR',
  INVALID_INPUT: 'Invalid data provided',
};

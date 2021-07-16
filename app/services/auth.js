import { helpers } from '../utils';

const { AuthHelpers: { verifyToken } } = helpers;

const checkAuthorization = (authorization) => {
  let bearerToken = null;
  if (authorization) {
    const token = authorization.split(' ')[1];
    bearerToken = token || authorization;
  }
  return bearerToken;
};

const checkToken = (req) => {
  const { authorization } = req.headers;
  return checkAuthorization(authorization);
};

const authenticate = (req) => {
  try {
    const token = checkToken(req);
    const decoded = verifyToken(token);
    req.user = decoded;
    return req;
  } catch (error) {
    req.error = { error };
    return req;
  }
};

export default authenticate;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config';

const saltRounds = 10;

const secret = config.SECRET;

const hashPassword = async (plainPassword) => bcrypt.hash(plainPassword, saltRounds);

const comparePassword = (
  plainPassword, hashedPassword,
) => bcrypt.compare(plainPassword, hashedPassword);

const addDataToToken = (data) => jwt.sign(data, secret, { expiresIn: '10h' });

const verifyToken = (token) => jwt.verify(token, secret);

export {
  hashPassword,
  comparePassword,
  addDataToToken,
  verifyToken,
};

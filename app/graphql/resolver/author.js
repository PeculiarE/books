import { AuthorServices, BookServices } from '../../services';
import { helpers, constants } from '../../utils';

const {
  createNewAuthor, findAllAuthors, findSingleAuthorById, findSingleAuthorByEmail,
} = AuthorServices;
const { booksLoader } = BookServices;
const {
  AuthHelpers: {
    hashPassword, addDataToToken, comparePassword,
  }, ResponseHelpers: { sendGraphQLResponse, errorResolver, moduleErrLogMessager },
} = helpers;
const {
  apiMessages: {
    SIGN_UP_SUCCESS, RESOURCE_CREATE_ERROR, LOGIN_SUCCESS,
    INVALID_CREDENTIALS, ACCOUNT_SIGNIN_ERROR,
  },
  httpStatusCodes: {
    CREATED, OK, BAD_REQUEST,
  },
} = constants;

const authorResolvers = {
  Mutation: {
    async addNewAuthor(_, { data }) {
      try {
        const password = await hashPassword(data.password);
        const author = await createNewAuthor({ ...data, password });
        const token = addDataToToken(author._doc);
        return sendGraphQLResponse(CREATED, SIGN_UP_SUCCESS, { token, author });
      } catch (error) {
        return errorResolver(error, RESOURCE_CREATE_ERROR('Author'));
      }
    },
    async loginAuthor(_, { data: { email, password } }) {
      try {
        const author = await findSingleAuthorByEmail(email);
        if (author && await comparePassword(password, author.password)) {
          const token = addDataToToken(author._doc);
          return sendGraphQLResponse(OK, LOGIN_SUCCESS, { token, author });
        }
        moduleErrLogMessager(BAD_REQUEST, ACCOUNT_SIGNIN_ERROR, { message: INVALID_CREDENTIALS });
        return sendGraphQLResponse(BAD_REQUEST, INVALID_CREDENTIALS, null);
      } catch (error) {
        return errorResolver(error, ACCOUNT_SIGNIN_ERROR);
      }
    },
  },
  Query: {
    async getAllAuthors() {
      const authors = await findAllAuthors();
      return authors;
    },

    async getSingleAuthor(_, { authorId }) {
      const author = await findSingleAuthorById(authorId);
      return author;
    },
  },
  Author: {
    async books(parent) {
      return booksLoader.load(parent._id);
    },
  },
};

export default authorResolvers;

import { AuthorServices, BookServices } from '../../services';
import { helpers, constants } from '../../utils';

const { createNewBook, findAllBooks, findSingleBook } = BookServices;
const { findSingleAuthorById } = AuthorServices;

const { ResponseHelpers: { sendGraphQLResponse, moduleErrLogMessager, errorResolver } } = helpers;

const {
  httpStatusCodes: { CREATED, UNAUTHORIZED },
  apiMessages: {
    RESOURCE_CREATED_OK, RESOURCE_CREATE_ERROR, AUTH_REQUIRED, AUTH_ERROR,
  },
} = constants;

const bookResolvers = {
  Mutation: {
    async addNewBook(_, args, context) {
      try {
        const author = context._id;
        if (author) {
          const bookData = { ...args.data, author };
          const book = await createNewBook({ ...bookData });
          return sendGraphQLResponse(CREATED, RESOURCE_CREATED_OK('Book'), book);
        }
        moduleErrLogMessager(UNAUTHORIZED, AUTH_ERROR, context.error);
        return sendGraphQLResponse(UNAUTHORIZED, AUTH_REQUIRED, null);
      } catch (error) {
        return errorResolver(error, RESOURCE_CREATE_ERROR('Book'));
      }
    },
  },
  Query: {
    async getAllBooks() {
      const books = await findAllBooks();
      return books;
    },

    async getSingleBook(_, { bookId }) {
      const book = await findSingleBook(bookId);
      return book;
    },
  },
  Book: {
    async author(parent) {
      return findSingleAuthorById(parent.author);
    },
  },
};

export default bookResolvers;

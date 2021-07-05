import { AuthorServices, BookServices } from '../../services';
import { helpers, constants } from '../../utils';

const { createNewBook, findAllBooks, findSingleBook } = BookServices;
const { findSingleAuthorById } = AuthorServices;

const { ResponseHelpers: { sendGraphQLResponse, errorResolver } } = helpers;

const {
  httpStatusCodes: { CREATED, OK },
  apiMessages: {
    RESOURCE_CREATED_OK, RESOURCE_CREATE_ERROR, RESOURCE_FETCHED_OK,
    RESOURCE_FETCH_ERROR,
  },
} = constants;

const bookResolvers = {
  Mutation: {
    async addNewBook(_, args, { user }) {
      try {
        const author = user._id;
        const bookData = { ...args.data, author };
        const book = await createNewBook({ ...bookData });
        return sendGraphQLResponse(CREATED, RESOURCE_CREATED_OK('Book'), book);
      } catch (error) {
        return errorResolver(error, RESOURCE_CREATE_ERROR('Book'));
      }
    },
  },
  Query: {
    async getAllBooks() {
      try {
        const books = await findAllBooks();
        return sendGraphQLResponse(OK, RESOURCE_FETCHED_OK('Books'), books);
      } catch (error) {
        return errorResolver(error, RESOURCE_FETCH_ERROR('Books'));
      }
    },
    async getSingleBook(_, { bookId }) {
      try {
        const book = await findSingleBook(bookId);
        return sendGraphQLResponse(OK, RESOURCE_FETCHED_OK('Book'), book);
      } catch (error) {
        return errorResolver(error, RESOURCE_FETCH_ERROR('Book'));
      }
    },
  },
  Book: {
    async author(parent) {
      return findSingleAuthorById(parent.author);
    },
  },
};

export default bookResolvers;

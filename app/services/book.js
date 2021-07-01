import DataLoader from 'dataloader';
import { Book } from '../models';

const createNewBook = async (data) => Book.create(data);

const findAllBooks = async () => Book.find();

const findSingleBook = async (bookId) => Book.findById(bookId);

const findBooksBySameAuthor = async (authorId) => Book.find({ author: authorId });

const booksLoader = new DataLoader(async (authorIds) => {
  const books = await findBooksBySameAuthor(authorIds);
  const booksBySameAuthor = authorIds
    .map((authorId) => books.filter((book) => String(book.author) === String(authorId)));
  return Promise.resolve(booksBySameAuthor);
});

export {
  createNewBook,
  findAllBooks,
  findSingleBook,
  booksLoader,
};

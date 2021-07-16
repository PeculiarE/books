import DataLoader from 'dataloader';
import { Book } from '../models';

const createNewBook = async (data) => Book.create(data);

const findAllBooks = async () => Book.find();

const findSingleBook = async (bookId) => Book.findById(bookId);

const findBooksBySameAuthor = async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } });
  return authorIds.map((el) => books.filter((n) => String(n.author) === String(el)));
};

const booksDataLoader = () => new DataLoader(findBooksBySameAuthor);

export {
  createNewBook,
  findAllBooks,
  findSingleBook,
  booksDataLoader,
};

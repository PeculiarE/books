import DataLoader from 'dataloader';
import { Author } from '../models';

const createNewAuthor = async (data) => Author.create(data);

const findAllAuthors = async () => Author.find();

const findSingleAuthorById = async (authorId) => Author.findById(authorId);

const findSingleAuthorByEmail = async (email) => Author.findOne({ email }).lean();

const findAuthorOfMultipleBooks = async (authorIds) => {
  console.log('authorIds', authorIds);
  const authors = await Author.find({ _id: { $in: authorIds } });
  console.log('authors', authors);
  const b = authorIds.map((el) => authors.find((n) => String(n._id) === String(el)));
  console.log(b);
  return b;
};

const authorsDataLoader = () => new DataLoader(findAuthorOfMultipleBooks);

export {
  createNewAuthor,
  findAllAuthors,
  findSingleAuthorById,
  findSingleAuthorByEmail,
  authorsDataLoader,
};

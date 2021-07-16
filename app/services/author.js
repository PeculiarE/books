import { Author } from '../models';

const createNewAuthor = async (data) => Author.create(data);

const findAllAuthors = async () => Author.find();

const findSingleAuthorById = async (authorId) => Author.findById(authorId);

const findSingleAuthorByEmail = async (email) => Author.findOne({ email });

export {
  createNewAuthor,
  findAllAuthors,
  findSingleAuthorById,
  findSingleAuthorByEmail,
};

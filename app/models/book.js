import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true, ref: 'Author' },
  price: { type: Number, required: true },
});

const Book = model('Book', bookSchema);

export default Book;

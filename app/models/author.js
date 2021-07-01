import { model, Schema } from 'mongoose';

const authorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const Author = model('Author', authorSchema);

export default Author;

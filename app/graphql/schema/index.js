import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import root from './root';
import author from './author';
import book from './book';

const schemaArray = [root, ...scalarTypeDefs, author, book];

export default schemaArray;

import { resolvers as scalarResolvers } from 'graphql-scalars';
import authorResolvers from './author';
import bookResolvers from './book';

const resolvers = [scalarResolvers, authorResolvers, bookResolvers];

export default resolvers;

import { gql } from 'apollo-server-express';

const book = gql`
    type Book {
        _id: ID
        title: String!
        price: Float!
        author: Author
    }

    #INPUT TYPE
    input BookInput {
        title: String!
        price: Float!
    }

    #RESPONSE TYPES
    type BookResponse {
        status: Int!
        message: String!
        data: Book
    }

    extend type Query {
        getAllBooks: [Book]
        getSingleBook(bookId: ID!): Book
    }

    extend type Mutation {
        addNewBook(data: BookInput!): BookResponse!
    }
`;

export default book;

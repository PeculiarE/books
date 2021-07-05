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
    type SingleBookResponse {
        status: Int!
        message: String!
        data: Book
    }

    type MultipleBooksResponse {
        status: Int!
        message: String!
        data: [Book]
    }

    extend type Query {
        getAllBooks: MultipleBooksResponse
        getSingleBook(bookId: ID!): SingleBookResponse
    }

    extend type Mutation {
        addNewBook(data: BookInput!): SingleBookResponse! @auth
    }
`;

export default book;

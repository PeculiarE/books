import { gql } from 'apollo-server-express';

const author = gql`
    type Author {
        _id: ID
        firstName: String!
        lastName: String!
        email: EmailAddress!
        password: String!
        books: [Book]
    }

    type AuthorPayload {
        author: Author
        token: String
    }

    #INPUT TYPES
    input AuthorInput {
        firstName: String!
        lastName: String!
        email: EmailAddress!
        password: String!
    }

    input AuthorLoginDetails {
        email: EmailAddress!
        password: String!
    }

    #RESPONSE TYPES
    type AuthorSignUpOrLoginResponse {
        status: Int!
        message: String!
        data: AuthorPayload
    }
    
    type SingleAuthorResponse {
        status: Int!
        message: String!
        data: Author
    }

    type MultipleAuthorsResponse {
        status: Int!
        message: String!
        data: [Author]
    }

    #QUERY
    extend type Query {
        getAllAuthors: MultipleAuthorsResponse!
        getSingleAuthor(authorId: ID!): SingleAuthorResponse!
    }

    #MUTATION
    extend type Mutation {
        addNewAuthor(data: AuthorInput!): AuthorSignUpOrLoginResponse!
        loginAuthor(data: AuthorLoginDetails!): AuthorSignUpOrLoginResponse!
    }
`;

export default author;

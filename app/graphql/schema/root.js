import { gql } from 'apollo-server-express';

const root = gql`
  directive @auth on FIELD_DEFINITION
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

export default root;

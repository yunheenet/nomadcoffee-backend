import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    login(email: String!, password: String!): loginResponse!
  }
  type loginResponse {
    ok: Boolean!
    error: String
    token: String
  }
`;

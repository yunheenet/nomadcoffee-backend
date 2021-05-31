import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }
  type LoginResponse {
    ok: Boolean!
    error: String
    token: String
  }
`;

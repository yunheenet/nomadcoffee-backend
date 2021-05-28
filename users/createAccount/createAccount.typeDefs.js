import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String!
      password: String!
      avatarURL: String
      githubUsername: String
    ): createAccountResult!
  }
  type createAccountResult {
    ok: Boolean!
    error: String
  }
`;

import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    followUser(username: String!): FollowUserResult
  }
  type FollowUserResult {
    ok: Boolean!
    error: String
  }
`;

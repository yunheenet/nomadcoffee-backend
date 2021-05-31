import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seeFollowers(username: String!, page: Int!): SeeFollowersResult!
  }
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
`;

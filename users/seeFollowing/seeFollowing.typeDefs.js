import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult!
  }
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
`;

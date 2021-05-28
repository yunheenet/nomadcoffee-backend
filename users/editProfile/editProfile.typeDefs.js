import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    editProfile(
      id: Int
      username: String
      email: String
      name: String
      location: String
      avatarURL: String
      githubUsername: String
      password: String
    ): editProfileResponse!
  }
  type editProfileResponse {
    ok: Boolean!
    error: String
  }
`;

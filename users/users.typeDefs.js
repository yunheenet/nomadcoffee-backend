import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    name: String
    location: String
    password: String!
    avataURL: String
    githubUsername: String
  }
  type Result {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(username: String!, email: String!, password: String!): Result
  }
  type Query {
    seeProfile(username: String!): User
  }
`;

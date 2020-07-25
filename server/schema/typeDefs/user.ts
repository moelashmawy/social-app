//This defines the user typeDef
const userTypeDef = `
extend type Query {
    users:[User!]
    user(id: ID!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
    role: String!
    chat:[Chat!]
  }

  extend type Mutation {
    signUp(name: String!, email: String!, password: String!, role: String!): User!
  }
`;

export default userTypeDef;

//This defines the user typeDef
const userTypeDef = `
type User {
    id: ID
    userName: String!
    email: String!
    firstName: String!
    lastName: String!
    avatarUrl: String
    role: String!
    friends:[User!]
    chat:[Chat!]
    messages:[Message!]
  }

  extend type Query {
    users:[User!] 
    userInfo(id: ID!): User!
  }

  extend type Mutation {
    signUp(
      userName: String!,
      email: String!,
      password: String!,
      firstName: String!,
      lastName: String!,
      role: String!
    ): User!
  }
`;

export default userTypeDef;

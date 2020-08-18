//This defines the user typeDef
const userTypeDef = `
  scalar Upload

  type User {
    id: ID
    userName: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    pictures: [String!]
    avatarUrl: String
    role: String!
    friends:[User!]
    chat:[Chat!]
    messages:[Message!]
    createdAt:String
  }

  type UserPayload{
    ok: Boolean!
    token: String
    error: String
    user: User
  } 

  type LogoutPayload{
    ok: Boolean!
  } 

  type DeleteUserPayload{
    ok: Boolean!
    error: String
  }

  type OneUserQuery{
    ok: Boolean!
    user: User
    error: String
  }

  type AllUsersQuery{
    ok: Boolean!
    users: [User!]
    error: String
  }

  type PicturePayload{
    ok: Boolean!
  }

  extend type Query {
    me: OneUserQuery!
    users: AllUsersQuery! 
    userInfo(userName: String!): OneUserQuery!
  }

  extend type Mutation {
    signUp(
      userName: String!,
      email: String!,
      password: String!,
      verifyPassword: String!,
      firstName: String!,
      lastName: String!
    ): UserPayload!

    login(userName: String!, password: String!): UserPayload!

    logout: LogoutPayload

    deleteUser(id:ID!): DeleteUserPayload

    singleUpload(file: [Upload!]): PicturePayload!
  }
`;

export default userTypeDef;

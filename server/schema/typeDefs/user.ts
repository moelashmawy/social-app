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
    gender: String
    country: String
    city: String
    pictures: [String!]
    avatarUrl: String
    role: String!
    birthday: String
    friends: [User!]
    chats: [Chat!]
    messages: [Message]
    status: String
    speakLanguages: [String!]
    learnLanguages: [String!]
    education: String
    job: String
    relationship: String
    aboutMe: String
    hobbies: [String!]
    music: [String!]
    books: [String!]
    movies: [String!]
    tvShows: [String!]
    createdAt: String!
  }

  type UserPayload{
    ok: Boolean!
    successMessage: String
    error: String
    user: User
  } 

  type LogoutPayload{
    ok: Boolean!
  } 

  type DeleteUserPayload{
    ok: Boolean!
    successMessage: String
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

  type UploadProfilePicturesPayload{
    ok: Boolean!
    successMessage: String
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
      lastName: String!,
      gender: String!,
      country: String!
    ): UserPayload!

    login(userName: String!, password: String!): UserPayload!

    logout: LogoutPayload

    deleteUser(id:ID!): DeleteUserPayload

    uploadProfilePictures(file: [Upload!]): UploadProfilePicturesPayload!
  }
`;

export default userTypeDef;

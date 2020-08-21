//This defines the user typeDef
const userTypeDef = `
  scalar Upload

  type ContactPlatform {
    skype: String
    instagram: String
    snapchat: String
    facebook: String
    website: String
  }

  input ContactPlatformInput {
    skype: String
    instagram: String
    snapchat: String
    facebook: String
    website: String
  }

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
    contactInfo: ContactPlatform
    aboutMe: String
    hobbies: [String!]
    music: [String!]
    books: [String!]
    movies: [String!]
    tvShows: [String!]
    createdAt: String!
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

  type UploadProfilePicturesPayload{
    ok: Boolean!
    successMessage: String
  }

  type UpdateProfilePayload{
    ok: Boolean!
    error: String
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

    updateProfileInfo(
      firstName: String,
      lastName: String,
      gender: String,
      country: String,
      city: String,
      birthday: String,
      speakLanguages: [String!],
      learnLanguages: [String!],
      education: String,
      job: String,
      relationship: String,
      contactInfo: ContactPlatformInput,
      aboutMe: String,
      hobbies: [String!],
      music: [String!],
      books: [String!],
      movies: [String!],
      tvShows: [String!],
    ): UpdateProfilePayload!
    
  }
`;

export default userTypeDef;

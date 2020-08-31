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
    friendsPending: [User!]
    bookmarks: [User!]
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

  type FriendRequestsQuery{
    ok: Boolean!
    friends: [User!]
    error: String
  }

  type UserPayload{
    ok: Boolean!
    successMessage: String
    error: String
    user: User
  } 

  type ActionPayload{
    ok: Boolean!
    error: String
    successMessage: String
  }

  extend type Query {
    me: OneUserQuery!
    users: AllUsersQuery! 
    userInfo(userName: String!): OneUserQuery!
    friendRequests(userName: String!): FriendRequestsQuery!
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

    logout: ActionPayload!

    deleteUser(id:ID!): ActionPayload!

    uploadProfilePictures(file: [Upload!]): ActionPayload!

    deleteProfilePicture(name: String): ActionPayload!

    chooseProfilePicture(name: String): ActionPayload!

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
    ): ActionPayload!
    

    addFriend(id: ID!): ActionPayload!

    acceptFriend(id: ID!): ActionPayload!

    deleteFriend(id: ID!): ActionPayload!

    addBookmark(id: ID!): ActionPayload!

    deleteBookmark(id: ID!): ActionPayload!

  }
`;

export default userTypeDef;

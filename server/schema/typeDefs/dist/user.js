"use strict";
exports.__esModule = true;
//This defines the user typeDef
var userTypeDef = "\n  scalar Upload\n\n  type ContactPlatform {\n    skype: String\n    instagram: String\n    snapchat: String\n    facebook: String\n    website: String\n  }\n\n  input ContactPlatformInput {\n    skype: String\n    instagram: String\n    snapchat: String\n    facebook: String\n    website: String\n  }\n\n  type User {\n    id: ID\n    userName: String!\n    email: String!\n    password: String!\n    firstName: String!\n    lastName: String!\n    gender: String\n    country: String\n    city: String\n    pictures: [String!]\n    avatarUrl: String\n    role: String!\n    birthday: String\n    friends: [User!]\n    friendsPending: [User!]\n    chats: [Chat!]\n    messages: [Message]\n    status: String\n    speakLanguages: [String!]\n    learnLanguages: [String!]\n    education: String\n    job: String\n    relationship: String\n    contactInfo: ContactPlatform\n    aboutMe: String\n    hobbies: [String!]\n    music: [String!]\n    books: [String!]\n    movies: [String!]\n    tvShows: [String!]\n    createdAt: String!\n  }\n\n  type OneUserQuery{\n    ok: Boolean!\n    user: User\n    error: String\n  }\n\n  type AllUsersQuery{\n    ok: Boolean!\n    users: [User!]\n    error: String\n  }\n\n  type FriendRequestsQuery{\n    ok: Boolean!\n    friends: [User!]\n    error: String\n  }\n\n  type UserPayload{\n    ok: Boolean!\n    successMessage: String\n    error: String\n    user: User\n  } \n\n  type LogoutPayload{\n    ok: Boolean!\n  } \n\n  type DeleteUserPayload{\n    ok: Boolean!\n    successMessage: String\n    error: String\n  }\n\n  type UploadProfilePicturesPayload{\n    ok: Boolean!\n    error: String\n    successMessage: String\n  }\n\n  type DeleteProfilePicturePayload{\n    ok: Boolean!\n    error: String\n    successMessage: String\n  }\n\n  type ChoosePicturePayload{\n    ok: Boolean!\n    error: String\n    successMessage: String\n  }\n\n  type UpdateProfilePayload{\n    ok: Boolean!\n    error: String\n    successMessage: String\n  }\n\n  type AddFriendPayload{\n    ok: Boolean!\n    error: String\n    successMessage: String\n  }\n\n  type AcceptFriendPayload{\n    ok: Boolean!\n    error: String\n    successMessage: String\n  }\n\n  extend type Query {\n    me: OneUserQuery!\n    users: AllUsersQuery! \n    userInfo(userName: String!): OneUserQuery!\n    friendRequests(userName: String!): FriendRequestsQuery!\n  }\n\n  extend type Mutation {\n    signUp(\n      userName: String!,\n      email: String!,\n      password: String!,\n      verifyPassword: String!,\n      firstName: String!,\n      lastName: String!,\n      gender: String!,\n      country: String!\n    ): UserPayload!\n\n    login(userName: String!, password: String!): UserPayload!\n\n    logout: LogoutPayload\n\n    deleteUser(id:ID!): DeleteUserPayload\n\n    uploadProfilePictures(file: [Upload!]): UploadProfilePicturesPayload!\n\n    deleteProfilePicture(name: String): DeleteProfilePicturePayload!\n\n    chooseProfilePicture(name: String): ChoosePicturePayload!\n\n    updateProfileInfo(\n      firstName: String,\n      lastName: String,\n      gender: String,\n      country: String,\n      city: String,\n      birthday: String,\n      speakLanguages: [String!],\n      learnLanguages: [String!],\n      education: String,\n      job: String,\n      relationship: String,\n      contactInfo: ContactPlatformInput,\n      aboutMe: String,\n      hobbies: [String!],\n      music: [String!],\n      books: [String!],\n      movies: [String!],\n      tvShows: [String!],\n    ): UpdateProfilePayload!\n    \n\n    addFriend(id: ID!): AddFriendPayload!\n\n    acceptFriend(id: ID!): AcceptFriendPayload!\n\n  }\n";
exports["default"] = userTypeDef;
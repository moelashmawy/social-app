// defines chat typeDef

const chatTypeDef = `

  type Chat{
    id: ID!
    users: [User!]
    messages: [Message!]
  }

  type UserChatsQueryPayload{
    ok: Boolean!
    error: String
    chats: [Chat!]
  }

  type NewChatPayload{
    ok: Boolean!
    chat: Chat
    error: String
    successMessage: String
  }

  extend type Query{
    userChats: UserChatsQueryPayload
  }

  extend type Mutation {
    createNewChat(users:[ID!]):NewChatPayload!
  }

`;

export default chatTypeDef;

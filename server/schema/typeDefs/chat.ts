// defines chat typeDef

const chatTypeDef = `

  type Message {
    id: ID
    text: String!
    user: User!
    chat: Chat!
  }

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

  type MessagePayload{
    ok: Boolean!
    error: String
    successMessage: String
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

    sendMessage(text: String!, user: ID!, chat: ID): MessagePayload!
  } 

  extend type Subscription{
    userChats: UserChatsQueryPayload
  }
  

`;

export default chatTypeDef;

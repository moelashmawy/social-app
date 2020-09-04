// defines message typeDef

const messageTypeDef = `
  type Message {
    id: ID
    text: String!
    user: User!
    chat: Chat!
    createdAt: String!
  }

  type MessagePayload{
    ok: Boolean!
    error: String
    successMessage: String
  }

  type SendMessageSubPayload{
    ok: Boolean!
    error: String
    chat: Chat!
  }

  extend type Mutation {
    sendMessage(text: String!, user: ID!, chat: ID): MessagePayload!
  } 

  extend type Subscription {
    userChats: SendMessageSubPayload
  }

`;

export default messageTypeDef;

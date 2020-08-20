// defines message typeDef

const messageTypeDef = `
  type Message {
    id: ID
    text: String!
    user: User!
    chat: Chat!
  }

  extend type Query{
    allMessages: [Message!]
  }
`;

export default messageTypeDef;

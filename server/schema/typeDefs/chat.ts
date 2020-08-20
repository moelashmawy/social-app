// defines chat typeDef

const chatTypeDef = `
  type Chat{
    id: ID!
    users: [User!]
    messages: [Message!]!
  }
`;

export default chatTypeDef;

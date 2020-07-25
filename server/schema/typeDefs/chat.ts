// defines chat typeDef

const chatTypeDef = `
     type Chat{
        id: ID!
        name: String
        users: [User!]!
        messages: [Message!]!
    }
`;

export default chatTypeDef;

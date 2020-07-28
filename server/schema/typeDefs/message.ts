// defines message typeDef

const messageTypeDef = `
    type Message{
        id: ID!
        body: String
        user: User!
    }

    extend type Query{
        allMessages: [Message!]
    }
`;

export default messageTypeDef;

// defines message typeDef

const messageTypeDef = `
    extend type Query{
        messages: [Message!]
    }

     type Message{
        id: ID!
        body: String
        user: User!
    }
`;

export default messageTypeDef;

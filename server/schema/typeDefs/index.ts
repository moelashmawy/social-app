import userTypeDef from "./user";
import chatTypeDef from "./chat";
import messageTypeDef from "./message";

const base = `
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

   type Subscription {
    _: String
  }
`;

export default [base, userTypeDef, chatTypeDef, messageTypeDef];

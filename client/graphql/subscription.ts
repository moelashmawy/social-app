import { gql } from "@apollo/client";

export const SEND_MESSAGE_SUB = gql`
  subscription {
    userChats {
      ok
      error
      chat {
        id
        users {
          id
          userName
          firstName
          lastName
          avatarUrl
        }
        messages {
          id
          text
          user {
            id
            userName
            firstName
            lastName
            avatarUrl
          }
        }
      }
    }
  }
`;

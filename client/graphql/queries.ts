import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query myAccountInfo {
    me {
      ok
      error
      user {
        id
        userName
        email
        firstName
        lastName
        createdAt
      }
    }
  }
`;

export const ONE_USER_QUERY = gql`
  query userInfo($id: ID!) {
    userInfo(id: $id) {
      ok
      error
      user {
        id
        userName
        email
        firstName
        lastName
        createdAt
      }
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query getAllUsers {
    users {
      ok
      error
      users {
        id
        userName
        email
        firstName
        lastName
        createdAt
      }
    }
  }
`;

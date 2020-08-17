import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation signUp(
    $userName: String!
    $email: String!
    $password: String!
    $verifyPassword: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      userName: $userName
      email: $email
      password: $password
      verifyPassword: $verifyPassword
      firstName: $firstName
      lastName: $lastName
    ) {
      ok
      token
      user {
        id
        userName
        firstName
        lastName
        email
      }
      error
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      user {
        id
        userName
        firstName
        lastName
        email
      }
      error
    }
  }
`;

export const MUTATION_DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      ok
      error
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      ok
    }
  }
`;

export const UPLOAD_PICTURES = gql`
  mutation singleUpload($file: [Upload!]) {
    singleUpload(file: $file) {
      ok
    }
  }
`;

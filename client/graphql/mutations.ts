import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation signUp(
    $userName: String!
    $email: String!
    $password: String!
    $verifyPassword: String!
    $firstName: String!
    $lastName: String!
    $gender: String!
    $country: String!
  ) {
    signUp(
      userName: $userName
      email: $email
      password: $password
      verifyPassword: $verifyPassword
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      country: $country
    ) {
      ok
      successMessage
      error
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      successMessage
      error
    }
  }
`;

export const MUTATION_DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      ok
      successMessage
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
  mutation uploadProfilePictures($file: [Upload!]) {
    uploadProfilePictures(file: $file) {
      ok
      successMessage
    }
  }
`;

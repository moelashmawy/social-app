import { gql } from "@apollo/client";

// new user registeration mutatiol
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

// login mutation
export const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      successMessage
      error
    }
  }
`;

// delete user mutation
export const MUTATION_DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      ok
      successMessage
      error
    }
  }
`;

// logout mutation
export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      ok
    }
  }
`;

// upload profile pics mutation
export const UPLOAD_PICTURES = gql`
  mutation uploadProfilePictures($file: [Upload!]) {
    uploadProfilePictures(file: $file) {
      ok
      successMessage
    }
  }
`;

// update profile mutation
export const UPDATE_PROGILE_MUTATION = gql`
  mutation updateProfileInfo(
    $firstName: String
    $lastName: String
    $gender: String
    $country: String
    $city: String
    $birthday: String
    $speakLanguages: [String!]
    $learnLanguages: [String!]
    $education: String
    $job: String
    $relationship: String
    $contactInfo: ContactPlatformInput
    $aboutMe: String
    $hobbies: [String!]
    $music: [String!]
    $books: [String!]
    $movies: [String!]
    $tvShows: [String!]
  ) {
    updateProfileInfo(
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      country: $country
      city: $city
      birthday: $birthday
      speakLanguages: $speakLanguages
      learnLanguages: $learnLanguages
      education: $education
      job: $job
      relationship: $relationship
      contactInfo: $contactInfo
      aboutMe: $aboutMe
      hobbies: $hobbies
      music: $music
      books: $books
      movies: $movies
      tvShows: $tvShows
    ) {
      ok
      successMessage
      error
    }
  }
`;

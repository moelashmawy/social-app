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
      error
      successMessage
    }
  }
`;

// upload profile pics mutation
export const DELETE_PICTURE = gql`
  mutation deleteProfilePicture($name: String) {
    deleteProfilePicture(name: $name) {
      ok
      error
      successMessage
    }
  }
`;

// update profile photo mutation
export const CHOOSE_PROFILE_PICTURE = gql`
  mutation chooseProfilePicture($name: String) {
    chooseProfilePicture(name: $name) {
      ok
      error
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

// Add friend (send friend request)
export const ADD_FRIEND_MUTATION = gql`
  mutation addFriend($id: ID!) {
    addFriend(id: $id) {
      ok
      error
      successMessage
    }
  }
`;

// Add friend (send friend request)
export const ACCEPT_FRIEND_MUTATION = gql`
  mutation acceptFriend($id: ID!) {
    acceptFriend(id: $id) {
      ok
      error
      successMessage
    }
  }
`;

// delete friend
export const DELETE_FRIEND_MUTATION = gql`
  mutation deleteFriend($id: ID!) {
    deleteFriend(id: $id) {
      ok
      error
      successMessage
    }
  }
`;

// Add profile to bookmarks
export const ADD_BOOKMARK_MUTATION = gql`
  mutation addBookmark($id: ID!) {
    addBookmark(id: $id) {
      ok
      error
      successMessage
    }
  }
`;

// Delete profile to bookmarks
export const DELETE_BOOKMARK_MUTATION = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      ok
      error
      successMessage
    }
  }
`;

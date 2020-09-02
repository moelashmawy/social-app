import { gql } from "@apollo/client";

// fetch the current logged in user query
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
        gender
        country
        city
        pictures
        avatarUrl
        role
        birthday
        friendsPending {
          id
          userName
          firstName
          lastName
          avatarUrl
        }
        bookmarks {
          id
          userName
          firstName
          lastName
          avatarUrl
        }
        chats {
          id
        }
        messages {
          id
        }
        contactInfo {
          skype
          instagram
          snapchat
          facebook
          website
        }
        status
        speakLanguages
        learnLanguages
        education
        job
        relationship
        aboutMe
        hobbies
        music
        books
        movies
        tvShows
        createdAt
      }
    }
  }
`;

// fetch one user query
export const ONE_USER_QUERY = gql`
  query userInfo($userName: String!) {
    userInfo(userName: $userName) {
      ok
      error
      user {
        id
        userName
        email
        firstName
        lastName
        gender
        country
        city
        pictures
        avatarUrl
        role
        birthday
        friends {
          id
          userName
          firstName
          lastName
          avatarUrl
        }
        friendsPending {
          id
          userName
          firstName
          lastName
          avatarUrl
        }
        chats {
          id
        }
        messages {
          id
        }
        contactInfo {
          skype
          instagram
          snapchat
          facebook
          website
        }
        status
        speakLanguages
        learnLanguages
        education
        job
        relationship
        aboutMe
        hobbies
        music
        books
        movies
        tvShows
        createdAt
      }
    }
  }
`;

// fetch all users query
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
        gender
        country
        city
        pictures
        avatarUrl
        role
        birthday
        friendsPending {
          id
          userName
          firstName
          lastName
          avatarUrl
        }

        chats {
          id
        }
        messages {
          id
        }
        contactInfo {
          skype
          instagram
          snapchat
          facebook
          website
        }
        status
        speakLanguages
        learnLanguages
        education
        job
        relationship
        aboutMe
        hobbies
        music
        books
        movies
        tvShows
        createdAt
      }
    }
  }
`;

// fetch all user chats query
export const ALL_USER_CHATS_QUERY = gql`
  query userChats {
    userChats {
      ok
      error
      chats {
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

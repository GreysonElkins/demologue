import { gql } from 'graphql-request'

export const GET_USER = gql`
  query GetUser($uid: String!) {
    user(uid: $uid) {
      displayName
      email
      emailVerified
      photoUrl
      uid
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      displayName
      email
      emailVerified
      photoUrl
      uid
    }
  }
`

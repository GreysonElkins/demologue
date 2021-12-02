import { gql } from 'graphql-request'

const gqlUser = `
  displayName
  email
  emailVerified
  photoUrl
  uid
  usersToBands {
    role
    bandId
  }
`
// emailVerified not currently in use

export const GET_USER = gql`
  query GetUser($uid: String!) {
    user(uid: $uid) {
      ${gqlUser}
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      ${gqlUser}
    }
  }
`

export const GET_USERS_BY_UIDS = gql`
  query MyQuery($uids: [String]!) {
    usersByUids(uids: $uids) {
      ${gqlUser}
    }
  }
`

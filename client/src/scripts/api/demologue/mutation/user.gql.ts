import { gql } from 'graphql-request'

export const CREATE_USER = gql`
  mutation createUser(
    $uid: String!
    $email: String!
    $displayName: String
    $photoUrl: String
    $emailVerified: Boolean
  ) {
    createUser(
      input: {
        user: {
          email: $email
          uid: $uid
          displayName: $displayName
          photoUrl: $photoUrl
          emailVerified: $emailVerified
        }
      }
    ) {
      user {
        uid
      }
    }
  }
`

export const UPDATE_USER_PHOTO = gql`
  mutation UpdateUserPhoto($uid: String!, $photoUrl: String!) {
    updateUser(input: { patch: { photoUrl: $photoUrl }, uid: $uid }) {
      clientMutationId
    }
  }
`
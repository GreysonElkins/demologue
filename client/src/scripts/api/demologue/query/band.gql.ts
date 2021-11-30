import { gql } from 'graphql-request'

export const GET_BANDS_BY_USER = gql`
  query GetBandsByUser($userId: String!) {
    usersToBands(condition: { userId: $userId }) {
      band {
        name
        id
      }
    }
  }
`

export const GET_BAND_BY_ID = gql`
  query GetBandsById($id: Int!) {
    bandById(id: $id) {
      id
      name
      usersToBands(condition: { role: MEMBER }) {
        user {
          photoUrl
          displayName
        }
      }
      photoUrl
      createdAt
    }
  }
`

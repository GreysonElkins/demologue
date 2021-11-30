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
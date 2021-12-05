import { gql } from 'graphql-request'

export const gqlBand = `
  id
  name
  usersToBands {
    userId
    role
  }
  photoUrl
  createdAt
  collectionsByCreatedByBand {
    id
    name
  }
`

export const GET_BAND_BY_ID = gql`
  query getBandById($id: Int!) {
    bandById(id: $id) {
      ${gqlBand}
    }
  }
`

export const GET_BANDS_BY_IDS = gql`
  query getBandsByIds($ids: [Int]!) {
    bandsByIds(ids: $ids) {
      ${gqlBand}
    }
  }
`

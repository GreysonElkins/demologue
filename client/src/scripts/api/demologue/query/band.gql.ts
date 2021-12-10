import { gql } from 'graphql-request'

export const gqlCollection = `
  id
  name
  collectionToTracks {
    trackId
    order
    dateAdded
  }
`

export const gqlBand = `
    id
    name
    usersToBands {
      userId
      role
    }
    photoUrl
    createdAt
    tracks {
      id
      updatedAt
    }
    collectionsByCreatedByBand {
     ${gqlCollection}
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

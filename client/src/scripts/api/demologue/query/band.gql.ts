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

export const SEARCH_BANDS = gql`
  query SearchBands($query: String!) {
    bandsConnection(filter: { name: { includesInsensitive: $query } }) {
      nodes {
        name
        id
        photoUrl
        tracksConnection {
          totalCount
        }
        usersToBandsConnection(condition: { role: MEMBER }) {
          totalCount
        }
      }
    }
  }
`

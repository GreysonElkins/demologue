import { gql } from 'graphql-request'

export const gqlTrack = `
  bandId
  createdAt
  id
  isPublic
  title
  trackUrl
  updatedAt
  uploadedBy
  workingTitle
  cloudinaryId
`

export const CREATE_TRACK = gql`
  mutation updateBandPhoto(
    $trackUrl: String!
    $title: String
    $workingTitle: String
    $bandId: Int!
    $uploadedBy: String!
    $cloudinaryId: String!
  ) {
    createTrack(
      input: {
        track: {
          bandId: $bandId
          trackUrl: $trackUrl
          title: $title
          workingTitle: $workingTitle
          uploadedBy: $uploadedBy
          cloudinaryId: $cloudinaryId
        }
      }
    ) {
      track {
        ${gqlTrack}
      }
    }
  }
`

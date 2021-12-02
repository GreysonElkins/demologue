import { gql } from 'graphql-request'

const gqlTrack = `
  bandId
  id
  title
  trackUrl
  uploadedBy
  updatedAt
  workingTitle
  createdAt
`

export const CREATE_TRACK = gql`
  mutation updateBandPhoto(
    $trackUrl: String!
    $title: String
    $workingTitle: String
    $bandId: Int!
    $uploadedBy: String!
  ) {
    createTrack(
      input: {
        track: {
          bandId: $bandId
          trackUrl: $trackUrl
          title: $title
          workingTitle: $workingTitle
          uploadedBy: $uploadedBy
        }
      }
    ) {
      track {
        ${gqlTrack}
      }
    }
  }
`

import { gql } from "graphql-request"
import { gqlTrack } from "../mutation/track.gql"

export const GET_TRACKS_BY_IDS = gql`
  query getTracksByIds($ids: [Int]!) {
    tracksByIds(ids: $ids) {
      ${gqlTrack}
    }
  }
`

export const GET_TRACK_BY_ID = gql`
  query getTrackById($id: Int!) {
    track(ids: $ids) {
      ${gqlTrack}
    }
  }
`


import endpoint from 'scripts/api/demologue'
import { GET_TRACKS_BY_IDS, GET_TRACK_BY_ID } from 'scripts/api/demologue/query/track.gql'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'

import type { gqlTrack } from 'types/Track.d'

type ByIdsResponse = {
  tracksByIds: gqlTrack[]
}

export const getTracksByIds = (ids: number[] | null) => {
  return useQuery(
    'get-tracks-by-ids',
    async () => {
      const { tracksByIds }: ByIdsResponse = await request(endpoint, GET_TRACKS_BY_IDS, { ids })
      return tracksByIds
    },
    { enabled: !!ids }
  )
}

type ByIdResponse = {
  track: gqlTrack
}

export const getTrackById = (id: number | null) => {
  return useQuery(
    'get-track-by-id',
    async () => {
      const { track }: ByIdResponse = await request(endpoint, GET_TRACK_BY_ID, { id })
      return track
    },
    { enabled: !!id }
  )
}

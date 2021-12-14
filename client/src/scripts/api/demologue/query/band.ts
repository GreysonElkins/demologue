import endpoint from 'scripts/api/demologue'
import { GET_BAND_BY_ID, GET_BANDS_BY_IDS, SEARCH_BANDS } from 'scripts/api/demologue/query/band.gql'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'
import { PartialBand } from 'types/Band'

import type { gqlBand } from 'types/Band'

type ByIdResponse = {
  bandById: gqlBand
}

export const getBandById = (id: number | null) => {
  return useQuery(
    'get-band-by-id',
    async () => {
      const { bandById: data } :ByIdResponse = await request(endpoint, GET_BAND_BY_ID, { id })
      return data
    },
    { enabled: !!id }
  )
}

type ByIdsResponse = {
  bandsByIds: gqlBand[]
}

export const getBandsByIds = (ids: number[] | null) => {
  return useQuery(
    'get-bands-by-ids',
    async () => {
      const { bandsByIds }: ByIdsResponse = await request(endpoint, GET_BANDS_BY_IDS, { ids })
      return bandsByIds
    },
    { enabled: !!ids }
  )
}

type SearchResponse = {
  bandsConnection: {
    nodes: PartialBand[]
  }
}

export const searchBands = (query: string) => {
  return useQuery('search-bands', async () => {
    const { bandsConnection: { nodes } }: SearchResponse = await request(endpoint, SEARCH_BANDS, { query })
    return nodes
  }, 
  { enabled: !!query })
}

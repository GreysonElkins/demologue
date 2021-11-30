import endpoint from 'scripts/api/demologue'
import { GET_BANDS_BY_USER, GET_BAND_BY_ID } from 'scripts/api/demologue/query/band.gql'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'

export const getBandsByUser = (userId?: string) => {
  return useQuery(
    'user-to-bands',
    async () => {
      const { usersToBands: data }: any = await request(endpoint, GET_BANDS_BY_USER, { userId })
      return data
    },
    { enabled: !!userId }
  )
}

export const getBandById = (id: number) => {
  return useQuery(
    'get-band-by-id',
    async () => {
      const { bandById: data } :any = await request(endpoint, GET_BAND_BY_ID, { id })
      return data
    }
  )
}

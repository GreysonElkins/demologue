import endpoint from 'scripts/api/demologue'
import { GET_USER } from 'scripts/api/demologue/query/user.gql'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'

export const getUser = (uid?: string) => {
  return useQuery(
    'user',
    async () => {
      const { user: data }: any = await request(endpoint, GET_USER, { uid })
      return data
    },
    { enabled: !!uid }
  )
}

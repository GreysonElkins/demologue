import endpoint from 'scripts/api/demologue'
import { GET_USER, GET_USERS_BY_UIDS } from 'scripts/api/demologue/query/user.gql'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'
import { gqlUser } from 'types/User'

export const getUserByUid = (uid: string | null) => {
  return useQuery(
    'user',
    async () => {
      const { user: data }: any = await request(endpoint, GET_USER, { uid })
      return data
    },
    { enabled: !!uid }
  )
}
export const getViewer = (uid: string | null) => {
  return useQuery(
    'viewer',
    async () => {
      const { user: data }: any = await request(endpoint, GET_USER, { uid })
      return data
    },
    { enabled: !!uid }
  )
}

export const getUsersByUids = (uids: string[] | null) => {
  return useQuery(
    'user-by-uids',
    async () => {
      const { usersByUids }: { usersByUids: gqlUser[] } = await request(endpoint, GET_USERS_BY_UIDS, { uids })
      return usersByUids
    },
    { enabled: !!uids }
  )
}

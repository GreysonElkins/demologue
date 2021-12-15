import endpoint from 'scripts/api/demologue'
import { useQuery } from 'react-query'
import { request } from 'graphql-request'
import { GET_MESSAGES } from './message.gql'
import { gqlMessage } from 'types/Message.d'

interface BandMessage extends gqlMessage {
  band: {
    id: number
    name: string
  }
}

type Response = {
  messages: gqlMessage[]
  messagesByBands: BandMessage[]
}

type Params = {
  bands: number[]
  userId: string | null
}

export const getMessages = ({ bands, userId }: Params) => {
  return useQuery(
    'get-messages',
    async () => {
      const data: Response = await request(endpoint, GET_MESSAGES, { userId, bands }) 
      return data
    },
    { enabled: !!userId && !!bands}
  )
}

import endpoint from 'scripts/api/demologue'
import { useMutation } from 'react-query'
import { request } from 'graphql-request'
import { CREATE_BAND, CREATE_USERS_TO_BAND } from './band.gql'

// move types to type dir
type NewBand = {
  name: string
}

type JoinBandData = {
  role?: string // needs an actual type
  bandId: number
  userId: string
}

export const useAddUserToBand = () => useMutation(async ({ role = 'GUEST', bandId, userId }: JoinBandData) => {
  try {
    await request(endpoint, CREATE_USERS_TO_BAND, { bandId, userId, role })
  } catch (error) {
    console.error(error)
  }
})

export const useCreateBand = () => useMutation(async ({ name }: NewBand) => {
  try {
    const {
      createBand: {
        band: { id },
      },
    } = await request(endpoint, CREATE_BAND, { name: name.toLowerCase() })
    return id
  } catch (error: any) {
    if (error.message.includes('duplicate key value violates unique constraint "band_name"')) {
      console.error('band exists')
      return false
    }
    console.error(error)
  }
})

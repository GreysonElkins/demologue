import endpoint from 'scripts/api/demologue'
import { QueryClient, useMutation } from 'react-query'
import { request } from 'graphql-request'
import { CREATE_BAND, CREATE_USERS_TO_BAND, UPDATE_BAND_PHOTO } from './band.gql'
import { toast } from 'react-toastify'

// move types to type dir
type NewBand = {
  name: string
}

type JoinBandData = {
  role?: string // needs an actual type
  bandId: number
  userId: string
}

export const useAddUserToBand = (queryClient?: QueryClient) =>
  useMutation(
    async ({ role = 'GUEST', bandId, userId }: JoinBandData) => {
      try {
        const { createUsersToBand: { band } } = await request(endpoint, CREATE_USERS_TO_BAND, { bandId, userId, role })
        return band
      } catch (error) {
        toast.warn('Something went wrong while adding you to the band, please try again', {
          toastId: 'create-band-to-user-error',
        })
        console.error(error)
      }
    },
    {
      onSuccess: () => {
        queryClient && queryClient.invalidateQueries('user')
        // this query is depre
      },
    }
  )

export const useCreateBand = () => useMutation(async ({ name }: NewBand) => {
  try {
    const {
      createBand: {
        band,
      },
    } = await request(endpoint, CREATE_BAND, { name: name.toLowerCase() })
    return band
  } catch (error: any) {
    if (error.message.includes('duplicate key value violates unique constraint "band_name"')) {
      return console.error('band exists')
    }
    toast.warn('Something went wrong creating your band, please try again', {
      toastId: 'create-band-error',
    })
    console.error(error)
  }
})

export const updateBandPhoto = () => useMutation(async ({ id, photoUrl }: { id: number, photoUrl: string}) => {
  try {
    await request(endpoint, UPDATE_BAND_PHOTO, { id, photoUrl })
  } catch (error) {
    console.error(error)
  }
})

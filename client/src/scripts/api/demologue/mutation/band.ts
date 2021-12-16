import endpoint from 'scripts/api/demologue'
import { QueryClient, useMutation } from 'react-query'
import { request } from 'graphql-request'
import { ADD_BAND_MEMBER, CREATE_BAND, CREATE_USERS_TO_BAND, REQUEST_BAND_ACCESS, UPDATE_BAND_PHOTO } from './band.gql'
import { toast } from 'react-toastify'
import { BandRole } from 'types/Band'

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
// this has been duplicated by addBandMember
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
        queryClient && queryClient.invalidateQueries('viewer')
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

export const requestBandAccess = () => useMutation(
  async ({ userId, bandId, role }: { userId: string, bandId: number, role?: BandRole }) => {
    try {
      await request(endpoint, REQUEST_BAND_ACCESS, { userId, bandId, role: role || "REQUEST"})
      toast.success("Request sent!")
    } catch (error) {
      toast.error("Something went wrong!")
      console.error(error)
    }
  }
)

export const addBandMember = (queryClient?: QueryClient) =>
  useMutation(
    async ({ userId, bandId, approvedBy }: { userId: string; bandId: number, approvedBy?: string }) => {
      try {
        const result = await request(endpoint, ADD_BAND_MEMBER, { userId, bandId, role: "MEMBER", approvedBy })
      } catch (error) {
        toast.error('Something went wrong!')
        console.error(error)
      }
    },
    {
      onSuccess: () => {
        queryClient && queryClient.invalidateQueries('viewer')
        // this query is depre
      },
    }
  )

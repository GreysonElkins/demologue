import endpoint from 'scripts/api/demologue'
import { useMutation } from 'react-query'
import { request } from 'graphql-request'
import { CREATE_USER, UPDATE_USER_PHOTO } from './user.gql'

export const useCreateUser = () =>
  useMutation(async (newUser: any) => {
    try {
      const {
        createUser: { user },
      } = await request(endpoint, CREATE_USER, { ...newUser })
      return user
    } catch (error) {
      console.error(error)
    }
  })

export const updateUserPhoto = () =>
  useMutation(async ({ uid, photoUrl }: { uid: string; photoUrl: string }) => {
    try {
      await request(endpoint, UPDATE_USER_PHOTO, { uid, photoUrl })
    } catch (error) {
      console.error(error)
    }
  })


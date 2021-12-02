import endpoint from 'scripts/api/demologue'
import { useMutation } from 'react-query'
import { request } from 'graphql-request'
import { CREATE_USER } from './user.gql'

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

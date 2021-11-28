import endpoint from 'scripts/api/demologue'
import { useMutation } from 'react-query'
import { request } from 'graphql-request'
import { CREATE_USER } from './user.gql'
import { ParsedFirebaseUser } from 'types/firebase'

const UserMutations = () => {
  const { mutate: createUser } = useMutation(async (newUser: ParsedFirebaseUser) => {
    try {
      const response: any = await request(endpoint, CREATE_USER, { ...newUser })
      return response
    } catch (error) {
      console.error(error)
    }
  })

  return { createUser }
}

export default UserMutations

import { gql } from 'graphql-request'
import { gqlBand } from '../query/band.gql'

export const CREATE_BAND = gql`
  mutation CreateBand($name: String!) {
    createBand(input: { band: { name: $name } }) {
      band {
        ${gqlBand}
      }
    }
  }
`

export const CREATE_USERS_TO_BAND = gql`
  mutation CreateUsersToBand($bandId: Int!, $userId: String!, $role: UserRole!) {
    createUsersToBand(input: { usersToBand: { userId: $userId, bandId: $bandId, role: $role } }) {
      band {
        ${gqlBand}
      }
    }
  }
`

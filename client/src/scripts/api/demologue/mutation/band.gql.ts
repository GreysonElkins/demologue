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

export const UPDATE_BAND_PHOTO = gql`
  mutation updateBandPhoto($id: Int!, $photoUrl: String) {
    updateBandById(input: { patch: { photoUrl: $photoUrl }, id: $id }) {
      clientMutationId
    }
  }
`

export const REQUEST_BAND_ACCESS = gql`
  mutation RequestBandAccess($bandId: Int!, $userId: String!, $role: UserRole!) {
    createUsersToBand(input: { usersToBand: { userId: $userId, bandId: $bandId, role: $role } }) {
      clientMutationId
    }
  }
`

export const ADD_BAND_MEMBER = gql`
  mutation AddBandMember($bandId: Int!, $userId: String!, $role: UserRole!) {
    updateUsersToBand(input: { patch: { role: $role }, userId: $userId, bandId: $bandId }) {
      band {
        ${gqlBand}
      }
    }
  }
`

export const REMOVE_BAND_MEMBER = gql`
  mutation AddBandMember($bandId: Int!, $userId: String!) {
    deleteUsersToBand(input: { userId: $userId, bandId: $bandId }) {
      clientMutationId
    }
  }
`

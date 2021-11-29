import endpoint from 'scripts/api/demologue'
import { useMutation } from 'react-query'
import { request } from 'graphql-request'
import { CREATE_BAND, CREATE_USERS_TO_BAND } from './band.gql'

// move types to type dir
type NewBand = {
  name: string
}

type NewBandMember = {
  userId: string
  role?: string // needs an actual type
  bandId: number
}

type NewBandWithUser = {
   userId: string
  role?: string // needs an actual type
 name: string
}

const BandMutations = () => {
  const { mutate: createBand } = useMutation(async (newBand: NewBand) => {
    try {
      const response: any = await request(endpoint, CREATE_BAND, { ...newBand })
      return response
    } catch (error) {
      console.error(error)
    }
  })

  const { mutate: addUserToBand } = useMutation(async (bandMember: NewBandMember) => {
    try {
      const response: any = await request(endpoint, CREATE_USERS_TO_BAND, { role: "GUEST", ...bandMember })
      return response
    } catch (error) {
      console.error(error)
    }
  })

  const startBand = async ({ userId, role, name }: NewBandWithUser) => {
    if (role === "GUEST") return console.error("A new band can't be created by a guest")
    const bandId = await createBand({ name })
    console.log({ bandId })
    // await addUserToBand({ userId, role, bandId })
    // invalidate bands list?
  }

  return { startBand, addUserToBand }
}

export default BandMutations

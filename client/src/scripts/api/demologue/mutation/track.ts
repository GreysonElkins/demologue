import request from "graphql-request"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import endpoint from "scripts/api/demologue"
import { CREATE_TRACK } from "./track.gql"

type NewTrackData = {
  url: string,
  title?: string
  workingTitle?: string
  bandId: number
  userId: string
}

export const createTrack = () => 
  useMutation(
    async({ url: trackUrl, title, workingTitle, bandId: ownedBy, userId: uploadedBy }: NewTrackData) => {
      try {
        const { createTrack: track } = await request(endpoint, CREATE_TRACK, { trackUrl, title, workingTitle, ownedBy, uploadedBy })
        return track
      } catch (error) {
        toast.error("Something went wrong while saving your track, please try again")
        console.error(error)
      }
    }
  )

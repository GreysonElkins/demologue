import { createContext, useContext, useState, useEffect } from 'react'
import { getTracksByIds, getTrackById } from 'scripts/api/demologue/query/track'
import Collection from 'types/Collection'
import Track, { gqlTrack } from 'types/Track.d'

export type TrackMap = {
  [key: number]: Track
}

type TracksContextValue = {
  checkForTracks: (ids: number[]) => void
  checkForTrack: (id: number) => void
  tracks: TrackMap
}

const TracksContext = createContext({} as TracksContextValue)

export const TracksProvider: React.FC = ({ children }) => {
  const [tracks, setTracks] = useState<TrackMap>({})
  const [missingTrack, setMissingTrack] = useState<number | null>(null)
  const [missingTracks, setMissingTracks] = useState<number[] | null>(null)
  // const [loading, setLoading] = useState<boolean>(false)
  const { data: fetchedTracks, refetch } = getTracksByIds(missingTracks)
  const { data: fetchedTrack } = getTrackById(missingTrack)
//   const { mutate: updatePhoto } = updateBandPhoto()

  useEffect(() => {
    if (missingTracks) refetch()
  }, [missingTracks])
  // will this run twice on first render?

  useEffect(() => {
    if (fetchedTrack) saveGqlTrack(fetchedTrack)
  }, [fetchedTrack])

  useEffect(() => {
    if (!fetchedTracks || fetchedTracks.length === 0) return
    const newTrackMap = fetchedTracks.reduce(
      (map, track) => ({ ...map, [track.id]: new Track(track) }),
      {} as TrackMap
    )
    setTracks((prev) => ({ ...prev, ...newTrackMap }))
  }, [fetchedTracks])

  const saveGqlTrack = (track: gqlTrack) =>
    setTracks((prev) => ({ ...prev, [track.id]: new Track(track) }))

  const checkForTrack = (id: number) => {
    const savedTrack = tracks[id]
    if (!savedTrack) setMissingTrack(id)
  }

  const checkForTracks = (ids: number[]) => {
    const missing = ids.filter((id) => !tracks[id])
    if (missing.length > 0) setMissingTracks(missing)
  }

  return (
    <TracksContext.Provider
      value={{
        checkForTracks,
        checkForTrack,
        tracks
        // loading
      }}
    >
      {children}
    </TracksContext.Provider>
  )
}

export const useTracks = <T extends number | number[] | Collection>(selection?: T) => {
  type Match = T extends number ? Track : Track[]
  const [match, setMatch] = useState<Match | null>(null)
  const { checkForTrack, checkForTracks, ...context } = useContext(TracksContext)

  const findTrackMatches = () => {
    if (!selection) return {}
    if (typeof selection === 'number') return context.tracks[selection] as Match
    if (Array.isArray(selection)) return Object.values(context.tracks).filter(({ id }) => selection.includes(id))

  }

  useEffect(() => {
    const match = findTrackMatches()
    setMatch(match as Match)
  }, [JSON.stringify(context.tracks)])

  useEffect(() => {
    if (typeof selection === 'number') {
      checkForTrack(selection)
    } else if (Array.isArray(selection)) {
      checkForTracks(selection)
    } else if (!!selection) {
      const tracks = selection.getCollectionIds()
      checkForTracks(tracks)
    }
    const match = findTrackMatches()
    setMatch(match as Match)
  }, [selection])

  return { ...context, match }
}

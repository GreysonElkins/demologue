import { createContext, useContext, useState, useEffect } from 'react'
import Band, { BandRole, gqlBand } from 'types/Band.d'
import { getBandById, getBandsByIds } from 'scripts/api/demologue/query/band'
import { updateBandPhoto } from 'scripts/api/demologue/mutation/band'

export type BandMap = {
  [key: number]: Band
}

type BandsContextValue = {
  checkForBand: (id: number) => void
  checkForBands: (ids: number[]) => void
  bands: BandMap
  saveGqlBand: (band: gqlBand) => void
  changeBandPhoto: (id: number, photoUrl: string) => void
  updateBandMemberRole: (bandId: number, userId: string, role: BandRole) => void
}

const BandsContext = createContext({} as BandsContextValue)

export const BandsProvider: React.FC = ({ children }) => {
  const [bands, setBands] = useState<BandMap>({})
  const [missingBand, setMissingBand] = useState<number | null>(null)
  const [missingBands, setMissingBands] = useState<number[] | null>(null)
  const { data: fetchedBand, refetch } = getBandById(missingBand)
  const { data: fetchedBands } = getBandsByIds(missingBands)
  const { mutate: updatePhoto } = updateBandPhoto()

  useEffect(() => { if (missingBand) refetch() }, [missingBand]) 
  // will this run twice on first render?

  useEffect(() => { if (fetchedBand) saveGqlBand(fetchedBand) }, [fetchedBand])

  useEffect(() => {
    if (!fetchedBands || fetchedBands.length === 0) return
    const newBandMap = fetchedBands.reduce(
      (map, band) => ({ ...map, [band.id]: new Band(band) }),
      {} as BandMap
    )
    setBands((prev) => ({ ...prev, ...newBandMap }))
  }, [fetchedBands])

  const saveGqlBand = (band: gqlBand) => setBands(prev => ({ ...prev, [band.id]: new Band(band)}))

  const checkForBand = (id: number) => {
    const savedBand = bands[id]
    if (!savedBand) setMissingBand(id)
  }

  const checkForBands = (ids: number[]) => {
    const missing = ids.filter(id => !bands[id])
    if (missing.length > 0) setMissingBands(missing)
  }

  const changeBandPhoto = async (id: number, photoUrl: string) => {
    try {
      await updatePhoto({ id, photoUrl })
      const updatedBand = { ...bands[id], photoUrl }
      setBands(prev => ({ ...prev, [id]: updatedBand }))
    } catch (error) {
      console.error(error)
    }
  }

  const updateBandMemberRole = (bandId: number, userId: string, role: BandRole) => {
    const state = { ...bands }
    state[bandId].members[userId] = role
    setBands(state)
  }

  return (
    <BandsContext.Provider
      value={{
        updateBandMemberRole,
        checkForBand,
        saveGqlBand,
        checkForBands,
        bands: bands,
        changeBandPhoto,
      }}
    >
      {children}
    </BandsContext.Provider>
  )
}

export const useBands = <T extends number | number[]>(selection?: T) => {
  type Match = T extends number ? Band : Band[]
  const [match, setMatch] = useState<Match | null>(null)
  const { checkForBand, checkForBands, ...context} = useContext(BandsContext)

  const findBandMatches = () => {
    if (!selection) return {}
    if (typeof selection === "number") return context.bands[selection] as Match
    return Object.values(context.bands).filter(({ id }) => selection.includes(id))
  }

  useEffect(() => {
    const match = findBandMatches()
    setMatch(match as Match)
  }, [JSON.stringify(context.bands)])

  useEffect(() => {
    if (typeof selection === "number") {
      checkForBand(selection)
    } else if (Array.isArray(selection)) {
      checkForBands(selection)
    }
    const match = findBandMatches()
    setMatch(match as Match)
  }, [selection])

  return { ...context, match }
}

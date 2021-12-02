import { createContext, useContext, useState, useEffect } from 'react'
import Band, { gqlBand } from 'types/Band'
import { getBandById, getBandsByIds } from 'scripts/api/demologue/query/band'

export type BandMap = {
  [key: number]: Band
}

type BandsContextValue = {
  checkForBand: (id: number) => void
  checkForBands: (ids: number[]) => void
  bands: BandMap
  saveGqlBand: (band: gqlBand) => void
}

const BandsContext = createContext({} as BandsContextValue)

export const BandsProvider: React.FC = ({ children }) => {
  const [bands, setBands] = useState<BandMap>({})
  const [missingBand, setMissingBand] = useState<number | null>(null)
  const [missingBands, setMissingBands] = useState<number[] | null>(null)
  const { data: fetchedBand, refetch } = getBandById(missingBand)
  const { data: fetchedBands } = getBandsByIds(missingBands)

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

  return (
    <BandsContext.Provider value={{ checkForBand, saveGqlBand, checkForBands, bands: bands }}>
      {children}
    </BandsContext.Provider>
  )
}

export const useBands = <T extends number | number[]>(selection?: T) => {
  type Match = T extends number ? Band : Band []
  const [match, setMatch] = useState<Match | null>(null)
  const { checkForBand, checkForBands, ...context} = useContext(BandsContext)

  useEffect(() => {
    if (typeof selection === "number") {
      setMatch(context.bands[selection] as Match)
    } else if (Array.isArray(selection)) {
      const matches = Object.values(context.bands).filter(({ id }) => selection.includes(id))
      setMatch(matches as Match)
    }
  }, [JSON.stringify(context.bands)])

  useEffect(() => {
    if (typeof selection === "number") {
      checkForBand(selection)
      context.bands[selection] && setMatch(context.bands[selection] as Match)
    } else if (Array.isArray(selection)) {
      checkForBands(selection)
      const matches = Object.values(context.bands).filter(({ id }) => selection.includes(id))
      setMatch(matches as Match)
    }
  }, [selection])

  return { ...context, match }
}

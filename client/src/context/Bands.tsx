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
  saveBand: (band: gqlBand) => void
}

const BandsContext = createContext({} as BandsContextValue)

export const BandsProvider: React.FC = ({ children }) => {
  const [missingBand, setMissingBand] = useState<number | null>(null)
  const [missingBands, setMissingBands] = useState<number[] | null>(null)
  const [bands, setBands] = useState<BandMap>({})
  const { data: fetchedBand, refetch } = getBandById(missingBand)
  const { data: fetchedBands } = getBandsByIds(missingBands)

  useEffect(() => {
    if (!fetchedBands || fetchedBands.length === 0) return
    const newBandMap = fetchedBands?.reduce(
      (map, band) => ({ ...map, [band.id]: new Band(band) }),
      {} as BandMap
    )
    setBands(prev => ({ ...prev, ...newBandMap }))
  }, [fetchedBands])

  useEffect(() => {
    if (!fetchedBand) return
    setBands(prev => ({ ...prev, [fetchedBand.id]: new Band(fetchedBand) }))
  }, [fetchedBand])

  useEffect(() => {
    if (!missingBand) return
    refetch()
  }, [missingBand])

  const checkForBand = (id: number) => {
    const savedBand = bands[id]
    if (!savedBand) setMissingBand(id)
  }

  const checkForBands = (ids: number[]) => {
    const missing = ids.filter(id => !bands[id])
    if (missing.length > 0) setMissingBands(missing)
  }

  const saveBand = (band: gqlBand) => setBands(prev => ({ ...prev, [band.id]: new Band(band)}))

  return (
    <BandsContext.Provider value={{ checkForBand, saveBand, checkForBands, bands: bands }}>
      {children}
    </BandsContext.Provider>
  )
}

export const useBands = (selection?: number | number[]) => {
  const context = useContext(BandsContext)

  useEffect(() => {
    if (typeof selection === "number") context.checkForBand(selection)
    if (Array.isArray(selection) && selection.length > 0) 
      context.checkForBands(selection)
  }, [selection])

  return context
}

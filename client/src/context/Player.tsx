import { createContext, useContext, useState, useRef, useCallback, MutableRefObject } from 'react'
import WaveSurfer from 'wavesurfer.js'
import AudioPlayer from 'components/AudioPlayer'

type PlayerContextValue = {
  isMounted: boolean
  isPlaying: boolean
  mountTrack: (url: string | null) => void
  playPause: () => void
  wave: MutableRefObject<HTMLDivElement | null> | null
}

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: '#95a0a5',
  progressColor: '#53f591',
  cursorColor: '#1a72d8',
  barWidth: 2,
  barRadius: 3,
  height: 40,
  width: '100%',
  normalize: true,
  partialRender: true,
  responsive: true,
  fillParent: true,
  minPxPerSec: 80,
})

const PlayerContext = createContext({} as PlayerContextValue)

export const PlayerProvider: React.FC = ({ children }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const wave = useRef<HTMLDivElement | null>(null)
  const audio = useRef<WaveSurfer | null>(null)

  const playPause = useCallback(() => {
    audio.current?.playPause()
    setIsPlaying((prev) => !prev)
  }, [])

  const setInternalRef = useCallback((url: string) => {
    if (!url) return
    audio.current?.destroy()
    const options = formWaveSurferOptions(wave.current)
    audio.current = WaveSurfer.create(options)

    audio.current.load(url)
    setIsMounted(true)

    return () => audio.current?.destroy()
  }, [])

  const mountTrack = (url: string | null) => {
    if (!url) return // maybe stop playing and unmount?
    setInternalRef(url)
  }

  return (
    <PlayerContext.Provider value={{ isMounted, mountTrack, playPause, isPlaying, wave }}>
      {children}
      {/* <AudioPlayer>{Wave}</AudioPlayer> */}
      <AudioPlayer />
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)

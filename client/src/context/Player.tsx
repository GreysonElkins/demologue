import { createContext, useContext, useState, useEffect, useRef, useCallback, MutableRefObject } from 'react'
import WaveSurfer from 'wavesurfer.js'
import AudioPlayer from 'components/AudioPlayer'

type PlayerContextValue = {
  isMounted: boolean
  isPlaying: boolean
  handleWaveformClick: (audioRef: WaveSurfer | null) => void
  playPause: () => void
}

const PlayerContext = createContext({} as PlayerContextValue)

export const PlayerProvider: React.FC = ({ children }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const playingRef = useRef<WaveSurfer | null>(null)
  const [volume, setVolume] = useState<number>(1)

  const checkMount = useCallback(() => {
    if (playingRef.current && !isMounted) setIsMounted(true)
    if (!playingRef.current && isMounted) setIsMounted(false)
  }, [playingRef.current])

  const playPause = useCallback(() => {
    playingRef.current?.playPause()
    setIsPlaying(prev => !prev)
  }, [])

  const handleWaveformClick = (
    audioRefCurrent: WaveSurfer | null
  ) => {
    if (playingRef.current && audioRefCurrent !== playingRef.current) {
      // switching off old player
      {isPlaying && playPause()}
      playingRef.current = null
    }
    if (!playingRef.current) {
      playingRef.current = audioRefCurrent
      playPause()
    }
    checkMount()
  }

  return (
    <PlayerContext.Provider
      value={{ isMounted, handleWaveformClick, playPause, isPlaying }}
    >
      {children}
      <AudioPlayer />
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)

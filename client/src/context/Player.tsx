import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  MutableRefObject,
  useEffect,
} from 'react'
import WaveSurfer from 'wavesurfer.js'
import AudioPlayer from 'components/AudioPlayer'
import { useTracks } from './Tracks'
import Track from 'types/Track'

type PlayerContextValue = {
  isMounted: boolean
  isPlaying: boolean
  mountTrack: (trackId: number) => void
  playPause: () => void
  wave: MutableRefObject<HTMLDivElement | null> | null
  trackInfo: Track | null
}

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: '#95a0a5',
  progressColor: '#53f591',
  cursorColor: '#1a72d8',
  barWidth: 2,
  barRadius: 3,
  height: 30,
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
  const [selectedTrack, selectTrack] = useState<number | undefined>(undefined)
  const { match: track } = useTracks(selectedTrack)
  const wave = useRef<HTMLDivElement | null>(null)
  const audio = useRef<WaveSurfer | null>(null)

  const playPause = useCallback(() => {
    audio.current?.playPause()
  }, [])

  useEffect(() => {
    if (!track) return
    setInternalRef()
  }, [track])

  const handleAudioEvents = () => {
    audio.current?.on('ready', () => {
      setIsMounted(true)
      playPause()
    })
    audio.current?.on('play', () => setIsPlaying(true))
    audio.current?.on('pause', () => setIsPlaying(false))
  }

  const handleKeyboardEvents = (event: KeyboardEvent) => {
    if (event.code ===  "Space") {
      playPause()
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', event => handleKeyboardEvents(event))
    return window.removeEventListener('keyup', event => handleKeyboardEvents(event))
  }, [])

  const setInternalRef = useCallback(() => {
    audio.current?.destroy()
    if (!track || !track.trackUrl) return
    const options = formWaveSurferOptions(wave.current)
    audio.current = WaveSurfer.create(options)
    handleAudioEvents()
    audio.current.load(track.trackUrl)
    return () => audio.current?.destroy()
  }, [track])

  const mountTrack = (trackId: number) => {
    if (!trackId) return // maybe stop playing and unmount?
    selectTrack(trackId)
  }

  return (
    <PlayerContext.Provider value={{ isMounted, mountTrack, playPause, isPlaying, wave, trackInfo: track }}>
      {children}
      <AudioPlayer />
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)

import { useState, useRef, useEffect, useCallback } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { usePlayer } from 'context/Player'

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: '#eee',
  progressColor: '#53f591',
  cursorColor: '#1a72d8',
  barWidth: 2,
  barRadius: 3,
  height: 60,
  width: '100%',
  normalize: true,
  partialRender: true,
  responsive: false,
  fillParent: true,
  minPxPerSec: 20,
})


const Waveform: React.FC<{ url: string | null }> = ({ url }) => {
  const waveformRef = useRef(null)
  const audioRef = useRef<WaveSurfer | null>(null)
  const { handleWaveformClick } = usePlayer()

  const setInternalRef = useCallback(() => {
    if (!url) return
    const options = formWaveSurferOptions(waveformRef.current)
    audioRef.current = WaveSurfer.create(options)

    audioRef.current.load(url)
    // audioRef.triggerReset = 
    return () => audioRef.current?.destroy()
  }, [url])

  useEffect(() => {
    setInternalRef()
  }, [url])

  if (!url) return <></>
  return (
    <>
      <div onClick={() => handleWaveformClick(audioRef.current)} ref={waveformRef} />
    </>
  )
}

export default Waveform

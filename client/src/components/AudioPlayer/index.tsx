import { usePlayer } from 'context/Player'

import PlayerControls from './PlayerControls'
import PlayingTrack from './PlayingTrack'

const AudioPlayer: React.FC = () => {
  const { isMounted } = usePlayer()
  return (
    <div className={`AudioPlayer ${isMounted ? 'open' : 'closed'}`}>
      <PlayingTrack />
      <PlayerControls />
    </div>
  )
}

export default AudioPlayer

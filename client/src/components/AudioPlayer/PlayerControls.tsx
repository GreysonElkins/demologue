import { usePlayer } from "context/Player"

import { Icon } from "style/Icon"
import './index.scss'

const PlayerControls: React.FC = () => {
  const { isMounted, isPlaying, playPause } = usePlayer()
  return (
    <div className={`PlayerControls ${isMounted ? 'open' : 'closed'}`}>
      <button className="play-button" onClick={playPause}>
        <Icon icon={isPlaying ? 'pause' : 'play'} />
      </button>
    </div>
  )
}

export default PlayerControls

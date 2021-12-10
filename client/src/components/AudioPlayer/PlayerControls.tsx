import { usePlayer } from "context/Player"

import { Icon } from "style/Icon"
import './index.scss'

const PlayerControls: React.FC = () => {
  const { isPlaying, playPause, isMounted } = usePlayer()
  return (
    <div className="PlayerControls">
      <button className="play-button" onClick={playPause} tabIndex={isMounted ? 0 : -1}>
        <Icon icon={isPlaying ? 'pause' : 'play'} />
      </button>
    </div>
  )
}

export default PlayerControls

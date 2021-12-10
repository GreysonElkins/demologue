import { useBands } from 'context/Bands'
import { usePlayer } from 'context/Player'

const PlayingTrack: React.FC = () => {
  const { wave, trackInfo } = usePlayer()
  const { match: band } = useBands(trackInfo?.bandId)
  return (
    <div className="PlayingTrack">
      <div ref={wave} />
      <div className="track-info">
        <i>{trackInfo?.title || trackInfo?.workingTitle || 'Untitled'}</i> -{' '}
        <b style={{ textTransform: 'capitalize' }}>{band?.name}</b>
      </div>
    </div>
  )
}

export default PlayingTrack

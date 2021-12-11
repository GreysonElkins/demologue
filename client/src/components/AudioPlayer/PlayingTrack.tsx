import { Link } from 'react-router-dom'
import { useBands } from 'context/Bands'
import { usePlayer } from 'context/Player'

const PlayingTrack: React.FC = () => {
  const { wave, trackInfo } = usePlayer()
  const { match: band } = useBands(trackInfo?.bandId)
  return (
    <div className="PlayingTrack">
      <div style={{ marginBottom: '20px' }} ref={wave} />
      <Link to={`/band/${band?.id}`} className="track-info">
        <i>{trackInfo?.title || trackInfo?.workingTitle || 'Untitled'}</i> -{' '}
        <b style={{ textTransform: 'capitalize' }}>{band?.name}</b>
      </Link>
    </div>  
  )
}

export default PlayingTrack

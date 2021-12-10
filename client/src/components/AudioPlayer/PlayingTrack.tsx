import { usePlayer } from 'context/Player'

const PlayingTrack: React.FC = () => {
  const { wave } = usePlayer()
  return <div className="PlayingTrack"><div ref={wave} /></div>
}

export default PlayingTrack

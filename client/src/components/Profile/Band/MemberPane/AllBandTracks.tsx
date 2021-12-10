import Playlist from "components/Playlist"
import Band from "types/Band"

const AllBandTracks:React.FC<{band: Band}> = ({ band }) => {
  return <Playlist collection={band.songList} />
}

export default AllBandTracks
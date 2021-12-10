import { useMemo } from 'react'

import { useTracks } from 'context/Tracks'
import Collection from "types/Collection.d"
import Table from 'components/Table'
import Waveform from './Waveform'

type Props = {
  collection: Collection
}

const Playlist: React.FC<Props> = ({ collection }) => {
  const trackIds = useMemo(() => collection.tracks.map(({ id }) => id), [JSON.stringify(collection)])
  const { tracks } = useTracks(trackIds)
    const data = useMemo(
      () => collection.tracks.map(({ id, order }) => {
        return {
          col1: order || '',
          col2: tracks[id]?.title || tracks[id]?.workingTitle || 'Untitled',
          col3: <Waveform url={tracks[id]?.trackUrl} />
        }
      }
    ), [JSON.stringify(collection), tracks])
    const columns = useMemo(
      () => [
        {
          Header: '',
          accessor: 'col1',
          defaultCanSort: true,
        },
        {
          Header: 'Name',
          accessor: 'col2',
          defaultCanSort: true,
        }, 
        {
          Header: '',
          accessor: 'col3',
          className: 'waveform'
        }
      ],
      []
    )
  return <div><Table data={data} columns={columns} /></div>
  // return <div></div>
}

export default Playlist
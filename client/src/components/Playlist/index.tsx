import { useMemo } from 'react'

import { useTracks } from 'context/Tracks'
import Collection from "types/Collection.d"
import Table from 'components/Table'

import './Playlist.scss'
import { usePlayer } from 'context/Player'

type Props = {
  collection: Collection
}

const Playlist: React.FC<Props> = ({ collection }) => {
  const trackIds = useMemo(() => collection.tracks.map(({ id }) => id), [JSON.stringify(collection)])
  const { tracks } = useTracks(trackIds)
  const { mountTrack } = usePlayer()
  const data = useMemo(
    () => collection.tracks.map(({ id, order }) => {
      return {
        col1: order || '',
        col2: tracks[id]?.title || tracks[id]?.workingTitle || 'Untitled',
        id
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
      }
    ],
    []
  )
  
  const setRowProps = ({ original: { id }}: { [key: string]: any }) => ({
    onClick: () => mountTrack(id),
    onKeyDown: (event: KeyboardEvent) => event.code === "Enter" && mountTrack(id),
    tabIndex: 0
  })

  return <div><Table className="Playlist" data={data} columns={columns} getRowProps={setRowProps}/></div>
  // return <div></div>
}

export default Playlist

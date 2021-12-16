import { useViewer } from 'context/Viewer';
import { format } from 'date-fns';
import { useMemo } from 'react'
import { BandMessage, Message } from "types/Message"

import Table from '../'
import Actions from './Actions'
import './MessageList.scss'

const MessageList: React.FC<{ messages: Array<BandMessage | Message> }> = ({ messages }) => {
  const { user } = useViewer()
  const data = useMemo(
    () =>
      messages.map((message) => ({
        to: message.bandName || user?.displayName || '',
        from: message.metaData.sender,
        message: (
          <>
            <b>{message.subject}</b> <br /> {message.text}
          </>
        ),
        date: format(message.createdAt, 'MMM dd, yyyy'),
        actions: <Actions message={message} />,
        read: message.userRead
      })),
    [messages]
  )

  const columns = useMemo(() => [{
    Header: 'To',
    accessor: 'to',
    defaultCanSort: true
  }, {
  //   Header: 'From',
  //   accessor: 'from',
  //   defaultCanSort: true
  // }, {
    Header: 'Message',
    accessor: 'message'
  }, {
    Header: 'Sent On',
    accessor: 'date',
    defaultCanSort: true
  }, {
    Header: '',
    accessor: 'actions'
  }
  ], [])

  const setRowProps = ({ original: { read } }: { [key: string]: any }) => ({
    className: read ? "" : "unread-message"
  })

  return <Table data={data} columns={columns} getRowProps={setRowProps} />
}

export default MessageList

import { useViewer } from 'context/Viewer';
import { format } from 'date-fns';
import { useMemo } from 'react'
import { BandMessage, Message } from "types/Message"

import Table from '../'
import Actions from './Actions'

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
        // col2:
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

  return <Table data={data} columns={columns} />
}

export default MessageList

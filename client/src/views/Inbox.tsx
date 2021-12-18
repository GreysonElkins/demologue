import { useMessages } from 'context/Messages'
import MessageList from 'components/Table/MessageList'
import Loading from 'style/Icon/Loading'

const Inbox = () => {
  const { messages, loading } = useMessages()

  if (loading) return <Loading />
  return <MessageList messages={Object.values(messages).flat()} />
}

export const InboxRoute = {
  element: <Inbox />,
  title: 'Inbox',
  authRequired: true,
  exact: false,
  path: '/inbox',
}

export default InboxRoute

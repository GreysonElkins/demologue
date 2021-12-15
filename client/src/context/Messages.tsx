import { createContext, useContext, useEffect, useState } from 'react'
import useViewerBands from 'hooks/useViewerBands'
import { getMessages } from 'scripts/api/demologue/query/message'

type Inbox = { direct: []; toBand: [] }

type MessagesContextValue = {
  loading: boolean
  messages: Inbox
}

const MessagesContext = createContext({} as MessagesContextValue)

export const MessagesProvider: React.FC = ({ children }) => {
  const { bandIds, viewer } = useViewerBands()
  const [ loading, setLoading ] = useState<boolean>(true)
  const [messages, setMessages] = useState<Inbox>({ direct: [], toBand: [] })
  const { data, isFetching } = getMessages({ bands: bandIds, userId: viewer?.uid || null})

  useEffect(() => {
    if (!!viewer && !isFetching && loading) setLoading(false)
    if ((!!viewer || isFetching) && !loading) setLoading(true)
  }, [viewer, isFetching])

  useEffect(() => {
    console.log({ data })
  }, [data])

  return <MessagesContext.Provider value={{ loading, messages }}>{children}</MessagesContext.Provider>
}

export const useMessages = () => useContext(MessagesContext)

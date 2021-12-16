import { createContext, useContext, useEffect, useState } from 'react'
import useViewerBands from 'hooks/useViewerBands'
import { getMessages } from 'scripts/api/demologue/query/message'
import { Message, BandMessage } from 'types/Message'

type Inbox = { direct: Message[]; toBand: BandMessage[] }

type MessagesContextValue = {
  loading: boolean
  messages: Inbox
}

const MessagesContext = createContext({} as MessagesContextValue)

export const MessagesProvider: React.FC = ({ children }) => {
  const { bandIds, viewer } = useViewerBands()
  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<Inbox>({ direct: [], toBand: [] })
  const { data, isFetching } = getMessages({ bands: bandIds, userId: viewer?.uid || null})

  useEffect(() => {
    if (!!viewer && !isFetching && loading) setLoading(false)
    if ((!!viewer || isFetching) && !loading) setLoading(true)
  }, [viewer, isFetching])

  useEffect(() => {
    if (!data) return
    const incomingMessages = {
      direct: data.messages.map(message => new Message(message)),
      toBand: data.messagesByBands.reduce((messages, message) => {
        const bandRole = viewer?.bands[message.band.id]
        if (bandRole === "MEMBER" || bandRole === "SUPPORT") messages.push(new BandMessage(message))
        // there probably should be some delineation between what types of messages these roles receive
        return messages
      }, [] as BandMessage[])
    }
    setMessages(incomingMessages)
  }, [data])

  return <MessagesContext.Provider value={{ loading, messages }}>{children}</MessagesContext.Provider>
}

export const useMessages = () => useContext(MessagesContext)

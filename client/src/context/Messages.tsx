import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import useViewerBands from 'hooks/useViewerBands'
import { getMessages } from 'scripts/api/demologue/query/message'
import { Message, BandMessage } from 'types/Message'
import { useQueryClient } from 'react-query'
import { markMessageRead } from 'scripts/api/demologue/mutation/message'

type Inbox = { direct: Message[]; toBand: BandMessage[] }

type MessagesContextValue = {
  loading: boolean
  messages: Inbox
  hasUnread: boolean
  readMessage: (messageId: number, read: boolean) => void
}

const MessagesContext = createContext({} as MessagesContextValue)

export const MessagesProvider: React.FC = ({ children }) => {
  const queryClient = useQueryClient()
  const { bandIds, viewer } = useViewerBands()
  const [loading, setLoading] = useState<boolean>(true)
  const [hasUnread, setHasUnread] = useState<boolean>(false)
  const [messages, setMessages] = useState<Inbox>({ direct: [], toBand: [] })
  const { data, isFetching } = getMessages({ bands: bandIds, userId: viewer?.uid || null})
  const { mutate } = markMessageRead(queryClient)

  useEffect(() => {
    if (!!viewer && !isFetching && loading) setLoading(false)
    if ((!!viewer || isFetching) && !loading) setLoading(true)
  }, [viewer, isFetching])

  useEffect(() => {
    if (!data) return
    if (!viewer) return
    const incomingMessages = {
      direct: data.messages.map(message => new Message(message, viewer.uid)),
      toBand: data.messagesByBands.reduce((messages, message) => {
        const bandRole = viewer?.bands[message.band.id]
        const parsedMessage = new BandMessage(message, viewer.uid)
        if ((bandRole === 'MEMBER' || bandRole === 'SUPPORT') && !parsedMessage.metaData.exclude?.includes(viewer.uid))
          messages.push(parsedMessage)
        // there probably should be some delineation between what types of messages these roles receive
        return messages
      }, [] as BandMessage[])
    }
    setMessages(incomingMessages)
  }, [data, viewer])

  useEffect(() => {
    const unreadMessages = Object.values(messages).flat().some(message => !message.userRead)
    setHasUnread(unreadMessages)
  }, [messages])

  const readMessage = useCallback((messageId: number, read: boolean) => {
    if (!viewer) return console.error(`No viewer was available when marking message ${messageId} read`)
    if (!data) return
    const message = Object.values(data).flat().find(({ id }) => id === messageId)
    const readData = message ? JSON.parse(message.userRead) : {}
    const update = { ...readData, [viewer.uid]: read ? new Date() : false }
    mutate({ messageId, readData: update })
  }, [viewer, data])

  return <MessagesContext.Provider value={{ hasUnread, loading, messages, readMessage }}>{children}</MessagesContext.Provider>
}

export const useMessages = () => useContext(MessagesContext)

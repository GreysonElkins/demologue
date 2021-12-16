import endpoint from 'scripts/api/demologue'
import { QueryClient, useMutation } from 'react-query'
import { request } from 'graphql-request'
// import { toast } from 'react-toastify'
import { DELETE_MESSAGE, MARK_MESSAGE_READ } from './message.gql'

export const markMessageRead = (queryClient?: QueryClient) =>
  useMutation(
    async ({ messageId, readData }:{ messageId: number, readData: { [key: string]: Date } }) => {
      try {
        await request(endpoint, MARK_MESSAGE_READ, { messageId, readData: JSON.stringify(readData) })
      } catch (error) {
        console.error(error)
      }
    }, {
      onSuccess: () => {
        queryClient && queryClient.invalidateQueries('get-messages')
      },
    }
  )

export const deleteMessage = (queryClient?: QueryClient) => 
  useMutation(
    async (messageId: number) => {
      try {
        await request(endpoint, DELETE_MESSAGE, { messageId })
      } catch (error) {
        console.error(error)
      }
    }, {
      onSuccess: () => {
        queryClient && queryClient.invalidateQueries('get-messages')
      }
    }
  )
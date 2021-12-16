import { gql } from "graphql-request";

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: Int!) {
    deleteMessage(input: { id: $messageId }) {
      clientMutationId
    }
  }
`

export const MARK_MESSAGE_READ = gql`
  mutation MarkMessageRead($messageId: Int!, $readData: JSON!) {
    updateMessage(input: { patch: { userRead: $readData }, id: $messageId }) {
      clientMutationId
    }
  }
`

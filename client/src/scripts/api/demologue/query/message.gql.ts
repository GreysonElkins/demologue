import { gql } from "graphql-request";

const gqlMessage = `
  createdAt
  id
  messageType
  metadata
  userRead
`

export const GET_MESSAGES = gql`
  query GetMessages($bands: [Int]!, $userId: String!) {
    messages(
      filter: { userId: { equalTo: $userId }, or: { messageType: { equalTo: SYSTEM_MESSAGE } } }
    ) {
      ${gqlMessage}
    }
    messagesByBands(ids: $bands) {
      ${gqlMessage}
      band {
        id
        name
      }
    }
  }
`

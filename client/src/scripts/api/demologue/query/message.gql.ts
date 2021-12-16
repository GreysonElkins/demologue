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
    messages(condition: { userId: $userId }) {
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
